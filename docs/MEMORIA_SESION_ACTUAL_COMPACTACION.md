# 🧠 Memoria de Sesión Actual: Ilustraciones IA 3D Plastilina, Mapeo Pedagógico, Despliegue VPS y Grafo

**Fecha:** 4 de octubre de 2026  
**Proyecto:** English From Scratch (Colombia 🇨🇴)  
**ID de Conversación:** `1fc48198-8e5f-4a71-9f19-a636e4349a94`

---

## 📌 1. Resumen Ejecutivo y Requerimientos del Usuario

El usuario solicitó:
1. **Reemplazo visual total en Jardín:** Eliminar fotos de stock o imágenes no alusivas (e.g. castillos góticos para el número 1, máquinas de escribir para lápiz, perros con gafas para el número 2) y reemplazarlas por ilustraciones 3D estilo plastilina/clay preschool generadas exclusivamente con IA Gemini.
2. **Eliminación de textos técnicos DBA:** Retirar encabezados como *"DBA Preescolar: 100% Oral y Escucha 🎧"* de la interfaz infantil para centrar la experiencia 100% en la pedagogía visual.
3. **Mapeo bilingüe interactivo:** Garantizar que todas las opciones de respuesta en español e inglés en las actividades de opción múltiple muestren su respectiva tarjeta ilustrada 3D.
4. **Despliegue integral a producción en VPS (`162.35.28.193`):** Subir todos los assets, código frontend, bundles compilados y reiniciar los servicios sin alterar los datos persistentes.
5. **Generación continua de tarjetas pendientes:** Generar las imágenes de juguetes y animales de granja que faltaban.
6. **Compactación del chat y alimentación del grafo de conocimiento (Graphify):** Resumir la sesión y reindexar el grafo de arquitectura.

---

## 🎨 2. Tarjetas Generadas con IA Gemini (Estilo Plastilina 3D Claymation)

Se consolidó una biblioteca de **47 tarjetas 3D en plastilina infantil** almacenadas localmente en `frontend/public/cards/` y sincronizadas en el VPS de producción:

### A. Saludos y Rutinas (Unidad 1)
* `hello.jpg`, `hi.jpg`, `bye.jpg`: Saludos con manitos y niños modelados en plastilina.
* `morning.jpg`: Sol radiante y ventana de plastilina ("Good morning!").
* `cleanup.jpg`: Escoba y balde de plastilina ("Clean up!").
* `lineup.jpg`: Niños en fila amigable ("Line up!").
* `sitdown.jpg`: Silla infantil con gesto de sentarse ("Sit down, please").
* `quiet.jpg`: Gesto de silencio con dedo en la boca ("Quiet, please").
* `teacher.jpg`: Profe sonriente de plastilina con pizarra.
* `name.jpg`, `ask_name.jpg`, `handshake.jpg`: Identidad y presentación.

### B. Números y Conteo (Unidades 2 y 3)
* `number1.jpg` / `one_apple.jpg` / `apple.jpg`: Manzana roja en 3D.
* `number2.jpg` / `two_books.jpg` / `book.jpg`: Dos libros infantiles de plastilina.
* `number3.jpg` / `three_pencils.jpg` / `pencil.jpg`: Tres lápices de colores y lápiz amarillo con borrador rosa.
* `number4.jpg` / `blocks.jpg`: Número 4 y cubos ABC de plastilina.
* `number5.jpg`: Número 5 con cinco estrellas doradas sonrientes.
* `number6.jpg`: Número 6 con seis pelotas saltarinas.
* `number7.jpg`: Número 7 con siete globos festivos.
* `number8.jpg`: Número 8 con ocho patitos amarillos.
* `number9.jpg`: Número 9 con nueve flores risueñas.
* `number10.jpg` / `ten_fingers.jpg`: Manitos con 10 deditos modelados.
* `chair.jpg`: Silla preescolar turquesa y amarilla.
* `body_jump.jpg` / `jump.jpg`: Niño saltando en el aire con alegría.

### C. Juguetes (Unidad 4)
* `ball.jpg`: Pelota de juguete rayada en 3D.
* `doll.jpg`: Muñeca de trapo colorida en plastilina.
* `car.jpg`: Carrito de juguete rojo y amarillo con ruedas gruesas y ojitos amigables.
* `kite.jpg`: Cometa de rombo multicolor con lazos y nubecitas en cielo pastel.
* `teddy.jpg`: Osito de peluche marrón sentado con corbatín rojo.
* `robot.jpg`: Robot infantil azul y amarillo con pantalla sonriente y llave de cuerda.
* `train.jpg`: Tren a vapor con chimenea y nubecitas de vapor de plastilina.

### D. Animales de la Granja (Unidad 5)
* `cow.jpg`: Vaca lechera con manchas negras, cascabel dorado y flores.
* `dog.jpg`: Cachorrito marrón y blanco con colita alegre en el pasto.
* `cat.jpg`: Gatito naranja rayado sonriendo sobre alfombra tejida.
* `duck.jpg`: Patito amarillo nadando en estanque con nenúfares.
* `pig.jpg`: Cerdito rosado con colita en espiral y mejillas sonrosadas.
* `horse.jpg`: Pony marrón con crin oscura y mirada tierna.
* `chicken.jpg`: Gallina con cresta roja junto a su pollito amarillo.
* `sheep.jpg`: Ovejita esponjosa blanca con lana en bucles de plastilina.

> **Estado de Cuota Gemini Image Gen:**  
> Al finalizar la generación del lote de animales y juguetes, Google Cloud retornó `429 Too Many Requests (quotaResetDelay: ~4h 47m en model: gemini-3.1-flash-image)`. Las tarjetas restantes (partes del cuerpo y familia) se generarán una vez reiniciada la cuota.

---

## 💻 3. Cambios en Código Frontend y Mapeo Pedagógico

1. **[`frontend/src/data/conceptImages.js`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/data/conceptImages.js):**
   * Cobertura del 100% de opciones interactivas en Jardín: mapeo de frases en español e inglés (`"i like the ball"`, `"una muñeca"`, `"un carro"`, `"aplaude"`, `"salta"`, `"corre"`, `"toca tu cabeza"`, `"globo"`, etc.) a sus respectivas tarjetas 3D.
2. **[`frontend/src/data/unitSlides.js`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/data/unitSlides.js):**
   * Se asignó la propiedad `image` a todas las actividades interactivas de Jardín (Unidades 1 a 8), permitiendo que `HeroIllustration` muestre la imagen principal sobre la pregunta.
   * Se completó la diapositiva *"I like..."* con items y tarjetas individuales de juguetes.
   * Se añadieron imágenes contextuales a todas las diapositivas de *Homework* (e.g. `/cards/ten_fingers.jpg`, `/cards/teddy.jpg`, `/cards/family_group.jpg`).
3. **[`frontend/src/components/DBADeck.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/components/DBADeck.jsx):**
   * Eliminación del banner técnico de DBA.
   * Soporte en `HomeworkSlide` para renderizar `HeroIllustration`.
   * Manejo robusto de selección y retroalimentación auditiva y visual inmediata.

---

## 🚀 4. Despliegue en Servidor VPS (`162.35.28.193`)

* **Host:** `root@162.35.28.193` (`vps3674010.trouble-free.net`)
* **Directorio:** `/root/ENGLISH-ABC`
* **Arquitectura Docker en VPS:**
  * `english-platform-gateway-1`: Nginx en puerto 80 público.
  * `english-platform-frontend-1`: Contenedor Node/Vite (puerto 5173 interno, montando `src/`, `public/`, `dist/`).
  * `english-platform-backend-1`: Django backend principal.
  * `english-platform-backend-mfnovoa-1`: Django backend dedicado multi-colegio.
  * `english-platform-db-1`: MySQL 8.0 con volumen persistente `db_data`.
* **Sincronización:** Ejecutada vía `rsync -avz` para `frontend/public/cards/`, `frontend/public/openmoji/`, `frontend/public/topics/`, `frontend/src/` y `frontend/dist/`.
* **Pruebas de Verificación en Producción:**
  * Todas las tarjetas nuevas (`car.jpg`, `kite.jpg`, `teddy.jpg`, `robot.jpg`, `train.jpg`, `cow.jpg`, `dog.jpg`, `cat.jpg`, `duck.jpg`, `pig.jpg`, `horse.jpg`, `chicken.jpg`, `sheep.jpg`) retornan **HTTP 200 OK**.
  * Todos los contenedores se encuentran en estado `Up (healthy)`.

---

## 🕸️ 5. Alimentación y Actualización del Grafo (Graphify)

* **Herramienta:** `/home/balckyshadown/.local/bin/graphify`
* **Última Actualización:** 07 de octubre de 2026
* **Extracción AST Incremental:**
  * 6 archivos de código fuente modificados re-analizados e indexados.
  * Reemplazo de 14 nodos actualizados.
  * Respaldo generado en `graphify-out/2026-10-07/`.
* **Clustering y Detección de Comunidades:**
  * **2,695 nodos** (+2 nodos nuevos indexados)
  * **3,058 aristas (edges)** (+1 arista)
  * **204 comunidades temáticas/arquitectónicas**
* **Artefactos actualizados:**
  * `graphify-out/graph.json`
  * `graphify-out/GRAPH_REPORT.md`
  * `graphify-out/graph.html`
  * `graphify-out/.graphify_analysis.json`
  * `graphify-out/manifest.json`
