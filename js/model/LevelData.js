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
      { type: 'logic', description: 'El sistema detecta una fluctuación. Resuelve si el circuito es VERDADERO o FALSO.', variables: { p: false, q: true }, expression: 'p O q (p ∨ q)', expressionDetail: 'p = FALSO, q = VERDADERO', expectedAnswer: true },
      { type: 'logic', description: 'Cruce de circuitos detectado. Resuelve si la condición es VERDADERA o FALSA.', variables: { p: true, q: false }, expression: 'p Y q (p ∧ q)', expressionDetail: 'p = VERDADERO, q = FALSO', expectedAnswer: false },
      { type: 'logic', description: 'Advertencia de sobrecarga térmica. Resuelve la negación (lo contrario).', variables: { p: true }, expression: 'NO p (¬p)', expressionDetail: 'p = VERDADERO', expectedAnswer: false },
      { type: 'logic', description: 'Falla en el relé principal. Analice esta opción.', variables: { p: false, q: false }, expression: 'p O q (p ∨ q)', expressionDetail: 'p = FALSO, q = FALSO', expectedAnswer: false },
      { type: 'logic', description: 'Estabilización requerida en terminales B. Evalúe la conjunción.', variables: { p: true, q: true }, expression: 'p Y q (p ∧ q)', expressionDetail: 'p = VERDADERO, q = VERDADERO', expectedAnswer: true }
    ]
  },
  {
    id: 2,
    title: 'NIVEL 2: CONJUNTOS BÁSICOS',
    location: 'Desvío hacia Odontología',
    locationIcon: '🏥',
    backgroundImage: 'assets/backgrounds/level2_odontologia.jpg',
    problems: [
      { type: 'venn', description: 'Se requiere redirigir la energía. Toca las zonas correctas en los círculos.', sets: ['A', 'B'], operation: 'A UNIÓN B (A ∪ B)', operationDetail: 'Selecciona TODAS las zonas de A y de B', expectedRegions: ['A_only', 'AB', 'B_only'] },
      { type: 'venn', description: 'Interferencia electromagnética. Aísle el solapamiento.', sets: ['A', 'B'], operation: 'A INTERSECCIÓN B (A ∩ B)', operationDetail: 'Selecciona SOLO donde se cruzan A y B', expectedRegions: ['AB'] },
      { type: 'venn', description: 'Falla en la válvula B. Purgue B conservando A.', sets: ['A', 'B'], operation: 'A MENOS B (A − B)', operationDetail: 'Selecciona A, pero quítale la parte de B', expectedRegions: ['A_only'] },
      { type: 'venn', description: 'Falla en la válvula A. Purgue A conservando B.', sets: ['A', 'B'], operation: 'B MENOS A (B − A)', operationDetail: 'Selecciona B, pero quítale la parte de A', expectedRegions: ['B_only'] },
      { type: 'venn', description: 'Cortocircuito externo. Desvíe la energía a los nodos.', sets: ['A', 'B'], operation: 'A UNIÓN B (A ∪ B)', operationDetail: 'Selecciona TODAS las zonas de A y B', expectedRegions: ['A_only', 'AB', 'B_only'] }
    ]
  },
  {
    id: 3,
    title: 'NIVEL 3: LÓGICA AVANZADA (DE MORGAN)',
    location: 'Leyes de Morgan',
    locationIcon: '⚙️',
    backgroundImage: 'assets/backgrounds/level3_laboratorio.jpg',
    problems: [
      { type: 'logic', description: 'Falla crítica. Toca el manual para ver la tabla de ayuda rápida si no sabes qué responder.', variables: { p: true, q: false }, expression: 'NO (p Y NO q)', expressionDetail: 'p = VERDADERO, q = FALSO', expectedAnswer: false },
      { type: 'logic', description: 'Anomalía en el inversor. Revisa la tabla del manual.', variables: { p: false, q: false }, expression: 'NO (p O q)', expressionDetail: 'p = FALSO, q = FALSO', expectedAnswer: true },
      { type: 'logic', description: 'Inestabilidad cuántica en los puertos. Usa la ayuda del manual.', variables: { p: true, q: true }, expression: 'NO (NO p O NO q)', expressionDetail: 'p = VERDADERO, q = VERDADERO', expectedAnswer: true },
      { type: 'logic', description: 'Desajuste en los fusibles lógicos.', variables: { p: false, q: true }, expression: 'NO p Y q', expressionDetail: 'p = FALSO, q = VERDADERO', expectedAnswer: true },
      { type: 'logic', description: 'Resonancia de ciclos. Evalúe la expresión.', variables: { p: true, q: false }, expression: 'NO p O q', expressionDetail: 'p = VERDADERO, q = FALSO', expectedAnswer: false }
    ]
  },
  {
    id: 4,
    title: 'NIVEL 4: CONJUNTOS AVANZADOS',
    location: 'Colapso del Rectorado',
    locationIcon: '🏛️',
    backgroundImage: 'assets/backgrounds/level4_rectorado.jpg',
    problems: [
      { type: 'venn', description: 'Hay 3 círculos. Lee la instrucción y ve marcando paso a paso.', sets: ['A', 'B', 'C'], operation: '(A INTERSECCIÓN C) MENOS B', operationDetail: 'Marca donde se cruzan A y C, pero quítale la zona de B', expectedRegions: ['AC_only'] },
      { type: 'venn', description: 'Reenrutando servidores centrales.', sets: ['A', 'B', 'C'], operation: '(A UNIÓN B) INTERSECCIÓN C', operationDetail: 'La unión de A y B, pero solo en las partes que tocan a C', expectedRegions: ['AC_only', 'BC_only', 'ABC'] },
      { type: 'venn', description: 'Falla en nodo C.', sets: ['A', 'B', 'C'], operation: 'A INTERSECCIÓN B INTERSECCIÓN C', operationDetail: 'Solo el pequeño triángulo central donde se cruzan los TRES', expectedRegions: ['ABC'] },
      { type: 'venn', description: 'Protocolo de emergencia Delta.', sets: ['A', 'B', 'C'], operation: '(A MENOS B) UNIÓN C', operationDetail: 'Todo A (sin tocar B) más TODO el círculo C', expectedRegions: ['A_only', 'C_only', 'AC_only', 'BC_only', 'ABC'] },
      { type: 'venn', description: 'Caída general inminente.', sets: ['A', 'B', 'C'], operation: 'C MENOS (A UNIÓN B)', operationDetail: 'Solo el círculo C puro (abajo), sin tocar A ni B', expectedRegions: ['C_only'] }
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
