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
      { type: 'logic', description: 'PREGUNTA L1-A: El Generador (A) falló, pero la Batería (B) está activa. Si el manual exige que al menos uno funcione (A o B), ¿el sistema tendrá energía?', variables: { p: false, q: true }, expression: 'A o B', expressionDetail: 'A=FALSO, B=VERDADERO', expectedAnswer: true },
      { type: 'logic', description: 'PREGUNTA L1-B: El Generador (A) funciona, pero la Batería (B) falló. Para este sector necesitamos AMBOS activos (A y B). ¿Hay energía suficiente?', variables: { p: true, q: false }, expression: 'A y B', expressionDetail: 'A=VERD., B=FALSO', expectedAnswer: false },
      { type: 'logic', description: 'PREGUNTA L1-C: El Generador (A) funciona perfecto. El panel del sistema evalúa la condición de error: "NO A". ¿Esta condición de error se cumple (es verdadera)?', variables: { p: true }, expression: 'NO A', expressionDetail: 'A=VERDADERO', expectedAnswer: false },
      { type: 'logic', description: 'PREGUNTA L1-D: Hubo un colapso: Generador (A) falló y Batería (B) falló. El circuito de emergencia necesita al menos uno (A o B). ¿Se encenderán las luces?', variables: { p: false, q: false }, expression: 'A o B', expressionDetail: 'A=FALSO, B=FALSO', expectedAnswer: false },
      { type: 'logic', description: 'PREGUNTA L1-E: Generador (A) y Batería (B) están en línea. El sistema de máxima potencia requiere ambos (A y B). ¿Se puede activar la máxima potencia?', variables: { p: true, q: true }, expression: 'A y B', expressionDetail: 'A=VERD., B=VERD.', expectedAnswer: true }
    ]
  },
  {
    id: 2,
    title: 'NIVEL 2: CONJUNTOS BÁSICOS',
    location: 'Desvío hacia Odontología',
    locationIcon: '🏥',
    backgroundImage: 'assets/backgrounds/level2_odontologia.jpg',
    problems: [
      { type: 'venn', description: 'PREGUNTA L2-A: Activa los circuitos exclusivos del Sistema Principal (A), asegurándote de no tocar NADA de la Refrigeración (B).', sets: ['A', 'B'], operation: 'Solo A Exterior', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only'] },
      { type: 'venn', description: 'PREGUNTA L2-B: Enciende únicamente el nodo central donde ambos sistemas (A y B) se conectan y solapan.', sets: ['A', 'B'], operation: 'Intersección', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['AB'] },
      { type: 'venn', description: 'PREGUNTA L2-C: Activa los circuitos exclusivos de la Refrigeración (B), sin tocar el Sistema Principal (A).', sets: ['A', 'B'], operation: 'Solo B Exterior', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['B_only'] },
      { type: 'venn', description: 'PREGUNTA L2-D: Sobrecarga el panel. Activa absolutamente TODO (todas las zonas de A y de B).', sets: ['A', 'B'], operation: 'Unión Completa', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only', 'B_only', 'AB'] },
      { type: 'venn', description: 'PREGUNTA L2-E: Activa los circuitos exclusivos del Sistema Principal (A), asegurándote de no tocar NADA de la Refrigeración (B).', sets: ['A', 'B'], operation: 'Solo A Exterior', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only'] }
    ]
  },
  {
    id: 3,
    title: 'NIVEL 3: LÓGICA AVANZADA (DE MORGAN)',
    location: 'Leyes de Morgan',
    locationIcon: '⚙️',
    backgroundImage: 'assets/backgrounds/level3_laboratorio.jpg',
    problems: [
      { type: 'logic', description: 'PREGUNTA L3-A: Bomba=SI, Filtro=NO. El técnico dice: "Es FALSO que la bomba y el filtro funcionen". Por De Morgan, ¿es lo mismo que decir "Falla la bomba O falla el filtro"? ¿Esa afirmación es cierta?', variables: { p: true, q: false }, expression: 'Lógica Equivalente', expressionDetail: 'A=VERD., B=FALSO', expectedAnswer: true },
      { type: 'logic', description: 'PREGUNTA L3-B: Bomba=NO, Filtro=NO. Un operador dice: "No hay bomba Y no hay filtro". Por De Morgan, ¿es equivalente a "Es FALSO que haya bomba O filtro"? ¿Se cumple esto en la planta actual?', variables: { p: false, q: false }, expression: 'Equivalencia Estricta', expressionDetail: 'A=FALSO, B=FALSO', expectedAnswer: true },
      { type: 'logic', description: 'PREGUNTA L3-C: Bomba=SI, Filtro=SI. Alarma en panel: "Falla bomba O falla filtro". Analizando que ambos funcionan, ¿esta alarma es VERDADERA?', variables: { p: true, q: true }, expression: 'Análisis de Alarma', expressionDetail: 'A=VERD., B=VERD.', expectedAnswer: false },
      { type: 'logic', description: 'PREGUNTA L3-D: Bomba=NO, Filtro=SI. El jefe afirma: "Es falso que tengamos bomba Y filtro al mismo tiempo". ¿El jefe tiene la razón?', variables: { p: false, q: true }, expression: 'Declaración Lógica', expressionDetail: 'A=FALSO, B=VERD.', expectedAnswer: true },
      { type: 'logic', description: 'PREGUNTA L3-E: Bomba=SI, Filtro=NO. El sistema lanza mensaje: "Tenemos ambas máquinas operando perfectamente". ¿El sistema dice la verdad?', variables: { p: true, q: false }, expression: 'Validación de Subsistema', expressionDetail: 'A=VERD., B=FALSO', expectedAnswer: false }
    ]
  },
  {
    id: 4,
    title: 'NIVEL 4: CONJUNTOS AVANZADOS',
    location: 'Colapso del Rectorado',
    locationIcon: '🏛️',
    backgroundImage: 'assets/backgrounds/level4_rectorado.jpg',
    problems: [
      { type: 'venn', description: 'PREGUNTA L4-A: Aísla el sistema de Luces (A). Activa su terminal exterior superior izquierda sin tocar Alarmas ni Puertas.', sets: ['A', 'B', 'C'], operation: 'Aislamiento A', operationDetail: 'Toca 1 sola zona', expectedRegions: ['A_only'] },
      { type: 'venn', description: 'PREGUNTA L4-B: Activa exclusivamente el panel exterior de Alarmas (B), asegurándote de no encender Luces ni Puertas.', sets: ['A', 'B', 'C'], operation: 'Aislamiento B', operationDetail: 'Toca 1 sola zona', expectedRegions: ['B_only'] },
      { type: 'venn', description: 'PREGUNTA L4-C: Desbloquea las Puertas (C) usando su terminal exterior (abajo al centro), que no interfiere con el resto.', sets: ['A', 'B', 'C'], operation: 'Aislamiento C', operationDetail: 'Toca 1 sola zona', expectedRegions: ['C_only'] },
      { type: 'venn', description: 'PREGUNTA L4-D: Enciende ÚNICAMENTE la zona compartida entre Luces (A) y Alarmas (B), pero que no involucre a las Puertas (C).', sets: ['A', 'B', 'C'], operation: 'Intersección A-B', operationDetail: 'Toca 1 sola zona', expectedRegions: ['AB_only'] },
      { type: 'venn', description: 'PREGUNTA L4-E: Activa el núcleo central de la planta. El pequeño triángulo donde convergen exactamente los 3 sistemas (A, B y C).', sets: ['A', 'B', 'C'], operation: 'Núcleo Central', operationDetail: 'Toca 1 sola zona', expectedRegions: ['ABC'] }
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
