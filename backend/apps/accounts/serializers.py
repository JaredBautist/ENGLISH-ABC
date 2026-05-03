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
            },
        }

        student_profile = getattr(user, 'student_profile', None)
        if student_profile and student_profile.current_level:
            data['user']['level'] = student_profile.current_level.code
        else:
            data['user']['level'] = None

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        student_profile = getattr(user, 'student_profile', None)
        if student_profile and student_profile.current_level:
            token['level'] = student_profile.current_level.code
        return token


class UserMeSerializer(serializers.ModelSerializer):
    level = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'level']

    def get_level(self, obj):
        profile = getattr(obj, 'student_profile', None)
        if profile and profile.current_level:
            return profile.current_level.code
        return None
