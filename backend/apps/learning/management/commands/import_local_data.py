"""Import a trusted local Django fixture only into an empty application database."""

import json
from pathlib import Path

from django.apps import apps
from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction


class Command(BaseCommand):
    help = 'Import a trusted local fixture without overwriting application data.'

    def add_arguments(self, parser):
        parser.add_argument('fixture', type=Path)

    def handle(self, *args, **options):
        fixture = options['fixture']
        try:
            records = json.loads(fixture.read_text())
        except (OSError, ValueError) as error:
            raise CommandError(f'Cannot read fixture: {error}') from error
        allowed = {'accounts.user', 'auth.group', 'auth.permission'} | {
            model._meta.label_lower for model in apps.get_app_config('learning').get_models()
        }
        if not isinstance(records, list) or any(
            not isinstance(record, dict) or record.get('model') not in allowed
            for record in records
        ):
            raise CommandError('Fixture must contain only accounts, learning, or auth records.')

        with transaction.atomic():
            for app_label in ('accounts', 'learning'):
                if any(model.objects.exists() for model in apps.get_app_config(app_label).get_models()):
                    raise CommandError('Target application database must be empty; existing data preserved.')
            if apps.get_model('auth', 'Group').objects.exists():
                raise CommandError('Target groups must be empty; existing data preserved.')
            try:
                call_command('loaddata', str(fixture), verbosity=options['verbosity'])
            except Exception as error:
                raise CommandError(f'Import failed; transaction rolled back: {error}') from error
        self.stdout.write(self.style.SUCCESS('Local import completed.'))
