from django.db import models

#Clase Trabajadores
class Trabajadores(models.Model):
    cedula = models.PositiveIntegerField(blank=False, null=False, primary_key=True)
    nombreCompleto = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)
    telefono = models.PositiveIntegerField()
    direccion = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    contraseña = models.CharField(max_length=100)
    fotoPerfil = models.ImageField(upload_to='Avatars/Trabajadores', null=True)

    def __str__(self):
        return self.nombreCompleto
        
class Clientes(models.Model):
    cedula = models.PositiveIntegerField(blank=False, null=False, primary_key=True)
    nombreCompleto = models.CharField(max_length=100)
    direccion = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    telefono = models.PositiveIntegerField(default=0)
    contraseña = models.CharField(max_length=100)
    fotoPerfil = models.ImageField(upload_to='Avatars/Usuarios', null=True)
    token = models.CharField(max_length=100, null=True)
    tokenUsed = models.BooleanField(default=False)

    def __str__(self):
        return self.nombreCompleto