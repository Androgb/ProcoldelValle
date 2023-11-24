from django.urls import path
from . import views

app_name = 'Usuarios'

urlpatterns = [

    #Usuarios
    path('registrarse/', views.registrarUsuario),
    path('iniciarSesion/', views.login),
    path('iniciarSesionTrabajador/', views.loginTrabajador),
    path('logout/', views.cerrarSesion, name="logout"),
    path('sendEmail/', views.sendEmail),
    path('resetPasswordComplete/', views.resetPasswordComplete),

    #Trabajadores
    path('actualizarInformacion/', views.actualizarInformacion),
    path('resetPasswordTrabajador/', views.resetPasswordTrabajador),
    path('actualizarFoto/', views.actualizarFoto),
    path('trabajadores/', views.trabajadores, name="panelTrabajadores"),
    path('trabajadores/<cedula>/', views.trabajadores),
    path('listadoTrabajadores/', views.listadoTrabajadores, name="listadoTrabajadores"),
    path('obtener_trabajador/<cedula>/', views.obtener_trabajador),
    path('registrarTrabajador/', views.registrarTrabajador),
    path('editarTrabajador/<cedula>', views.editarTrabajador),
    path('eliminarTrabajador/<cedula>/<url>/', views.eliminarTrabajador),
    path('trabajadoresExcel/<fileName>/<directorySelected>/', views.excelTrabajadores),
    path('trabajadoresPdf/<fileName>/<directorySelected>/', views.pdfTrabajadores),
]
