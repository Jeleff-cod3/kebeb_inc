from rest_framework import serializers

from .models import Ingredients, Kebabs, Order


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = ['id', 'name', 'price']


class KebabSerializer(serializers.ModelSerializer):
    ingredients = serializers.PrimaryKeyRelatedField(
        queryset=Ingredients.objects.all(), many=True)

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
    kebabs = KebabSerializer(many=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'kebabs', 'total_price', 'user',]

    def create(self, validated_data):
        kebabs_data = validated_data.pop('kebabs', [])
        user = self.context.get('user')
        # Create order without calling calculate_total_price
        order = Order.objects.create(user=user)

        # Create kebabs and add them to the order
        kebabs_created = []
        for kebab_data in kebabs_data:
            ingredients = kebab_data.pop('ingredients', [])
            kebab = Kebabs.objects.create(**kebab_data)
            kebab.ingredients.set(ingredients)
            kebab.save()
            kebabs_created.append(kebab)

        # Add kebabs to order
        order.kebabs.set(kebabs_created)

        # Now safely calculate total price
        order.total_price = order.calculate_total_price()
        order.save(update_fields=['total_price'])

        return order
