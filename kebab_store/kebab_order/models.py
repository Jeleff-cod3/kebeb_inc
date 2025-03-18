from django.db import models

# Create your models here.


class Ingredients(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    
    def __str__(self):
        return f"{self.name}"


class Kebabs(models.Model):
    type_lsit = {
        "B": "Beef",
        "C": "Chicken"
    }
    type = models.CharField(max_length=30, choices=type_lsit)
    ingredients = models.ManyToManyField(Ingredients)
    price = models.FloatField(default=4)  # Store price in the DB

    def save(self, *args, **kwargs):
        """Save the kebab object and update price after saving ingredients."""
        super().save(*args, **kwargs)  # Save first to assign an ID (needed for ManyToMany)
        ingredient_cost = sum(ingredient.price for ingredient in self.ingredients.all())
        self.price = 4 + ingredient_cost
        super().save(update_fields=["price"])  # Save again to update the price
       
       
class Order(models.Model):
    kebabs = models.ManyToManyField(Kebabs)  # Each order can have multiple kebabs
    total_price = models.FloatField(default=0)  # Store total price

    def calculate_total_price(self):
        """Calculate total price from all kebabs in the order."""
        return sum(kebab.price for kebab in self.kebabs.all())

    def save(self, *args, **kwargs):
        """Update total price before saving the order."""
        self.total_price = self.calculate_total_price()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.id} - Total Price: ${self.total_price}"
    
