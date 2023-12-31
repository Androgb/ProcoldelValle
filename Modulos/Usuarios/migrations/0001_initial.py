# Generated by Django 4.1.7 on 2023-05-19 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Clientes',
            fields=[
                ('cedula', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('nombreCompleto', models.CharField(max_length=100)),
                ('direccion', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('contraseña', models.CharField(max_length=100)),
                ('fotoPerfil', models.ImageField(null=True, upload_to='Avatars/Usuarios')),
                ('carritoCompras', models.CharField(max_length=1000, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Trabajadores',
            fields=[
                ('cedula', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('nombreCompleto', models.CharField(max_length=100)),
                ('cargo', models.CharField(max_length=100)),
                ('telefono', models.PositiveIntegerField()),
                ('direccion', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('contraseña', models.CharField(max_length=100)),
                ('fotoPerfil', models.ImageField(null=True, upload_to='Avatars/Trabajadores')),
            ],
        ),
    ]
