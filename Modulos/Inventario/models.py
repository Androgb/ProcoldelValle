from django.db import models
from ..Usuarios.models import Trabajadores
from datetime import datetime

# Create your models here.

#Clase Proveedores
class Proveedores(models.Model):
    codigoProveedor = models.PositiveIntegerField(blank=False, null=False, primary_key=True)
    nombreProveedor = models.CharField(max_length=100)
    telefono = models.PositiveIntegerField()
    direccion = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    ultimaEntrega = models.CharField(max_length=100, null=True, blank=True)

#Clase Categorias
class Categorias(models.Model):
    codigoCategorias = models.PositiveIntegerField(blank=False, null=False, primary_key=True)
    nombreCategoria = models.CharField(max_length=50)
    imagenCategoria = models.ImageField(upload_to='Categorias/', null=True)

#Clase Productos
class Productos(models.Model):
    codigoProducto = models.PositiveIntegerField(blank=False, null=False, primary_key=True)
    nombreProducto = models.CharField(max_length=100)
    descripcionProducto = models.CharField(max_length=1000)
    precioUnidad = models.DecimalField(max_digits=10, decimal_places=1)
    stock = models.PositiveIntegerField()
    proveedor = models.ForeignKey(Proveedores, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categorias, on_delete=models.CASCADE, default="")
    imagen = models.ImageField(upload_to='Productos/', null=True)

#Clase Bodega
class Bodega(models.Model):
    codigoEntrega = models.PositiveIntegerField(blank=False, null=False, primary_key=True)
    proveedor = models.ForeignKey(Proveedores, on_delete=models.CASCADE) #Foreign Key 
    producto = models.ForeignKey(Productos, on_delete=models.CASCADE) 
    cantidad = models.PositiveIntegerField()
    pago = models.DecimalField(max_digits=10, decimal_places=1)
    fecha = models.DateField(default=datetime.now())
    trabajador = models.ForeignKey(Trabajadores, on_delete=models.CASCADE)