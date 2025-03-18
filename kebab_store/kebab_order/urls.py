from django.urls import path
from . import views

urlpatterns = [
    path('kebab-list', views.KebabList.as_view()),
    path('ingredients-add', views.CreateIngredientView.as_view()),
    path('ingredients-list', views.IngredientsListView.as_view()),
    path('kebab-add', views.KebabCreateView.as_view()),
    path('kebab', views.KebabView.as_view()),
    path('order-create', views.OrderCreateView.as_view()),
    path('order-list', views.OrderListView.as_view())
]