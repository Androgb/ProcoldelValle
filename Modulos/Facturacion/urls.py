from django.urls import path
from . import views

app_name = 'Facturacion'

urlpatterns = [
    path('shop/', views.shop),
    path('contacto/', views.contacto),
    path('carrito/', views.carrito),
    path('detalleProducto/<codigo>', views.productDetail),
    path('perfilUsuarios/', views.perfilUsuarios),
    path('actualizarFotoUsuarios/', views.actualizarFotoUsuarios),
    path('actualizarInformacionUsuario/', views.actualizarInformacionUsuario),


    path('Ordenes/', views.ordenes, name="ordenes"),
    path('obtener_orden/<codigo>/', views.obtener_orden),
    path('editarOrden/<codigo>', views.editarOrden),
    path('ordenesExcel/<fileName>/<directorySelected>/', views.excelOrdenes),
    path('ordenesPdf/<fileName>/<directorySelected>/', views.pdfOrdenes),

    path('Ventas/', views.ventas, name="venta"),
    path('Ventas/<codigoVenta>/', views.ventas, name="venta"),
    path('eliminarVenta/<codigo>/<url>/', views.eliminarVenta),
    path('actualizarPago/<codigoFactura>/', views.actualizarVenta),
    path('agregarProductoCompra/<codigo>/<codigoFactura>/', views.agregarProductoCompra),
    path('actualizarProductoCompra/<codigoProductoCompra>/', views.actualizarProductoCompra),
    path('eliminarProductoCompra/<codigoProductoCompra>/', views.eliminarProductoCompra),
    path('listadoVentas/', views.listadoVentas, name="facturas"),
    path('obtener_venta/<codigo>/', views.obtener_venta),
    path('ventaIndividualPdf/<codigo>/', views.pdfVentasIndividual),
    path('ventasPdf/<fileName>/<directorySelected>/', views.pdfVentas),
    path('ventasExcel/<fileName>/<directorySelected>/', views.excelVentas),

    path('Cajas1/', views.cajas, name="panelCajas"),
    path('Cajas/', views.cajas1, name="cajas"),
    path('Cajas/<codigo>/', views.cajas1),
    path('listadoCajas/', views.listadoCajas, name="listadoCajas"),
    path('registrarCaja/', views.registrarCaja),
    path('obtener_caja/<codigo>/', views.obtener_caja),
    path('eliminarCaja/<codigo>/<url>/', views.eliminarCaja),
    path('editarCaja/<codigo>/', views.editarCaja),
    path('cajasExcel/<fileName>/<directorySelected>/', views.excelCajas),
    path('cajasPdf/<fileName>/<directorySelected>/', views.pdfCajas),

    path('Movimientos/', views.movimientos, name="panelMovimientos"),
    path('Movimientos/<codigo>/', views.movimientos),
    path('listadoMovimientos/', views.listadoMovimientos, name="listadoMovimientos"),
    path('registrarMovimientos/', views.registrarMovimientos),
    path('obtener_movimientos/<codigo>/', views.obtener_movimientos),
    path('eliminarMovimientos/<codigo>/<url>/', views.eliminarMovimientos),
    path('editarMovimiento/<codigo>/', views.editarMovimiento),
    path('movimientosExcel/<fileName>/<directorySelected>/', views.excelMovimientos),
    path('movimientosPdf/<fileName>/<directorySelected>/', views.pdfMovimientos),

    path('Compras/', views.compras, name="panelCompras"),
    path('Compras/<codigo>/', views.compras),
    path('listadoCompras/', views.listadoCompras, name="listadoCompras"),
    path('registrarCompra/', views.registrarCompra),
    path('obtener_compra/<codigo>/', views.obtener_compra),
    path('eliminarCompra/<codigo>/<url>/', views.eliminarCompra),
    path('editarCompra/<codigo>/', views.editarCompra),
    path('comprasExcel/<fileName>/<directorySelected>/', views.excelCompras),
    path('comprasPdf/<fileName>/<directorySelected>/', views.pdfCompras),
    
]
 