
# 🌌 Galisayo//CHAT - La aplicación para la Academia Mágica

Este proyecto es el **Trabajo Final Integrador** para el curso de **Desarrollo en Angular (UTN 2026)**. Se trata de una aplicación estilo chat aplicando los conceptos centrales de Angular 17.  


--- 


## 📝 Descripción General

**Galisayo//CHAT** permite del lado izquierdo:

**Panel lateral izquierdo (lista de chats)**: 
- Mostrar contactos con avatar, nombre y estado (online/offline/última vez visto). 
- Permitir **crear nuevos chats** dinámicamente mediante un formulario reactivo.
- Usar directivas modernas de Angular 17 (@for para iterar contactos, @if para 
estados).

**Panel principal derecho (ventana de conversación)**: 
- Mostrar historial de mensajes independiente por chat.
- Al enviar un mensaje, este debe mostrarse en pantalla y la aplicación debe 
responder automáticamente después de un retardo.
- Formularios reactivos **(FormControl)** para escribir y validar el mensaje. 


--- 


## 🚀 Tecnologías Utilizadas

Para el desarrollo de esta aplicación se utilizaron las siguientes herramientas y características:

* **Angular 17+**: Framework principal basado en TypeScript para el desarrollo de la interfaz de usuario.
* **Standalone Components**: Arquitectura moderna que elimina la necesidad de `NgModules`, simplificando la estructura del proyecto y mejorando el *tree-shaking*.
* **Control Flow Blocks (@if, @for)**: Nueva sintaxis declarativa y optimizada para el manejo de lógica de plantillas (condicionales y bucles) sin necesidad de directivas estructurales.
* **Reactive Forms**: Sistema para la gestión de formularios complejos con validaciones síncronas y asíncronas, permitiendo un manejo robusto de los datos de entrada.
* **Routing (provideRouter)**: Configuración moderna de la navegación SPA, carga perezosa (*lazy loading*) y protección de rutas mediante *guards*.


---


## 📂 Estructura del Proyecto



¡Claro! Viendo tu captura de pantalla, tienes una estructura muy limpia y organizada siguiendo las mejores prácticas de Angular (especialmente para una arquitectura basada en componentes independientes).

Aquí tienes la sección para tu README o documentación:


---


## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular y escalable, organizada por responsabilidades para facilitar el mantenimiento:

* **`components/`**: Contiene los componentes reutilizables de la interfaz (presentacionales y de diseño).
    * *Ejemplo:* `chat-view`, `input-chat` y layouts específicos para la visualización de mensajes.
* **`models/`**: Definición de interfaces de TypeScript (`.interface.ts`) que aseguran el tipado fuerte de los datos en toda la aplicación (ej. `Chat`, `Contact`).
* **`pages/`**: Componentes de alto nivel que actúan como vistas principales de la aplicación y están asociados a las rutas (ej. `home`, `add-new-chat-form`).
* **`services/`**: Lógica de negocio y comunicación con fuentes de datos externas.
    * `chat-service.ts`: Manejo de la mensajería y estados del chat.
    * `contact-service.ts`: Gestión de la lista de contactos y perfiles.


---


## 🚀 Instrucciones de Instalación

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/terminedev/proyecto-galisayo--chat

```

### 2. Ingresar a la carpeta del proyecto

```bash
cd proyecto-galisayo--chat

```

### 3. Instalar dependenciasInstala las librerías necesarias listadas en el `package.json`:

```bash
npm install

```

### 4. Ejecutar el proyectoLevanta el servidor de desarrollo local:

```bash
npm start

```

### 5. Ver el resultadoAbre tu navegador en la dirección que indique la terminal (usualmente es la siguiente, pero puede variar):

> http://localhost:4200



