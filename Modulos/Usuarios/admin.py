from django.contrib import admin
from .models import *

#Modificamos la clase Clientes y personalizamos los campos

class ClientesAdmin(admin.ModelAdmin):
    list_display = ('cedula', 'nombreCompleto', 'contraseña')
    search_fields = ('name', 'description')

admin.site.register(Clientes, ClientesAdmin)
admin.site.register(Trabajadores)


