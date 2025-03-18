from django.urls import path

from . import views

urlpatterns = [
    path("sign-up", views.SignUpView.as_view()),
    path("log-in", views.UserLoginView.as_view()),
    path("profile", views.UserProfileView.as_view())
]