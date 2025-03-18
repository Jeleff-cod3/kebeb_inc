from django.urls import path
from . import views

urlpatterns = [
    path('api/kebab-list', views.KebabList.as_view()),
    path('api/ingredients-add', views.CreateIngredientView.as_view()),
    path('api/ingredients-list', views.IngredientsListView.as_view()),
    path('api/kebab-add', views.KebabCreateView.as_view()),
    path('api/kebab', views.KebabView.as_view()),
    path('api/order-create', views.OrderCreateView.as_view()),
    path('api/order-list', views.OrderListView.as_view())
]