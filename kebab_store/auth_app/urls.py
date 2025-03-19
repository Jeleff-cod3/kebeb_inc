from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import GoogleLoginView
from kebab_order.views import OrderListView

from . import views

urlpatterns = [
    path("log-in", views.UserLoginView.as_view()),
    path("profile", views.UserProfileView.as_view()),
    path("users", views.UserList.as_view()),

    path("api/orders/", OrderListView.as_view(), name="order_list"),

    # URL for obtaining JWT access and refresh tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # URL for refreshing the JWT token using the refresh token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #verify email
    path("sign-up/", views.SendVerificationEmailView.as_view(), name="send_verification_email"),
    path("verify/<uidb64>/<token>/<username>/<password>", views.VerifyEmailView.as_view(), name="verify_email"),
    path('google-login/', GoogleLoginView.as_view(), name="google_login"),
    path('auth/', include('dj_rest_auth.urls')),  # Login, Logout, Password Reset
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # Registration
    path('auth/social/', include('allauth.socialaccount.urls')),  # Social login
]