from rest_framework import serializers

from .models import Kebabs, Ingredients

class KebabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kebabs
        fields = '__all__'
        

class IngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = '__all__'