# Generated by Django 4.1.7 on 2023-06-19 13:59

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Inventario', '0007_rename_cantidad_bodega_cantidadproducto_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bodega',
            old_name='cantidadProducto',
            new_name='cantidad',
        ),
        migrations.AlterField(
            model_name='bodega',
            name='fecha',
            field=models.DateField(default=datetime.datetime(2023, 6, 19, 8, 59, 27, 309501)),
        ),
        migrations.AlterField(
            model_name='bodega',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Inventario.productos'),
        ),
        migrations.AlterField(
            model_name='bodega',
            name='proveedor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Inventario.proveedores'),
        ),
    ]