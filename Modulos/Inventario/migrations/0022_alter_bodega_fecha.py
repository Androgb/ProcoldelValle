# Generated by Django 4.2.1 on 2023-06-20 22:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Inventario', '0021_alter_bodega_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bodega',
            name='fecha',
            field=models.DateField(default=datetime.datetime(2023, 6, 20, 17, 53, 7, 915787)),
        ),
    ]