import json
import tempfile
from pathlib import Path

from django.conf import settings
from django.core.management import call_command
from django.core.management.base import CommandError
from django.test import SimpleTestCase, TestCase

from apps.learning.models import Grade


class StaticConfigurationTests(SimpleTestCase):
    def test_static_collection_has_an_absolute_destination(self):
        self.assertTrue(settings.STATIC_ROOT)
        self.assertTrue(Path(settings.STATIC_ROOT).is_absolute())


class LocalImportTests(TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.fixture = Path(self.directory.name) / 'local.json'
        self.records = [{
            'model': 'learning.grade', 'pk': 42,
            'fields': {
                'code': 'primero', 'name': 'Primero', 'description': '',
                'order': 1, 'is_active': True,
                'created_at': '2026-01-01T00:00:00Z',
            },
        }]
        self.fixture.write_text(json.dumps(self.records))

    def test_import_preserves_ids_and_source(self):
        original = self.fixture.read_bytes()
        call_command('import_local_data', str(self.fixture), verbosity=0)
        self.assertEqual(Grade.objects.get(pk=42).code, 'primero')
        self.assertEqual(self.fixture.read_bytes(), original)

    def test_import_refuses_existing_application_data(self):
        Grade.objects.create(code='existing', name='Existing')
        with self.assertRaisesMessage(CommandError, 'empty'):
            call_command('import_local_data', str(self.fixture), verbosity=0)
        self.assertEqual(list(Grade.objects.values_list('code', flat=True)), ['existing'])

    def test_invalid_import_rolls_back_prior_records(self):
        self.records.append({
            'model': 'learning.module', 'pk': 1,
            'fields': {'grade': 999, 'week_number': 1, 'title': 'Invalid reference'},
        })
        self.fixture.write_text(json.dumps(self.records))
        with self.assertRaisesMessage(CommandError, 'Import failed'):
            call_command('import_local_data', str(self.fixture), verbosity=0)
        self.assertFalse(Grade.objects.exists())
