# Generated by Django 4.1.7 on 2023-06-17 22:00

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Usuarios', '0002_clientes_token_clientes_tokenused'),
    ]

    operations = [
        migrations.CreateModel(
            name='Proveedores',
            fields=[
                ('codigoProveedor', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('nombreProveedor', models.CharField(max_length=100)),
                ('telefono', models.PositiveIntegerField()),
                ('direccion', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('ultimaEntrega', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Productos',
            fields=[
                ('codigoProducto', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('nombreProducto', models.CharField(max_length=100)),
                ('descripcionProducto', models.CharField(max_length=1000)),
                ('precioUnidad', models.DecimalField(decimal_places=1, max_digits=10)),
                ('stock', models.PositiveIntegerField()),
                ('imagen', models.ImageField(null=True, upload_to='Productos/')),
                ('descuento', models.PositiveIntegerField()),
                ('proveedor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Inventario.proveedores')),
            ],
        ),
        migrations.CreateModel(
            name='Bodega',
            fields=[
                ('codigoEntrega', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('proveedor', models.CharField(max_length=100)),
                ('producto', models.CharField(max_length=1000)),
                ('cantidad', models.PositiveIntegerField()),
                ('pago', models.DecimalField(decimal_places=1, max_digits=10)),
                ('fecha', models.DateField(default=datetime.datetime(2023, 6, 17, 17, 0, 5, 255536))),
                ('trabajador', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='Usuarios.trabajadores')),
            ],
        ),
    ]
