from unittest.mock import MagicMock, patch

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.accounts.models import User
from apps.learning.models import Grade, Module, StudentProgress, TeacherGrade


class LearningApiTests(APITestCase):
    def setUp(self):
        self.grade_first = Grade.objects.create(code='primero', name='Primero', order=3)
        self.grade_second = Grade.objects.create(code='segundo', name='Segundo', order=4)
        self.module_first = Module.objects.create(
            grade=self.grade_first,
            week_number=1,
            title='Classroom instructions',
            slide_route='/primero/unidad-1',
            period=1,
            dba_number=1,
            dba_text='Comprende y responde a instrucciones sobre tareas escolares basicas.',
            order=1,
        )
        self.module_second = Module.objects.create(
            grade=self.grade_second,
            week_number=1,
            title='Mi cuerpo y mi familia',
            period=1,
            dba_number=1,
            order=1,
        )

        self.admin = User.objects.create_user(
            email='admin@test.com',
            password='admin12345',
            username='admin',
            role=User.Role.SUPERADMIN,
            is_superuser=True,
        )
        self.teacher = User.objects.create_user(
            email='teacher@test.com',
            password='teacher123',
            username='teacher',
            role=User.Role.TEACHER,
        )
        TeacherGrade.objects.create(teacher=self.teacher, grade=self.grade_first)

    def auth(self, user):
        self.client.force_authenticate(user)

    @staticmethod
    def _items(response):
        data = response.data
        return data['results'] if isinstance(data, dict) and 'results' in data else data

    def test_teacher_sees_only_assigned_grades(self):
        self.auth(self.teacher)
        response = self.client.get(reverse('grades-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        codes = [item['code'] for item in self._items(response)]
        self.assertIn('primero', codes)
        self.assertNotIn('segundo', codes)

    def test_teacher_cannot_list_modules_of_unassigned_grade(self):
        self.auth(self.teacher)
        response = self.client.get(reverse('modules-list'), {'grade': 'segundo'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self._items(response), [])

    def test_admin_sees_all_grades(self):
        self.auth(self.admin)
        response = self.client.get(reverse('grades-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        codes = {item['code'] for item in self._items(response)}
        self.assertEqual(codes, {'primero', 'segundo'})

    def test_admin_can_create_teacher_with_grades(self):
        self.auth(self.admin)
        response = self.client.post(
            reverse('admin-teachers'),
            {
                'username': 'teacher2',
                'email': 'teacher2@test.com',
                'password': 'Docente#2026',
                'grade_codes': ['primero', 'segundo'],
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(set(response.data['grades']), {'primero', 'segundo'})
        teacher = User.objects.get(email='teacher2@test.com')
        self.assertEqual(teacher.role, User.Role.TEACHER)

    def test_teacher_cannot_create_teachers(self):
        self.auth(self.teacher)
        response = self.client.post(
            reverse('admin-teachers'),
            {
                'username': 'teacher3',
                'email': 'teacher3@test.com',
                'password': 'Docente#2026',
                'grade_codes': ['primero'],
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_update_teacher_grades(self):
        self.auth(self.admin)
        response = self.client.patch(
            reverse('admin-teacher-detail', args=[self.teacher.id]),
            {'grade_codes': ['segundo']},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['grades'], ['segundo'])

    def test_teacher_progress_post_marks_unit(self):
        self.auth(self.teacher)
        response = self.client.post(
            reverse('teacher-progress-me'),
            {
                'grade_code': 'primero',
                'week_number': 1,
                'completion_percent': 100,
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'completed')
        self.assertTrue(
            StudentProgress.objects.filter(teacher=self.teacher, module=self.module_first).exists()
        )

    def test_teacher_cannot_mark_unit_of_unassigned_grade(self):
        self.auth(self.teacher)
        response = self.client.post(
            reverse('teacher-progress-me'),
            {
                'grade_code': 'segundo',
                'week_number': 1,
                'completion_percent': 50,
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertFalse(
            StudentProgress.objects.filter(teacher=self.teacher, module=self.module_second).exists()
        )

    def test_admin_overview_shows_institutional_metrics(self):
        self.auth(self.teacher)
        self.client.post(
            reverse('teacher-progress-me'),
            {'grade_code': 'primero', 'week_number': 1, 'completion_percent': 100},
            format='json',
        )

        self.auth(self.admin)
        response = self.client.get(reverse('admin-overview'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['totals']['teachers'], 1)
        self.assertEqual(response.data['totals']['active_teachers'], 1)
        self.assertEqual(response.data['teachers'][0]['grade_codes'], ['primero'])
        self.assertEqual(response.data['teachers'][0]['units_touched'], 1)
        self.assertEqual(response.data['teachers'][0]['units_completed'], 1)
        self.assertGreater(response.data['teachers'][0]['coverage_percent'], 0)
        grade_codes = {g['code'] for g in response.data['grades']}
        self.assertEqual(grade_codes, {'primero', 'segundo'})
        primero_row = next(g for g in response.data['grades'] if g['code'] == 'primero')
        self.assertEqual(primero_row['teacher_count'], 1)
        self.assertEqual(primero_row['units_completed'], 1)
        self.assertEqual(len(primero_row['teachers']), 1)
        self.assertEqual(primero_row['teachers'][0]['username'], self.teacher.username)
        self.assertEqual(primero_row['avg_completion'], 100.0)

        segundo_row = next(g for g in response.data['grades'] if g['code'] == 'segundo')
        self.assertEqual(segundo_row['teacher_count'], 0)
        self.assertEqual(segundo_row['avg_completion'], 0.0)

    def test_teacher_cannot_access_admin_overview(self):
        self.auth(self.teacher)
        response = self.client.get(reverse('admin-overview'))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_teacher_summary_includes_dba_metadata(self):
        self.auth(self.teacher)
        response = self.client.get(reverse('teacher-me-summary'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        grade_entries = response.data['grades']
        self.assertEqual(len(grade_entries), 1)
        entry = grade_entries[0]
        self.assertEqual(entry['grade_code'], 'primero')
        self.assertEqual(entry['modules'][0]['dba_number'], 1)
        self.assertIn('instrucciones', entry['modules'][0]['dba_text'])

    def test_tts_requires_text(self):
        response = self.client.get(reverse('tts-audio'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_tts_rejects_long_text(self):
        response = self.client.get(reverse('tts-audio'), {'text': 'a' * 305})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('urllib.request.urlopen')
    def test_tts_returns_audio_and_caches(self, mock_urlopen):
        mock_cm = MagicMock()
        mock_cm.__enter__.return_value.read.return_value = b'ID3dummy-mp3-data'
        mock_urlopen.return_value = mock_cm

        response = self.client.get(reverse('tts-audio'), {'text': 'Hello classroom test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response['Content-Type'], 'audio/mpeg')
        self.assertEqual(response.content, b'ID3dummy-mp3-data')

