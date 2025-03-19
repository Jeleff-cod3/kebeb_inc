from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, permissions
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage, get_connection
from django.contrib.auth.models import User
from django.utils.encoding import force_bytes
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from django.core.signing import Signer, BadSignature
from .serializers import UserSerializer,SignUpSerializer
from django.conf import settings  # ✅ Import Django settings


UserPishki = get_user_model()

class UserLoginView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to login
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = User.objects.filter(username=username).first()
        
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
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


class SendVerificationEmailView(APIView):
    permission_classes = [AllowAny]  # Allow anonymous access
    
    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            # ✅ Use Django's signing for the token
            signer = Signer()
            token = signer.sign(email)

            # ✅ Encode email for URL
            uid = urlsafe_base64_encode(force_bytes(email))

            # ✅ Construct the verification link (Removed password for security)
            verification_link = f"http://{get_current_site(request).domain}/auth/verify/{uid}/{token}/{username}/"

            connection = get_connection(
                backend="django.core.mail.backends.smtp.EmailBackend",
                host=settings.EMAIL_HOST,  # ✅ Use settings.py
                port=settings.EMAIL_PORT,
                username=settings.EMAIL_HOST_USER,
                password=settings.EMAIL_HOST_PASSWORD,
                use_tls=settings.EMAIL_USE_TLS,
            )


            email_message = EmailMessage(
                "Verify your email",
                f"Click this link to verify your account: {verification_link}",
                settings.EMAIL_HOST_USER,
                [email],
                connection=connection,
            )
            email_message.send()

            return Response({"message": "Verification email sent!"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    permission_classes = [AllowAny]  # Allow anonymous access

    def get(self, request, uidb64, token, username):
        try:
            email = urlsafe_base64_decode(uidb64).decode()

            # ✅ Verify the token
            signer = Signer()
            verified_email = signer.unsign(token)  # Raises BadSignature if invalid

            if verified_email != email:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

            # ✅ Create & activate the user after verification
            user = UserPishki.objects.create_user(username=username, email=email)
            user.is_active = True
            user.save()

            # ✅ Redirect to frontend login
            return redirect("http://localhost:3000/login")

        except BadSignature:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": f"Verification failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
