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
    
    price = 4