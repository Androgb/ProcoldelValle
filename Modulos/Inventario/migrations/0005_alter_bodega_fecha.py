# Generated by Django 4.2.1 on 2023-06-18 19:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Inventario', '0004_alter_bodega_fecha_alter_productos_proveedor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bodega',
            name='fecha',
            field=models.DateField(default=datetime.datetime(2023, 6, 18, 14, 22, 8, 287584)),
        ),
    ]