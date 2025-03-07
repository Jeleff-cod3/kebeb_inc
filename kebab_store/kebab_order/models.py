from django.db import models

# Create your models here.

class Type(models.Model):
    type = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.type}"
    


class Ingredients(models.Model):
    name = models.CharField(max_length=50)
    used = models.BooleanField(default=False)
    price = models.FloatField()

    def __str__(self):
        return f"{self.name}"


class Kebabs(models.Model):
    type = models.ForeignKey(Type, on_delete=models.CASCADE, null=True, related_name="kebab")
    ingredients = models.ManyToManyField(Ingredients)
    price = 4

    def __str__(self):
        return f"{self.type}"
    


    