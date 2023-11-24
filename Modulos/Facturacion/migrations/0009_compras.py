# Generated by Django 4.2.1 on 2023-06-20 22:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Usuarios', '0004_clientes_telefono'),
        ('Facturacion', '0008_movimientos'),
    ]

    operations = [
        migrations.CreateModel(
            name='Compras',
            fields=[
                ('codigoCompra', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('servicio', models.CharField(max_length=20)),
                ('descripcion', models.CharField(max_length=100)),
                ('Gasto', models.IntegerField()),
                ('trabajador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Usuarios.trabajadores')),
            ],
        ),
    ]