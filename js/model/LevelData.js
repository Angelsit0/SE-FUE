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
      { type: 'logic', description: 'PREGUNTA L1-A: Si A es FALSO y B es VERDADERO. ¿"A o B" es verdadero?', variables: { p: false, q: true }, expression: 'A o B', expressionDetail: 'A=FALSO, B=VERDADERO', expectedAnswer: true },
      { type: 'logic', description: 'PREGUNTA L1-B: Si A es VERDADERO y B es FALSO. ¿"A y B" es verdadero?', variables: { p: true, q: false }, expression: 'A y B', expressionDetail: 'A=VERD., B=FALSO', expectedAnswer: false },
      { type: 'logic', description: 'PREGUNTA L1-C: Si A es VERDADERO. ¿Lo contrario de A (NO A) es verdadero?', variables: { p: true }, expression: 'NO A', expressionDetail: 'A=VERDADERO', expectedAnswer: false },
      { type: 'logic', description: 'PREGUNTA L1-D: Si A es FALSO y B es FALSO. ¿"A o B" es verdadero?', variables: { p: false, q: false }, expression: 'A o B', expressionDetail: 'A=FALSO, B=FALSO', expectedAnswer: false },
      { type: 'logic', description: 'PREGUNTA L1-E: Si A es VERD. y B es VERD. ¿"A y B" es verdadero?', variables: { p: true, q: true }, expression: 'A y B', expressionDetail: 'A=VERD., B=VERD.', expectedAnswer: true }
    ]
  },
  {
    id: 2,
    title: 'NIVEL 2: CONJUNTOS BÁSICOS',
    location: 'Desvío hacia Odontología',
    locationIcon: '🏥',
    backgroundImage: 'assets/backgrounds/level2_odontologia.jpg',
    problems: [
      { type: 'venn', description: 'PREGUNTA L2-A: Pinta SOLO la media luna izquierda de A (sin tocar B).', sets: ['A', 'B'], operation: 'Solo A Exterior', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only'] },
      { type: 'venn', description: 'PREGUNTA L2-B: Pinta SOLO la media luna derecha de B (sin tocar A).', sets: ['A', 'B'], operation: 'Solo B Exterior', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['B_only'] },
      { type: 'venn', description: 'PREGUNTA L2-C: Pinta SOLO la media luna izquierda de A (sin tocar B).', sets: ['A', 'B'], operation: 'Solo A Exterior', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only'] },
      { type: 'venn', description: 'PREGUNTA L2-D: Pinta SOLO la media luna derecha de B (sin tocar A).', sets: ['A', 'B'], operation: 'Solo B Exterior', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['B_only'] },
      { type: 'venn', description: 'PREGUNTA L2-E: Pinta SOLO la media luna izquierda de A (sin tocar B).', sets: ['A', 'B'], operation: 'Solo A Exterior', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only'] }
    ]
  },
  {
    id: 3,
    title: 'NIVEL 3: LÓGICA AVANZADA (DE MORGAN)',
    location: 'Leyes de Morgan',
    locationIcon: '⚙️',
    backgroundImage: 'assets/backgrounds/level3_laboratorio.jpg',
    problems: [
      { type: 'logic', description: 'PREGUNTA L3-A: Ley de Morgan 1. Lee el manual y responde.', variables: { p: true, q: false }, expression: 'Morgan L3-A', expressionDetail: 'A=VERD., B=FALSO', expectedAnswer: true },
      { type: 'logic', description: 'PREGUNTA L3-B: Ley de Morgan 2. Lee el manual y responde.', variables: { p: false, q: false }, expression: 'Morgan L3-B', expressionDetail: 'A=FALSO, B=FALSO', expectedAnswer: true },
      { type: 'logic', description: 'PREGUNTA L3-C: Ley de Morgan 3. Lee el manual y responde.', variables: { p: true, q: true }, expression: 'Morgan L3-C', expressionDetail: 'A=VERD., B=VERD.', expectedAnswer: false },
      { type: 'logic', description: 'PREGUNTA L3-D: Ley de Morgan 4. Lee el manual y responde.', variables: { p: false, q: true }, expression: 'Morgan L3-D', expressionDetail: 'A=FALSO, B=VERD.', expectedAnswer: true },
      { type: 'logic', description: 'PREGUNTA L3-E: Ley de Morgan 5. Lee el manual y responde.', variables: { p: true, q: false }, expression: 'Morgan L3-E', expressionDetail: 'A=VERD., B=FALSO', expectedAnswer: false }
    ]
  },
  {
    id: 4,
    title: 'NIVEL 4: CONJUNTOS AVANZADOS',
    location: 'Colapso del Rectorado',
    locationIcon: '🏛️',
    backgroundImage: 'assets/backgrounds/level4_rectorado.jpg',
    problems: [
      { type: 'venn', description: 'PREGUNTA L4-A: Pinta SOLO la zona exterior de A (arriba izquierda) que no toca a nadie más.', sets: ['A', 'B', 'C'], operation: 'Solo A Exterior', operationDetail: 'Toca 1 sola zona', expectedRegions: ['A_only'] },
      { type: 'venn', description: 'PREGUNTA L4-B: Pinta SOLO la zona exterior de B (arriba derecha) que no toca a nadie más.', sets: ['A', 'B', 'C'], operation: 'Solo B Exterior', operationDetail: 'Toca 1 sola zona', expectedRegions: ['B_only'] },
      { type: 'venn', description: 'PREGUNTA L4-C: Pinta SOLO la zona exterior de C (abajo al centro) que no toca a nadie más.', sets: ['A', 'B', 'C'], operation: 'Solo C Exterior', operationDetail: 'Toca 1 sola zona', expectedRegions: ['C_only'] },
      { type: 'venn', description: 'PREGUNTA L4-D: Pinta SOLO la zona exterior de A (arriba izquierda) que no toca a nadie más.', sets: ['A', 'B', 'C'], operation: 'Solo A Exterior', operationDetail: 'Toca 1 sola zona', expectedRegions: ['A_only'] },
      { type: 'venn', description: 'PREGUNTA L4-E: Pinta SOLO la zona exterior de B (arriba derecha) que no toca a nadie más.', sets: ['A', 'B', 'C'], operation: 'Solo B Exterior', operationDetail: 'Toca 1 sola zona', expectedRegions: ['B_only'] }
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
