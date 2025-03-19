from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, permissions
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import login

import threading

from .serializers import UserRegisterSerializer, UserSerializer, UserRegisterSerializer1

class EmailVerificationView(APIView):
    def get(self, request, uidb64, token):
        try:
            # Decode the UID and fetch the user
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
            
            # Check the token
            if default_token_generator.check_token(user, token):
                # Activate the user and log them in
                user.is_active = True
                user.save()

                # Optionally, log the user in
                login(request, user)

                return Response({"detail": "Email verified successfully."}, status=status.HTTP_200_OK)

            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

class CheckEmailVerificationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Check if the user's email is verified
        user = request.user
        return Response({'is_verified': user.is_active})


class SignUpView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer1
    
    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            if response.status_code == 201:
                return Response({
                    "detail": "User created successfully. Please check your email for verification."
                }, status=status.HTTP_201_CREATED)
            return response
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
        
    
class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = User.objects.filter(username=username).first()
        
        if user and user.check_password(password):
            if not user.is_active:
                return Response({"detail": "Your email is not verified. Please verify your email address."}, status=status.HTTP_400_BAD_REQUEST)
            
            # If user is active, issue tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
            })
        
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    

class UserProfileView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    

class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer