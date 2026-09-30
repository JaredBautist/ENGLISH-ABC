#!/bin/sh
set -e

DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-3306}
DB_WAIT_ATTEMPTS=${DB_WAIT_ATTEMPTS:-60}

while ! nc -z -w 2 "$DB_HOST" "$DB_PORT"; do
  DB_WAIT_ATTEMPTS=$((DB_WAIT_ATTEMPTS - 1))
  if [ "$DB_WAIT_ATTEMPTS" -le 0 ]; then
    echo "MySQL unavailable at $DB_HOST:$DB_PORT; check docker compose logs db." >&2
    exit 1
  fi
  echo "Waiting for MySQL at $DB_HOST:$DB_PORT..."
  sleep 2
done

python manage.py migrate --noinput
python manage.py collectstatic --noinput

exec "$@"
