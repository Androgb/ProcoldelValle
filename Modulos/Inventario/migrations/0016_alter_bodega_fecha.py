# Generated by Django 4.2.1 on 2023-06-20 02:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Inventario', '0015_alter_bodega_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bodega',
            name='fecha',
            field=models.DateField(default=datetime.datetime(2023, 6, 19, 21, 5, 1, 967850)),
        ),
    ]
