from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Kebabs, Ingredients
from .serializer import KebabSerializer, IngredientsSerializer
from .forms import IngredientAddForm

# Create your views here.

class KebabView(APIView):
    premission_classes = [AllowAny]
    
    def post(self, request):
        serializer = KebabSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Kebab made successfully!", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class KebabListView(ListAPIView):
    queryset = Kebabs.objects.all()
    serializer_class = KebabSerializer
 
    
class CreateIngredientView(CreateAPIView):
    model = Ingredients
    form_class = IngredientAddForm
    serializer_class = IngredientsSerializer
    
    
class IngredientsListView(ListAPIView):
    queryset = Ingredients.objects.all()
    serializer_class = IngredientsSerializer
    
class KebabCreateView(CreateAPIView):
    serializer_class = KebabSerializer
    
