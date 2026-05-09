# Proyecto Intermodular - Aplicación de gestión de tiendas

Aplicación web de gestión de supermercado, desarrollada utilizando una arquitectura cliente-servidor con frontend en Angular y backend en Laravel.

La aplicación ofrece un TPV completo, sencillo de usar y rápido para aumentar la eficiencia de las personas en caja, mientras ofrece un completo menú de gestión para el encargado de tienda o administrador, pudiendo gestionar todos los puntos de la tienda para tener control total de la misma.

---

# Tecnologías utilizadas

## Frontend
- Angular 21 + TypeScript
- TailwindCSS 4.1
- Angular Material 21

## Backend
- Laravel 13
- PHP 8.4

## Base de datos
- MySQL

## Despliegue
- Docker
- Docker Compose
- GitHub Actions

---


# Características principales

## Panel de administración
- Gestión de productos
- Gestión de proveedores
- Gestión de usuarios
- Gestión de pedidos
- Métricas y estadísticas de la tienda
- Recuperación de los tickets de cada pedido
- Generación de facturas simplificadas.

## Zona de cajero (TPV)
- Búsqueda de productos
- Compatibilidad con escáneres de códigos de barras
- Rápida gestión del actual pedido
- Generación de pedidos con su correspondiente ticket

## Seguridad
- Sistema de autenticación mediante Laravel Sanctum
- Autenticación con doble factor mediante correo electŕonico
- Protección de rutas tanto en el cliente como en el servidor
- Verificación de acceso según permisos con Policies

---

# Arquitectura del proyecto

El proyecto sigue una arquitectura cliente-servidor:

```txt
Frontend Angular
       │
       ▼
API REST Laravel
       │
       ▼
Base de datos MySQL

```

# Capturas de pantalla

Las capturas de pantalla de la aplicación pueden consultarse en el siguiente documento:

[Ver capturas de pantalla](docs/screenshots/screenshots.md)

# Instalación y despliegue

Se puede ver la guía de despliegue en el siguiente documento

[Guía de despliegue](docs/deploy.md)

# Usuarios de prueba

## Administrador
Email: admin@admin.com 

Password: 123456 

2FA: 999999

## Cajero
Email: pepe@supermarket.com

Password: 123456

2FA: 999999