# Generated by Django 4.1.7 on 2023-06-21 20:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Facturacion', '0018_alter_pagos_cliente'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pagos',
            name='caja',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Facturacion.cajas'),
        ),
    ]
