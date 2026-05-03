from decimal import Decimal

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import Level, Module, StudentProfile, StudentProgress

User = get_user_model()


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = ['id', 'code', 'name', 'description', 'order', 'is_active']


class ModuleSerializer(serializers.ModelSerializer):
    level = LevelSerializer(read_only=True)

    class Meta:
        model = Module
        fields = ['id', 'level', 'week_number', 'title', 'subtitle', 'slide_route', 'order', 'is_active']


class StudentProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    level = LevelSerializer(source='current_level', read_only=True)
    last_activity = serializers.SerializerMethodField()

    class Meta:
        model = StudentProfile
        fields = ['id', 'user_id', 'username', 'email', 'level', 'assigned_at', 'is_active', 'last_activity']

    def get_last_activity(self, obj):
        # Get the latest activity from StudentProgress
        latest_progress = StudentProgress.objects.filter(student=obj.user).order_by('-last_activity').first()
        return latest_progress.last_activity if latest_progress else None


class StudentProgressSerializer(serializers.ModelSerializer):
    module = ModuleSerializer(read_only=True)

    class Meta:
        model = StudentProgress
        fields = ['id', 'module', 'completion_percent', 'status', 'last_activity', 'score']


class CreateStudentSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    level_code = serializers.SlugField()

    def validate_email(self, value):
        return value.strip().lower()

    def validate_level_code(self, value):
        if not Level.objects.filter(code=value, is_active=True).exists():
            raise serializers.ValidationError('Level not found.')
        return value

    def validate(self, attrs):
        User = get_user_model()
        email = attrs.get('email')
        username = attrs.get('username')
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({'email': 'Email already exists.'})
        if User.objects.filter(username__iexact=username).exists():
            raise serializers.ValidationError({'username': 'Username already exists.'})
        validate_password(attrs.get('password'))
        return attrs


class StudentUpdateSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(write_only=True, required=False)
    level_code = serializers.SlugField(required=False)
    is_active = serializers.BooleanField(required=False)

    def validate_email(self, value):
        return value.strip().lower()

    def validate_level_code(self, value):
        if not Level.objects.filter(code=value, is_active=True).exists():
            raise serializers.ValidationError('Level not found.')
        return value

    def validate_password(self, value):
        if value:
            validate_password(value)
        return value

    def validate(self, attrs):
        if not attrs:
            raise serializers.ValidationError('At least one field must be provided.')
        
        # Check uniqueness for username/email if provided
        User = get_user_model()
        student_id = self.context.get('student_id')
        
        email = attrs.get('email')
        if email and User.objects.filter(email__iexact=email).exclude(id=student_id).exists():
            raise serializers.ValidationError({'email': 'Email already exists for another user.'})
            
        username = attrs.get('username')
        if username and User.objects.filter(username__iexact=username).exclude(id=student_id).exists():
            raise serializers.ValidationError({'username': 'Username already exists for another user.'})
            
        return attrs


class StudentProgressUpdateSerializer(serializers.Serializer):
    module_id = serializers.IntegerField(required=False)
    level_code = serializers.SlugField(required=False)
    week_number = serializers.IntegerField(required=False, min_value=1, max_value=52)
    completion_percent = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        required=False,
        min_value=Decimal('0'),
        max_value=Decimal('100'),
    )
    status = serializers.ChoiceField(choices=StudentProgress.Status.choices, required=False)
    score = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        required=False,
        min_value=Decimal('0'),
        max_value=Decimal('100'),
    )

    def validate(self, attrs):
        has_module = attrs.get('module_id') is not None
        has_level_week = attrs.get('level_code') is not None and attrs.get('week_number') is not None
        if not has_module and not has_level_week:
            raise serializers.ValidationError('Provide module_id or level_code + week_number.')
        if not any(key in attrs for key in ('completion_percent', 'status', 'score')):
            raise serializers.ValidationError('At least one field must be provided.')
        return attrs
