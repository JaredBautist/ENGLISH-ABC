import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'english_platform.settings')
django.setup()

from apps.learning.models import Module, Level

print("Checking modules...")
a12_modules = Module.objects.filter(level__code='a1-2').count()
print(f"A1.2 modules: {a12_modules}")

if a12_modules > 0:
    print("\nModules found:")
    for m in Module.objects.filter(level__code='a1-2').order_by('week_number'):
        print(f"  Week {m.week_number}: {m.title}")
else:
    print("No modules found!")
