from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import Grade, Module, StudentProgress, TeacherGrade

User = get_user_model()


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['id', 'code', 'name', 'description', 'order', 'is_active']


class ModuleSerializer(serializers.ModelSerializer):
    grade = GradeSerializer(read_only=True)

    class Meta:
        model = Module
        fields = [
            'id', 'grade', 'week_number', 'title', 'subtitle', 'slide_route',
            'period', 'dba_number', 'dba_text', 'order', 'is_active',
        ]


class TeacherGradeSerializer(serializers.ModelSerializer):
    grade = GradeSerializer(read_only=True)

    class Meta:
        model = TeacherGrade
        fields = ['grade']


class TeacherAccountSerializer(serializers.ModelSerializer):
    grades = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'grades', 'is_active', 'date_joined']

    def get_grades(self, obj):
        return list(
            TeacherGrade.objects.filter(teacher=obj)
            .select_related('grade')
            .values_list('grade__code', flat=True)
        )


class CreateTeacherSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    grade_codes = serializers.ListField(
        child=serializers.SlugField(), min_length=1, allow_empty=False
    )

    def validate_email(self, value):
        return value.strip().lower()

    def validate_grade_codes(self, value):
        unique = list(dict.fromkeys(value))
        if not Grade.objects.filter(code__in=unique, is_active=True).count() == len(unique):
            raise serializers.ValidationError('One or more grades were not found.')
        return unique

    def validate(self, attrs):
        email = attrs.get('email')
        username = attrs.get('username')
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({'email': 'Email already exists.'})
        if User.objects.filter(username__iexact=username).exists():
            raise serializers.ValidationError({'username': 'Username already exists.'})
        validate_password(attrs.get('password'))
        return attrs


class TeacherUpdateSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(write_only=True, required=False)
    grade_codes = serializers.ListField(
        child=serializers.SlugField(), required=False, allow_empty=False
    )
    is_active = serializers.BooleanField(required=False)

    def validate_email(self, value):
        return value.strip().lower()

    def validate_grade_codes(self, value):
        unique = list(dict.fromkeys(value))
        if not Grade.objects.filter(code__in=unique, is_active=True).count() == len(unique):
            raise serializers.ValidationError('One or more grades were not found.')
        return unique

    def validate_password(self, value):
        if value:
            validate_password(value)
        return value

    def validate(self, attrs):
        if not attrs:
            raise serializers.ValidationError('At least one field must be provided.')

        teacher_id = self.context.get('teacher_id')
        email = attrs.get('email')
        if email and User.objects.filter(email__iexact=email).exclude(id=teacher_id).exists():
            raise serializers.ValidationError({'email': 'Email already exists for another user.'})
        username = attrs.get('username')
        if username and User.objects.filter(username__iexact=username).exclude(id=teacher_id).exists():
            raise serializers.ValidationError({'username': 'Username already exists for another user.'})
        return attrs


class ModuleProgressUpdateSerializer(serializers.Serializer):
    module_id = serializers.IntegerField(required=False)
    grade_code = serializers.SlugField(required=False)
    week_number = serializers.IntegerField(required=False, min_value=1, max_value=52)
    completion_percent = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        required=False,
        min_value=0,
        max_value=100,
    )
    status = serializers.ChoiceField(choices=StudentProgress.Status.choices, required=False)
    score = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        required=False,
        min_value=0,
        max_value=100,
    )

    def validate(self, attrs):
        has_module = attrs.get('module_id') is not None
        has_grade_week = attrs.get('grade_code') is not None and attrs.get('week_number') is not None
        if not has_module and not has_grade_week:
            raise serializers.ValidationError('Provide module_id or grade_code + week_number.')
        if not any(key in attrs for key in ('completion_percent', 'status', 'score')):
            raise serializers.ValidationError('At least one field must be provided.')
        return attrs


class ModuleProgressSerializer(serializers.ModelSerializer):
    module = ModuleSerializer(read_only=True)

    class Meta:
        model = StudentProgress
        fields = ['id', 'module', 'completion_percent', 'status', 'last_activity', 'score']
