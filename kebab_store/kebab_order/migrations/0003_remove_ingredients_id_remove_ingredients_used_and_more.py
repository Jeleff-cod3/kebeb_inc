# Generated by Django 5.1.7 on 2025-03-17 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kebab_order', '0002_remove_kebabs_ingredients_remove_kebabs_type_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ingredients',
            name='id',
        ),
        migrations.RemoveField(
            model_name='ingredients',
            name='used',
        ),
        migrations.AlterField(
            model_name='ingredients',
            name='id',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
    ]
