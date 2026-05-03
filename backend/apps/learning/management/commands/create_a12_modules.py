"""
Management command to create A1.2 modules (weeks 1-8)
Run with: python manage.py create_a12_modules
"""
from django.core.management.base import BaseCommand
from apps.learning.models import Level, Module


class Command(BaseCommand):
    help = 'Creates A1.2 level modules (weeks 1-8) if they don\'t exist'

    def handle(self, *args, **options):
        # Get or create A1.2 level
        level, created = Level.objects.get_or_create(
            code='a1-2',
            defaults={
                'name': 'A1.2 - Elementary English',
                'description': 'Elementary level English course',
                'order': 2,
                'is_active': True
            }
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created level: {level.name}'))
        else:
            self.stdout.write(f'Level already exists: {level.name}')

        # Define weeks data
        weeks_data = [
            {
                'week_number': 1,
                'title': 'Week 1: Greetings & Introductions',
                'subtitle': 'Present Simple • Personal Information',
                'slide_route': '/a1-2/week-1'
            },
            {
                'week_number': 2,
                'title': 'Week 2: Daily Routines',
                'subtitle': 'Present Simple • Time Expressions',
                'slide_route': '/a1-2/week-2'
            },
            {
                'week_number': 3,
                'title': 'Week 3: Places & Directions',
                'subtitle': 'There is/are • Prepositions of Place',
                'slide_route': '/a1-2/week-3'
            },
            {
                'week_number': 4,
                'title': 'Week 4: Past Simple',
                'subtitle': 'Regular & Irregular Verbs',
                'slide_route': '/a1-2/week-4'
            },
            {
                'week_number': 5,
                'title': 'Week 5: Shopping & Food',
                'subtitle': 'Some/Any • How much/many',
                'slide_route': '/a1-2/week-5'
            },
            {
                'week_number': 6,
                'title': 'Week 6: Abilities & Rules',
                'subtitle': 'Can/Can\'t • Imperatives',
                'slide_route': '/a1-2/week-6'
            },
            {
                'week_number': 7,
                'title': 'Week 7: Hobbies & Plans',
                'subtitle': 'Like + -ing • Going to',
                'slide_route': '/a1-2/week-7'
            },
            {
                'week_number': 8,
                'title': 'Week 8: Final Review',
                'subtitle': 'Complete Review • Final Project',
                'slide_route': '/a1-2/week-8'
            }
        ]

        created_count = 0
        updated_count = 0

        for week_data in weeks_data:
            module, created = Module.objects.update_or_create(
                level=level,
                week_number=week_data['week_number'],
                defaults={
                    'title': week_data['title'],
                    'subtitle': week_data['subtitle'],
                    'slide_route': week_data['slide_route'],
                    'order': week_data['week_number'],
                    'is_active': True
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Created: {module.title}')
                )
            else:
                updated_count += 1
                self.stdout.write(
                    f'  Updated: {module.title}'
                )

        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('=' * 60))
        self.stdout.write(self.style.SUCCESS(f'Summary:'))
        self.stdout.write(self.style.SUCCESS(f'  - Created: {created_count} modules'))
        self.stdout.write(self.style.SUCCESS(f'  - Updated: {updated_count} modules'))
        self.stdout.write(self.style.SUCCESS(f'  - Total: {len(weeks_data)} modules'))
        self.stdout.write(self.style.SUCCESS('=' * 60))
        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('✓ A1.2 modules are ready!'))
        self.stdout.write('')
        self.stdout.write('Next steps:')
        self.stdout.write('  1. Restart your Django server')
        self.stdout.write('  2. Test the progress endpoints:')
        self.stdout.write('     POST /api/students/me/progress/')
        self.stdout.write('     GET /api/students/me/progress-summary/')
