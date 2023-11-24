from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

# Choices - Estado de Compra
ESTADO_COMPRA_CHOICES = [
    ("PENDIENTE", "Esperando Entrega"),
    ("RECIBIDO", "Entregado y Recibido")
]



class Cajas(models.Model):
    codigoCaja = models.PositiveIntegerField()
    numeroCaja = models.PositiveIntegerField()
    Estado = models.CharField(max_length=20)
    Efectivo = models.PositiveIntegerField()

class Pagos(models.Model):
    codigoFactura = models.AutoField(blank=False, null=False, primary_key=True)
    caja = models.ForeignKey(Cajas, on_delete=models.CASCADE, null=True, blank=True)
    cliente = models.ForeignKey('Usuarios.Clientes', on_delete=models.CASCADE, null=True, blank=True)
    fechaPedido = models.DateTimeField()
    precioTotal = models.DecimalField(max_digits=10, decimal_places=1, null=True, blank=True)
    metodoPago = models.CharField(max_length=100, null=True, blank=True)

class ProductoCompra(models.Model):
    codigoProductoCompra = models.AutoField(primary_key=True, default=0)
    pago = models.ForeignKey(Pagos, related_name='productocompra_set', on_delete=models.CASCADE)
    producto = models.ForeignKey('Inventario.Productos', on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=1, default=0)

class Ordenes(models.Model):
    codigoOrden = models.AutoField(primary_key=True)
    cliente = models.ForeignKey('Usuarios.Clientes', on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=1, default=0)
    metodoPago = models.CharField(max_length=100, default="")
    fechaCreacion = models.DateTimeField()
    estado = models.CharField(max_length=100, default="")

class Movimientos(models.Model):
    codigoMovimiento = models.PositiveIntegerField(primary_key=True)
    Caja = models.ForeignKey('Cajas', on_delete=models.CASCADE)
    Movimiento = models.CharField(max_length=20)
    Efectivo = models.PositiveIntegerField()
    Motivo = models.CharField(max_length=100)
    fecha = models.CharField(max_length=15, default=1)

class Compras(models.Model):
    codigoCompra = models.PositiveIntegerField(primary_key=True)
    trabajador = models.ForeignKey('Usuarios.Trabajadores', on_delete=models.CASCADE)
    servicio = models.CharField(max_length=20)
    descripcion = models.CharField(max_length=100)
    caja = models.ForeignKey(Cajas, on_delete=models.CASCADE, null=True, blank=True)
    Gasto = models.IntegerField()
    fecha = models.CharField(max_length=100, default=1)
    comprobante = models.ImageField(upload_to='Comprobante/', null=True)