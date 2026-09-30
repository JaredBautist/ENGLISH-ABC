from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.USERNAME_FIELD

    def validate(self, attrs):
        email = (attrs.get('email') or '').strip().lower()
        password = attrs.get('password')

        if not email or not password:
            raise AuthenticationFailed('Email and password are required.')

        user = authenticate(
            request=self.context.get('request'),
            email=email,
            password=password,
        )
        if not user:
            raise AuthenticationFailed('Invalid credentials.')
        if not user.is_active:
            raise AuthenticationFailed('User is inactive.')

        refresh = self.get_token(user)

        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': user.role,
                'grades': self._get_grade_codes(user),
            },
        }

        return data

    @staticmethod
    def _get_grade_codes(user):
        from apps.learning.models import TeacherGrade

        return list(
            TeacherGrade.objects.filter(teacher=user, grade__is_active=True)
            .values_list('grade__code', flat=True)
        )

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token


class UserMeSerializer(serializers.ModelSerializer):
    grades = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'grades']

    def get_grades(self, obj):
        from apps.learning.models import TeacherGrade

        return list(
            TeacherGrade.objects.filter(teacher=obj, grade__is_active=True)
            .values_list('grade__code', flat=True)
        )
