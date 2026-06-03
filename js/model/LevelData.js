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
      { type: 'logic', description: 'El sistema detecta una fluctuación en el sector de la Biblioteca. Evalúe la siguiente expresión lógica.', variables: { p: false, q: true }, expression: 'p ∨ q', expressionDetail: 'p = FALSO, q = VERDADERO', expectedAnswer: true },
      { type: 'logic', description: 'Cruce de circuitos detectado. Evalúe la expresión para redirigir la energía.', variables: { p: true, q: false }, expression: 'p ∧ q', expressionDetail: 'p = VERDADERO, q = FALSO', expectedAnswer: false },
      { type: 'logic', description: 'Advertencia de sobrecarga térmica. Resuelva la negación para enfriar el sistema.', variables: { p: true }, expression: '¬p', expressionDetail: 'p = VERDADERO', expectedAnswer: false },
      { type: 'logic', description: 'Falla en el relé principal. Analice la disyunción.', variables: { p: false, q: false }, expression: 'p ∨ q', expressionDetail: 'p = FALSO, q = FALSO', expectedAnswer: false },
      { type: 'logic', description: 'Estabilización requerida en terminales B. Evalúe la conjunción.', variables: { p: true, q: true }, expression: 'p ∧ q', expressionDetail: 'p = VERDADERO, q = VERDADERO', expectedAnswer: true }
    ]
  },
  {
    id: 2,
    title: 'NIVEL 2: TEORÍA DE CONJUNTOS BÁSICA',
    location: 'Desvío hacia Odontología',
    locationIcon: '🏥',
    backgroundImage: 'assets/backgrounds/level2_odontologia.jpg',
    problems: [
      { type: 'venn', description: 'Se requiere redirigir la energía al sector de Odontología. Seleccione las regiones correctas.', sets: ['A', 'B'], operation: 'A ∪ B', operationDetail: 'Unión: seleccione TODAS las regiones de ambos conjuntos', expectedRegions: ['A_only', 'AB', 'B_only'] },
      { type: 'venn', description: 'Interferencia electromagnética entre sectores. Aísle el solapamiento.', sets: ['A', 'B'], operation: 'A ∩ B', operationDetail: 'Intersección: seleccione SOLO donde se cruzan A y B', expectedRegions: ['AB'] },
      { type: 'venn', description: 'Falla en la válvula B. Purgue el sistema B conservando A.', sets: ['A', 'B'], operation: 'A − B', operationDetail: 'Diferencia: seleccione A excluyendo cualquier parte de B', expectedRegions: ['A_only'] },
      { type: 'venn', description: 'Falla en la válvula A. Purgue el sistema A conservando B.', sets: ['A', 'B'], operation: 'B − A', operationDetail: 'Diferencia: seleccione B excluyendo cualquier parte de A', expectedRegions: ['B_only'] },
      { type: 'venn', description: 'Cortocircuito externo. Desvíe la energía a los nodos principales.', sets: ['A', 'B'], operation: '(A ∪ B)', operationDetail: 'Unión: seleccione TODAS las regiones', expectedRegions: ['A_only', 'AB', 'B_only'] }
    ]
  },
  {
    id: 3,
    title: 'NIVEL 3: LÓGICA PROPOSICIONAL AVANZADA',
    location: 'Leyes de Morgan',
    locationIcon: '⚙️',
    backgroundImage: 'assets/backgrounds/level3_laboratorio.jpg',
    problems: [
      { type: 'logic', description: 'Falla crítica detectada. Aplique las Leyes de De Morgan para purgar el sistema.', variables: { p: true, q: false }, expression: '¬(p ∧ ¬q)', expressionDetail: 'p = VERDADERO, q = FALSO', expectedAnswer: false },
      { type: 'logic', description: 'Anomalía en el inversor de fase. Aplique De Morgan.', variables: { p: false, q: false }, expression: '¬(p ∨ q)', expressionDetail: 'p = FALSO, q = FALSO', expectedAnswer: true },
      { type: 'logic', description: 'Inestabilidad cuántica en los puertos. Evalúe la negación múltiple.', variables: { p: true, q: true }, expression: '¬(¬p ∨ ¬q)', expressionDetail: 'p = VERDADERO, q = VERDADERO', expectedAnswer: true },
      { type: 'logic', description: 'Desajuste en los fusibles lógicos.', variables: { p: false, q: true }, expression: '¬p ∧ q', expressionDetail: 'p = FALSO, q = VERDADERO', expectedAnswer: true },
      { type: 'logic', description: 'Resonancia de ciclos. Evalúe la expresión.', variables: { p: true, q: false }, expression: '¬p ∨ q', expressionDetail: 'p = VERDADERO, q = FALSO', expectedAnswer: false }
    ]
  },
  {
    id: 4,
    title: 'NIVEL 4: TEORÍA DE CONJUNTOS AVANZADA',
    location: 'Colapso del Rectorado',
    locationIcon: '🏛️',
    backgroundImage: 'assets/backgrounds/level4_rectorado.jpg',
    problems: [
      { type: 'venn', description: 'El Rectorado está al borde del colapso total. Opere el diagrama de 3 conjuntos.', sets: ['A', 'B', 'C'], operation: '(A ∩ C) − B', operationDetail: 'Intersección de A y C, excluyendo todo B', expectedRegions: ['AC_only'] },
      { type: 'venn', description: 'Reenrutando servidores centrales.', sets: ['A', 'B', 'C'], operation: '(A ∪ B) ∩ C', operationDetail: 'La unión de A y B, pero solo donde se cruzan con C', expectedRegions: ['AC_only', 'BC_only', 'ABC'] },
      { type: 'venn', description: 'Falla en nodo C.', sets: ['A', 'B', 'C'], operation: 'A ∩ B ∩ C', operationDetail: 'La intersección triple exacta', expectedRegions: ['ABC'] },
      { type: 'venn', description: 'Protocolo de emergencia Delta.', sets: ['A', 'B', 'C'], operation: '(A − B) ∪ C', operationDetail: 'A excluyendo B, unido con todo C', expectedRegions: ['A_only', 'C_only', 'AC_only', 'BC_only', 'ABC'] },
      { type: 'venn', description: 'Caída general inminente.', sets: ['A', 'B', 'C'], operation: 'C − (A ∪ B)', operationDetail: 'Solo C puro, excluyendo A y B', expectedRegions: ['C_only'] }
    ]
  },
  {
    id: 5,
    title: 'NIVEL 5: MANTENIMIENTO FÍSICO',
    location: 'Cuarto de Generadores',
    locationIcon: '🔌',
    backgroundImage: 'assets/backgrounds/level4_rectorado.jpg', // Usar la misma o añadir otra luego
    problems: [
      { type: 'wires-connect', description: 'Los cables de datos principales se han desconectado. Empalme los terminales del mismo color.', colors: ['red', 'blue', 'yellow', 'green'] },
      { type: 'wires-connect', description: 'Falla en el bus de transmisión. Reconecte los filamentos energéticos.', colors: ['cyan', 'magenta', 'lime', 'orange'] },
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
