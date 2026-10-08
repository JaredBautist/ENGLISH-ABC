"""Provision only this school on the VPS; never print credentials or tokens."""
import json
import os
from pathlib import Path
import secrets
import subprocess
import sys
import urllib.request
import urllib.error

ROOT = Path('/root/ENGLISH-AQUILINO-PEDRO-FORTOUL')
DEPLOY = ROOT / 'deploy/aquilino-pedro-fortoul'
HOST = 'aquilino-duran-pedro-fortoul.162.35.28.193.nip.io'
EMAIL = 'admin@aquilino-pedro-fortoul.local'
CREDENTIALS = ROOT / 'CREDENCIALES_AQUILINO_DURAN_PEDRO_FORTOUL.md'
COMPOSE = ['docker', 'compose', '--env-file', str(DEPLOY / '.env'), '-f', str(DEPLOY / 'compose.yml')]


def run(arguments, payload=None):
    """Run a checked subprocess; return captured stdout without logging secrets."""
    return subprocess.run(arguments, input=payload, text=True, capture_output=True, check=True).stdout


def prepare():
    """Generate configuration once. Fail rather than replace existing secrets."""
    os.umask(0o077)
    if (DEPLOY / '.env').exists() or CREDENTIALS.exists():
        raise RuntimeError('Existing credentials: preparation must not be repeated.')
    password = secrets.token_urlsafe(24)
    values = {key: secrets.token_hex(32) for key in ('DB_PASSWORD', 'DB_ROOT_PASSWORD', 'SECRET_KEY')}
    with (DEPLOY / '.env').open('x') as target:
        target.write(''.join(f'{key}={value}\n' for key, value in values.items()))
    with (DEPLOY / '.bootstrap.json').open('x') as target:
        json.dump({'email': EMAIL, 'password': password}, target)
    with (ROOT / '.git/info/exclude').open('a') as target:
        target.write('\n.bootstrap.json\ndeploy/aquilino-pedro-fortoul/\n')
    with CREDENTIALS.open('x') as target:
        target.write(f'''# Colegio Aquilino Durán — sede Pedro Fortoul

## Acceso de la institución

- URL: http://{HOST}/login
- Usuario administrador: `{EMAIL}`
- Contraseña: `{password}`
- Rol: administrador institucional (superadmin).
- El correo es un identificador local de acceso, no un buzón configurado.
- Instancia nueva: currículo base; sin usuarios ni progreso de otros colegios.
- Acceso HTTP siguiendo el entorno existente. No hay HTTPS configurado todavía.

## Operación privada

- VPS: `root@162.35.28.193` (acceso con la llave SSH existente).
- Carpeta independiente: `{ROOT}`
- Proyecto Compose: `aquilino-pedro-fortoul`
- Compose: `{DEPLOY}/compose.yml`
- Secretos de infraestructura: `{DEPLOY}/.env` (0600; no compartir con docentes).
- Base de datos: `aquilino_pedro_fortoul`, servidor exclusivo `aqd-pf-db`.
- Volúmenes: `aquilino-pedro-fortoul_school_db`, `aquilino-pedro-fortoul_school_tts`.
- No ejecutar `docker compose down -v`: borraría la persistencia del colegio.
- Las personalizaciones posteriores deben aplicarse solamente a esta copia.
''')
    print('Private configuration generated; values omitted.')


def seed():
    """Seed only a fresh school database and create its administrator atomically."""
    code = '''import json, sys
from django.contrib.auth import get_user_model
from django.db import transaction
from django.core.management import call_command
from apps.learning.models import Grade, Module, StudentProgress, TeacherGrade
credentials=json.load(sys.stdin)
User=get_user_model()
with transaction.atomic():
    assert not User.objects.exists(), 'Refusing to seed a populated school'
    assert not StudentProgress.objects.exists()
    call_command('seed_dba_curriculum')
    User.objects.create_superuser(email=credentials['email'], password=credentials['password'], username='admin_pedro_fortoul', first_name='Administración', last_name='Pedro Fortoul')
    assert Grade.objects.count()==4 and Module.objects.count()==32
    assert TeacherGrade.objects.count()==0
print('Fresh school seeded: 1 administrator, 4 grades, 32 units, 0 assignments/progress.')
'''
    print(run(COMPOSE + ['exec', '-T', 'aqd-pf-api', 'python', 'manage.py', 'shell', '-c', code], (DEPLOY / '.bootstrap.json').read_text()))


def request(host, path, payload=None, token=None):
    """Query a virtual host via local gateway and return status plus JSON/body."""
    headers = {'Host': host}
    if token:
        headers['Authorization'] = 'Bearer ' + token
    body = None
    if payload is not None:
        body = json.dumps(payload).encode()
        headers['Content-Type'] = 'application/json'
    req = urllib.request.Request('http://127.0.0.1' + path, data=body, headers=headers)
    try:
        response = urllib.request.urlopen(req, timeout=20)
    except urllib.error.HTTPError as error:
        response = error
    raw = response.read()
    if response.headers.get_content_type().startswith('image/'):
        return response.status, len(raw)
    content = raw.decode()
    try:
        content = json.loads(content)
    except ValueError:
        pass
    return response.status, content


def verify():
    """Check routes, fresh data and both directions of JWT tenant isolation."""
    credentials = json.loads((DEPLOY / '.bootstrap.json').read_text())
    status, login = request(HOST, '/api/auth/token/', credentials)
    assert status == 200, f'Login status {status}'
    token = login['access']
    status, profile = request(HOST, '/api/auth/me/', token=token)
    assert status == 200 and profile['email'] == EMAIL
    status, grades = request(HOST, '/api/grades/', token=token)
    assert status == 200
    assert len(grades.get('results', grades) if isinstance(grades, dict) else grades) == 4
    assert request(HOST, '/admin')[0] == 200
    assert request(HOST, '/cards/orange_color.jpg')[0] == 200
    old_hosts = ['162.35.28.193', 'manuel-fernandez-de-novoa.162.35.28.193.nip.io']
    for host in old_hosts:
        assert request(host, '/')[0] == 200
        assert request(host, '/api/auth/me/', token=token)[0] == 401
    for container in ['english-platform-backend-1', 'english-platform-backend-mfnovoa-1']:
        code = '''from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken
user=get_user_model().objects.filter(is_active=True).first()
assert user is not None
print('TOKEN='+str(AccessToken.for_user(user)))
'''
        output = run(['docker', 'exec', container, 'python', 'manage.py', 'shell', '-c', code])
        old_token = next(line.removeprefix('TOKEN=') for line in output.splitlines() if line.startswith('TOKEN='))
        assert request(HOST, '/api/auth/me/', token=old_token)[0] == 401
    print('PASS: login, identity, 4 grades, frontend, image, existing routes and bidirectional JWT isolation.')


if __name__ == '__main__':
    actions = {'prepare': prepare, 'seed': seed, 'verify': verify}
    try:
        actions[sys.argv[1]]()
    except subprocess.CalledProcessError as error:
        print(f'Subprocess failed (exit {error.returncode}); inspect service logs without exposing credentials.', file=sys.stderr)
        sys.exit(1)
