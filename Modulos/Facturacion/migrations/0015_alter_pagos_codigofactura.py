# Generated by Django 4.1.7 on 2023-06-21 16:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Facturacion', '0014_remove_pagos_cantidad_remove_pagos_domiciliario_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pagos',
            name='codigoFactura',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
