"""
Curriculo institucional por DBA (Derechos Basicos de Aprendizaje) del MEN.

Crea los grados del proyecto (Jardin, Transicion, 1o y 2o de primaria),
registra los DBA oficiales de la cartilla "Ingles grados Transicion a 5o
de primaria" (MEN, Colombia) y genera las unidades iniciales del primer
periodo escolar. Es idempotente: puede ejecutarse varias veces.
"""
from django.core.management.base import BaseCommand

from apps.learning.models import Grade, Module

GRADES = [
    {
        'code': 'jardin',
        'name': 'Jardin',
        'order': 1,
        'description': (
            'Apropiacion ludica del ingles: saludos, objetos cercanos, '
            'partes del cuerpo y follow-through de instrucciones sencillas '
            'por medio de canciones, juegos y rutinas de salon.'
        ),
    },
    {
        'code': 'transicion',
        'name': 'Transicion',
        'order': 2,
        'description': (
            'Identificacion de palabras del entorno inmediato: saludos, '
            'despedidas, familia, cuerpo y jugadoras/jugadores de la casa '
            'y el salon, a partir de imagenes, canciones y juegos.'
        ),
    },
    {
        'code': 'primero',
        'name': 'Primero',
        'order': 3,
        'description': (
            'Respuesta a instrucciones de clase, informacion personal '
            'sencilla, cualidades fisicas propias y de sus companeros, '
            'objetos de la escuela y cuidado del entorno.'
        ),
    },
    {
        'code': 'segundo',
        'name': 'Segundo',
        'order': 4,
        'description': (
            'Expresion de ideas sencillas sobre temas estudiados, '
            'comprension de historias cortas, intercambio de informacion '
            'personal y menciona de aspectos culturales del entorno.'
        ),
    },
]

# DBA oficiales de la cartilla MEN "Derechos Basicos de Aprendizaje de
# Ingles - grados Transicion a 5o de primaria" (Transicion, 1o y 2o).
# Jardin no tiene DBA oficiales: se usan referentes de preescolar.
DBAS = {
    'transicion': [
        'Construye su identidad en relacion con los otros; se siente miembro de su familia y de su comunidad y reconoce palabras propias de estos entornos en ingles.',  # noqa: E501
        'Identifica palabras en ingles que son relacionadas entre si sobre temas que le son familiares.',
        'Asocia imagenes con sonidos de palabras relacionadas con su casa y salon de clases.',
    ],
    'primero': [
        'Comprende y responde a instrucciones sobre tareas escolares basicas, de manera verbal y no verbal.',
        'Expresa oralmente algunas cualidades fisicas propias y de las personas que le rodean, a traves de palabras y frases previamente estudiadas.',
        'Comprende y realiza declaraciones sencillas, y pone en practica estrategias de cuidado del medio ambiente en la escuela.',
        'Responde preguntas sencillas sobre informacion personal basica, como su nombre, edad, familia y companeros de clase.',
    ],
    'segundo': [
        'Expresa ideas sencillas sobre temas estudiados, usando palabras y frases.',
        'Comprende la secuencia de una historia corta y sencilla sobre temas familiares, y la cuenta nuevamente a partir de ilustraciones y palabras conocidas.',
        'Intercambia informacion personal como su nombre, edad y procedencia con companeros y profesores, usando frases sencillas, siguiendo modelos provistos por el docente.',  # noqa: E501
        'Menciona aspectos culturales propios de su entorno, usando vocabulario y expresiones conocidas.',
    ],
}

# Plan anual completo: 4 periodos x 2 unidades por grado.
# `dba_number` referencia la lista DBAS (o None para referentes de Jardin).
# `ready` marca las unidades con slides terminadas en el frontend.
UNITS = {
    'jardin': [
        {'week_number': 1, 'period': 1, 'dba_number': None, 'ready': True,
         'title': 'Hello! Saludos y rutinas de salón',
         'subtitle': 'Greetings • Hello/Bye-bye • My name is...',
         'dba_text': 'Saluda y responde a su nombre con gestos y frases modeladas (referente preescolar).'},
        {'week_number': 2, 'period': 1, 'dba_number': 2, 'ready': True,
         'title': 'Colores y objetos del salón', 'subtitle': 'Colors • School objects'},
        {'week_number': 3, 'period': 2, 'dba_number': 2,
         'title': 'Números del 1 al 10', 'subtitle': 'Numbers • Counting fingers • One, two, three!'},
        {'week_number': 4, 'period': 2, 'dba_number': 2,
         'title': 'Mis juguetes', 'subtitle': 'Toys • Ball, doll, car • I like…'},
        {'week_number': 5, 'period': 3, 'dba_number': 2,
         'title': 'Animales de la granja', 'subtitle': 'Farm animals • Cow, dog, cat • Animal sounds'},
        {'week_number': 6, 'period': 3, 'dba_number': 3,
         'title': 'Mi cuerpo se mueve', 'subtitle': 'Body parts • Jump, run, clap'},
        {'week_number': 7, 'period': 4, 'dba_number': 1,
         'title': 'La familia en casa', 'subtitle': 'Family • Mommy, daddy, baby'},
        {'week_number': 8, 'period': 4, 'dba_number': 3,
         'title': 'Celebramos y repaso', 'subtitle': 'Review • Hello, colors, numbers • Party words'},
    ],
    'transicion': [
        {'week_number': 1, 'period': 1, 'dba_number': 1, 'ready': True,
         'title': 'Mi familia y yo',
         'subtitle': 'Family members • This is my mommy/daddy'},
        {'week_number': 2, 'period': 1, 'dba_number': 2, 'ready': True,
         'title': 'Mi cuerpo habla',
         'subtitle': 'Body parts • Head, shoulders, knees and toes'},
        {'week_number': 3, 'period': 2, 'dba_number': 3,
         'title': 'Mi casa', 'subtitle': 'House • Rooms and objects • Home words'},
        {'week_number': 4, 'period': 2, 'dba_number': 3,
         'title': 'Mi salón de clases', 'subtitle': 'Classroom objects • School words'},
        {'week_number': 5, 'period': 3, 'dba_number': 2,
         'title': 'Ropa y clima', 'subtitle': 'Clothes • Hot, cold • Put on your…'},
        {'week_number': 6, 'period': 3, 'dba_number': 2,
         'title': 'Comidas que me gustan', 'subtitle': 'Food • Fruits • I like / I don\'t like'},
        {'week_number': 7, 'period': 4, 'dba_number': 2,
         'title': 'Animales de mi entorno', 'subtitle': 'Pets and wild animals • Big, small'},
        {'week_number': 8, 'period': 4, 'dba_number': 1,
         'title': 'Mi comunidad y repaso', 'subtitle': 'Community • Review family, body, house'},
    ],
    'primero': [
        {'week_number': 1, 'period': 1, 'dba_number': 1, 'ready': True,
         'title': 'Classroom instructions',
         'subtitle': 'Stand up • Sit down • Open your book • Listen'},
        {'week_number': 2, 'period': 1, 'dba_number': 4, 'ready': True,
         'title': 'This is me!',
         'subtitle': 'My name is... • I am 7 years old • Personal information'},
        {'week_number': 3, 'period': 2, 'dba_number': 2,
         'title': 'Describo a mi familia',
         'subtitle': 'Physical descriptions • Tall, short • His/Her hair is…'},
        {'week_number': 4, 'period': 2, 'dba_number': 4,
         'title': 'Colores, números y edad',
         'subtitle': 'Colors • Numbers 1-30 • How old are you?'},
        {'week_number': 5, 'period': 3, 'dba_number': 3,
         'title': 'Cuido mi escuela',
         'subtitle': 'School care • Clean up • Reduce, reuse, recycle'},
        {'week_number': 6, 'period': 3, 'dba_number': 3,
         'title': 'Mi salón y mis objetos',
         'subtitle': 'Classroom objects • There is / There are'},
        {'week_number': 7, 'period': 4, 'dba_number': 2,
         'title': 'Mis compañeros y yo',
         'subtitle': 'My classmates • He is… / She is… • Qualities'},
        {'week_number': 8, 'period': 4, 'dba_number': 1,
         'title': 'Repaso del año',
         'subtitle': 'Review • Instructions, personal info, descriptions'},
    ],
    'segundo': [
        {'week_number': 1, 'period': 1, 'dba_number': 1, 'ready': True,
         'title': 'Mi cuerpo y mi familia',
         'subtitle': 'Body parts • Family members • Actions'},
        {'week_number': 2, 'period': 1, 'dba_number': 2, 'ready': True,
         'title': 'Historias cortas con imágenes',
         'subtitle': 'Story sequence • First, then, finally'},
        {'week_number': 3, 'period': 2, 'dba_number': 1,
         'title': 'Mi casa y mis cosas',
         'subtitle': 'House parts • Objects • Numbers 11-20'},
        {'week_number': 4, 'period': 2, 'dba_number': 3,
         'title': 'Cuéntame quién eres',
         'subtitle': 'Personal information • Where are you from?'},
        {'week_number': 5, 'period': 3, 'dba_number': 1,
         'title': 'Animales y hábitats',
         'subtitle': 'Wild animals • Can/Can\'t • Habitats'},
        {'week_number': 6, 'period': 3, 'dba_number': 1,
         'title': 'La ropa y el clima',
         'subtitle': 'Clothes • Weather • I wear…'},
        {'week_number': 7, 'period': 4, 'dba_number': 4,
         'title': 'Festividades de Colombia',
         'subtitle': 'Cultural celebrations • Carnival, Christmas'},
        {'week_number': 8, 'period': 4, 'dba_number': 2,
         'title': 'Cuento mi historia',
         'subtitle': 'Review • Tell a short story with pictures'},
    ],
}


class Command(BaseCommand):
    help = 'Crea grados institucionales, DBA oficiales y unidades iniciales (idempotente).'

    def handle(self, *args, **options):
        created_grades = 0
        created_modules = 0

        for spec in GRADES:
            grade, was_created = Grade.objects.update_or_create(
                code=spec['code'],
                defaults={
                    'name': spec['name'],
                    'description': spec['description'],
                    'order': spec['order'],
                    'is_active': True,
                },
            )
            if was_created:
                created_grades += 1

            dba_list = DBAS.get(spec['code'], [])
            for unit in UNITS.get(spec['code'], []):
                dba_number = unit.get('dba_number')
                dba_text = unit.get('dba_text') or (
                    dba_list[dba_number - 1] if dba_number and 1 <= dba_number <= len(dba_list) else ''
                )
                subtitle = unit['subtitle']
                if not unit.get('ready') and 'En preparación' not in subtitle:
                    subtitle = f"{subtitle} — en preparación"
                _, module_created = Module.objects.update_or_create(
                    grade=grade,
                    week_number=unit['week_number'],
                    title=unit['title'],
                    defaults={
                        'subtitle': subtitle,
                        'slide_route': f"/{spec['code']}/unidad-{unit['week_number']}",
                        'period': unit['period'],
                        'dba_number': dba_number,
                        'dba_text': dba_text,
                        'order': unit['week_number'],
                        'is_active': True,
                    },
                )
                if module_created:
                    created_modules += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Curriculo DBA listo. Grados creados: {created_grades}. '
                f'Unidades creadas: {created_modules}.'
            )
        )
