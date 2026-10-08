const { loadUnitSlides, saveUnitSlides } = require('./lib/unit_slides_store.cjs');


const itemEmojiMap = {
  // Saludos y rutinas
  "Hello! (Hola)": "👋 Hello! (Hola)",
  "Hi! (¡Hola! informal)": "🙋 Hi! (¡Hola! informal)",
  "Bye-bye! (Adiós)": "🚪 Bye-bye! (Adiós)",
  "Good morning! (Buenos días)": "🌅 Good morning! (Buenos días)",
  "Clean up! (¡A recoger!)": "🧹 Clean up! (¡A recoger!)",
  "Line up! (¡Formen fila!)": "🚶 Line up! (¡Formen fila!)",
  "Sit down, please (Siéntense, por favor)": "🪑 Sit down, please (Siéntense, por favor)",
  "Quiet, please (Silencio, por favor)": "🤫 Quiet, please (Silencio, por favor)",
  "Stand up (pararse)": "🧍 Stand up (pararse)",
  "Sit down (sentarse)": "🪑 Sit down (sentarse)",
  "Open your book (abrir el libro)": "📖 Open your book (abrir el libro)",
  "Listen (escuchar)": "👂 Listen (escuchar)",
  "Touch your nose!": "👃 Touch your nose!",
  "Raise your hand! (Levanten la mano)": "✋ Raise your hand! (Levanten la mano)",
  "Hello / Bye-bye": "👋 Hello / 🚪 Bye-bye",

  // Colores
  "Red (rojo)": "🔴 Red (rojo)",
  "Blue (azul)": "🔵 Blue (azul)",
  "Yellow (amarillo)": "🟡 Yellow (amarillo)",
  "Green (verde)": "🟢 Green (verde)",
  "Colors: red, blue, yellow, green": "🎨 Colors: red, blue, yellow, green",

  // Números
  "One (1)": "1️⃣ One (1)",
  "Two (2)": "2️⃣ Two (2)",
  "Three (3)": "3️⃣ Three (3)",
  "Four (4)": "4️⃣ Four (4)",
  "Five (5)": "5️⃣ Five (5)",
  "Six (6)": "6️⃣ Six (6)",
  "Seven (7)": "7️⃣ Seven (7)",
  "Eight (8)": "8️⃣ Eight (8)",
  "Nine (9)": "9️⃣ Nine (9)",
  "Ten (10)": "🔟 Ten (10)",
  "Eleven (11)": "🔢 Eleven (11)",
  "Twelve (12)": "🔢 Twelve (12)",
  "Thirteen (13)": "🔢 Thirteen (13)",
  "Fourteen (14)": "🔢 Fourteen (14)",
  "Fifteen (15)": "🔢 Fifteen (15)",
  "Twenty (20)": "🔢 Twenty (20)",
  "Thirty (30)": "🔢 Thirty (30)",
  "Numbers: one to ten": "🔢 Numbers: one to ten",
  "Jump one! (¡Salto uno!)": "🦘 Jump one! (¡Salto uno!)",
  "Jump two! (¡Salto dos!)": "🦘 Jump two! (¡Salto dos!)",
  "Jump three! (¡Salto tres!)": "🦘 Jump three! (¡Salto tres!)",
  "Hasta jump ten!": "🦘 Jump ten! (¡Salto diez!)",

  // Juguetes
  "Ball (pelota)": "⚽ Ball (pelota)",
  "Doll (muñeca)": "🪆 Doll (muñeca)",
  "Car (carro)": "🚗 Car (carro)",
  "Kite (cometa)": "🪁 Kite (cometa)",

  // Animales y sonidos
  "Cow (vaca) — moo!": "🐮 Cow (vaca) — moo!",
  "Dog (perro) — woof!": "🐶 Dog (perro) — woof!",
  "Cat (gato) — meow!": "🐱 Cat (gato) — meow!",
  "Duck (pato) — quack!": "🦆 Duck (pato) — quack!",
  "Moo! → Cow": "🐮 Moo! → Cow",
  "Woof! → Dog": "🐶 Woof! → Dog",
  "Quack! → Duck": "🦆 Quack! → Duck",
  "Meow! → Cat": "🐱 Meow! → Cat",
  "Dog (perro)": "🐶 Dog (perro)",
  "Cat (gato)": "🐱 Cat (gato)",
  "Bird (pájaro)": "🐦 Bird (pájaro)",
  "Fish (pez)": "🐟 Fish (pez)",
  "The lion is big.": "🦁 The lion is big.",
  "The lion can run (El león puede correr)": "🦁 The lion can run (El león puede correr)",
  "The bird can fly (El pájaro puede volar)": "🦅 The bird can fly (El pájaro puede volar)",
  "The fish can swim (El pez puede nadar)": "🐠 The fish can swim (El pez puede nadar)",
  "The monkey can jump (El mono puede saltar)": "🐒 The monkey can jump (El mono puede saltar)",
  "Animals, toys, family": "🐾 Animals, 🧸 Toys, 👨‍👩‍👧 Family",

  // Acciones y cuerpo
  "Jump (saltar)": "🦘 Jump (saltar)",
  "Run (correr)": "🏃 Run (correr)",
  "Clap (aplaudir)": "👏 Clap (aplaudir)",
  "Stomp (pisar fuerte)": "🦶 Stomp (pisar fuerte)",
  "Head (cabeza)": "🗣️ Head (cabeza)",
  "Hands (manos)": "🙌 Hands (manos)",
  "Feet (pies)": "🦶 Feet (pies)",
  "Eyes (ojos)": "👀 Eyes (ojos)",
  "I run (yo corro)": "🏃 I run (yo corro)",
  "I jump (yo salto)": "🦘 I jump (yo salto)",
  "My brother runs (mi hermano corre)": "🏃 My brother runs (mi hermano corre)",
  "My sister sings (mi hermana canta)": "🎤 My sister sings (mi hermana canta)",

  // Familia
  "Mommy (mamá)": "👩 Mommy (mamá)",
  "Daddy (papá)": "👨 Daddy (papá)",
  "Baby (bebé)": "👶 Baby (bebé)",
  "Brother (hermano)": "👦 Brother (hermano)",
  "Sister (hermana)": "👧 Sister (hermana)",
  "Me (yo)": "🙋 Me (yo)",
  "Family (familia)": "👨‍👩‍👧 Family (familia)",
  "Friends (amigos)": "🧑‍🤝‍🧑 Friends (amigos)",
  "Teacher (profe)": "🧑‍🏫 Teacher (profe)",
  "School (escuela)": "🏫 School (escuela)",
  "This is my daddy.": "👨 This is my daddy.",
  "This is my mommy.": "👩 This is my mommy.",
  "This is my brother.": "👦 This is my brother.",
  "This is my sister.": "👧 This is my sister.",

  // Casa y objetos
  "House (casa)": "🏡 House (casa)",
  "Door (puerta)": "🚪 Door (puerta)",
  "Window (ventana)": "🪟 Window (ventana)",
  "Roof (techo)": "🏠 Roof (techo)",
  "Classroom (salón)": "🏫 Classroom (salón)",
  "Desk (escritorio)": "🪑 Desk (escritorio)",
  "Board (tablero)": "📋 Board (tablero)",
  "Chair (silla)": "🪑 Chair (silla)",
  "Kitchen (cocina)": "🍳 Kitchen (cocina)",
  "Bedroom (cuarto)": "🛏️ Bedroom (cuarto)",
  "Bathroom (baño)": "🚿 Bathroom (baño)",
  "Living room (sala)": "🛋️ Living room (sala)",

  // Ropa y clima
  "Shirt (camisa)": "👕 Shirt (camisa)",
  "Pants (pantalón)": "👖 Pants (pantalón)",
  "Shoes (zapatos)": "👟 Shoes (zapatos)",
  "Jacket (chaqueta)": "🧥 Jacket (chaqueta)",
  "I wear a jacket (Uso chaqueta)": "🧥 I wear a jacket (Uso chaqueta)",
  "It is cold (Hace frío)": "🥶 It is cold (Hace frío)",
  "I wear shorts (Uso pantaloneta)": "🩳 I wear shorts (Uso pantaloneta)",
  "It is hot (Hace calor)": "☀️ It is hot (Hace calor)",

  // Comida
  "Apple (manzana)": "🍎 Apple (manzana)",
  "Banana (banano)": "🍌 Banana (banano)",
  "Milk (leche)": "🥛 Milk (leche)",
  "Bread (pan)": "🍞 Bread (pan)",
  "I like bananas.": "🍌 I like bananas.",

  // Información personal y descripciones
  "My name is Ana (Mi nombre es Ana)": "🙋 My name is Ana (Mi nombre es Ana)",
  "I am 7 years old (Tengo 7 años)": "🎂 I am 7 years old (Tengo 7 años)",
  "I am 8 years old (Tengo 8 años)": "🎂 I am 8 years old (Tengo 8 años)",
  "I am from Colombia (Soy de Colombia)": "🇨🇴 I am from Colombia (Soy de Colombia)",
  "Tall (alto/a)": "🦒 Tall (alto/a)",
  "Short (bajo/a)": "🐰 Short (bajo/a)",
  "Long hair (cabello largo)": "💇‍♀️ Long hair (cabello largo)",
  "Short hair (cabello corto)": "💇‍♂️ Short hair (cabello corto)",
  "He is tall (Él es alto)": "🦒 He is tall (Él es alto)",
  "She is short (Ella es baja)": "🐰 She is short (Ella es baja)",
  "He has black hair (Él tiene cabello negro)": "🖤 He has black hair (Él tiene cabello negro)",
  "She has brown eyes (Ella tiene ojos café)": "👁️ She has brown eyes (Ella tiene ojos café)",
  "My name is… (Mi nombre es…)": "🙋 My name is… (Mi nombre es…)",
  "I live in… (Vivo en…)": "🏡 I live in… (Vivo en…)",

  // Medio ambiente y cuidado
  "Clean up (limpiar)": "🧹 Clean up (limpiar)",
  "Recycle (reciclar)": "♻️ Recycle (reciclar)",
  "Save water (ahorrar agua)": "💧 Save water (ahorrar agua)",
  "Plant trees (sembrar árboles)": "🌱 Plant trees (sembrar árboles)",

  // Secuencia de historias
  "First… (Primero…)": "1️⃣ First… (Primero…)",
  "Then… (Entonces…)": "2️⃣ Then… (Entonces…)",
  "After that… (Después…)": "3️⃣ After that… (Después…)",
  "Finally… (Finalmente…)": "🏁 Finally… (Finalmente…)",
  "First, the kitten is hungry. (Primero, el gatito tiene hambre.)": "🐱 1️⃣ First, the kitten is hungry. (Primero, el gatito tiene hambre.)",
  "Then, he looks for milk. (Entonces, busca leche.)": "🥛 2️⃣ Then, he looks for milk. (Entonces, busca leche.)",
  "Finally, he drinks the milk. (Finalmente, toma la leche.)": "😋 🏁 Finally, he drinks the milk. (Finalmente, toma la leche.)",

  // Celebraciones
  "Christmas (Navidad)": "🎄 Christmas (Navidad)",
  "Carnival (Carnaval)": "🎭 Carnival (Carnaval)",
  "Independence Day (Día de la Independencia)": "🇨🇴 Independence Day (Día de la Independencia)",
  "Easter (Semana Santa)": "🕊️ Easter (Semana Santa)"
};

const unitSlides = loadUnitSlides();

let updatedCount = 0;
for (const [unitKey, slides] of Object.entries(unitSlides)) {
  for (const slide of slides) {
    if (slide.items && Array.isArray(slide.items)) {
      slide.items = slide.items.map((item) => {
        if (itemEmojiMap[item]) {
          updatedCount++;
          return itemEmojiMap[item];
        }
        return item;
      });
    }
  }
}

console.log(`Updated ${updatedCount} items with visual emojis!`);

saveUnitSlides(unitSlides);
console.log('Successfully updated grade slide files!');
