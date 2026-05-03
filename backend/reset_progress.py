#!/usr/bin/env python
"""
Script para resetear el progreso de los estudiantes
Esto desbloqueará solo Week 1 y bloqueará el resto
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'english_platform.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.learning.models import StudentProgress, Module
from apps.learning.selectors import get_student_progress_summary

User = get_user_model()

def reset_student_progress(username=None):
    """Resetea el progreso de un estudiante o todos"""
    if username:
        students = User.objects.filter(username=username, role=User.Role.STUDENT)
        if not students.exists():
            print(f"❌ Estudiante '{username}' no encontrado")
            return
    else:
        students = User.objects.filter(role=User.Role.STUDENT)
    
    print(f"\n🔄 Reseteando progreso de {students.count()} estudiante(s)...\n")
    
    for student in students:
        # Eliminar todo el progreso existente
        deleted_count = StudentProgress.objects.filter(student=student).delete()[0]
        print(f"✓ {student.username}: Eliminados {deleted_count} registros de progreso")
        
        # Verificar el estado después del reset
        summary = get_student_progress_summary(student)
        print(f"  - Level: {summary['level_code']}")
        print(f"  - Overall: {summary['overall_percent']}%")
        print(f"  - Current Week: {summary['current_week']}")
        
        # Mostrar estado de cada semana
        for week in summary['weeks']:
            status = "🔓" if week['unlocked'] else "🔒"
            print(f"  - Week {week['week_number']}: {week['completion_percent']}% {status}")
        print()

if __name__ == '__main__':
    import sys
    
    print("=" * 60)
    print("🔄 RESET DE PROGRESO")
    print("=" * 60)
    print()
    print("Este script eliminará todo el progreso guardado.")
    print("Después del reset:")
    print("  - Week 1 estará desbloqueada (0%)")
    print("  - Week 2-8 estarán bloqueadas")
    print()
    
    if len(sys.argv) > 1:
        username = sys.argv[1]
        print(f"Reseteando progreso de: {username}")
    else:
        print("Reseteando progreso de TODOS los estudiantes")
        response = input("¿Estás seguro? (escribe 'si' para confirmar): ")
        if response.lower() != 'si':
            print("❌ Operación cancelada")
            sys.exit(0)
        username = None
    
    print()
    reset_student_progress(username)
    
    print("=" * 60)
    print("✅ Reset completado")
    print("=" * 60)
    print()
    print("Ahora puedes:")
    print("1. Recargar el dashboard en el navegador")
    print("2. Verificar que solo Week 1 esté desbloqueada")
    print("3. Empezar a trabajar en Week 1")
    print()
