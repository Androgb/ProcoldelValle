# Generated by Django 4.1.7 on 2023-06-19 18:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Inventario', '0009_categorias_alter_bodega_fecha'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productos',
            name='descuento',
        ),
        migrations.AlterField(
            model_name='bodega',
            name='fecha',
            field=models.DateField(default=datetime.datetime(2023, 6, 19, 13, 49, 28, 823990)),
        ),
    ]
