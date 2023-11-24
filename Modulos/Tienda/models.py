from django.db import models
from ..Usuarios.models import Clientes
from ..Inventario.models import Productos
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

#Clase Reseñas
class Reseñas(models.Model):

    codigoReseña = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Clientes, on_delete=models.CASCADE) #Foreign Key
    producto = models.ForeignKey(Productos, on_delete=models.CASCADE) #Foreign Key
    reseña = models.CharField(max_length=1000)
    fechaPublicacion = models.DateTimeField()
    valoracionProducto = models.PositiveIntegerField(null=False, blank=False, validators=[
        MaxValueValidator(5),
        MinValueValidator(1)
    ])

#Clase Reseñas
class CarritoCompras(models.Model):
    codigoCarrito = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Clientes, on_delete=models.CASCADE) #Foreign Key
    producto = models.ForeignKey(Productos, on_delete=models.CASCADE) #Foreign Key
    cantidad = models.IntegerField(default=1)
    precioTotal = models.DecimalField(max_digits=10, decimal_places=1, default=0)