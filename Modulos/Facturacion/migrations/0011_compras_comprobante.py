# Generated by Django 4.2.1 on 2023-06-20 23:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Facturacion', '0010_compras_fecha'),
    ]

    operations = [
        migrations.AddField(
            model_name='compras',
            name='comprobante',
            field=models.ImageField(null=True, upload_to='Comprobante/'),
        ),
    ]
