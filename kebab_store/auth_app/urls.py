from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path("sign-up", views.SignUpView.as_view()),
    path("log-in", views.UserLoginView.as_view()),
    path("profile", views.UserProfileView.as_view()),
    path("users", views.UserList.as_view()),
    # URL for obtaining JWT access and refresh tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # URL for refreshing the JWT token using the refresh token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]