import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'english_platform.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.learning.models import Level, Module, StudentProfile, StudentProgress
from apps.learning.services import upsert_student_progress
from apps.learning.selectors import get_student_progress_summary

User = get_user_model()

print("="*60)
print("TESTING PROGRESS API")
print("="*60)

# Get first student
students = User.objects.filter(role=User.Role.STUDENT)
if not students.exists():
    print("❌ No students found!")
    print("Create a student first through the teacher dashboard")
    exit(1)

student = students.first()
print(f"\n✓ Testing with student: {student.username}")

# Check profile
try:
    profile = student.student_profile
    print(f"✓ Profile exists: Level {profile.current_level.code if profile.current_level else 'None'}")
except:
    print("❌ No profile found!")
    print("Assigning A1.2 level...")
    level = Level.objects.get(code='a1-2')
    profile = StudentProfile.objects.create(
        user=student,
        current_level=level,
        is_active=True
    )
    print(f"✓ Profile created: Level {profile.current_level.code}")

# Test saving progress
print("\n--- Testing Progress Save ---")
try:
    progress = upsert_student_progress(
        student=student,
        level_code='a1-2',
        week_number=1,
        completion_percent=75
    )
    print(f"✓ Progress saved: Week {progress.module.week_number} - {progress.completion_percent}%")
except Exception as e:
    print(f"❌ Error saving progress: {e}")
    import traceback
    traceback.print_exc()

# Test getting summary
print("\n--- Testing Progress Summary ---")
try:
    summary = get_student_progress_summary(student)
    print(f"✓ Summary retrieved:")
    print(f"  - Level: {summary['level_code']}")
    print(f"  - Overall: {summary['overall_percent']}%")
    print(f"  - Current week: {summary['current_week']}")
    print(f"  - Total weeks: {summary['total_weeks']}")
    print(f"\n  Weeks:")
    for week in summary['weeks']:
        status = "🔓" if week['unlocked'] else "🔒"
        print(f"    Week {week['week_number']}: {week['completion_percent']}% {status}")
except Exception as e:
    print(f"❌ Error getting summary: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "="*60)
print("✓ API TEST COMPLETE")
print("="*60)
