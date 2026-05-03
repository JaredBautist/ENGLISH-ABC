"""
Management command to create A1.1 modules
Run with: python manage.py create_a11_modules
"""
from django.core.management.base import BaseCommand
from apps.learning.models import Level, Module


class Command(BaseCommand):
    help = 'Creates A1.1 level modules if they don\'t exist'

    def handle(self, *args, **options):
        # Get or create A1.1 level
        level, created = Level.objects.get_or_create(
            code='a1-1',
            defaults={
                'name': 'A1.1 - Beginner English',
                'description': 'Beginner level English course',
                'order': 1,
                'is_active': True
            }
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created level: {level.name}'))
        else:
            self.stdout.write(f'Level already exists: {level.name}')

        # Define weeks data for A1.1
        weeks_data = [
            {
                'week_number': 1,
                'title': 'Week 1: The Alphabet',
                'subtitle': 'Letters • Pronunciation • Spelling',
                'slide_route': '/a1-1/week-1'
            },
            {
                'week_number': 2,
                'title': 'Week 2: Greetings',
                'subtitle': 'Hello • Goodbye • Nice to meet you',
                'slide_route': '/a1-1/week-2'
            },
            {
                'week_number': 3,
                'title': 'Week 3: Numbers',
                'subtitle': 'Numbers 1-100 • Counting',
                'slide_route': '/a1-1/week-3'
            },
            {
                'week_number': 4,
                'title': 'Week 4: Colors & Objects',
                'subtitle': 'Basic colors • Common objects',
                'slide_route': '/a1-1/week-4'
            },
            {
                'week_number': 5,
                'title': 'Week 5: Family',
                'subtitle': 'Family members • Possessives',
                'slide_route': '/a1-1/week-5'
            },
            {
                'week_number': 6,
                'title': 'Week 6: Days & Months',
                'subtitle': 'Days of the week • Months • Dates',
                'slide_route': '/a1-1/week-6'
            },
            {
                'week_number': 7,
                'title': 'Week 7: Basic Verbs',
                'subtitle': 'Common action verbs • Present tense',
                'slide_route': '/a1-1/week-7'
            },
            {
                'week_number': 8,
                'title': 'Week 8: Review',
                'subtitle': 'Complete A1.1 Review',
                'slide_route': '/a1-1/week-8'
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
                    f'  Updated: {module.title}')

        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('=' * 60))
        self.stdout.write(self.style.SUCCESS(f'Summary:'))
        self.stdout.write(self.style.SUCCESS(f'  - Created: {created_count} modules'))
        self.stdout.write(self.style.SUCCESS(f'  - Updated: {updated_count} modules'))
        self.stdout.write(self.style.SUCCESS(f'  - Total: {len(weeks_data)} modules'))
        self.stdout.write(self.style.SUCCESS('=' * 60))
        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('✓ A1.1 modules are ready!'))
