/**
 * Contenido de slides por unidad (32 unidades: 4 grados x 8 unidades).
 * Tipos: content | vocabulary | activity | song | homework.
 * Los videos embebidos son canales oficiales verificados
 * (Super Simple Songs, Noodle & Pals, The Kiboomers, The Singing Walrus).
 * Cada unidad cuenta con su video pedagógico y su slide final de homework.
 */

export const unitSlides = {
  "jardin-hello": [
    {
      "type": "content",
      "emoji": "👋",
      "title": "Hello!",
      "description": "Saluda con la profe: Hello! / Hi! / Bye-bye!",
      "items": [
        "Hello! (Hola)",
        "Hi! (¡Hola! informal)",
        "Bye-bye! (Adiós)",
        "Good morning! (Buenos días)"
      ],
      "examples": [
        "Teacher: Hello! — Student: Hello!"
      ]
    },
    {
      "type": "vocabulary",
      "title": "My name is...",
      "description": "Cada niño dice su nombre con la profe.",
      "words": [
        {
          "word": "My name is…",
          "emoji": "🙋",
          "es": "Mi nombre es…"
        },
        {
          "word": "What is your name?",
          "emoji": "❓",
          "es": "¿Cuál es tu nombre?"
        },
        {
          "word": "Nice to meet you!",
          "emoji": "🤝",
          "es": "¡Mucho gusto!"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "Hello Song",
      "description": "Canten juntos y saluden con las manos.",
      "videoUrl": "https://www.youtube.com/embed/tVlcKp3bWH8"
    },
    {
      "type": "content",
      "emoji": "🕘",
      "title": "Rutinas del salón",
      "description": "Rutinas diarias con gestos.",
      "items": [
        "Clean up! (¡A recoger!)",
        "Line up! (¡Formen fila!)",
        "Sit down, please (Siéntense, por favor)",
        "Quiet, please (Silencio, por favor)"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "La profe dice \"Hello!\" ¿Qué respondes?",
      "options": [
        "Hello!",
        "Bye-bye!",
        "Colors"
      ],
      "correct": "Hello!"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "Al terminar la clase, la profe dice…",
      "options": [
        "Bye-bye!",
        "Good morning!",
        "My name is…"
      ],
      "correct": "Bye-bye!"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Saludos en familia",
      "description": "Practica los saludos en casa con el apoyo de tus papás.",
      "tasks": [
        "Saluda a tus papás al despertar diciendo \"Good morning!\".",
        "Dibuja tu carita saludando con la mano: \"Hello!\".",
        "Despídete antes de dormir diciendo \"Good night!\"."
      ]
    }
  ],
  "jardin-colores": [
    {
      "type": "content",
      "emoji": "🌈",
      "title": "Colors",
      "description": "Los colores del salón.",
      "items": [
        "Red (rojo)",
        "Blue (azul)",
        "Yellow (amarillo)",
        "Green (verde)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "More colors",
      "description": "Señala objetos de cada color en el salón.",
      "words": [
        {
          "word": "Orange",
          "emoji": "🟠",
          "es": "Naranja"
        },
        {
          "word": "Purple",
          "emoji": "🟣",
          "es": "Morado"
        },
        {
          "word": "Black",
          "emoji": "⚫",
          "es": "Negro"
        },
        {
          "word": "White",
          "emoji": "⚪",
          "es": "Blanco"
        }
      ]
    },
    {
      "type": "vocabulary",
      "title": "School objects",
      "description": "Objetos del salón con colores.",
      "words": [
        {
          "word": "Book",
          "emoji": "📚",
          "es": "Libro"
        },
        {
          "word": "Pencil",
          "emoji": "✏️",
          "es": "Lápiz"
        },
        {
          "word": "Crayon",
          "emoji": "🖍️",
          "es": "Crayón"
        },
        {
          "word": "Chair",
          "emoji": "🪑",
          "es": "Silla"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "I See Something Blue",
      "description": "Encuentra objetos azules mientras cantan.",
      "videoUrl": "https://www.youtube.com/embed/jYAWf8Y91hA"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "¿De qué color es el sol?",
      "options": [
        "Yellow",
        "Blue",
        "Green"
      ],
      "correct": "Yellow"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Pencil\" es…",
      "options": [
        "Un lápiz",
        "Un libro",
        "Una silla"
      ],
      "correct": "Un lápiz"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Cacería de colores",
      "description": "Busca colores en tu casa y nómbralos en inglés.",
      "tasks": [
        "Encuentra un objeto \"Blue\" (azul) y uno \"Red\" (rojo) en tu casa.",
        "Muéstraselos a tu familia diciendo el color en voz alta.",
        "Colorea un sol amarillo diciendo \"Yellow sun!\"."
      ]
    }
  ],
  "jardin-numeros": [
    {
      "type": "content",
      "emoji": "🔢",
      "title": "Numbers 1-10",
      "description": "Cuenta con los dedos de la mano.",
      "items": [
        "One (1)",
        "Two (2)",
        "Three (3)",
        "Four (4)",
        "Five (5)",
        "Six (6)",
        "Seven (7)",
        "Eight (8)",
        "Nine (9)",
        "Ten (10)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Count with me",
      "description": "La profe muestra objetos y todos cuentan.",
      "words": [
        {
          "word": "One apple",
          "emoji": "🍎",
          "es": "Una manzana"
        },
        {
          "word": "Two books",
          "emoji": "📚",
          "es": "Dos libros"
        },
        {
          "word": "Three pencils",
          "emoji": "✏️",
          "es": "Tres lápices"
        },
        {
          "word": "Ten fingers",
          "emoji": "🖐️",
          "es": "Diez dedos"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "Counting Bananas",
      "description": "Cuenta los plátanos con los monitos.",
      "videoUrl": "https://www.youtube.com/embed/N-6bxyzyHZs"
    },
    {
      "type": "content",
      "emoji": "🎮",
      "title": "Juego: salta y cuenta",
      "description": "Cada niño salta mientras todos cuentan en inglés.",
      "items": [
        "Jump one! (¡Salto uno!)",
        "Jump two! (¡Salto dos!)",
        "Jump three! (¡Salto tres!)",
        "Hasta jump ten!"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Three\" es…",
      "options": [
        "3",
        "2",
        "5"
      ],
      "correct": "3"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "¿Cuál es el número 10?",
      "options": [
        "Ten",
        "Two",
        "Nine"
      ],
      "correct": "Ten"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Conteo con deditos",
      "description": "Practica los números del 1 al 10 con tus manos.",
      "tasks": [
        "Muestra tus manos y cuenta del 1 al 5 en inglés.",
        "Busca 3 cucharas o juguetes y cuenta: \"One, two, three!\".",
        "Dibuja 5 bolitas de plastilina o bolitas de colores en tu cuaderno."
      ]
    }
  ],
  "jardin-juguetes": [
    {
      "type": "content",
      "emoji": "🧸",
      "title": "My toys",
      "description": "Los juguetes que todos conocen.",
      "items": [
        "Ball (pelota)",
        "Doll (muñeca)",
        "Car (carro)",
        "Kite (cometa)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "More toys",
      "description": "Muestra los juguetes reales o tarjetas.",
      "words": [
        {
          "word": "Teddy bear",
          "emoji": "🧸",
          "es": "Oso de peluche"
        },
        {
          "word": "Blocks",
          "emoji": "🧱",
          "es": "Bloques"
        },
        {
          "word": "Robot",
          "emoji": "🤖",
          "es": "Robot"
        },
        {
          "word": "Train",
          "emoji": "🚂",
          "es": "Tren"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "Clean Up Song",
      "description": "Guarden los juguetes cantando.",
      "videoUrl": "https://www.youtube.com/embed/0d6Ed3baRj8"
    },
    {
      "type": "content",
      "emoji": "💬",
      "title": "I like…",
      "description": "Cada niño dice el juguete que le gusta.",
      "examples": [
        "I like the ball! (¡Me gusta la pelota!)",
        "I like the teddy bear! (¡Me gusta el osito!)"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Doll\" es…",
      "options": [
        "Muñeca",
        "Pelota",
        "Carro"
      ],
      "correct": "Muñeca"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "¿Cómo dices \"Me gusta la pelota\"?",
      "options": [
        "I like the ball",
        "I like the doll",
        "I like the car"
      ],
      "correct": "I like the ball"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Mi juguete favorito",
      "description": "Comparte y describe tu juguete preferido.",
      "tasks": [
        "Elige tu juguete preferido y di: \"I like my [ball / doll / car]\".",
        "Dibuja tu juguete favorito en una hoja blanca.",
        "Guarda tus juguetes cantando la canción de \"Clean Up\"."
      ]
    }
  ],
  "jardin-animales": [
    {
      "type": "content",
      "emoji": "🐮",
      "title": "Farm animals",
      "description": "Animales de la granja con sus sonidos.",
      "items": [
        "Cow (vaca) — moo!",
        "Dog (perro) — woof!",
        "Cat (gato) — meow!",
        "Duck (pato) — quack!"
      ]
    },
    {
      "type": "vocabulary",
      "title": "More farm animals",
      "description": "Haz el sonido de cada animal.",
      "words": [
        {
          "word": "Pig",
          "emoji": "🐷",
          "es": "Cerdo"
        },
        {
          "word": "Horse",
          "emoji": "🐴",
          "es": "Caballo"
        },
        {
          "word": "Chicken",
          "emoji": "🐔",
          "es": "Gallina"
        },
        {
          "word": "Sheep",
          "emoji": "🐑",
          "es": "Oveja"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "Old MacDonald Had a Farm",
      "description": "Canten con los sonidos de los animales.",
      "videoUrl": "https://www.youtube.com/embed/_6HzoUcx3eo"
    },
    {
      "type": "content",
      "emoji": "🎭",
      "title": "Adivina el animal",
      "description": "La profe hace el sonido y los niños adivinan.",
      "items": [
        "Moo! → Cow",
        "Woof! → Dog",
        "Quack! → Duck",
        "Meow! → Cat"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "El sonido \"Moo\" es de…",
      "options": [
        "Cow",
        "Cat",
        "Duck"
      ],
      "correct": "Cow"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Pato\" en inglés es…",
      "options": [
        "Duck",
        "Dog",
        "Pig"
      ],
      "correct": "Duck"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Sonidos de la granja",
      "description": "Imita a los animales y di su nombre en inglés.",
      "tasks": [
        "Imita el sonido de una vaca (\"Cow\"), un perro (\"Dog\") y un gato (\"Cat\").",
        "Pide a un adulto que adivine qué animal estás imitando.",
        "Dibuja al animal de la granja que más te guste."
      ]
    }
  ],
  "jardin-cuerpo-mueve": [
    {
      "type": "content",
      "emoji": "🤸",
      "title": "My body moves",
      "description": "Partes del cuerpo que se mueven.",
      "items": [
        "Jump (saltar)",
        "Run (correr)",
        "Clap (aplaudir)",
        "Stomp (pisar fuerte)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Body parts",
      "description": "Toca cada parte al decirla.",
      "words": [
        {
          "word": "Head",
          "emoji": "🧠",
          "es": "Cabeza"
        },
        {
          "word": "Hands",
          "emoji": "🙌",
          "es": "Manos"
        },
        {
          "word": "Feet",
          "emoji": "🦶",
          "es": "Pies"
        },
        {
          "word": "Tummy",
          "emoji": "🫃",
          "es": "Panza"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "Head, Shoulders, Knees and Toes",
      "description": "Toquen cada parte mientras cantan.",
      "videoUrl": "https://www.youtube.com/embed/RuqvGiZi0qg"
    },
    {
      "type": "content",
      "emoji": "🎮",
      "title": "La profe dice…",
      "description": "Solo obedezcan si empieza con \"Simon says\".",
      "items": [
        "Simon says: jump!",
        "Simon says: clap!",
        "Simon says: touch your head!",
        "Run! (¡Trampa, no te muevas!)"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Clap\" es…",
      "options": [
        "Aplaudir",
        "Saltar",
        "Correr"
      ],
      "correct": "Aplaudir"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Jump\" es…",
      "options": [
        "Saltar",
        "Cantar",
        "Dormir"
      ],
      "correct": "Saltar"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Mueve tu cuerpo",
      "description": "Actívate con movimiento y partes del cuerpo.",
      "tasks": [
        "Toca tu cabeza diciendo \"Head\", tus manos diciendo \"Hands\" y tus pies diciendo \"Feet\".",
        "Da 3 saltos diciendo \"Jump! Jump! Jump!\".",
        "Aplaude fuerte diciendo \"Clap your hands!\"."
      ]
    }
  ],
  "jardin-familia": [
    {
      "type": "content",
      "emoji": "👨‍👩‍👧",
      "title": "My family",
      "description": "La familia en casa.",
      "items": [
        "Mommy (mamá)",
        "Daddy (papá)",
        "Baby (bebé)",
        "Me (yo)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Family words",
      "description": "Señala y repite.",
      "words": [
        {
          "word": "Family",
          "emoji": "🏡",
          "es": "Familia"
        },
        {
          "word": "Grandma",
          "emoji": "👵",
          "es": "Abuela"
        },
        {
          "word": "Grandpa",
          "emoji": "👴",
          "es": "Abuelo"
        },
        {
          "word": "Sister",
          "emoji": "👧",
          "es": "Hermana"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "The Finger Family",
      "description": "Canten con los dedos: daddy finger, mommy finger…",
      "videoUrl": "https://www.youtube.com/embed/eBVqcTEC3zQ"
    },
    {
      "type": "content",
      "emoji": "🖼️",
      "title": "Mi familia dibujada",
      "description": "Cada niño muestra su dibujo y nombra a su familia.",
      "examples": [
        "This is my mommy.",
        "This is my daddy.",
        "This is my baby brother."
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Grandma\" es…",
      "options": [
        "Abuela",
        "Mamá",
        "Hermana"
      ],
      "correct": "Abuela"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"This is my daddy\" significa…",
      "options": [
        "Este es mi papá",
        "Esta es mi mamá",
        "Este es mi perro"
      ],
      "correct": "Este es mi papá"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Abrazo familiar",
      "description": "Demuestra cariño a tu familia en inglés.",
      "tasks": [
        "Abraza a tu mamá o papá diciendo \"I love you Mommy / Daddy\".",
        "Señala una foto familiar y nombra a quién ves: \"Mom, Dad, Baby\".",
        "Canta la canción de los deditos de la familia (\"Finger Family\")."
      ]
    }
  ],
  "jardin-repaso": [
    {
      "type": "content",
      "emoji": "🎉",
      "title": "Big review!",
      "description": "Repaso de todo el año con fiesta.",
      "items": [
        "Hello / Bye-bye",
        "Colors: red, blue, yellow, green",
        "Numbers: one to ten",
        "Animals, toys, family"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Party words",
      "description": "Palabras de fiesta.",
      "words": [
        {
          "word": "Cake",
          "emoji": "🎂",
          "es": "Torta"
        },
        {
          "word": "Balloon",
          "emoji": "🎈",
          "es": "Globo"
        },
        {
          "word": "Music",
          "emoji": "🎶",
          "es": "Música"
        },
        {
          "word": "Happy",
          "emoji": "😄",
          "es": "Feliz"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "If You're Happy and You Know It",
      "description": "Canten y hagan las acciones de la fiesta.",
      "videoUrl": "https://www.youtube.com/embed/l4WNrvVjiTw"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Red\" es…",
      "options": [
        "Rojo",
        "Azul",
        "Verde"
      ],
      "correct": "Rojo"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Five\" es…",
      "options": [
        "5",
        "4",
        "9"
      ],
      "correct": "5"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Balloon\" es…",
      "options": [
        "Globo",
        "Torta",
        "Música"
      ],
      "correct": "Globo"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Gran fiesta del saber",
      "description": "Repasa lo mejor que aprendiste en Jardín.",
      "tasks": [
        "Dile a tus papás tu palabra favorita en inglés.",
        "Canta con tu familia la canción que más te gustó.",
        "Choca las cinco con todos en casa diciendo: \"Great job!\"."
      ]
    }
  ],
  "transicion-familia": [
    {
      "type": "content",
      "emoji": "👨‍👩‍👧",
      "title": "My family",
      "description": "La familia de cada niño.",
      "items": [
        "Mommy (mamá)",
        "Daddy (papá)",
        "Brother (hermano)",
        "Sister (hermana)"
      ],
      "examples": [
        "This is my mommy. (Esta es mi mamá.)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Family words",
      "description": "Señala y repite.",
      "words": [
        {
          "word": "Family",
          "emoji": "🏡",
          "es": "Familia"
        },
        {
          "word": "Baby",
          "emoji": "👶",
          "es": "Bebé"
        },
        {
          "word": "Grandma",
          "emoji": "👵",
          "es": "Abuela"
        },
        {
          "word": "Grandpa",
          "emoji": "👴",
          "es": "Abuelo"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "The Finger Family",
      "description": "Canten con los dedos: daddy finger, mommy finger…",
      "videoUrl": "https://www.youtube.com/embed/eBVqcTEC3zQ"
    },
    {
      "type": "content",
      "emoji": "🖼️",
      "title": "Dibuja tu familia",
      "description": "Cada niño dibuja su familia y nombra a cada uno en inglés.",
      "items": [
        "This is my daddy.",
        "This is my mommy.",
        "This is my brother.",
        "This is my sister."
      ],
      "examples": [
        "Teacher: Who is this? — Student: My mommy!"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"This is my mommy\" significa…",
      "options": [
        "Esta es mi mamá",
        "Este es mi perro",
        "Adiós mamá"
      ],
      "correct": "Esta es mi mamá"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "El hermano es…",
      "options": [
        "Brother",
        "Sister",
        "Baby"
      ],
      "correct": "Brother"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Mi familia en casa",
      "description": "Presenta a tu familia con orgullo.",
      "tasks": [
        "Presenta a alguien en casa diciendo: \"This is my mom\" o \"This is my dad\".",
        "Dibuja a tu familia reunida en la sala o comedor.",
        "Di en inglés: \"I love my family\"."
      ]
    }
  ],
  "transicion-cuerpo": [
    {
      "type": "content",
      "emoji": "🧒",
      "title": "My body",
      "description": "Partes del cuerpo con gestos.",
      "items": [
        "Head (cabeza)",
        "Hands (manos)",
        "Feet (pies)",
        "Eyes (ojos)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "More body parts",
      "description": "Toca cada parte mientras la dices.",
      "words": [
        {
          "word": "Nose",
          "emoji": "👃",
          "es": "Nariz"
        },
        {
          "word": "Mouth",
          "emoji": "👄",
          "es": "Boca"
        },
        {
          "word": "Ears",
          "emoji": "👂",
          "es": "Orejas"
        },
        {
          "word": "Arms",
          "emoji": "💪",
          "es": "Brazos"
        }
      ]
    },
    {
      "type": "vocabulary",
      "title": "Touch your…",
      "description": "La profe dice y todos señalan.",
      "words": [
        {
          "word": "Touch your head",
          "emoji": "🙋",
          "es": "Toca tu cabeza"
        },
        {
          "word": "Touch your nose",
          "emoji": "👃",
          "es": "Toca tu nariz"
        },
        {
          "word": "Clap your hands",
          "emoji": "👏",
          "es": "Aplaude"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "Head, Shoulders, Knees and Toes",
      "description": "Tocar cada parte mientras cantan.",
      "videoUrl": "https://www.youtube.com/embed/RuqvGiZi0qg"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "La profe dice \"Clap your hands\". ¿Qué haces?",
      "options": [
        "Aplaudir",
        "Dormir",
        "Saltar"
      ],
      "correct": "Aplaudir"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Eyes\" son…",
      "options": [
        "Los ojos",
        "Las orejas",
        "Los pies"
      ],
      "correct": "Los ojos"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Head, shoulders, knees & toes",
      "description": "Baila y señala las partes del cuerpo.",
      "tasks": [
        "Canta y baila \"Head, Shoulders, Knees and Toes\" frente al espejo.",
        "Toca tus ojos (\"Eyes\"), orejas (\"Ears\"), boca (\"Mouth\") y nariz (\"Nose\").",
        "Dibuja una carita feliz y señala cada parte aprendida."
      ]
    }
  ],
  "transicion-casa": [
    {
      "type": "content",
      "emoji": "🏠",
      "title": "My house",
      "description": "Las partes de la casa.",
      "items": [
        "House (casa)",
        "Door (puerta)",
        "Window (ventana)",
        "Roof (techo)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Rooms",
      "description": "Los cuartos de la casa.",
      "words": [
        {
          "word": "Kitchen",
          "emoji": "🍳",
          "es": "Cocina"
        },
        {
          "word": "Bedroom",
          "emoji": "🛏️",
          "es": "Cuarto"
        },
        {
          "word": "Bathroom",
          "emoji": "🚿",
          "es": "Baño"
        },
        {
          "word": "Living room",
          "emoji": "🛋️",
          "es": "Sala"
        }
      ]
    },
    {
      "type": "vocabulary",
      "title": "Home objects",
      "description": "Objetos de la casa.",
      "words": [
        {
          "word": "Bed",
          "emoji": "🛏️",
          "es": "Cama"
        },
        {
          "word": "Table",
          "emoji": "🪑",
          "es": "Mesa"
        },
        {
          "word": "Chair",
          "emoji": "💺",
          "es": "Silla"
        },
        {
          "word": "Lamp",
          "emoji": "💡",
          "es": "Lámpara"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "Rain Rain Go Away",
      "description": "La familia quiere jugar en casa mientras llueve.",
      "videoUrl": "https://www.youtube.com/embed/LFrKYjrIDs8"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Kitchen\" es…",
      "options": [
        "La cocina",
        "El baño",
        "La sala"
      ],
      "correct": "La cocina"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Door\" es…",
      "options": [
        "Puerta",
        "Ventana",
        "Techo"
      ],
      "correct": "Puerta"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Recorrido por mi casa",
      "description": "Nombra los espacios de tu hogar en inglés.",
      "tasks": [
        "Visita tu habitación diciendo \"Bedroom\" y la cocina diciendo \"Kitchen\".",
        "Dibuja la habitación de tu casa donde más te gusta jugar.",
        "Di a tu familia: \"Welcome to our home!\"."
      ]
    }
  ],
  "transicion-salon": [
    {
      "type": "content",
      "emoji": "🏫",
      "title": "My classroom",
      "description": "El salón de clases.",
      "items": [
        "Classroom (salón)",
        "Desk (escritorio)",
        "Board (tablero)",
        "Door (puerta)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Classroom objects",
      "description": "Objetos del salón.",
      "words": [
        {
          "word": "Book",
          "emoji": "📚",
          "es": "Libro"
        },
        {
          "word": "Pencil",
          "emoji": "✏️",
          "es": "Lápiz"
        },
        {
          "word": "Paper",
          "emoji": "📄",
          "es": "Papel"
        },
        {
          "word": "Backpack",
          "emoji": "🎒",
          "es": "Morral"
        }
      ]
    },
    {
      "type": "vocabulary",
      "title": "School places",
      "description": "Lugares de la escuela.",
      "words": [
        {
          "word": "School",
          "emoji": "🏫",
          "es": "Escuela"
        },
        {
          "word": "Playground",
          "emoji": "🛝",
          "es": "Parque"
        },
        {
          "word": "Garden",
          "emoji": "🌳",
          "es": "Jardín"
        },
        {
          "word": "Bathroom",
          "emoji": "🚻",
          "es": "Baño"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "This Is the Way We Go to School",
      "description": "El camino a la escuela.",
      "videoUrl": "https://www.youtube.com/embed/4XLQpRI_wOQ"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Backpack\" es…",
      "options": [
        "Morral",
        "Libro",
        "Tablero"
      ],
      "correct": "Morral"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "¿Dónde jugamos en el recreo?",
      "options": [
        "Playground",
        "Kitchen",
        "Bedroom"
      ],
      "correct": "Playground"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Mochila lista",
      "description": "Organiza tus útiles escolares para la clase.",
      "tasks": [
        "Revisa tu mochila y nombra 3 útiles: \"Book, pencil, notebook\".",
        "Dibuja un lápiz de tu color favorito.",
        "Deja tu cartuchera ordenada diciendo \"Everything is ready!\"."
      ]
    }
  ],
  "transicion-ropa-clima": [
    {
      "type": "content",
      "emoji": "👕",
      "title": "Clothes & weather",
      "description": "La ropa según el clima.",
      "items": [
        "Shirt (camisa)",
        "Pants (pantalón)",
        "Shoes (zapatos)",
        "Jacket (chaqueta)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Weather words",
      "description": "¿Cómo está el clima hoy?",
      "words": [
        {
          "word": "Sunny",
          "emoji": "☀️",
          "es": "Soleado"
        },
        {
          "word": "Rainy",
          "emoji": "🌧️",
          "es": "Lluvioso"
        },
        {
          "word": "Cold",
          "emoji": "🥶",
          "es": "Frío"
        },
        {
          "word": "Hot",
          "emoji": "🥵",
          "es": "Caliente"
        }
      ]
    },
    {
      "type": "vocabulary",
      "title": "More clothes",
      "description": "La ropa de cada clima.",
      "words": [
        {
          "word": "Hat",
          "emoji": "👒",
          "es": "Sombrero"
        },
        {
          "word": "Socks",
          "emoji": "🧦",
          "es": "Medias"
        },
        {
          "word": "Boots",
          "emoji": "👢",
          "es": "Botas"
        },
        {
          "word": "Sweater",
          "emoji": "🧶",
          "es": "Suéter"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "Put On Your Shoes",
      "description": "Pónganse los zapatos cantando.",
      "videoUrl": "https://www.youtube.com/embed/-jBfb33_KHU"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "Si está lluvioso (rainy) uso…",
      "options": [
        "Boots",
        "Hat",
        "Swimsuit"
      ],
      "correct": "Boots"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Sunny\" significa…",
      "options": [
        "Soleado",
        "Lluvioso",
        "Frío"
      ],
      "correct": "Soleado"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: El clima y mi ropa",
      "description": "Describe el clima de hoy y qué ropa llevas puesta.",
      "tasks": [
        "Mira por la ventana y di si hoy está \"Sunny\" (soleado) o \"Rainy\" (lluvioso).",
        "Señala tu ropa y nombra: \"Shirt\" (camiseta), \"Pants\" (pantalón) y \"Shoes\" (zapatos).",
        "Dobla una prenda de ropa con ayuda de un adulto."
      ]
    }
  ],
  "transicion-comidas": [
    {
      "type": "content",
      "emoji": "🍎",
      "title": "Food I like",
      "description": "Comidas y frutas.",
      "items": [
        "Apple (manzana)",
        "Banana (banano)",
        "Milk (leche)",
        "Bread (pan)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "More food",
      "description": "Señala lo que te gusta.",
      "words": [
        {
          "word": "Rice",
          "emoji": "🍚",
          "es": "Arroz"
        },
        {
          "word": "Soup",
          "emoji": "🍲",
          "es": "Sopa"
        },
        {
          "word": "Juice",
          "emoji": "🧃",
          "es": "Jugo"
        },
        {
          "word": "Water",
          "emoji": "💧",
          "es": "Agua"
        }
      ]
    },
    {
      "type": "content",
      "emoji": "💬",
      "title": "I like / I don't like",
      "description": "Cada niño dice lo que le gusta y no le gusta.",
      "examples": [
        "I like bananas! (¡Me gustan los bananos!)",
        "I don't like soup. (No me gusta la sopa.)"
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "Do You Like Broccoli Ice Cream?",
      "description": "Respondan Yes, I do! / No, I don't!",
      "videoUrl": "https://www.youtube.com/embed/frN3nvhIHUk"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"I like apples\" significa…",
      "options": [
        "Me gustan las manzanas",
        "No me gustan las manzanas",
        "Quiero agua"
      ],
      "correct": "Me gustan las manzanas"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Milk\" es…",
      "options": [
        "Leche",
        "Jugo",
        "Pan"
      ],
      "correct": "Leche"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Alimentos ricos",
      "description": "Expresa tus gustos de comida en inglés.",
      "tasks": [
        "En la cena di: \"I like...\" con una fruta o comida que te guste.",
        "Dibuja una manzana (\"Red apple\") o un plátano (\"Yellow banana\").",
        "Da las gracias en inglés: \"Thank you for the delicious food!\"."
      ]
    }
  ],
  "transicion-animales": [
    {
      "type": "content",
      "emoji": "🐕",
      "title": "Animals around me",
      "description": "Mascotas y animales del entorno.",
      "items": [
        "Dog (perro)",
        "Cat (gato)",
        "Bird (pájaro)",
        "Fish (pez)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Big and small",
      "description": "Descripciones sencillas.",
      "words": [
        {
          "word": "Big dog",
          "emoji": "🐕",
          "es": "Perro grande"
        },
        {
          "word": "Small cat",
          "emoji": "🐈",
          "es": "Gato pequeño"
        },
        {
          "word": "Big bird",
          "emoji": "🦜",
          "es": "Pájaro grande"
        },
        {
          "word": "Small fish",
          "emoji": "🐠",
          "es": "Pez pequeño"
        }
      ]
    },
    {
      "type": "vocabulary",
      "title": "Wild animals",
      "description": "Animales salvajes.",
      "words": [
        {
          "word": "Lion",
          "emoji": "🦁",
          "es": "León"
        },
        {
          "word": "Monkey",
          "emoji": "🐒",
          "es": "Mono"
        },
        {
          "word": "Elephant",
          "emoji": "🐘",
          "es": "Elefante"
        },
        {
          "word": "Snake",
          "emoji": "🐍",
          "es": "Serpiente"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "What Do You Hear?",
      "description": "Escuchen el sonido y digan el animal.",
      "videoUrl": "https://www.youtube.com/embed/YVgv1EFJZHc"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "El león es un animal…",
      "options": [
        "Wild (salvaje)",
        "Pet (mascota)",
        "Small"
      ],
      "correct": "Wild (salvaje)"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Elephant\" es…",
      "options": [
        "Elefante",
        "Mono",
        "Pájaro"
      ],
      "correct": "Elefante"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Mundo animal",
      "description": "Identifica animales domésticos y salvajes.",
      "tasks": [
        "Di qué animal te gusta más: \"I like the dog\" o \"I like the cat\".",
        "Dibuja un animal grande (\"Big lion\") y un animal pequeño (\"Small bird\").",
        "Haz el sonido de 3 animales para que tu familia los adivine."
      ]
    }
  ],
  "transicion-comunidad-repaso": [
    {
      "type": "content",
      "emoji": "🏘️",
      "title": "My community",
      "description": "Mi comunidad y su gente.",
      "items": [
        "Family (familia)",
        "Friends (amigos)",
        "Teacher (profe)",
        "School (escuela)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Community helpers",
      "description": "Quienes ayudan en la comunidad.",
      "words": [
        {
          "word": "Doctor",
          "emoji": "👨‍⚕️",
          "es": "Doctor"
        },
        {
          "word": "Police officer",
          "emoji": "👮",
          "es": "Policía"
        },
        {
          "word": "Firefighter",
          "emoji": "🚒",
          "es": "Bombero"
        },
        {
          "word": "Farmer",
          "emoji": "🧑‍🌾",
          "es": "Granjero"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "Hello Song (repaso)",
      "description": "Canten y saluden como al inicio del año.",
      "videoUrl": "https://www.youtube.com/embed/tVlcKp3bWH8"
    },
    {
      "type": "content",
      "emoji": "🏆",
      "title": "Repaso del año",
      "description": "Todo lo aprendido: familia, cuerpo, casa, salón, comida, animales.",
      "items": [
        "This is my mommy.",
        "Touch your nose!",
        "I like bananas.",
        "The lion is big."
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Firefighter\" es…",
      "options": [
        "Bombero",
        "Doctor",
        "Policía"
      ],
      "correct": "Bombero"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Touch your head\" significa…",
      "options": [
        "Toca tu cabeza",
        "Aplaude",
        "Salta"
      ],
      "correct": "Toca tu cabeza"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Ayudantes de la comunidad",
      "description": "Reconoce profesiones importantes de tu barrio.",
      "tasks": [
        "Nombra una profesión que te inspire: \"Teacher, Doctor o Firefighter\".",
        "Dibuja a un miembro de la comunidad ayudando a los demás.",
        "Comparte con tus papás 3 palabras nuevas que aprendiste en Transición."
      ]
    }
  ],
  "primero-instrucciones": [
    {
      "type": "content",
      "emoji": "🧑‍🏫",
      "title": "Classroom instructions",
      "description": "Instrucciones de clase: escucha y haz.",
      "items": [
        "Stand up (pararse)",
        "Sit down (sentarse)",
        "Open your book (abrir el libro)",
        "Listen (escuchar)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "More commands",
      "description": "Practica con gestos.",
      "words": [
        {
          "word": "Close your book",
          "emoji": "📕",
          "es": "Cierra el libro"
        },
        {
          "word": "Point to…",
          "emoji": "👉",
          "es": "Señala…"
        },
        {
          "word": "Raise your hand",
          "emoji": "✋",
          "es": "Levanta la mano"
        },
        {
          "word": "Line up",
          "emoji": "🚶",
          "es": "Formen fila"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "Action Song: Stand Up, Sit Down & Listen!",
      "description": "Canta y sigue las instrucciones escolares con movimiento corporal.",
      "videoUrl": "https://www.youtube.com/embed/dUXk8Nc5qQ8"
    },
    {
      "type": "content",
      "emoji": "🎮",
      "title": "Simon Says",
      "description": "Solo obedezcan si la profe dice \"Simon says\".",
      "items": [
        "Simon says: stand up!",
        "Simon says: touch your head!",
        "Simon says: point to the door!",
        "Sit down! (¡Trampa! No se paren)"
      ],
      "examples": [
        "Teacher: Simon says clap! — Everyone claps."
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "Teacher: \"Stand up, please!\" Los estudiantes…",
      "options": [
        "Se paran",
        "Se sientan",
        "Abren el libro"
      ],
      "correct": "Se paran"
    },
    {
      "type": "activity",
      "activityType": "fill",
      "prompt": "Completa: Teacher: \"___ your book, please.\" (abrir)",
      "answer": "Open",
      "placeholder": "Escribe el verbo…"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Raise your hand\" significa…",
      "options": [
        "Levanta la mano",
        "Cierra el libro",
        "Formen fila"
      ],
      "correct": "Levanta la mano"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Simon Says escolar",
      "description": "Juega en casa a dar y seguir instrucciones en inglés.",
      "tasks": [
        "Juega a \"Simon Says\" con tus hermanos o papás: \"Stand up, sit down, listen, clap!\".",
        "Escribe en tu cuaderno las dos palabras mágicas: \"Please\" y \"Thank you\".",
        "Dibuja a un estudiante levantando la mano en clase."
      ]
    }
  ],
  "primero-this-is-me": [
    {
      "type": "content",
      "emoji": "🙋",
      "title": "This is me!",
      "description": "Información personal básica.",
      "items": [
        "My name is Ana (Mi nombre es Ana)",
        "I am 7 years old (Tengo 7 años)",
        "I am from Colombia (Soy de Colombia)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Questions & answers",
      "description": "Modela con un estudiante y luego todos practican.",
      "words": [
        {
          "word": "What is your name?",
          "emoji": "❓",
          "es": "¿Cuál es tu nombre?"
        },
        {
          "word": "How old are you?",
          "emoji": "🎂",
          "es": "¿Cuántos años tienes?"
        },
        {
          "word": "I am seven years old",
          "emoji": "7️⃣",
          "es": "Tengo siete años"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "What's Your Name? Song",
      "description": "Aprende a presentarte y decir tu nombre y edad cantando.",
      "videoUrl": "https://www.youtube.com/embed/ALcL3MuU4xQ"
    },
    {
      "type": "vocabulary",
      "title": "Numbers 1-10",
      "description": "Cuenta con los dedos.",
      "words": [
        {
          "word": "One, two, three",
          "emoji": "1️⃣",
          "es": "Uno, dos, tres"
        },
        {
          "word": "Four, five, six",
          "emoji": "4️⃣",
          "es": "Cuatro, cinco, seis"
        },
        {
          "word": "Seven, eight",
          "emoji": "7️⃣",
          "es": "Siete, ocho"
        },
        {
          "word": "Nine, ten",
          "emoji": "🔟",
          "es": "Nueve, diez"
        }
      ]
    },
    {
      "type": "activity",
      "activityType": "fill",
      "prompt": "Completa: \"My ___ is Camila.\" (nombre)",
      "answer": "name",
      "placeholder": "Escribe la palabra…"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"How old are you?\" se responde con…",
      "options": [
        "I am 7 years old",
        "My name is Juan",
        "Goodbye"
      ],
      "correct": "I am 7 years old"
    },
    {
      "type": "activity",
      "activityType": "fill",
      "prompt": "Completa: \"I am ___ years old.\" (siete)",
      "answer": "seven",
      "placeholder": "Escribe el número en inglés…"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Mi tarjeta de identidad",
      "description": "Elabora tu carnet de presentación en inglés.",
      "tasks": [
        "Escribe en tu cuaderno: \"My name is [nombre]\" y \"I am [edad] years old\".",
        "Dibuja tu autorretrato con tu ropa escolar o favorita.",
        "Preséntate frente a tu familia diciendo las dos frases con voz clara."
      ]
    }
  ],
  "primero-describo-familia": [
    {
      "type": "content",
      "emoji": "👨‍👩‍👧‍👦",
      "title": "Describing my family",
      "description": "Cualidades físicas simples.",
      "items": [
        "Tall (alto/a)",
        "Short (bajo/a)",
        "Long hair (cabello largo)",
        "Short hair (cabello corto)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Describing words",
      "description": "Describe a tu familia.",
      "words": [
        {
          "word": "My mommy is tall",
          "emoji": "👩",
          "es": "Mi mamá es alta"
        },
        {
          "word": "My daddy is short",
          "emoji": "👨",
          "es": "Mi papá es bajo"
        },
        {
          "word": "My sister has long hair",
          "emoji": "👧",
          "es": "Mi hermana tiene cabello largo"
        },
        {
          "word": "My grandpa has short hair",
          "emoji": "👴",
          "es": "Mi abuelo tiene cabello corto"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "This Is My Family Song",
      "description": "Canción para identificar a los miembros de la familia y sus características.",
      "videoUrl": "https://www.youtube.com/embed/zMdq9jSaNLg"
    },
    {
      "type": "vocabulary",
      "title": "Eyes and hair colors",
      "description": "Colores de ojos y cabello.",
      "words": [
        {
          "word": "Black hair",
          "emoji": "⚫",
          "es": "Cabello negro"
        },
        {
          "word": "Brown hair",
          "emoji": "🟤",
          "es": "Cabello café"
        },
        {
          "word": "Blonde hair",
          "emoji": "🟡",
          "es": "Cabello rubio"
        },
        {
          "word": "Brown eyes",
          "emoji": "👁️",
          "es": "Ojos café"
        }
      ]
    },
    {
      "type": "content",
      "emoji": "🗣️",
      "title": "Describe y adivina",
      "description": "Un niño describe, los demás adivinan quién es.",
      "examples": [
        "She is tall. She has long hair. → ¡Es la profe!"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"My mommy is tall\" significa…",
      "options": [
        "Mi mamá es alta",
        "Mi mamá es baja",
        "Mi mamá es joven"
      ],
      "correct": "Mi mamá es alta"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Short hair\" es…",
      "options": [
        "Cabello corto",
        "Cabello largo",
        "Ser bajo"
      ],
      "correct": "Cabello corto"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Retrato descriptivo familiar",
      "description": "Describe a alguien de tu familia con palabras en inglés.",
      "tasks": [
        "Elige a un familiar y escribe: \"This is my [mom / dad]. He/She is [tall / short]\".",
        "Describe el color de su cabello: \"Black hair\" o \"Brown hair\".",
        "Léele tu tarjeta en inglés y pídele que te dé su visto bueno."
      ]
    }
  ],
  "primero-colores-numeros": [
    {
      "type": "content",
      "emoji": "🔢",
      "title": "Numbers 1-30",
      "description": "Contamos más lejos.",
      "items": [
        "Eleven (11)",
        "Twelve (12)",
        "Thirteen (13)",
        "Fourteen (14)",
        "Fifteen (15)",
        "Twenty (20)",
        "Thirty (30)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Colors review",
      "description": "Colores + objetos del salón.",
      "words": [
        {
          "word": "Blue book",
          "emoji": "📘",
          "es": "Libro azul"
        },
        {
          "word": "Red pencil",
          "emoji": "✏️",
          "es": "Lápiz rojo"
        },
        {
          "word": "Green board",
          "emoji": "🟩",
          "es": "Tablero verde"
        },
        {
          "word": "Yellow crayon",
          "emoji": "🖍️",
          "es": "Crayón amarillo"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "Numbers 1 to 20 Song",
      "description": "Cuenta del 1 al 20 cantando con ritmo y alegría.",
      "videoUrl": "https://www.youtube.com/embed/OEbRDtCAFdU"
    },
    {
      "type": "content",
      "emoji": "🎂",
      "title": "How old are you?",
      "description": "Practiquen con números hasta 30.",
      "examples": [
        "I am seven years old.",
        "I am eight years old.",
        "I am ten years old."
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Twelve\" es…",
      "options": [
        "12",
        "20",
        "2"
      ],
      "correct": "12"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "¿Cómo dices \"30\"?",
      "options": [
        "Thirty",
        "Thirteen",
        "Three"
      ],
      "correct": "Thirty"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Red pencil\" es…",
      "options": [
        "Lápiz rojo",
        "Libro azul",
        "Crayón amarillo"
      ],
      "correct": "Lápiz rojo"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Detective de números",
      "description": "Cuenta objetos cotidianos en casa en inglés.",
      "tasks": [
        "Cuenta cuántos zapatos o libros hay en tu cuarto y dilo en inglés (ej: \"Ten shoes\").",
        "Pregunta la edad a un familiar: \"How old are you?\".",
        "Escribe los números del 1 al 15 en inglés en tu cuaderno."
      ]
    }
  ],
  "primero-cuido-escuela": [
    {
      "type": "content",
      "emoji": "🌍",
      "title": "I care for my school",
      "description": "Cuido mi escuela y el planeta.",
      "items": [
        "Clean up (limpiar)",
        "Recycle (reciclar)",
        "Save water (ahorrar agua)",
        "Plant trees (sembrar árboles)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "The 3 Rs",
      "description": "Reduce, reuse, recycle.",
      "words": [
        {
          "word": "Reduce",
          "emoji": "📉",
          "es": "Reducir"
        },
        {
          "word": "Reuse",
          "emoji": "♻️",
          "es": "Reutilizar"
        },
        {
          "word": "Recycle",
          "emoji": "🗑️",
          "es": "Reciclar"
        },
        {
          "word": "Trash",
          "emoji": "🚮",
          "es": "Basura"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "Clean Up and Care Song",
      "description": "Canción para cuidar el aula de clase y reciclar.",
      "videoUrl": "https://www.youtube.com/embed/DR-cfDsHCGA"
    },
    {
      "type": "vocabulary",
      "title": "School care actions",
      "description": "Acciones para cuidar la escuela.",
      "words": [
        {
          "word": "Throw trash in the bin",
          "emoji": "🗑️",
          "es": "Bota la basura en la caneca"
        },
        {
          "word": "Turn off the lights",
          "emoji": "💡",
          "es": "Apaga las luces"
        },
        {
          "word": "Close the tap",
          "emoji": "🚰",
          "es": "Cierra la llave"
        },
        {
          "word": "Water the plants",
          "emoji": "🌱",
          "es": "Riega las plantas"
        }
      ]
    },
    {
      "type": "content",
      "emoji": "🎮",
      "title": "¿Buena o mala acción?",
      "description": "La profe muestra una acción y todos responden Good! o Not good!",
      "examples": [
        "Drawing on the wall → Not good!",
        "Throwing trash in the bin → Good!"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Recycle\" significa…",
      "options": [
        "Reciclar",
        "Limpiar",
        "Correr"
      ],
      "correct": "Reciclar"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "¿Qué haces con la basura?",
      "options": [
        "Throw it in the bin",
        "Turn off the lights",
        "Water the plants"
      ],
      "correct": "Throw it in the bin"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Misión ecológica en casa",
      "description": "Aplica el cuidado ambiental en tu hogar.",
      "tasks": [
        "Ayuda a ordenar tu espacio diciendo: \"Clean up, clean up!\".",
        "Separa con tu familia una botella o papel para reciclar (\"Recycle!\").",
        "Dibuja un cartel pequeño que diga \"Turn off the lights\" para la pared."
      ]
    }
  ],
  "primero-salon-objetos": [
    {
      "type": "content",
      "emoji": "🎒",
      "title": "My classroom",
      "description": "Objetos del salón.",
      "items": [
        "Desk (escritorio)",
        "Chair (silla)",
        "Board (tablero)",
        "Window (ventana)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "There is / There are",
      "description": "Hay uno → There is. Hay varios → There are.",
      "words": [
        {
          "word": "There is one desk",
          "emoji": "🪑",
          "es": "Hay un escritorio"
        },
        {
          "word": "There are many chairs",
          "emoji": "💺",
          "es": "Hay muchas sillas"
        },
        {
          "word": "There is a board",
          "emoji": "🟫",
          "es": "Hay un tablero"
        },
        {
          "word": "There are two windows",
          "emoji": "🪟",
          "es": "Hay dos ventanas"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "School Supplies Song",
      "description": "Reconoce lápices, libros y reglas con esta canción animada.",
      "videoUrl": "https://www.youtube.com/embed/0d6Ed3baRj8"
    },
    {
      "type": "vocabulary",
      "title": "School supplies",
      "description": "Útiles escolares.",
      "words": [
        {
          "word": "Scissors",
          "emoji": "✂️",
          "es": "Tijeras"
        },
        {
          "word": "Glue",
          "emoji": "🧴",
          "es": "Pega"
        },
        {
          "word": "Ruler",
          "emoji": "📏",
          "es": "Regla"
        },
        {
          "word": "Eraser",
          "emoji": "🧽",
          "es": "Borrador"
        }
      ]
    },
    {
      "type": "activity",
      "activityType": "fill",
      "prompt": "Completa: \"There ___ two windows.\" (varios)",
      "answer": "are",
      "placeholder": "is o are…"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Ruler\" es…",
      "options": [
        "Regla",
        "Tijeras",
        "Borrador"
      ],
      "correct": "Regla"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"There is a board\" significa…",
      "options": [
        "Hay un tablero",
        "Hay muchas sillas",
        "Hay dos ventanas"
      ],
      "correct": "Hay un tablero"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Mi cartuchera en acción",
      "description": "Reconoce tus útiles y escribe oraciones cortas.",
      "tasks": [
        "Abre tu cartuchera y nombra 4 útiles: \"Pencil, eraser, ruler, notebook\".",
        "Escribe una oración sencilla: \"There is one pencil in my backpack\".",
        "Deja tu bolso organizado para llegar con todo listo a la escuela."
      ]
    }
  ],
  "primero-compañeros": [
    {
      "type": "content",
      "emoji": "🧑‍🤝‍🧑",
      "title": "My classmates and me",
      "description": "Describimos a nuestros compañeros.",
      "items": [
        "He is tall (Él es alto)",
        "She is short (Ella es baja)",
        "He has black hair (Él tiene cabello negro)",
        "She has brown eyes (Ella tiene ojos café)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "He / She",
      "description": "He para él, She para ella.",
      "words": [
        {
          "word": "He is my friend",
          "emoji": "👦",
          "es": "Él es mi amigo"
        },
        {
          "word": "She is my friend",
          "emoji": "👧",
          "es": "Ella es mi amiga"
        },
        {
          "word": "He has curly hair",
          "emoji": "🌀",
          "es": "Él tiene cabello rizado"
        },
        {
          "word": "She has straight hair",
          "emoji": "➖",
          "es": "Ella tiene cabello liso"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "We Are Friends Song",
      "description": "Celebra la amistad y el compañerismo en el colegio.",
      "videoUrl": "https://www.youtube.com/embed/vXXiyIGqliE"
    },
    {
      "type": "content",
      "emoji": "🎮",
      "title": "¿Quién es?",
      "description": "Describan a un compañero y adivinen.",
      "examples": [
        "He is tall. He has short hair. → ¿Quién es?"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"She has curly hair\" significa…",
      "options": [
        "Ella tiene cabello rizado",
        "Él tiene cabello liso",
        "Ella es baja"
      ],
      "correct": "Ella tiene cabello rizado"
    },
    {
      "type": "activity",
      "activityType": "fill",
      "prompt": "Completa: \"___ is my friend.\" (para una niña)",
      "answer": "She",
      "placeholder": "He o She…"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Straight hair\" es…",
      "options": [
        "Cabello liso",
        "Cabello rizado",
        "Cabello corto"
      ],
      "correct": "Cabello liso"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Tarjeta para un amigo",
      "description": "Expresa valores de amistad y compañerismo.",
      "tasks": [
        "Piensa en tu amigo(a) de clase y escribe: \"My friend is happy and kind\".",
        "Hazle un dibujo de ambos compartiendo en el colegio.",
        "Prepárate para saludarlo mañana con una sonrisa: \"Hello, my good friend!\"."
      ]
    }
  ],
  "primero-repaso": [
    {
      "type": "content",
      "emoji": "🏁",
      "title": "Year review",
      "description": "Repaso final de 1°.",
      "items": [
        "Instructions: stand up, sit down, open your book",
        "Personal info: my name is…, I am 7",
        "Descriptions: tall, short, long hair",
        "Environment: recycle, save water"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Big word wall",
      "description": "Palabras del año.",
      "words": [
        {
          "word": "Listen",
          "emoji": "👂",
          "es": "Escuchar"
        },
        {
          "word": "Seven",
          "emoji": "7️⃣",
          "es": "Siete"
        },
        {
          "word": "Tall",
          "emoji": "📏",
          "es": "Alto"
        },
        {
          "word": "Recycle",
          "emoji": "♻️",
          "es": "Reciclar"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "Follow the Rules and Review Song",
      "description": "Repaso dinámico de todas las instrucciones y palabras del año.",
      "videoUrl": "https://www.youtube.com/embed/ckKQclquAXU"
    },
    {
      "type": "content",
      "emoji": "🎮",
      "title": "Trivia por equipos",
      "description": "Dos equipos compiten respondiendo.",
      "examples": [
        "Teacher: How do you say \"trece\"? — Team: Thirteen!"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Close your book\" significa…",
      "options": [
        "Cierra el libro",
        "Abre el libro",
        "Escucha"
      ],
      "correct": "Cierra el libro"
    },
    {
      "type": "activity",
      "activityType": "fill",
      "prompt": "Completa: \"My name ___ Sofía.\"",
      "answer": "is",
      "placeholder": "Escribe el verbo…"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Save water\" es…",
      "options": [
        "Ahorrar agua",
        "Sembrar árboles",
        "Reciclar"
      ],
      "correct": "Ahorrar agua"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Gran repaso del año",
      "description": "Demuestra todo tu talento bilingüe en casa.",
      "tasks": [
        "Di a tus papás tu nombre, tu edad y tus 3 colores favoritos sin mirar el cuaderno.",
        "Cuenta en inglés del 1 al 20 aplaudiendo con ritmo.",
        "Pide a un adulto que firme tu cuaderno con un mensaje de felicitación."
      ]
    }
  ],
  "segundo-cuerpo-familia": [
    {
      "type": "content",
      "emoji": "🧑‍🤝‍🧑",
      "title": "My body & my family",
      "description": "Repaso con acciones.",
      "items": [
        "I run (yo corro)",
        "I jump (yo salto)",
        "My brother runs (mi hermano corre)",
        "My sister sings (mi hermana canta)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Family actions",
      "description": "Une la acción con la persona.",
      "words": [
        {
          "word": "Mommy cooks",
          "emoji": "🍲",
          "es": "Mamá cocina"
        },
        {
          "word": "Daddy works",
          "emoji": "💼",
          "es": "Papá trabaja"
        },
        {
          "word": "I play",
          "emoji": "⚽",
          "es": "Yo juego"
        }
      ]
    },
    {
      "type": "vocabulary",
      "title": "Body parts review",
      "description": "Señala y di la palabra.",
      "words": [
        {
          "word": "Shoulders",
          "emoji": "🤷",
          "es": "Hombros"
        },
        {
          "word": "Knees",
          "emoji": "🦵",
          "es": "Rodillas"
        },
        {
          "word": "Toes",
          "emoji": "🦶",
          "es": "Dedos del pie"
        },
        {
          "word": "Fingers",
          "emoji": "🖐️",
          "es": "Dedos"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "Walking in the Jungle — Actions",
      "description": "Activen los movimientos de la canción.",
      "videoUrl": "https://www.youtube.com/embed/GoSq-yZcJ-4"
    },
    {
      "type": "content",
      "emoji": "🗣️",
      "title": "Di una frase",
      "description": "Cada estudiante dice una frase sobre su familia.",
      "examples": [
        "My mommy cooks.",
        "My daddy works.",
        "I play with my sister.",
        "I run with my brother."
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"I jump\" significa…",
      "options": [
        "Yo salto",
        "Yo como",
        "Yo duermo"
      ],
      "correct": "Yo salto"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Mi cuerpo y acciones",
      "description": "Describe habilidades y partes del cuerpo en familia.",
      "tasks": [
        "Señala 5 partes del cuerpo: \"Shoulders, knees, elbows, eyes, mouth\".",
        "Escribe una oración sobre alguien de tu familia: \"My brother can jump high\".",
        "Haz 5 saltos en un pie contando: \"One, two, three, four, five!\"."
      ]
    }
  ],
  "segundo-historias": [
    {
      "type": "content",
      "emoji": "📖",
      "title": "Story sequence",
      "description": "Ordena la historia con First, Then, Finally.",
      "items": [
        "First… (Primero…)",
        "Then… (Entonces…)",
        "Finally… (Finalmente…)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Story words",
      "description": "Palabras para contar historias.",
      "words": [
        {
          "word": "Beginning",
          "emoji": "🌅",
          "es": "Comienzo"
        },
        {
          "word": "Middle",
          "emoji": "⏱️",
          "es": "Mitad"
        },
        {
          "word": "End",
          "emoji": "🌇",
          "es": "Final"
        },
        {
          "word": "Character",
          "emoji": "🧒",
          "es": "Personaje"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "Story Sequence Song: First, Next, Last",
      "description": "Aprende a ordenar el inicio, desarrollo y final de una historia.",
      "videoUrl": "https://www.youtube.com/embed/4XLQpRI_wOQ"
    },
    {
      "type": "content",
      "emoji": "🐱",
      "title": "La historia del gatito",
      "description": "La profe cuenta con dibujos y los niños la re-cuentan.",
      "items": [
        "First, the kitten is hungry. (Primero, el gatito tiene hambre.)",
        "Then, he looks for milk. (Entonces, busca leche.)",
        "Finally, he drinks the milk. (Finalmente, toma la leche.)"
      ]
    },
    {
      "type": "content",
      "emoji": "🎨",
      "title": "Dibuja y cuenta",
      "description": "Cada niño dibuja 3 escenas y cuenta su historia.",
      "examples": [
        "First, the bird flies.",
        "Then, he sings.",
        "Finally, he sleeps."
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "¿Cómo empiezas a contar una historia?",
      "options": [
        "First…",
        "Finally…",
        "Goodbye"
      ],
      "correct": "First…"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "¿Cómo terminas una historia?",
      "options": [
        "Finally…",
        "First…",
        "Then…"
      ],
      "correct": "Finally…"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Mini historieta en 3 pasos",
      "description": "Crea una secuencia ilustrada de tu día a día.",
      "tasks": [
        "Dibuja 3 viñetas usando: \"First (primero)\", \"Then (luego)\" y \"Finally (al final)\".",
        "Escribe una acción en inglés debajo de cada dibujo (ej: \"Eat lunch\", \"Play\", \"Sleep\").",
        "Cuéntale la historia a tu familia en voz alta."
      ]
    }
  ],
  "segundo-casa-cosas": [
    {
      "type": "content",
      "emoji": "🏠",
      "title": "My house and my things",
      "description": "La casa y los objetos.",
      "items": [
        "Kitchen (cocina)",
        "Bedroom (cuarto)",
        "Bathroom (baño)",
        "Living room (sala)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "House objects",
      "description": "Objetos de cada cuarto.",
      "words": [
        {
          "word": "Bed",
          "emoji": "🛏️",
          "es": "Cama"
        },
        {
          "word": "Fridge",
          "emoji": "🧊",
          "es": "Nevera"
        },
        {
          "word": "Mirror",
          "emoji": "🪞",
          "es": "Espejo"
        },
        {
          "word": "Sofa",
          "emoji": "🛋️",
          "es": "Sofá"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "Parts of the House Song",
      "description": "Recorre y nombra cada habitación de la casa en inglés.",
      "videoUrl": "https://www.youtube.com/embed/loINl3Ln6Ck"
    },
    {
      "type": "vocabulary",
      "title": "Numbers 11-20",
      "description": "Contamos objetos de la casa.",
      "words": [
        {
          "word": "Eleven pillows",
          "emoji": "🛏️",
          "es": "Once almohadas"
        },
        {
          "word": "Twelve spoons",
          "emoji": "🥄",
          "es": "Doce cucharas"
        },
        {
          "word": "Thirteen toys",
          "emoji": "🧸",
          "es": "Trece juguetes"
        },
        {
          "word": "Twenty books",
          "emoji": "📚",
          "es": "Veinte libros"
        }
      ]
    },
    {
      "type": "content",
      "emoji": "🎮",
      "title": "I spy…",
      "description": "\"Veo, veo\" en inglés: la profe dice la inicial y los niños adivinan.",
      "examples": [
        "I spy with my little eye… something that starts with B! → Bed!"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Fridge\" es…",
      "options": [
        "Nevera",
        "Espejo",
        "Cama"
      ],
      "correct": "Nevera"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Twelve\" es…",
      "options": [
        "12",
        "20",
        "13"
      ],
      "correct": "12"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Plano de mi casa",
      "description": "Ubica habitaciones y objetos de tu vivienda.",
      "tasks": [
        "Dibuja un plano sencillo de tu casa con nombres: \"Living room, Kitchen, Bedroom, Bathroom\".",
        "Escribe una oración: \"There is a bed in my bedroom\".",
        "Cuenta cuántas puertas y ventanas hay en tu casa en inglés."
      ]
    }
  ],
  "segundo-quien-eres": [
    {
      "type": "content",
      "emoji": "🌍",
      "title": "Tell me about you",
      "description": "Información personal completa.",
      "items": [
        "My name is… (Mi nombre es…)",
        "I am 8 years old (Tengo 8 años)",
        "I am from Colombia (Soy de Colombia)",
        "I live in… (Vivo en…)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Questions",
      "description": "Preguntas y respuestas.",
      "words": [
        {
          "word": "Where are you from?",
          "emoji": "🗺️",
          "es": "¿De dónde eres?"
        },
        {
          "word": "I am from Colombia",
          "emoji": "🇨🇴",
          "es": "Soy de Colombia"
        },
        {
          "word": "Where do you live?",
          "emoji": "🏘️",
          "es": "¿Dónde vives?"
        },
        {
          "word": "How old are you?",
          "emoji": "🎂",
          "es": "¿Cuántos años tienes?"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "Where Are You From? Song",
      "description": "Practica preguntar y responder de qué país y ciudad eres.",
      "videoUrl": "https://www.youtube.com/embed/mXMofxtDPUQ"
    },
    {
      "type": "content",
      "emoji": "🎤",
      "title": "Entrevista",
      "description": "En parejas, se entrevistan con las preguntas.",
      "examples": [
        "A: What is your name? — B: My name is Luis. — A: Where are you from? — B: I am from Colombia."
      ]
    },
    {
      "type": "activity",
      "activityType": "fill",
      "prompt": "Completa: \"I am ___ Colombia.\" (de)",
      "answer": "from",
      "placeholder": "Escribe la palabra…"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Where are you from?\" se responde con…",
      "options": [
        "I am from Colombia",
        "I am 8 years old",
        "My name is Ana"
      ],
      "correct": "I am from Colombia"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"I live in Medellín\" significa…",
      "options": [
        "Vivo en Medellín",
        "Vengo de Medellín",
        "Me gusta Medellín"
      ],
      "correct": "Vivo en Medellín"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Pasaporte de identidad",
      "description": "Completa tu información personal y origen.",
      "tasks": [
        "Escribe en tu cuaderno: \"Name: [Tu nombre]\", \"Country: Colombia\", \"Language: Spanish and English\".",
        "Escribe con orgullo: \"I live in Colombia and I love learning English!\".",
        "Pregunta a tus familiares de qué ciudad o región son originarios."
      ]
    }
  ],
  "segundo-animales-habitats": [
    {
      "type": "content",
      "emoji": "🦁",
      "title": "Wild animals",
      "description": "Animales salvajes y lo que pueden hacer.",
      "items": [
        "The lion can run (El león puede correr)",
        "The bird can fly (El pájaro puede volar)",
        "The fish can swim (El pez puede nadar)",
        "The monkey can jump (El mono puede saltar)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Can / Can't",
      "description": "Puede / No puede.",
      "words": [
        {
          "word": "A fish can't fly",
          "emoji": "🐠",
          "es": "Un pez no puede volar"
        },
        {
          "word": "A bird can fly",
          "emoji": "🦜",
          "es": "Un pájaro puede volar"
        },
        {
          "word": "A snake can't run",
          "emoji": "🐍",
          "es": "Una serpiente no puede correr"
        },
        {
          "word": "A monkey can climb",
          "emoji": "🐒",
          "es": "Un mono puede trepar"
        }
      ]
    },
    {
      "type": "vocabulary",
      "title": "Habitats",
      "description": "¿Dónde viven?",
      "words": [
        {
          "word": "Jungle",
          "emoji": "🌴",
          "es": "Selva"
        },
        {
          "word": "Ocean",
          "emoji": "🌊",
          "es": "Océano"
        },
        {
          "word": "Forest",
          "emoji": "🌲",
          "es": "Bosque"
        },
        {
          "word": "Farm",
          "emoji": "🚜",
          "es": "Granja"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎵",
      "title": "Yes, I Can! (Animals)",
      "description": "¿Puedes correr? Yes, I can! / No, I can't!",
      "videoUrl": "https://www.youtube.com/embed/_Ir0Mc6Qilo"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"A bird can fly\" significa…",
      "options": [
        "Un pájaro puede volar",
        "Un pez nada",
        "Un león corre"
      ],
      "correct": "Un pájaro puede volar"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "El pez vive en el…",
      "options": [
        "Ocean",
        "Jungle",
        "Forest"
      ],
      "correct": "Ocean"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Ficha del reino animal",
      "description": "Investiga sobre un animal y su hábitat natural.",
      "tasks": [
        "Elige tu animal favorito y escribe: \"The [lion / dolphin / eagle] lives in the [jungle / ocean / mountains]\".",
        "Describe una cualidad: \"It is fast, strong or big\".",
        "Dibuja al animal en su hábitat natural con colores vivos."
      ]
    }
  ],
  "segundo-ropa-clima": [
    {
      "type": "content",
      "emoji": "👗",
      "title": "Clothes & weather",
      "description": "Lo que uso según el clima.",
      "items": [
        "I wear a jacket (Uso chaqueta)",
        "It is cold (Hace frío)",
        "I wear shorts (Uso pantaloneta)",
        "It is hot (Hace calor)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Weather",
      "description": "El clima de hoy.",
      "words": [
        {
          "word": "Sunny",
          "emoji": "☀️",
          "es": "Soleado"
        },
        {
          "word": "Rainy",
          "emoji": "🌧️",
          "es": "Lluvioso"
        },
        {
          "word": "Windy",
          "emoji": "💨",
          "es": "Ventoso"
        },
        {
          "word": "Cloudy",
          "emoji": "☁️",
          "es": "Nublado"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "Weather and Clothes Song",
      "description": "Qué ropa usar cuando hace sol, frío o lluvia.",
      "videoUrl": "https://www.youtube.com/embed/rD6FRDd9Hew"
    },
    {
      "type": "vocabulary",
      "title": "Clothes",
      "description": "La ropa del armario.",
      "words": [
        {
          "word": "T-shirt",
          "emoji": "👕",
          "es": "Camiseta"
        },
        {
          "word": "Dress",
          "emoji": "👗",
          "es": "Vestido"
        },
        {
          "word": "Sweater",
          "emoji": "🧶",
          "es": "Suéter"
        },
        {
          "word": "Raincoat",
          "emoji": "🧥",
          "es": "Impermeable"
        }
      ]
    },
    {
      "type": "content",
      "emoji": "🎮",
      "title": "¿Qué me pongo?",
      "description": "La profe dice un clima y los niños dicen la ropa.",
      "examples": [
        "It is rainy! → Raincoat and boots!",
        "It is sunny! → T-shirt and hat!"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "Si está nublado (cloudy) y frío, uso…",
      "options": [
        "Sweater",
        "Swimsuit",
        "Sandals"
      ],
      "correct": "Sweater"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Windy\" significa…",
      "options": [
        "Ventoso",
        "Lluvioso",
        "Soleado"
      ],
      "correct": "Ventoso"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Pronóstico del clima",
      "description": "Juega a ser presentador del clima en inglés.",
      "tasks": [
        "Mira el clima de hoy y di: \"Today it is [sunny / rainy / cold]\".",
        "Describe tu atuendo: \"I wear my [jacket / t-shirt / boots]\".",
        "Presenta el clima a tu familia como si estuvieras en el noticiero."
      ]
    }
  ],
  "segundo-festividades": [
    {
      "type": "content",
      "emoji": "🎉",
      "title": "Colombian celebrations",
      "description": "Festividades de nuestro país.",
      "items": [
        "Christmas (Navidad)",
        "Carnival (Carnaval)",
        "Independence Day (Día de la Independencia)",
        "Easter (Semana Santa)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Festival words",
      "description": "Palabras de las fiestas.",
      "words": [
        {
          "word": "Music",
          "emoji": "🎶",
          "es": "Música"
        },
        {
          "word": "Dance",
          "emoji": "💃",
          "es": "Baile"
        },
        {
          "word": "Costume",
          "emoji": "🎭",
          "es": "Disfraz"
        },
        {
          "word": "Parade",
          "emoji": "🥁",
          "es": "Desfile"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "Celebrations & Birthday Song",
      "description": "Canta sobre fiestas, cumpleaños y tradiciones familiares.",
      "videoUrl": "https://www.youtube.com/embed/13mftBvRmvM"
    },
    {
      "type": "vocabulary",
      "title": "Colombian festivals",
      "description": "Festivales colombianos.",
      "words": [
        {
          "word": "Barranquilla Carnival",
          "emoji": "🎭",
          "es": "Carnaval de Barranquilla"
        },
        {
          "word": "Flower Festival",
          "emoji": "🌸",
          "es": "Feria de las Flores"
        },
        {
          "word": "Black and White Carnival",
          "emoji": "🖤",
          "es": "Carnaval de Blancos y Negros"
        },
        {
          "word": "Candles Day",
          "emoji": "🕯️",
          "es": "Día de las Velitas"
        }
      ]
    },
    {
      "type": "content",
      "emoji": "🗣️",
      "title": "Mi festival favorito",
      "description": "Cada niño dice cuál es su festival favorito y por qué.",
      "examples": [
        "I like the Flower Festival. It is beautiful!"
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Parade\" es…",
      "options": [
        "Desfile",
        "Música",
        "Disfraz"
      ],
      "correct": "Desfile"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Candles Day\" es…",
      "options": [
        "Día de las Velitas",
        "Carnaval",
        "Navidad"
      ],
      "correct": "Día de las Velitas"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Tarjeta de celebración",
      "description": "Diseña una tarjeta festiva en inglés para alguien especial.",
      "tasks": [
        "Escribe en una tarjeta: \"Happy Birthday!\" o \"Happy Celebration! Best wishes for you\".",
        "Decórala con dibujos de globos, flores o serpentinas.",
        "Entrégasela a la persona especial y felicítala en inglés."
      ]
    }
  ],
  "segundo-cuento-historia": [
    {
      "type": "content",
      "emoji": "📚",
      "title": "Tell your story",
      "description": "Cuento mi historia con imágenes.",
      "items": [
        "First… (Primero…)",
        "Then… (Entonces…)",
        "After that… (Después…)",
        "Finally… (Finalmente…)"
      ]
    },
    {
      "type": "vocabulary",
      "title": "Story words review",
      "description": "Repaso para contar historias.",
      "words": [
        {
          "word": "Happy",
          "emoji": "😄",
          "es": "Feliz"
        },
        {
          "word": "Sad",
          "emoji": "😢",
          "es": "Triste"
        },
        {
          "word": "Scared",
          "emoji": "😨",
          "es": "Asustado"
        },
        {
          "word": "Surprised",
          "emoji": "😲",
          "es": "Sorprendido"
        }
      ]
    },
    {
      "type": "song",
      "emoji": "🎬",
      "title": "The Tortoise and the Hare Fable",
      "description": "Cuento clásico animado en inglés con moraleja sobre la perseverancia.",
      "videoUrl": "https://www.youtube.com/embed/4XLQpRI_wOQ"
    },
    {
      "type": "content",
      "emoji": "🎨",
      "title": "Mi historia en 3 dibujos",
      "description": "Cada niño cuenta su historia con sus dibujos.",
      "examples": [
        "First, the puppy plays in the park.",
        "Then, he is sad because he is lost.",
        "Finally, he finds his family."
      ]
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"After that\" significa…",
      "options": [
        "Después",
        "Primero",
        "Finalmente"
      ],
      "correct": "Después"
    },
    {
      "type": "activity",
      "activityType": "fill",
      "prompt": "Completa: \"___, the puppy plays.\" (primero)",
      "answer": "First",
      "placeholder": "Escribe la palabra…"
    },
    {
      "type": "activity",
      "activityType": "choice",
      "question": "\"Surprised\" es…",
      "options": [
        "Sorprendido",
        "Triste",
        "Feliz"
      ],
      "correct": "Sorprendido"
    },
    {
      "type": "homework",
      "emoji": "🏠",
      "title": "Homework: Medalla de fin de grado",
      "description": "Reflexiona sobre tu aprendizaje en segundo grado.",
      "tasks": [
        "Dibuja una medalla y escribe en el centro: \"English Star - 2nd Grade\".",
        "Escribe las 5 palabras o frases que más te gustó aprender este año.",
        "Agradece a tu profesor(a) y papás diciendo: \"Thank you for supporting me!\"."
      ]
    }
  ]
};
