from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.accounts.models import User
from apps.learning.models import Level, Module, StudentProfile, StudentProgress


class LearningApiTests(APITestCase):
    def setUp(self):
        self.level_a1_1 = Level.objects.create(code='a1-1', name='A1.1', order=1)
        self.level_a1_2 = Level.objects.create(code='a1-2', name='A1.2', order=2)
        self.module_a1_1 = Module.objects.create(
            level=self.level_a1_1,
            week_number=1,
            title='Basics',
            slide_route='/a1-1/week-1',
            order=1,
        )
        self.module_a1_1_w2 = Module.objects.create(
            level=self.level_a1_1,
            week_number=2,
            title='Greetings',
            slide_route='/a1-1/week-2',
            order=2,
        )
        self.module_a1_2 = Module.objects.create(
            level=self.level_a1_2,
            week_number=1,
            title='Listening',
            order=1,
        )

        self.teacher = User.objects.create_user(
            email='teacher@test.com',
            password='teacher123',
            username='teacher',
            role=User.Role.TEACHER,
        )
        self.student = User.objects.create_user(
            email='student@test.com',
            password='student123',
            username='student',
            role=User.Role.STUDENT,
        )
        StudentProfile.objects.create(
            user=self.student,
            current_level=self.level_a1_1,
            assigned_by=self.teacher,
        )

    def test_teacher_can_create_student(self):
        self.client.force_authenticate(self.teacher)
        url = reverse('teacher-students')
        payload = {
            'username': 'student2',
            'email': 'student2@test.com',
            'password': 'student123',
            'level_code': 'a1-2',
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['level']['code'], 'a1-2')
        self.assertTrue(User.objects.filter(email='student2@test.com').exists())

    def test_student_cannot_list_teacher_students(self):
        self.client.force_authenticate(self.student)
        url = reverse('teacher-students')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_student_cannot_update_other_level_progress(self):
        self.client.force_authenticate(self.student)
        url = reverse('student-progress-me')
        payload = {
            'module_id': self.module_a1_2.id,
            'completion_percent': 10,
            'status': 'in_progress',
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertFalse(
            StudentProgress.objects.filter(student=self.student, module=self.module_a1_2).exists()
        )

    def test_student_progress_summary_defaults_and_unlocks(self):
        self.client.force_authenticate(self.student)
        url = reverse('student-progress-summary-me')

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['level_code'], 'a1-1')
        self.assertEqual(response.data['total_weeks'], 2)
        self.assertEqual(response.data['overall_percent'], 0)
        self.assertTrue(response.data['weeks'][0]['unlocked'])
        self.assertFalse(response.data['weeks'][1]['unlocked'])

        StudentProgress.objects.create(
            student=self.student,
            module=self.module_a1_1,
            completion_percent=85,
            status='in_progress',
        )

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['weeks'][1]['unlocked'])

    def test_progress_post_normalizes_status_from_percent(self):
        self.client.force_authenticate(self.student)
        url = reverse('student-progress-me')

        response = self.client.post(
            url,
            {'module_id': self.module_a1_1.id, 'completion_percent': 0},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'not_started')

        response = self.client.post(
            url,
            {'module_id': self.module_a1_1.id, 'completion_percent': 30},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'in_progress')

        response = self.client.post(
            url,
            {'module_id': self.module_a1_1.id, 'completion_percent': 100},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'completed')

    def test_progress_post_supports_level_code_and_week_number(self):
        self.client.force_authenticate(self.student)
        url = reverse('student-progress-me')
        response = self.client.post(
            url,
            {
                'level_code': 'a1-1',
                'week_number': 2,
                'completion_percent': 42,
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['module']['week_number'], 2)
        self.assertEqual(response.data['status'], 'in_progress')
