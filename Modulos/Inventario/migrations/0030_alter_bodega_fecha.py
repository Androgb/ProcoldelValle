# Generated by Django 4.1.7 on 2023-06-21 17:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Inventario', '0029_alter_bodega_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bodega',
            name='fecha',
            field=models.DateField(default=datetime.datetime(2023, 6, 21, 12, 0, 30, 234532)),
        ),
    ]
