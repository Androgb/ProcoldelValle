from django.urls import path
from . import views

app_name = 'Tienda'

urlpatterns = [
    path('registrarReseña/', views.registrarReseña),
    path('obtener_reseña/<codigo>/', views.obtener_reseña),
    path('editarReseña/<codigo>', views.editarReseña),
    path('eliminarReseña/<codigo>/<url>/<codigoProducto>/', views.eliminarReseña),

    path('añadirCarrito/', views.añadirCarrito),
    path('actualizarCarrito/<codigo>/<cedula>', views.actualizarCarrito),
    path('eliminarCarrito/<codigo>/<url>', views.eliminarCarrito),

    path('crearOrden/', views.crearOrden),
]
