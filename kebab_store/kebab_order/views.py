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


class KebabList(APIView):
    def get(self, request):
        kebabs = Kebabs.objects.all()
        serializer = KebabSerializer(kebabs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = KebabSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """Delete all kebabs in the database"""
        deleted_count, _ = Kebabs.objects.all().delete()
        return Response(
            {"message": f"Deleted {deleted_count} kebabs successfully"},
            status=status.HTTP_204_NO_CONTENT
        )
 
    
class CreateIngredientView(CreateAPIView):
    model = Ingredients
    form_class = IngredientAddForm
    serializer_class = IngredientsSerializer
    
    
class IngredientsListView(ListAPIView):
    queryset = Ingredients.objects.all()
    serializer_class = IngredientsSerializer
    
class KebabCreateView(CreateAPIView):
    serializer_class = KebabSerializer
    
    def perform_create(self, serializer):
        """Save the kebab object and update its price after saving ingredients."""
        kebab = serializer.save()  # Save the new kebab instance
        ingredient_cost = sum(ingredient.price for ingredient in kebab.ingredients.all())
        kebab.price = 4 + ingredient_cost  # Update price
        kebab.save(update_fields=["price"])  # Save the updated price
    
