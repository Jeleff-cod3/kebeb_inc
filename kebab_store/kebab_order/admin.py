from django.contrib import admin
from .models import Kebabs, Type, Ingredients

# Register your models here.

admin.site.register(Kebabs)
admin.site.register(Ingredients)
admin.site.register(Type)