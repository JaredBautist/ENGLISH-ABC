"""Create ignored local configuration without overwriting existing secrets."""

import os
import secrets
from pathlib import Path


def main():
    """Write a private .env only when missing; preserve existing configuration."""
    root = Path(__file__).resolve().parents[1]
    (root / '.local-runtime').mkdir(mode=0o700, exist_ok=True)
    try:
        descriptor = os.open(root / '.env', os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    except FileExistsError:
        print('Existing .env preserved.')
        return
    with os.fdopen(descriptor, 'w') as config:
        for key in ('SECRET_KEY', 'DB_PASSWORD', 'MYSQL_ROOT_PASSWORD'):
            config.write(f'{key}={secrets.token_urlsafe(48)}\n')
    print('Local configuration created. Run docker compose up --build -d.')


if __name__ == '__main__':
    main()
