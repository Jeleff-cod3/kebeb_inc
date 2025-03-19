from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email',
                  'first_name', 'last_name']


class UserRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Create the user but set is_active to False initially
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=False  # User will be inactive until they verify their email
        )

        # Send the verification email
        self.send_verification_email(user)

        return user

    def send_verification_email(self, user):
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(str(user.pk).encode()).decode()

        # Construct the URL for email verification
        verification_url = reverse('verify_email', kwargs={'uidb64': uid, 'token': token})
        full_url = f"{settings.SITE_URL}{verification_url}"

        # Send the email
        subject = 'Verify Your Email Address'
        message = f"Click the link below to verify your email address:\n{full_url}"
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])

class UserRegisterSerializer1(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Create the user but set is_active to False initially
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=False  # User will be inactive until they verify their email
        )

        # Send the verification email
        self.send_verification_email(user)

        return user

    def send_verification_email(self, user):
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(str(user.pk).encode()).decode()

        # Construct the URL for email verification
        verification_url = reverse('verify_email', kwargs={'uidb64': uid, 'token': token})
        full_url = f"{settings.SITE_URL}{verification_url}"

        # Send the email
        subject = 'Verify Your Email Address'
        message = f"Click the link below to verify your email address:\n{full_url}"
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])
