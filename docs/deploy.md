# Guía de despliegue

## 1. Introducción

La aplicación (docker-compose) está compuesta por:

- Frontend Angular
- Backend Laravel
- Base de datos MySQL
- Nginx Proxy Manager para HTTPS y dominios

---

## 2. Estructura del proyecto

```txt
.
├── front/
│   └── supermarket-front/
├── back/
│   └── pi-supermercado/
└── docker-compose.yml
```

---

## 3. Requisitos previos

Instalar Docker y Docker Compose en el servidor usando APT:

```bash
sudo apt update
sudo apt upgrade -y

sudo apt install -y docker.io docker-compose git

sudo systemctl enable docker
sudo systemctl start docker
```

Comprobar instalación:

```bash
docker --version
docker-compose --version
```

---

## 4. Clonar el repositorio

```bash
cd /var/www

git clone git@github.com:politecnicoDAW-2025/3tpi-alepr181.git

cd 3tpi-alepr181
```

---

## 5. Archivo .env

Hay que ajustar parámetros como la conexión a la BBDD, los apartado de EMAIL o los del nombre y URL de la aplicación.

---

## 6. Levantar contenedores

Desde la raíz del proyecto:

```bash
docker compose up -d --build
```

Comprobar estado:

```bash
docker ps
```

---

## 7. Preparar Laravel

Entrar al contenedor:

```bash
docker exec -it supermarket-backend bash
```

Ejecutar migraciones:

```bash
php artisan migrate --force
```

Ejecutar seeders:

```bash
php artisan db:seed --force
```

Cachear configuración:

```bash
php artisan config:cache
php artisan route:cache
```

---

## 8. URLs del proyecto

Frontend Angular:

```txt
http://host:9000
```

Backend Laravel:

```txt
http://host:9005
```

Nginx Proxy Manager:

```txt
http://host:81
```

---

## 9. Configuración de Nginx Proxy Manager

### Frontend

Crear un Proxy Host:

```txt
Domain Names: tudominio.com
Scheme: http
Forward Hostname/IP: supermarket-frontend
Forward Port: 80
```

Activar:

```txt
Block Common Exploits
Websockets Support
```

---

### Backend

Añadir una custom location:

```txt
Location: /api
Scheme: http
Forward Hostname/IP: supermarket-backend
Forward Port: 8000
```

Después, generar certificados SSL desde la pestaña SSL usando Let's Encrypt.

---

## 10. Actualizar aplicación

```bash
git pull origin main

docker compose up -d --build
```

Si existen cambios en migraciones:

```bash
docker exec -it supermarket-backend php artisan migrate --force
```