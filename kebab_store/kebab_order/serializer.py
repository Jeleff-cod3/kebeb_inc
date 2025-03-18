from rest_framework import serializers

from .models import Ingredients, Kebabs, Order

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = ['id', 'name', 'price']

class KebabSerializer(serializers.ModelSerializer):
    ingredients = serializers.PrimaryKeyRelatedField(queryset=Ingredients.objects.all(), many=True)

    class Meta:
        model = Kebabs
        fields = ['id', 'type', 'ingredients', 'price']

    def create(self, validated_data):
        """Create a kebab and calculate its price."""
        ingredients = validated_data.pop('ingredients', [])
        kebab = Kebabs.objects.create(**validated_data)
        kebab.ingredients.set(ingredients)  # Assign ingredients
        kebab.save()  # Save to update price
        return kebab

class OrderSerializer(serializers.ModelSerializer):
    kebabs = KebabSerializer(many=True)  # Allow creating kebabs inside the order

    class Meta:
        model = Order
        fields = ['id', 'kebabs', 'total_price', 'user']

    def create(self, validated_data):
        """Create an order with kebabs."""
        kebabs_data = validated_data.pop('kebabs', [])  # Extract kebab data
        order = Order.objects.create()  # Create order first

        # Create kebabs and add them to the order
        for kebab_data in kebabs_data:
            ingredients = kebab_data.pop('ingredients', [])
            kebab = Kebabs.objects.create(**kebab_data)
            kebab.ingredients.set(ingredients)
            kebab.save()
            order.kebabs.add(kebab)

        # Update order's total price
        order.total_price = order.calculate_total_price()
        order.save()
        return order