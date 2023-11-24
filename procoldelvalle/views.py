from django.shortcuts import render, redirect
from Modulos.Facturacion.models import *
from Modulos.Inventario.models import *
from Modulos.Usuarios.models import *
from datetime import date, timedelta
from django.db.models import *
from django.db.models.functions import *
from decimal import Decimal
from collections import Counter
#Home
def home(request):
    return render(request, "home/index.html")

#Login
def login(request):
    return render(request, "home/login.html")

#Dashboard
def dashboard(request):
    cantidadClientes = Clientes.objects.count()
    cantidadProveedores = Proveedores.objects.count()
    cantidadProductos = Productos.objects.count()
    cantidadPagos = Pagos.objects.count()

    today = datetime.today()
    last_month = today - timedelta(days=30)
    six_months_ago = today - timedelta(days=3650)

    pagos_data = Pagos.objects.filter(fechaPedido__gte=six_months_ago, fechaPedido__lte=today)

    meses_pagos = [p.fechaPedido.month for p in pagos_data]
    pagos_por_mes = Counter(meses_pagos)
    
    labels = 0
    data = [pagos_por_mes.get(month, 0) for month in range(1, 13)]

    datos = Pagos.objects.filter(fechaPedido__gte=last_month, fechaPedido__lte=today)

    # Calcular el porcentaje, cantidad de veces y monto total por producto
    productos_porcentaje = ProductoCompra.objects.filter(pago__in=datos).values('producto__nombreProducto').annotate(
    porcentaje=(Count('producto') * 100) / cantidadPagos,
    cantidad=Count('producto'),
    monto_total=Sum('subtotal') * Decimal('1.19')
    ).order_by('-cantidad')

    # Obtener los 10 productos más vendidos con sus imágenes
    productos_mas_vendidos = productos_porcentaje[:10].annotate(
    ).values('producto__nombreProducto', 'cantidad', 'monto_total', 'porcentaje')

    # Formatear el porcentaje y el monto total con puntos separadores de miles
    for producto in productos_porcentaje:
        producto['porcentaje'] = '{:,.2f}'.format(producto['porcentaje']).replace(',', '.').replace('.', ',')
        producto['monto_total'] = '{:,.2f}'.format(producto['monto_total']).replace(',', '.').replace('.', ',')

    sumaPreciosTotal = datos.aggregate(total=Sum('precioTotal'))['total']
    sumaPreciosTotal = '{:,.2f}'.format(sumaPreciosTotal).replace(',', '.').replace('.', ',')

    return render(request, "pages/dashboard.html", {
        'Clientes': cantidadClientes,
        'Proveedores': cantidadProveedores,
        'Productos': cantidadProductos,
        'Total': sumaPreciosTotal,
        'Ventas': datos,
        'ProductosPorcentaje': productos_porcentaje,
        'ProductosMasVendidos': productos_mas_vendidos,
        'labels':labels,
        'data':data
    })

#Perfil
def perfil(request):
    return render(request, "pages/profile.html")
#Login
def restaurarContraseña(request, cedula, token):
    return render(request, "home/restaurarContraseña.html")