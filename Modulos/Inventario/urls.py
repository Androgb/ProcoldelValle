from django.urls import path
from . import views

app_name = 'Bodega'

urlpatterns = [
    path('bodega/', views.bodega, name="panel"),
    path('bodega/<codigo>/', views.bodega),
    path('listadoBodega/', views.listadoBodega, name="listado"),
    path('registrarBodega/', views.registrarBodega),
    path('obtener_bodega/<codigo>/', views.obtener_bodega),
    path('eliminarBodega/<codigo>/<url>/', views.eliminarBodega),
    path('editarBodega/<codigo>', views.editarBodega),
    path('bodegaExcel/<fileName>/<directorySelected>/', views.excelBodega),
    path('bodegaPdf/<fileName>/<directorySelected>/', views.pdfBodega),


    path('Productos/', views.productos, name="panelProductos"),
    path('Productos/<codigo>/', views.productos),
    path('listadoProductos/', views.listadoProductos, name="listadoProductos"),
    path('registrarProductos/', views.registrarProducto),
    path('obtener_producto/<codigo>/', views.obtener_producto),
    path('eliminarProducto/<codigo>/<url>/', views.eliminarProducto),
    path('editarProducto/<codigo>', views.editarProducto),
    path('productosExcel/<fileName>/<directorySelected>/', views.excelProductos),
    path('productosPdf/<fileName>/<directorySelected>/', views.pdfProductos),

    path('Proveedores/', views.proveedores, name="panelProveedores"),
    path('Proveedores/<codigo>/', views.proveedores),
    path('listadoProveedores/', views.listadoProveedores, name="listadoProveedores"),
    path('registrarProveedor/', views.registrarProveedor),
    path('obtener_proveedor/<codigo>/', views.obtener_proveedor),
    path('eliminarProveedor/<codigo>/<url>/', views.eliminarProveedor),
    path('editarProveedor/<codigo>', views.editarProveedor),
    path('proveedoresExcel/<fileName>/<directorySelected>/', views.excelProveedores),
    path('proveedoresPdf/<fileName>/<directorySelected>/', views.pdfProveedores),

    path('Categorias/', views.categorias, name="panelCategorias"),
    path('Categorias/<codigo>/', views.categorias),
    path('listadoCategorias/', views.listadoCategorias, name="listadoCategorias"),
    path('registrarCategoria/', views.registrarCategoria),
    path('obtener_categoria/<codigo>/', views.obtener_categoria),
    path('eliminarCategoria/<codigo>/<url>/', views.eliminarCategoria),
    path('editarCategoria/<codigo>', views.editarCategoria),
    path('categoriasExcel/<fileName>/<directorySelected>/', views.excelCategorias),
    path('categoriasPdf/<fileName>/<directorySelected>/', views.pdfCategorias),
]
