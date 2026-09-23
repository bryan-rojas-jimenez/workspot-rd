# WorkSpot RD 🇩🇴 - Plataforma Colaborativa de Trabajo Remoto

> **Proyecto de Formulación de Proyectos Emprendedores**
> **Universidad Abierta Para Adultos (UAPA)**
> **Participante:** Bryan A. Rojas Jiménez *(Matrícula: 100083212)*
> **Facilitador:** Juan Rodríguez M.A.

---

## 📌 Descripción del Proyecto

**WorkSpot** es una plataforma colaborativa en tiempo real diseñada para optimizar la experiencia de trabajo remoto en República Dominicana (Santo Domingo). Permite a programadores, *freelancers* y profesionales independientes localizar, evaluar y monitorear el nivel de "enfocabilidad" de cafeterías, espacios de *coworking*, bibliotecas y bistros.

### Características Clave

1. **Mapa Interactivo de Enfocabilidad (Leaflet & OpenStreetMap)**
   - Visualización de espacios en Santo Domingo (Piantini, Naco, Bella Vista, Zona Colonial, Zona Universitaria).
   - Marcadores codificados por color según la calidad del espacio y la verificación B2B.

2. **Reportes Colaborativos en Tiempo Real**
   - Nivel de ruido ambiental (Silencioso, Moderado, Ruidoso).
   - Velocidad de Wi-Fi (Fibra Óptica / Rápido, Normal, Lento).
   - Disponibilidad de tomacorrientes (Abundantes, Escasos, Ninguno).
   - Ocupación del local (Baja, Media, Alta).

3. **Módulo B2B para Comercios Afiliados (Local Verificado)**
   - Distintivo "Local Verificado B2B" para establecimientos suscritos.
   - Promociones y descuentos exclusivos para miembros de la comunidad WorkSpot.

4. **Sistema de Reseñas y Registro de Espacios**
   - Registro comunitario de nuevos puntos de trabajo.
   - Calificaciones por estrellas y comentarios cualitativos.

---

## 🛠️ Tecnologías Utilizadas

- **Framework Principal:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos & UI:** Tailwind CSS + Lucide Icons
- **Mapa Interactivo:** Leaflet.js + React-Leaflet (CartoDB / OpenStreetMap)
- **Base de Datos & ORM:** Prisma ORM con SQLite (Desarrollo local) / PostgreSQL (Producción en Neon.tech)

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/bryan-rojas-jimenez/workspot-rd.git
   cd workspot-rd
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Inicializar y poblar la Base de Datos:**
   ```bash
   npx prisma db push
   npm run db:seed
   ```

4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

5. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## ☁️ Despliegue Gratuito en la Nube (Vercel + Neon.tech)

1. **Base de Datos en la Nube:** Crear un proyecto gratuito en [Neon.tech](https://neon.tech) y obtener la URL de conexión PostgreSQL (`DATABASE_URL`).
2. **Hosting Frontend:** Conectar este repositorio a [Vercel](https://vercel.com) e ingresar la variable de entorno `DATABASE_URL`.
