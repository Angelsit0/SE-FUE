/**
 * LevelData.js - 5 levels with random problem pools and validation logic
 * Game: ¿SE FUE?
 * Layer: Model (MVC)
 */

export const LEVELS = [
  {
    id: 1,
    title: 'NIVEL 1: LA PECERA CONGELADA',
    location: 'La Pecera',
    locationIcon: '🥶',
    backgroundImage: 'assets/backgrounds/level1_biblioteca.jpg',
    problems: [
      { type: 'logic', description: 'PREGUNTA L1-A: El servidor de La Pecera (A) falló, pero la Batería (B) está activa. Si el manual exige que al menos uno funcione (A o B) para hacer la tarea, ¿se salvan los proyectos de grado?', variables: { p: false, q: true }, expression: 'A o B', expressionDetail: 'A=FALSO, B=VERDADERO', expectedAnswer: true },
      { type: 'logic', description: 'PREGUNTA L1-B: El servidor (A) funciona, pero el aire de La Pecera (B) falló. Para este sector necesitamos AMBOS activos (A y B) porque hace demasiado frío o calor. ¿Hay energía suficiente?', variables: { p: true, q: false }, expression: 'A y B', expressionDetail: 'A=VERD., B=FALSO', expectedAnswer: false },
      { type: 'logic', description: 'PREGUNTA L1-C: El servidor (A) funciona perfecto. El panel del sistema evalúa la condición de error: "NO A". ¿Esta condición de error se cumple (es verdadera)?', variables: { p: true }, expression: 'NO A', expressionDetail: 'A=VERDADERO', expectedAnswer: false },
      { type: 'logic', description: 'PREGUNTA L1-D: Hubo un colapso: Servidor (A) falló y Batería (B) falló. El circuito necesita al menos uno (A o B) para que la gente chismee. ¿Habrá luz en la pecera?', variables: { p: false, q: false }, expression: 'A o B', expressionDetail: 'A=FALSO, B=FALSO', expectedAnswer: false },
      { type: 'logic', description: 'PREGUNTA L1-E: Servidor (A) y Batería (B) activos. El sistema requiere ambos (A y B) para mantener a los chismosos cómodos. ¿Se puede activar la sala?', variables: { p: true, q: true }, expression: 'A y B', expressionDetail: 'A=VERD., B=VERD.', expectedAnswer: true }
    ]
  },
  {
    id: 2,
    title: 'NIVEL 2: ODONTOLOGÍA Y EL 5TO PISO',
    location: 'Pasillo de Odontología / 5to Piso',
    locationIcon: '🦷',
    backgroundImage: 'assets/backgrounds/level2_odontologia.jpg',
    problems: [
      { type: 'venn', description: 'PREGUNTA L2-A: Activa los circuitos de Odontología (A) para las chicas lindas (pero locas), asegurándote de no iluminar NADA del 5to piso (B).', sets: ['A', 'B'], operation: 'Solo A Exterior', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only'] },
      { type: 'venn', description: 'PREGUNTA L2-B: Enciende únicamente el nodo central donde Odontología (A) y el 5to piso (B) se conectan. Arruina el momento romántico de todos.', sets: ['A', 'B'], operation: 'Intersección', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['AB'] },
      { type: 'venn', description: 'PREGUNTA L2-C: Activa los circuitos exclusivos del 5to Piso (B) (donde la gente va a darse cariño), sin tocar Odontología (A).', sets: ['A', 'B'], operation: 'Solo B Exterior', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['B_only'] },
      { type: 'venn', description: 'PREGUNTA L2-D: Sobrecarga el panel. Activa absolutamente TODO (Odontología y 5to Piso). ¡Que se prenda la luz de golpe en todos lados!', sets: ['A', 'B'], operation: 'Unión Completa', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only', 'B_only', 'AB'] },
      { type: 'venn', description: 'PREGUNTA L2-E: Activa los circuitos de Odontología (A) para las chicas lindas, asegurándote de no iluminar NADA del 5to piso (B).', sets: ['A', 'B'], operation: 'Solo A Exterior', operationDetail: 'Selecciona las zonas correctas', expectedRegions: ['A_only'] }
    ]
  },
  {
    id: 3,
    title: 'NIVEL 3: EL SAMBILITO Y LOS COPY',
    location: 'El Sambilito (Feria de Comida)',
    locationIcon: '🍔',
    backgroundImage: 'assets/backgrounds/level3_laboratorio.jpg',
    problems: [
      { type: 'logic', description: 'PREGUNTA L3-A: Copiadora=SI, Tequeños=NO. El del Copy dice: "Es FALSO que (Copiadora y Tequeños funcionen)". Por De Morgan, ¿es lo mismo que decir "Falla Copiadora O fallan Tequeños"?', variables: { p: true, q: false }, expression: 'Lógica Equivalente', expressionDetail: 'A=VERD., B=FALSO', expectedAnswer: true },
      { type: 'logic', description: 'PREGUNTA L3-B: Copiadora=NO, Tequeños=NO. El chamo de la feria dice: "No hay Copiadora Y no hay Tequeños". Por De Morgan, ¿equivale a "Es FALSO que haya Copiadora O Tequeños"?', variables: { p: false, q: false }, expression: 'Equivalencia Estricta', expressionDetail: 'A=FALSO, B=FALSO', expectedAnswer: true },
      { type: 'logic', description: 'PREGUNTA L3-C: Copiadora=SI, Tequeños=SI. Alarma en El Sambilito: "Falla Copiadora O fallan Tequeños grandes". Analizando que ambos funcionan, ¿esta alarma es VERDADERA?', variables: { p: true, q: true }, expression: 'Análisis de Alarma', expressionDetail: 'A=VERD., B=VERD.', expectedAnswer: false },
      { type: 'logic', description: 'PREGUNTA L3-D: Copiadora=NO, Tequeños=SI. Un foráneo afirma: "Es falso que tengamos Copiadora Y Tequeños al mismo tiempo". ¿El foráneo tiene la razón?', variables: { p: false, q: true }, expression: 'Declaración Lógica', expressionDetail: 'A=FALSO, B=VERD.', expectedAnswer: true },
      { type: 'logic', description: 'PREGUNTA L3-E: Copiadora=SI, Tequeños=NO. El sistema dice: "Tenemos ambas maravillas operando". ¿Es verdad?', variables: { p: true, q: false }, expression: 'Validación de Subsistema', expressionDetail: 'A=VERD., B=FALSO', expectedAnswer: false }
    ]
  },
  {
    id: 4,
    title: 'NIVEL 4: LA PLAZA HEPTAGONAL',
    location: 'Plaza Heptagonal',
    locationIcon: '⛲',
    backgroundImage: 'assets/backgrounds/level4_rectorado.jpg',
    problems: [
      { type: 'venn', description: 'PREGUNTA L4-A: Aísla a los Ingenieros Raros (A). Activa su terminal exterior superior izquierda sin tocar a los foráneos (B) ni las pasarelas (C).', sets: ['A', 'B', 'C'], operation: 'Aislamiento A', operationDetail: 'Toca 1 sola zona', expectedRegions: ['A_only'] },
      { type: 'venn', description: 'PREGUNTA L4-B: Activa exclusivamente el área de los Foráneos (B) que viven la vida loca, asegurándote de no encender Ingenieros ni Pasarelas.', sets: ['A', 'B', 'C'], operation: 'Aislamiento B', operationDetail: 'Toca 1 sola zona', expectedRegions: ['B_only'] },
      { type: 'venn', description: 'PREGUNTA L4-C: Desbloquea las Pasarelas (C) usando su terminal exterior (abajo al centro), sin meterte con ingenieros ni foráneos.', sets: ['A', 'B', 'C'], operation: 'Aislamiento C', operationDetail: 'Toca 1 sola zona', expectedRegions: ['C_only'] },
      { type: 'venn', description: 'PREGUNTA L4-D: Enciende ÚNICAMENTE la zona compartida entre Ingenieros (A) y Foráneos (B), pero que no involucre a las Pasarelas (C).', sets: ['A', 'B', 'C'], operation: 'Intersección A-B', operationDetail: 'Toca 1 sola zona', expectedRegions: ['AB_only'] },
      { type: 'venn', description: 'PREGUNTA L4-E: Activa el núcleo central de la plaza. Donde todos se reúnen al final del día (convergen A, B y C).', sets: ['A', 'B', 'C'], operation: 'Núcleo Central', operationDetail: 'Toca 1 sola zona', expectedRegions: ['ABC'] }
    ]
  },
  {
    id: 5,
    title: 'NIVEL 5: PLANTA ELÉCTRICA PRINCIPAL',
    location: 'Sótano - Planta Eléctrica',
    locationIcon: '🔌',
    backgroundImage: 'assets/backgrounds/level4_rectorado.jpg',
    problems: [
      { 
        type: 'wires-connect', 
        description: '[CÓDIGO L5-A] Busca este código en el manual para saber cómo reconectar la turbina principal.', 
        colorsLeft: ['red', 'blue', 'yellow', 'green'],
        colorsRight: ['green', 'yellow', 'red', 'blue'],
        solutionMap: { 'red': 'green', 'blue': 'yellow', 'yellow': 'red', 'green': 'blue' }
      },
      { 
        type: 'wires-connect', 
        description: '[CÓDIGO L5-B] Busca este código en el manual. Apúrate antes de que la UJAP se quede a oscuras.', 
        colorsLeft: ['cyan', 'magenta', 'lime', 'orange'],
        colorsRight: ['orange', 'cyan', 'magenta', 'lime'],
        solutionMap: { 'cyan': 'orange', 'magenta': 'cyan', 'lime': 'magenta', 'orange': 'lime' }
      },
      { type: 'wires-cut', description: 'Sobrecarga inminente. Lea el protocolo (Capítulo VII) para cortar el cable correcto.', wires: ['red', 'blue', 'green', 'yellow'], conditions: { location: 'Planta Eléctrica' } },
      { type: 'wires-cut', description: 'Detección de corto circuito en la UJAP. Corta el cable correcto.', wires: ['black', 'red', 'red', 'blue'], conditions: { location: 'Planta Eléctrica' } }
    ]
  },
  {
    id: 6,
    title: 'NIVEL 6: LOS FORÁNEOS PERDIDOS',
    location: 'Entrada UJAP',
    locationIcon: '🚌',
    backgroundImage: 'assets/backgrounds/level6_entrada.jpg',
    problems: [
      { type: 'memory', description: 'PREGUNTA L6-A: Encuentra todos los pares de tarjetas. Apúrate, el autobús se va.', pairs: 6 },
      { type: 'memory', description: 'PREGUNTA L6-B: La memoria de un ingeniero debe ser perfecta. Encuentra los pares para encender el torniquete.', pairs: 6 },
      { type: 'memory', description: 'PREGUNTA L6-C: Conecta las tarjetas de acceso de los foráneos perdidos.', pairs: 6 }
    ]
  },
  {
    id: 7,
    title: 'NIVEL 7: COLA EN LOS COPY',
    location: 'Los Copy',
    locationIcon: '🖨️',
    backgroundImage: 'assets/backgrounds/level7_copy.jpg',
    problems: [
      { type: 'sequence', description: 'PREGUNTA L7-A: Ordena correctamente el protocolo de emergencia de la planta.', sequence: ['Verificar voltaje', 'Aislar circuito', 'Conectar generador', 'Encender switch'] },
      { type: 'sequence', description: 'PREGUNTA L7-B: Ordena los pasos para reparar la fotocopiadora central.', sequence: ['Apagar máquina', 'Sacar papel atascado', 'Recargar tóner', 'Reiniciar sistema'] },
      { type: 'sequence', description: 'PREGUNTA L7-C: Ordena las prioridades de conexión.', sequence: ['Caja principal', 'Luces de emergencia', 'Servidores', 'Aires acondicionados'] }
    ]
  },
  {
    id: 8,
    title: 'NIVEL 8: TEQUEÑOS DEL SAMBILITO',
    location: 'El Sambilito',
    locationIcon: '🌭',
    backgroundImage: 'assets/backgrounds/level8_sambilito.jpg',
    problems: [
      { type: 'quickmath', description: 'PREGUNTA L8-A: Calcula rápido la cuenta de los tequeños. ¡La señora se desespera!', count: 3 },
      { type: 'quickmath', description: 'PREGUNTA L8-B: Demuestra tus habilidades de cálculo rápido para recalibrar los fusibles.', count: 3 },
      { type: 'quickmath', description: 'PREGUNTA L8-C: Resuelve estas ecuaciones de voltaje rápidamente.', count: 3 }
    ]
  },
  {
    id: 9,
    title: 'NIVEL 9: EMERGENCIA EN EL 5TO PISO',
    location: '5to Piso',
    locationIcon: '💕',
    backgroundImage: 'assets/backgrounds/level9_5topiso.jpg',
    problems: [
      { type: 'circuitmaze', description: 'PREGUNTA L9-A: Repara el circuito del aire acondicionado. Conecta el inicio (IN) con el final (OUT).', width: 4, height: 4 },
      { type: 'circuitmaze', description: 'PREGUNTA L9-B: Restaura la energía de emergencia trazando la ruta correcta.', width: 4, height: 4 },
      { type: 'circuitmaze', description: 'PREGUNTA L9-C: Enciende el panel de control conectando los nodos.', width: 4, height: 4 }
    ]
  },
  {
    id: 10,
    title: 'NIVEL 10: FIRULAIS AL RESCATE',
    location: 'Toda la UJAP',
    locationIcon: '🐶',
    backgroundImage: 'assets/backgrounds/level10_boss.jpg',
    problems: [
      { type: 'boss', description: 'PREGUNTA FINAL: El núcleo principal colapsó. Resuelve estas 3 pruebas seguidas antes de que todo explote.', phases: 3 }
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
