#!/usr/bin/env python
"""
Quick script to check if the progress system is properly set up
Run with: python check_progress_setup.py
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'english_platform.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.learning.models import Level, Module, StudentProfile, StudentProgress

User = get_user_model()

def check_levels():
    print("\n" + "="*60)
    print("📚 CHECKING LEVELS")
    print("="*60)
    
    levels = Level.objects.filter(is_active=True)
    if levels.exists():
        print(f"✓ Found {levels.count()} active levels:")
        for level in levels:
            print(f"  - {level.code}: {level.name}")
        return True
    else:
        print("✗ No active levels found!")
        print("  Run: python manage.py create_a11_modules")
        print("  Run: python manage.py create_a12_modules")
        return False

def check_modules():
    print("\n" + "="*60)
    print("📖 CHECKING MODULES")
    print("="*60)
    
    a11_modules = Module.objects.filter(level__code='a1-1', is_active=True).count()
    a12_modules = Module.objects.filter(level__code='a1-2', is_active=True).count()
    
    print(f"A1.1 modules: {a11_modules}/8")
    print(f"A1.2 modules: {a12_modules}/8")
    
    if a11_modules == 0:
        print("\n⚠️  A1.1 modules missing!")
        print("   Run: python manage.py create_a11_modules")
    
    if a12_modules == 0:
        print("\n⚠️  A1.2 modules missing!")
        print("   Run: python manage.py create_a12_modules")
    
    if a11_modules > 0 or a12_modules > 0:
        print("\n✓ Modules found")
        
        # Show first 3 modules as example
        modules = Module.objects.filter(is_active=True).order_by('level__code', 'week_number')[:3]
        print("\nExample modules:")
        for module in modules:
            print(f"  - {module.level.code} Week {module.week_number}: {module.title}")
        
        return True
    
    return False

def check_students():
    print("\n" + "="*60)
    print("👥 CHECKING STUDENTS")
    print("="*60)
    
    students = User.objects.filter(role=User.Role.STUDENT)
    print(f"Total students: {students.count()}")
    
    if students.exists():
        print("\nStudents with profiles:")
        profiles = StudentProfile.objects.select_related('user', 'current_level').filter(is_active=True)
        for profile in profiles[:5]:  # Show first 5
            print(f"  - {profile.user.username}: {profile.current_level.code if profile.current_level else 'No level'}")
        
        if profiles.count() > 5:
            print(f"  ... and {profiles.count() - 5} more")
        
        return True
    else:
        print("✗ No students found")
        print("  Create a student through the teacher dashboard or Django admin")
        return False

def check_progress():
    print("\n" + "="*60)
    print("📊 CHECKING PROGRESS DATA")
    print("="*60)
    
    progress_count = StudentProgress.objects.count()
    print(f"Total progress records: {progress_count}")
    
    if progress_count > 0:
        print("\nRecent progress:")
        recent = StudentProgress.objects.select_related(
            'student', 'module', 'module__level'
        ).order_by('-last_activity')[:5]
        
        for p in recent:
            print(f"  - {p.student.username}: {p.module.level.code} Week {p.module.week_number} - {p.completion_percent}%")
        
        return True
    else:
        print("ℹ️  No progress data yet (this is normal for a new setup)")
        return True

def check_endpoints():
    print("\n" + "="*60)
    print("🔌 API ENDPOINTS")
    print("="*60)
    
    print("\nAvailable endpoints:")
    print("  POST   /api/students/me/progress/")
    print("         Save student progress")
    print("")
    print("  GET    /api/students/me/progress-summary/")
    print("         Get progress summary with unlock status")
    print("")
    print("  GET    /api/students/me/progress/")
    print("         Get all student progress records")
    print("")
    
    print("Test with curl:")
    print("  curl -H 'Authorization: Bearer YOUR_TOKEN' \\")
    print("       http://localhost:8000/api/students/me/progress-summary/")

def main():
    print("\n" + "="*60)
    print("🔍 PROGRESS SYSTEM SETUP CHECK")
    print("="*60)
    
    checks = {
        'Levels': check_levels(),
        'Modules': check_modules(),
        'Students': check_students(),
        'Progress': check_progress(),
    }
    
    check_endpoints()
    
    print("\n" + "="*60)
    print("📋 SUMMARY")
    print("="*60)
    
    all_passed = all(checks.values())
    
    for name, passed in checks.items():
        status = "✓" if passed else "✗"
        print(f"{status} {name}")
    
    print("\n" + "="*60)
    
    if all_passed:
        print("✅ ALL CHECKS PASSED!")
        print("\nYour progress system is ready to use.")
        print("\nNext steps:")
        print("  1. Start Django server: python manage.py runserver")
        print("  2. Start frontend: cd frontend && npm run dev")
        print("  3. Login as a student")
        print("  4. Navigate to a week and complete slides")
        print("  5. Watch the progress bar update!")
    else:
        print("⚠️  SOME CHECKS FAILED")
        print("\nPlease fix the issues above and run this script again.")
    
    print("="*60 + "\n")

if __name__ == '__main__':
    main()
