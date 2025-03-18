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
    pass
    
