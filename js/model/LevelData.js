/**
 * LevelData.js - 5 levels with random problem pools and validation logic
 * Game: ¿SE FUE?
 * Layer: Model (MVC)
 */

export const LEVELS = [
  {
    id: 1,
    title: 'NIVEL 1: LÓGICA PROPOSICIONAL BÁSICA',
    location: 'Parpadeo en la Biblioteca',
    locationIcon: '📚',
    backgroundImage: 'assets/backgrounds/level1_biblioteca.jpg',
    problems: [
      { type: 'logic', description: '[CÓDIGO L1-A] Busca este código en la PÁGINA 2 del manual para saber la respuesta.', variables: { p: false, q: true }, expression: 'p O q (p ∨ q)', expressionDetail: 'p = FALSO, q = VERDADERO', expectedAnswer: true },
      { type: 'logic', description: '[CÓDIGO L1-B] Busca este código en la PÁGINA 2 del manual para saber la respuesta.', variables: { p: true, q: false }, expression: 'p Y q (p ∧ q)', expressionDetail: 'p = VERDADERO, q = FALSO', expectedAnswer: false },
      { type: 'logic', description: '[CÓDIGO L1-C] Busca este código en la PÁGINA 2 del manual para saber la respuesta.', variables: { p: true }, expression: 'NO p (¬p)', expressionDetail: 'p = VERDADERO', expectedAnswer: false },
      { type: 'logic', description: '[CÓDIGO L1-D] Busca este código en la PÁGINA 2 del manual para saber la respuesta.', variables: { p: false, q: false }, expression: 'p O q (p ∨ q)', expressionDetail: 'p = FALSO, q = FALSO', expectedAnswer: false },
      { type: 'logic', description: '[CÓDIGO L1-E] Busca este código en la PÁGINA 2 del manual para saber la respuesta.', variables: { p: true, q: true }, expression: 'p Y q (p ∧ q)', expressionDetail: 'p = VERDADERO, q = VERDADERO', expectedAnswer: true }
    ]
  },
  {
    id: 2,
    title: 'NIVEL 2: CONJUNTOS BÁSICOS',
    location: 'Desvío hacia Odontología',
    locationIcon: '🏥',
    backgroundImage: 'assets/backgrounds/level2_odontologia.jpg',
    problems: [
      { type: 'venn', description: '[CÓDIGO L2-A] Busca este código en la PÁGINA 3 del manual para saber qué círculos presionar.', sets: ['A', 'B'], operation: 'A UNIÓN B (A ∪ B)', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only', 'AB', 'B_only'] },
      { type: 'venn', description: '[CÓDIGO L2-B] Busca este código en la PÁGINA 3 del manual para saber qué círculos presionar.', sets: ['A', 'B'], operation: 'A INTERSECCIÓN B (A ∩ B)', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['AB'] },
      { type: 'venn', description: '[CÓDIGO L2-C] Busca este código en la PÁGINA 3 del manual para saber qué círculos presionar.', sets: ['A', 'B'], operation: 'A MENOS B (A − B)', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only'] },
      { type: 'venn', description: '[CÓDIGO L2-D] Busca este código en la PÁGINA 3 del manual para saber qué círculos presionar.', sets: ['A', 'B'], operation: 'B MENOS A (B − A)', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['B_only'] },
      { type: 'venn', description: '[CÓDIGO L2-E] Busca este código en la PÁGINA 3 del manual para saber qué círculos presionar.', sets: ['A', 'B'], operation: 'A UNIÓN B (A ∪ B)', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only', 'AB', 'B_only'] }
    ]
  },
  {
    id: 3,
    title: 'NIVEL 3: LÓGICA AVANZADA (DE MORGAN)',
    location: 'Leyes de Morgan',
    locationIcon: '⚙️',
    backgroundImage: 'assets/backgrounds/level3_laboratorio.jpg',
    problems: [
      { type: 'logic', description: '[CÓDIGO L3-A] Busca este código en la PÁGINA 4 del manual para saber la respuesta exacta.', variables: { p: true, q: false }, expression: 'NO (p Y NO q)', expressionDetail: 'p = VERDADERO, q = FALSO', expectedAnswer: false },
      { type: 'logic', description: '[CÓDIGO L3-B] Busca este código en la PÁGINA 4 del manual para saber la respuesta exacta.', variables: { p: false, q: false }, expression: 'NO (p O q)', expressionDetail: 'p = FALSO, q = FALSO', expectedAnswer: true },
      { type: 'logic', description: '[CÓDIGO L3-C] Busca este código en la PÁGINA 4 del manual para saber la respuesta exacta.', variables: { p: true, q: true }, expression: 'NO (NO p O NO q)', expressionDetail: 'p = VERDADERO, q = VERDADERO', expectedAnswer: true },
      { type: 'logic', description: '[CÓDIGO L3-D] Busca este código en la PÁGINA 4 del manual para saber la respuesta exacta.', variables: { p: false, q: true }, expression: 'NO p Y q', expressionDetail: 'p = FALSO, q = VERDADERO', expectedAnswer: true },
      { type: 'logic', description: '[CÓDIGO L3-E] Busca este código en la PÁGINA 4 del manual para saber la respuesta exacta.', variables: { p: true, q: false }, expression: 'NO p O q', expressionDetail: 'p = VERDADERO, q = FALSO', expectedAnswer: false }
    ]
  },
  {
    id: 4,
    title: 'NIVEL 4: CONJUNTOS AVANZADOS',
    location: 'Colapso del Rectorado',
    locationIcon: '🏛️',
    backgroundImage: 'assets/backgrounds/level4_rectorado.jpg',
    problems: [
      { type: 'venn', description: '[CÓDIGO L4-A] Busca este código en la PÁGINA 5 del manual para saber qué zonas tocar.', sets: ['A', 'B', 'C'], operation: '(A INTERSECCIÓN C) MENOS B', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['AC_only'] },
      { type: 'venn', description: '[CÓDIGO L4-B] Busca este código en la PÁGINA 5 del manual para saber qué zonas tocar.', sets: ['A', 'B', 'C'], operation: '(A UNIÓN B) INTERSECCIÓN C', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['AC_only', 'BC_only', 'ABC'] },
      { type: 'venn', description: '[CÓDIGO L4-C] Busca este código en la PÁGINA 5 del manual para saber qué zonas tocar.', sets: ['A', 'B', 'C'], operation: 'A INTERSECCIÓN B INTERSECCIÓN C', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['ABC'] },
      { type: 'venn', description: '[CÓDIGO L4-D] Busca este código en la PÁGINA 5 del manual para saber qué zonas tocar.', sets: ['A', 'B', 'C'], operation: '(A MENOS B) UNIÓN C', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only', 'C_only', 'AC_only', 'BC_only', 'ABC'] },
      { type: 'venn', description: '[CÓDIGO L4-E] Busca este código en la PÁGINA 5 del manual para saber qué zonas tocar.', sets: ['A', 'B', 'C'], operation: 'C MENOS (A UNIÓN B)', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['C_only'] }
    ]
  },
  {
    id: 5,
    title: 'NIVEL 5: MANTENIMIENTO FÍSICO',
    location: 'Cuarto de Generadores',
    locationIcon: '🔌',
    backgroundImage: 'assets/backgrounds/level4_rectorado.jpg', // Usar la misma o añadir otra luego
    problems: [
      { 
        type: 'wires-connect', 
        description: '[CÓDIGO L5-A] Busca este código en la PÁGINA 6 del manual para saber qué color va con cuál.', 
        colorsLeft: ['red', 'blue', 'yellow', 'green'],
        colorsRight: ['green', 'yellow', 'red', 'blue'],
        solutionMap: { 'red': 'green', 'blue': 'yellow', 'yellow': 'red', 'green': 'blue' }
      },
      { 
        type: 'wires-connect', 
        description: '[CÓDIGO L5-B] Busca este código en la PÁGINA 6 del manual para saber el orden correcto.', 
        colorsLeft: ['cyan', 'magenta', 'lime', 'orange'],
        colorsRight: ['orange', 'cyan', 'magenta', 'lime'],
        solutionMap: { 'cyan': 'orange', 'magenta': 'cyan', 'lime': 'magenta', 'orange': 'lime' }
      },
      { type: 'wires-cut', description: 'Sobrecarga inminente. Lea el protocolo en el MANUAL (Capítulo VII) para cortar el cable correcto.', wires: ['red', 'blue', 'green', 'yellow'], conditions: { location: 'Cuarto de Generadores' } },
      { type: 'wires-cut', description: 'Detección de corto circuito. Lea el protocolo en el MANUAL para cortar el cable correcto.', wires: ['black', 'red', 'red', 'blue'], conditions: { location: 'Cuarto de Generadores' } }
    ]
  }
];

export function getRandomProblem(levelIndex) {
  const problems = LEVELS[levelIndex].problems;
  const randomIndex = Math.floor(Math.random() * problems.length);
  return problems[randomIndex];
}

export function validateLogicAnswer(problem, answer) {
  if (problem.type !== 'logic') return false;
  return answer === problem.expectedAnswer;
}

export function validateVennAnswer(problem, selectedRegions) {
  if (problem.type !== 'venn') return false;
  const expected = [...problem.expectedRegions].sort();
  const selected = [...selectedRegions].sort();
  if (expected.length !== selected.length) return false;
  return expected.every((region, i) => region === selected[i]);
}

// Validation for wire-cut logic based on manual rules
export function validateWireCut(problem, cutWireColor, cutWireIndex) {
  const wires = problem.wires;
  // Manual Rules (Capítulo VII):
  // 1. Si hay exactamente 1 cable rojo y 1 cable verde, corta el cable ROJO.
  const redCount = wires.filter(w => w === 'red').length;
  const greenCount = wires.filter(w => w === 'green').length;
  if (redCount === 1 && greenCount === 1) {
    return cutWireColor === 'red';
  }
  
  // 2. Si no se cumple lo anterior, y hay más de 1 cable rojo, corta el ÚLTIMO cable rojo.
  if (redCount > 1) {
    const lastRedIndex = wires.lastIndexOf('red');
    return cutWireIndex === lastRedIndex;
  }
  
  // 3. Si no se cumple lo anterior, y hay un cable negro, corta el PRIMER cable.
  if (wires.includes('black')) {
    return cutWireIndex === 0;
  }
  
  // 4. De lo contrario, corta el ÚLTIMO cable.
  return cutWireIndex === (wires.length - 1);
}
