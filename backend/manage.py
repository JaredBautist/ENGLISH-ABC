#!/usr/bin/env python
import os
import sys


def load_root_env() -> None:
    """Load key=value pairs from the repository-root .env (if present).

    Real environment variables always win: existing os.environ values are
    never overwritten. Keeps `python manage.py runserver` working from the
    backend/ directory without manual `source ../.env`.
    """
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env')
    env_path = os.path.normpath(env_path)
    if not os.path.isfile(env_path):
        return
    with open(env_path, 'r', encoding='utf-8') as env_file:
        for raw_line in env_file:
            line = raw_line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            key, _, value = line.partition('=')
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key:
                os.environ.setdefault(key, value)


def main():
    load_root_env()
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'english_platform.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            'Django is not installed. Install dependencies and try again.'
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
