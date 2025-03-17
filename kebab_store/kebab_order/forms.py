from django import forms

from .models import Ingredients, Kebabs

class IngredientAddForm(forms.ModelForm):
    model = Ingredients
    fields = "__all__"
    
    
class KebabCreateForm(forms.ModelForm):
    model = Kebabs
    fields = '__all__'