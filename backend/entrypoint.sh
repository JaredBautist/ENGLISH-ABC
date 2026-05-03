#!/bin/sh
set -e

DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-3306}

until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Waiting for MySQL at $DB_HOST:$DB_PORT..."
  sleep 2
done

python manage.py migrate --noinput
python manage.py collectstatic --noinput

exec "$@"
