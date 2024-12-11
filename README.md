# ⛓️ URL Shortener

---

## ✨ Descripción
URL Shortener es una aplicación que permite a los usuarios crear enlaces cortos personalizados que redirigen a una URL larga. Es una herramienta útil para compartir enlaces en redes sociales, correos electrónicos y otras plataformas.

Este proyecto está compuesto por un **backend con Node.js y Express** y un **frontend con Vue.js**, siguiendo un diseño modular y estructurado para un fácil mantenimiento y expansión.

---

## 📦 Características

### Backend
- **Generación de URL cortas.**
- **Redirección automática** desde el enlace corto a la URL larga.
- **Historial de clics** para cada enlace generado.

### Frontend
- **Interfaz amigable** para crear nuevos enlaces cortos.
- **Vista de estadísticas** sobre el uso de los enlaces creados.
- **Responsive** para su uso en dispositivos móviles y escritorios.

---

## 🛠️ Tecnologías utilizadas
### Backend
- **Node.js**
- **Express.js**
- **MongoDB** para almacenamiento de datos.

### Frontend
- **Vue.js**
- **Tailwind CSS** para el diseño responsivo.
- **Vite** para una experiencia de desarrollo rápida.

---

## 🖥️ Instalación y uso

### 1. Clona el repositorio
```bash
git clone https://github.com/tu-usuario/url-shortener.git
cd url-shortener
```

### 2. Configura el backend
En la carpeta backend instala las dependencias:
```bash
cd backend
npm install
```
Crea tu archivo .env con las configuraciones necesarias:
```bash
PORT=3000
MONGO_URI=<tu_conexion_a_mongo>
```

Inicia el servidor
```bash
npm start
```

### 3. Configura el frontend
En la carpeta backend:
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Ejecuta la aplicación
Con el servidor backend ejecutándose y el frontend en modo desarrollo, abre tu navegador en:

`http://localhost:3000`

¡Listo! Ahora puedes empezar a usar tu URL Shortener.

## 🧰 Endpoints disponibles
### 📥 Crear enlace corto
`POST /api/shorten`

Datos requeridos:
```json
{
  "longUrl": "https://ejemplo.com",
  "customAlias": "prueba"
}
```
🚩 el url es obligatorio, sin embargo el alias es opcional

Datos esperados:
```json
{
  "message": "URL successfully shortened",
  "shortUrl": "https://localhost:3000/prueba",
}
```

### 🔗 Redirección de enlace corto

`GET /:id`

Al acceder a ese endpoint, el sistema redirigirá automáticamente al enlace correspondiente.

### 📑 Consulta estadisticas de enlace corto

`GET /api/metrics/:id` debe buscarse por el alias personalizado o el id asignado automaticamente

Datos esperados:
```json
{
  "_id": "B1vRcpBEJl",
  "longUrl": "https://prueba.com",
  "shortUrl": "https://localhost:3000/prueba",
  "customAlias": "prueba",
  "clicks": "10",
  "created_at": "date",
  "dailyClicks": [],
  "clicksByCountry": [],
  "clicksByCity": [],
}
```

## 📽️ Demo en produccion 
Puedes probar la aplicación aquí: [URL Demo](https://short.juliangarciasuarez.tech)


## 🤝 Contribuciones
¡Las contribuciones son bienvenidas! Si encuentras un error, deseas agregar una funcionalidad o mejorar la documentación, abre un Issue o un Pull Request en el repositorio.




