import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'english_platform.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.learning.services import upsert_student_progress
from apps.learning.selectors import get_student_progress_summary

User = get_user_model()
student = User.objects.filter(role=User.Role.STUDENT).first()

print("Testing unlock logic...")
print("\n1. Setting Week 1 to 85%")
upsert_student_progress(student=student, level_code='a1-2', week_number=1, completion_percent=85)

summary = get_student_progress_summary(student)
print(f"   Week 1: {summary['weeks'][0]['completion_percent']}%")
print(f"   Week 2 unlocked: {summary['weeks'][1]['unlocked']}")

if summary['weeks'][1]['unlocked']:
    print("\n✓ SUCCESS: Week 2 is unlocked!")
else:
    print("\n✗ FAIL: Week 2 should be unlocked")
