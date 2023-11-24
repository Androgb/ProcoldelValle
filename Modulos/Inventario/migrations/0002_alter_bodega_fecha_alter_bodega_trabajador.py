# Generated by Django 4.1.7 on 2023-06-17 22:01

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Usuarios', '0002_clientes_token_clientes_tokenused'),
        ('Inventario', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bodega',
            name='fecha',
            field=models.DateField(default=datetime.datetime(2023, 6, 17, 17, 1, 21, 795598)),
        ),
        migrations.AlterField(
            model_name='bodega',
            name='trabajador',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Usuarios.trabajadores'),
        ),
    ]