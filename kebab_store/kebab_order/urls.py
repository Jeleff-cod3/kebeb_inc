from django.urls import path
from . import views

urlpatterns = [
    path('api/kebab-list', views.KebabListView.as_view()),
    path('api/ingredients-add', views.CreateIngredientView.as_view()),
    path('api/ingredients-list', views.IngredientsListView.as_view()),
    path('api/kebab-add', views.KebabCreateView.as_view()),
    path('api/kebab', views.KebabView.as_view())
]