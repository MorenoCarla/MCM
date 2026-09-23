/** Editá el campo `icon` de cada categoría con el emoji que quieras */
export const CATEGORIES = [
  {
    id: 'misa',
    name: 'Misa',
    icon: '✝️',
    description: 'Canciones por momento de la Eucaristía',
    hasMoments: true,
    color: '#4aabcc',
  },
  {
    id: 'adoracion',
    name: 'Adoración',
    icon: '🕯️',
    description: 'Eucaristía expuesta, silencio y contemplación',
    hasMoments: false,
    color: '#7b68c4',
  },
  {
    id: 'alabanza',
    name: 'Alabanza',
    icon: '🙌🏻',
    description: 'Animación, encuentros y retiros',
    hasMoments: false,
    color: '#52b788',
  },
  {
    id: 'maria',
    name: 'María',
    icon: '🌹',
    description: 'Canciones marianas del movimiento',
    hasMoments: false,
    color: '#e07a8f',
  },
  {
    id: 'otros',
    name: 'Pascua/Otros',
    icon: '📖',
    description: 'Canciones de Pascua y repertorio general del coro',
    hasMoments: false,
    color: '#8a9ba8',
  },
];
export const MISA_MOMENTS = [
  { id: 'entrada', name: 'Entrada', description: 'Canto de entrada / procesional' },
  { id: 'kyrie', name: 'Señor, ten piedad', description: 'Rito penitencial' },
  { id: 'gloria', name: 'Gloria', description: 'Gloria al Padre' },
  { id: 'salmo', name: 'Salmo responsorial', description: 'Después de la primera lectura' },
  { id: 'aleluya', name: 'Aleluya', description: 'Antes del Evangelio' },
  { id: 'ofertorio', name: 'Ofertorio', description: 'Preparación de la mesa / ofrendas' },
  { id: 'santo', name: 'Santo', description: 'Santo, Santo, Santo' },
  { id: 'cordero', name: 'Cordero de Dios', description: 'Agnus Dei' },
  { id: 'comunion', name: 'Comunión', description: 'Canto durante la comunión' },
  { id: 'accion-gracias', name: 'Acción de gracias', description: 'Después de la comunión' },
  { id: 'salida', name: 'Salida', description: 'Canto final / envío' },
];

export function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}

export function getMomentById(id) {
  return MISA_MOMENTS.find((m) => m.id === id);
}

export function getMomentsForCategory(categoryId) {
  if (categoryId === 'misa') return MISA_MOMENTS;
  return [];
}
