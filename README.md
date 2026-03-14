### 1. Arquitectura Base y Angular 17

[✓] **Standalone Components:** Construir toda la aplicación utilizando componentes independientes.

[✓] **Control Flow Blocks:** Usar las nuevas directivas `@if` y `@for` en tus archivos HTML para renderizar las listas y estados. 

[] **Servicios:** Crear una carpeta `services` que contenga tu `ChatService` para manejar toda la lógica y el estado de los mensajes.



### 2. Panel Lateral Izquierdo (Lista de Personajes/Grupos)

[] **Lista de contactos:** Mostrar a tus personajes y grupos con su avatar, nombre y estado (ej. online/offline/última vez visto en el reino).

[] **Creación dinámica:** Implementar un formulario reactivo para que el usuario pueda crear nuevos chats o grupos.



### 3. Panel Principal Derecho (La Conversación)

[] **Historial independiente:** Mostrar los mensajes correspondientes solo al chat o grupo que esté seleccionado.

[] **Formulario Reactivo:** Usar `FormControl` con validaciones para el input donde el usuario escribe.

[] **Tu Opción 2 (Chips de sugerencias):** Arriba del input, colocar botones con posibles diálogos. Al hacer clic en uno, este debe rellenar el valor del `FormControl`, pero *el usuario debe presionar enviar manualmente* para pasar la validación.

[] **Diferenciación visual:** Alinear los mensajes de tu usuario a la derecha y los de tus personajes (la app) a la izquierda.

[] **Retardo y Autorespuesta:** Al enviar un mensaje, este debe aparecer en pantalla inmediatamente. Luego, aplicar un retardo (con `setTimeout` o RxJS) y hacer que el personaje o el grupo responda automáticamente en base a las palabras clave detectadas.



### 4. Routing (Rutas de la App)

[] **Configuración:** Utilizar `provideRouter` para manejar la navegación.

[] **Ruta `/chats`:** Debe mostrar la vista principal con la lista de chats.
 
[] **Ruta `/chats/:id`:** Debe abrir la conversación específica con un personaje o grupo.

[] **Ruta `/nuevo`:** Debe llevar al formulario de creación de chat.



### 5. Estilos y Maquetación (CSS)

[] **CSS Nativo:** Estilar usando archivos `.css` puros, aplicando Flexbox o Grid para la estructura.

[] **Burbujas:** Diseñar burbujas diferenciadas para los mensajes enviados y recibidos.

[] **Responsive Design:** * En pantallas grandes: Mostrar los dos paneles (lista y conversación) lado a lado.

[] * En móviles: Mostrar solo un panel a la vez (o ves la lista de personajes, o ves la conversación activa).



### 6. Entregables Obligatorios

[] **Documentación (README):** Incluir instrucciones claras de instalación y ejecución (`npm install`, `ng serve`), y explicar brevemente la estructura de tu proyecto y cómo probar las rutas.
 
[] **Control de versiones:** Realizar *commits* progresivos a lo largo del desarrollo para que los profesores vean tu evolución.


[] **Deploy:** Publicar la aplicación en Vercel o Netlify, configurando la redirección necesaria para una Single Page Application (SPA).



### 7. Extras (Bonus track para lucirte)

[] * Implementar un buscador de chats en la barra lateral.

[] * Agregar animaciones (con CSS o Angular Animations) para que los mensajes aparezcan con un efecto *fade in*.

[] * Crear un *Pipe* personalizado (quizás para formatear las fechas con un estilo propio de la época de tus personajes).

[] * Usar *Signals* para manejar el estado global de tu `ChatService` en lugar de `BehaviorSubject`.
