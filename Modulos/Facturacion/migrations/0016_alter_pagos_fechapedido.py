# Generated by Django 4.1.7 on 2023-06-21 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Facturacion', '0015_alter_pagos_codigofactura'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pagos',
            name='fechaPedido',
            field=models.DateTimeField(),
        ),
    ]
