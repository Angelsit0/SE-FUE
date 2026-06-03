/**
 * LevelData.js - All 4 levels with problems and validation logic
 * Game: ¿SE FUE?
 * Layer: Model (MVC)
 */

export const LEVELS = [
  {
    id: 1,
    title: 'NIVEL 1: LÓGICA PROPOSICIONAL BÁSICA',
    location: 'Parpadeo en la Biblioteca',
    locationIcon: '📚',
    type: 'logic', // 'logic' or 'venn'
    description: 'El sistema detecta una fluctuación en el sector de la Biblioteca. Evalúe la siguiente expresión lógica para estabilizar el circuito.',
    variables: { p: false, q: true },
    expression: 'p ∨ q',
    expressionDetail: 'p = FALSO, q = VERDADERO',
    expectedAnswer: true, // true = VERDADERO button
    backgroundImage: 'assets/backgrounds/level1_biblioteca.jpg'
  },
  {
    id: 2,
    title: 'NIVEL 2: TEORÍA DE CONJUNTOS BÁSICA',
    location: 'Desvío hacia Odontología',
    locationIcon: '🏥',
    type: 'venn',
    description: 'Se requiere redirigir la energía al sector de Odontología. Seleccione las regiones correctas del diagrama de Venn.',
    sets: ['A', 'B'],
    operation: 'A ∪ B',
    operationDetail: 'Unión: seleccione TODAS las regiones de ambos conjuntos',
    // For 2-set Venn: regions are 'A_only', 'AB', 'B_only'
    expectedRegions: ['A_only', 'AB', 'B_only'], // A union B = all regions
    backgroundImage: 'assets/backgrounds/level2_odontologia.jpg'
  },
  {
    id: 3,
    title: 'NIVEL 3: LÓGICA PROPOSICIONAL AVANZADA',
    location: 'Leyes de Morgan',
    locationIcon: '⚙️',
    type: 'logic',
    description: 'Falla crítica detectada. Aplique las Leyes de De Morgan para evaluar la expresión y purgar el sistema.',
    variables: { p: true, q: false },
    expression: '¬(p ∧ ¬q)',
    expressionDetail: 'p = VERDADERO, q = FALSO',
    expectedAnswer: false, // false = FALSO button
    backgroundImage: 'assets/backgrounds/level3_laboratorio.jpg'
  },
  {
    id: 4,
    title: 'NIVEL 4: TEORÍA DE CONJUNTOS AVANZADA',
    location: 'Colapso del Rectorado',
    locationIcon: '🏛️',
    type: 'venn',
    description: 'El Rectorado está al borde del colapso total. Opere el diagrama de Venn de 3 conjuntos con precisión absoluta.',
    sets: ['A', 'B', 'C'],
    operation: '(A ∩ C) − B',
    operationDetail: 'Intersección de A y C, excluyendo todo lo que esté en B',
    // For 3-set Venn: regions are 'A_only', 'B_only', 'C_only', 'AB_only', 'AC_only', 'BC_only', 'ABC'
    expectedRegions: ['AC_only'], // (A intersect C) minus B = only AC without B
    backgroundImage: 'assets/backgrounds/level4_rectorado.jpg'
  }
];

export function validateLogicAnswer(levelIndex, answer) {
  const level = LEVELS[levelIndex];
  if (level.type !== 'logic') return false;
  return answer === level.expectedAnswer;
}

export function validateVennAnswer(levelIndex, selectedRegions) {
  const level = LEVELS[levelIndex];
  if (level.type !== 'venn') return false;
  const expected = [...level.expectedRegions].sort();
  const selected = [...selectedRegions].sort();
  if (expected.length !== selected.length) return false;
  return expected.every((region, i) => region === selected[i]);
}
