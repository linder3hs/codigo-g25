# Reto DOM: Creador de Tarjetas Personalizadas

## Objetivo

Desarrollar una aplicación web interactiva que permita a los usuarios crear una tarjeta de presentación personal, personalizando diferentes elementos y visualizando los cambios en tiempo real.

## Descripción

En este reto aplicarás tus conocimientos de manipulación del DOM para crear un generador de tarjetas personalizadas. La aplicación permitirá al usuario introducir su información personal y ver cómo se actualiza instantáneamente en una vista previa de tarjeta de presentación.

## Requisitos

### Estructura de la aplicación

1. Crear una sección con título "Creador de Tarjetas Personales"
2. Dividir la pantalla en dos áreas:
   - Un formulario para ingresar datos
   - Una vista previa de la tarjeta

### Formulario de personalización

El formulario debe incluir los siguientes campos:

- Nombre completo (input de texto)
- Profesión/Cargo (input de texto)
- Email (input de tipo email)
- Teléfono (input de tipo tel)
- Color de la tarjeta (input de tipo color)
- Botón para restablecer todos los campos

### Vista previa de la tarjeta

La tarjeta de vista previa debe mostrar:

- El nombre del usuario (texto destacado)
- La profesión/cargo
- La información de contacto (email y teléfono)
- Un fondo con el color seleccionado
- Un elemento decorativo o logo (puede ser un simple texto con el nombre "TECSUP" como marca de agua)

### Funcionalidad requerida

1. La tarjeta debe actualizarse en tiempo real conforme el usuario ingresa su información.
2. El botón restablecer debe volver todos los campos y la vista previa a sus valores predeterminados.
3. La aplicación completa debe crearse dinámicamente con JavaScript (no escribir HTML directo).

## Técnicas a utilizar

- Selección de elementos del DOM
- Creación dinámica de elementos con `document.createElement()`
- Asignación de propiedades y estilos a los elementos creados
- Manipulación del contenido con propiedades como `textContent`
- Configuración de manejadores de eventos con `addEventListener()`
- Actualización dinámica de estilos y contenido

## Aspectos a evaluar

- Correcta implementación de la manipulación del DOM
- Uso adecuado de eventos para la interactividad
- Actualización correcta y en tiempo real de la vista previa
- Calidad y legibilidad del código JavaScript
- Diseño visual de la aplicación (uso de estilos inline desde JavaScript)

## Reto adicional (opcional)

- Implementar una función para cambiar entre varios diseños predefinidos de tarjeta
- Añadir validación básica para los campos del formulario
- Crear un botón para "imprimir" o "guardar" la tarjeta (puede simular esta funcionalidad)

## Punto de partida

Puedes utilizar el siguiente código base HTML como punto de partida:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reto DOM - Creador de Tarjetas</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }

      /* No añadas más estilos aquí - crea todo con JavaScript */
    </style>
  </head>
  <body>
    <header>
      <nav>
        <img
          src="https://codigo.edu.pe/wp-content/uploads/2024/10/logotecsupnuevo.png"
          alt="logo TECSUP"
          width="200"
        />
      </nav>
    </header>
    <main>
      <!-- Aquí debes insertar todo el contenido con JavaScript -->
    </main>
    <footer>
      <p>Bootcamp Full Stack TECSUP</p>
    </footer>
    <script src="./app.js"></script>
  </body>
</html>
```

¡Buena suerte! Este reto pondrá a prueba tu comprensión de la manipulación del DOM y la interactividad con JavaScript.
