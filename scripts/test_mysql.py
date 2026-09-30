"""Run Django tests in a disposable MySQL database through the local Compose stack."""

import os
import subprocess
from pathlib import Path


def main():
    """Use the local root credential only in the test container; return its exit code."""
    root = Path(__file__).resolve().parents[1]
    configuration = dict(
        line.split('=', 1)
        for line in (root / '.env').read_text().splitlines()
        if '=' in line and not line.startswith('#')
    )
    environment = os.environ.copy()
    environment['DB_PASSWORD'] = configuration['MYSQL_ROOT_PASSWORD']
    return subprocess.run(
        [
            'docker', 'compose', 'run', '--rm', '--no-deps',
            '-e', 'DB_USER=root', '-e', 'DB_PASSWORD', '--entrypoint', 'python',
            'backend', 'manage.py', 'test', 'apps.learning.tests', '--noinput',
        ],
        cwd=root,
        env=environment,
        check=False,
    ).returncode


if __name__ == '__main__':
    raise SystemExit(main())
