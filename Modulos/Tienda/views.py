from django.shortcuts import render, redirect, get_object_or_404
from ..Usuarios.models import Clientes
from ..Inventario.models import Productos
from ..Facturacion.models import Ordenes
from django.http import JsonResponse
from .models import *
from datetime import datetime
from django.conf import settings
import decimal
import yagmail
import os

emailFromAccount='procoldelvalleweb@gmail.com'
passwordFromAccount = 'wuubqrfjkefnycyp'

yag = yagmail.SMTP(user=emailFromAccount, password=passwordFromAccount)

# Create your views here.

#RESEÑAS
def registrarReseña(request):
    if request.method == 'POST':
        rating = request.POST['rating']
        codigoProducto = request.POST['codigoProductoReseña']
        cedula = request.session.get('Cedula')
        reseña = request.POST['review']
        fecha = datetime.now()
        
        producto = Productos.objects.get(codigoProducto=int(codigoProducto))
        cliente = Clientes.objects.get(cedula=int(cedula))

        reseña = Reseñas.objects.create(
            codigoReseña = None,
            cliente = cliente,
            producto = producto, 
            reseña = reseña,
            fechaPublicacion = fecha,
            valoracionProducto = rating,
        )
        
        return redirect('/detalleProducto/' + codigoProducto)    
    else:
        return redirect('/')

def obtener_reseña(request, codigo):
    if request.method == 'GET':
        #Obtiene el elemento de la tabla Trabajadores que coincida con la cedula
        reseña = get_object_or_404(Reseñas, codigoReseña=codigo)
        data = {
            'rating': reseña.valoracionProducto,
            'reseña': reseña.reseña,
        }
        return JsonResponse({'data': data})

def editarReseña(request, codigo):

    registro = Reseñas.objects.get(codigoReseña=int(codigo))

    if request.method == 'POST':

        #Obtener los datos del formulario

        codigoProducto = request.POST['codigoProductoReseña']
        rating = request.POST['rating']
        reseña = request.POST['review']
        fecha = datetime.now()

        registro.valoracionProducto = rating
        registro.reseña = reseña
        registro.fechaPublicacion = fecha

        registro.save()

        return redirect('/detalleProducto/' + codigoProducto)

def eliminarReseña(request, codigo, url, codigoProducto):

    #Elimina la reseña

    registro = Reseñas.objects.get(codigoReseña=int(codigo))

    registro.delete()

    #Verificamos la url a la que redirige
    return redirect(f'/{url}/'+codigoProducto)

#CARRITO

def añadirCarrito(request):
    if request.method == 'POST':
        codigoProducto = request.POST['codigoProductoCarrito']
        cedula = request.session.get('Cedula')
        cantidad = request.POST['num-product']
        
        producto = Productos.objects.get(codigoProducto=int(codigoProducto))
        cliente = Clientes.objects.get(cedula=int(cedula))

        precioUnidad = int(producto.precioUnidad)
        precioTotal = precioUnidad * int(cantidad)

        carrito = CarritoCompras.objects.create(
            codigoCarrito = None,
            cliente = cliente,
            producto = producto, 
            cantidad = cantidad,
            precioTotal = precioTotal,
        )
        
        return redirect('/detalleProducto/' + codigoProducto)    
    else:
        return redirect('/')

def actualizarCarrito(request, codigo, cedula):

    registro = CarritoCompras.objects.get(codigoCarrito=int(codigo), cliente=int(cedula))

    if request.method == 'POST':

        #Obtener los datos del formulario

        cantidad = request.POST['num-product']
        precioUnidad = int(registro.producto.precioUnidad)
        precioTotal = precioUnidad * int(cantidad)

        registro.cantidad = cantidad
        registro.precioTotal = precioTotal

        registro.save()

        return redirect('/carrito/')

def eliminarCarrito(request, codigo, url):

    #Elimina la reseña

    registro = CarritoCompras.objects.get(codigoCarrito=int(codigo))

    registro.delete()

    #Verificamos la url a la que redirige
    return redirect(f'/{url}/')

#Crear Ordenes

def crearOrden(request):
    if request.method == 'POST':
        cedula = request.session.get('Cedula')
        cliente = Clientes.objects.get(cedula=int(cedula))
        metodoPago = request.POST['metodoPago']
        fechaCreacion = datetime.now()

        # Formato personalizado: "YYYY-MM-DD HH:MM:SS"
        fechaFormateada = fechaCreacion.strftime("%Y-%m-%d %H:%M:%S")

        listarCarrito = CarritoCompras.objects.filter(cliente=int(request.session.get("Cedula")))

        # Calcular la suma de los precios totales
        total_carrito = sum(item.precioTotal for item in listarCarrito)
        total_carrito_iva = total_carrito + (total_carrito * decimal.Decimal('0.19')).quantize(decimal.Decimal('0.0')) 

        estado = "Pendiente"

        orden = Ordenes.objects.create(
            codigoOrden = None,
            cliente = cliente,
            metodoPago = metodoPago, 
            fechaCreacion = fechaFormateada,
            total = total_carrito_iva,
            estado = estado,
        )

        #Envio de Email

        # Crear el contenido del correo
        banner_html = f'<img src="https://i.imgur.com/JfSZX40.png" style="width: 100%;" alt="Banner">'
        titulo_html = '<h1 style="font-family: Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 400; margin-bottom: 0px;">¡Nueva Orden!</h1>'
        parrafo_html = '<p style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; margin-top: 0px; margin-bottom: 0px;">Ha sido creada una nueva orden en la aplicacion web de Procol del Valle, la idea al recibir esto, es ponerse en contacto con el cliente para definir el pago y la entrega de el/los productos. Una vez en contacto y terminado la compra se sugiere ingresar a la seccion de <b>"Ordenes"</b> para cambiar el estado de la orden a <b>"Completada".</b> A continuacion se listan los datos del cliente en cuestion:</p>'
        lista_html = f'''
        <ul style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; margin-top: 0px; margin-bottom: 0px; list-style: none; padding-left: 0px;">
            <li>🧑 Nombre: {cliente.nombreCompleto}</li>
            <li>📃 Cedula: {cliente.cedula}</li>
            <li>📅 Fecha Orden: {fechaFormateada}</li>
            <li>📍 Direccion: {cliente.direccion}</li>
            <li>📱 Telefono: {cliente.telefono}</li>
            <li>📧 Email: {cliente.email}</li>
            <li>💵 Metodo de Pago: {metodoPago}</li>
        </ul>
        '''
        boton_html = '''
        <a href="https://api.whatsapp.com/send?phone=3165552604" style="background-color: #189e76; color: white; border-radius: 20px; padding: 10px 20px; border: none; display: inline-flex; padding-left: 10px; padding-right: 0px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; width: 130px; height: 30px; text-align: center; line-height: 10px; cursor: pointer; text-decoration: none;">
            Contactalo Ahora
        </a>
        '''
        contenido_html = f'{banner_html}\n{titulo_html}\n{parrafo_html}\n{lista_html}\n{boton_html}'    

        destinatario = 'procoldelvalleweb@gmail.com'
        asunto = 'Correo personalizado con banner'
        yag.send(to=destinatario, subject=asunto, contents=contenido_html)
        
        #Retornamos

        message = "La orden de tu carrito ha sido creada con exito. Se acaba de enviar un correo electronico a Procol del Valle sobre tu Compra, en proximos dias se pondran en contacto contigo para ordenar el pago y la entrega de el/los respectivos productos"

        # Reemplazar espacios en blanco con %20
        message_codified = message.replace(" ", "%20")

        return redirect(f'/carrito/?message={message_codified}&type=success')