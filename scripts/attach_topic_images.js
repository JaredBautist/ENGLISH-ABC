const { loadUnitSlides, saveUnitSlides } = require('./lib/unit_slides_store.cjs');


const unitImageMap = {
  'jardin-hello': '/topics/greetings.jpg',
  'jardin-colores': '/topics/colors.jpg',
  'jardin-numeros': '/topics/numbers.jpg',
  'jardin-juguetes': '/topics/toys.jpg',
  'jardin-animales': '/topics/farm_animals.jpg',
  'jardin-cuerpo-mueve': '/topics/body_parts.jpg',
  'jardin-familia': '/topics/family.jpg',
  'jardin-repaso': '/topics/classroom.jpg',
  'transicion-familia': '/topics/family.jpg',
  'transicion-cuerpo': '/topics/body_parts.jpg',
  'transicion-casa': '/topics/house.jpg',
  'transicion-salon': '/topics/classroom.jpg',
  'transicion-ropa-clima': '/topics/weather.jpg',
  'transicion-comidas': '/topics/food.jpg',
  'transicion-animales': '/topics/farm_animals.jpg',
  'transicion-comunidad-repaso': '/topics/community_helpers.jpg',
  'primero-instrucciones': '/topics/classroom.jpg',
  'primero-this-is-me': '/topics/greetings.jpg',
  'primero-describo-familia': '/topics/family.jpg',
  'primero-colores-numeros': '/topics/numbers.jpg',
  'primero-cuido-escuela': '/topics/school_care.jpg',
  'primero-salon-objetos': '/topics/classroom.jpg',
  'primero-compañeros': '/topics/school_care.jpg',
  'primero-repaso': '/topics/stories.jpg',
  'segundo-cuerpo-familia': '/topics/family.jpg',
  'segundo-historias': '/topics/stories.jpg',
  'segundo-casa-cosas': '/topics/house.jpg',
  'segundo-quien-eres': '/topics/routines.jpg',
  'segundo-animales-habitats': '/topics/wild_animals.jpg',
  'segundo-ropa-clima': '/topics/clothes.jpg',
  'segundo-festividades': '/topics/celebration.jpg',
  'segundo-cuento-historia': '/topics/stories.jpg'
};

const unitSlides = loadUnitSlides();

let count = 0;
for (const [unitKey, imgUrl] of Object.entries(unitImageMap)) {
  if (unitSlides[unitKey]) {
    const slides = unitSlides[unitKey];
    // Find the first content slide
    const firstContentSlide = slides.find(s => s.type === 'content');
    if (firstContentSlide) {
      firstContentSlide.image = imgUrl;
      count++;
    }
  }
}

console.log(`Attached topic images to ${count} unit content slides.`);

saveUnitSlides(unitSlides);
console.log('Successfully updated grade slide files!');
