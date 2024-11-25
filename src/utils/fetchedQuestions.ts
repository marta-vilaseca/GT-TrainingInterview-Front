// src/utils/fetchedQuestions.ts
// Dummy data for testing

import { QuestionData } from '../types/IAxios';

export const fetchedQuestions: QuestionData[] = [
  {
    id: 1,
    question: '¿Qué es la jerarquía visual en el diseño UX/UI?',
    role: 'design',
    experience: 'junior',
    theme: 'general',
    correctAnswer:
      'Es la forma en que se organiza y prioriza la información para facilitar la comprensión del usuario.',
    wrongAnswerA: 'Es el orden de la información según el color y el tamaño',
    wrongAnswerB:
      'Es la técnica de agregar imágenes y texto de manera desordenada para atraer atención',
    correctFeedback:
      'La jerarquía visual es clave para guiar al usuario en su navegación, permitiéndole encontrar información de manera intuitiva',
    wrongFeedback:
      'La jerarquía visual organiza la información de manera estructurada para facilitar su comprensión, no se trata solo de colores o desorden',
  },
  {
    id: 2,
    question: '¿Qué significa la sigla "UI" en el contexto de diseño?',
    role: 'design',
    experience: 'junior',
    theme: 'general',
    correctAnswer: 'Interfaz de Usuario',
    wrongAnswerA: 'Interfaz Única',
    wrongAnswerB: 'Interacción Inmediata',
    correctFeedback:
      'La "UI" se refiere a todos los elementos con los que el usuario interactúa directamente en un producto digital',
    wrongFeedback:
      'UI se refiere a los elementos visuales e interactivos con los que el usuario se conecta en un sistema, como botones y menús',
  },
  {
    id: 3,
    question:
      '¿Cuál es el propósito principal de un prototipo en el proceso de diseño UX/UI?',
    role: 'design',
    experience: 'junior',
    theme: 'general',
    correctAnswer: 'Validar ideas y funcionalidades antes del desarrollo',
    wrongAnswerA: 'Mostrar el diseño final al cliente',
    wrongAnswerB: 'Crear una animación atractiva para la interfaz',
    correctFeedback:
      'Los prototipos permiten hacer pruebas de usabilidad y ajustes tempranos para mejorar la experiencia del usuario',
    wrongFeedback:
      'El objetivo del prototipo es probar y ajustar las ideas antes de la implementación final, no solo mostrar un producto terminado',
  },
  {
    id: 4,
    question: '¿Qué es un "user persona" en el diseño UX?',
    role: 'design',
    experience: 'junior',
    theme: 'general',
    correctAnswer:
      'Un usuario `ficticio` creado para representar una audiencia objetivo',
    wrongAnswerA:
      'Un modelo de comportamiento de los usuarios basado en datos y observación',
    wrongAnswerB: 'Un tipo de software utilizado para diseñar interfaces',
    correctFeedback:
      'Los "user personas" son esenciales para comprender las necesidades, motivaciones y comportamientos de los usuarios al diseñar',
    wrongFeedback:
      'Un "user persona" es una representación ficticia que ayuda a orientar las decisiones de diseño hacia las necesidades del público objetivo',
  },
  {
    id: 5,
    question: '¿Qué se entiende por "responsive design"?',
    role: 'design',
    experience: 'junior',
    theme: 'general',
    correctAnswer:
      'Un diseño que se ajusta al tamaño y la orientación de la pantalla del dispositivo',
    wrongAnswerA: 'Un diseño que se adapta solo a dispositivos móviles',
    wrongAnswerB: 'Un diseño que cambia de color según el tipo de usuario',
    correctFeedback:
      'El diseño responsivo garantiza que la experiencia del usuario sea coherente y eficiente en diferentes dispositivos y tamaños de pantalla',
    wrongFeedback:
      'El diseño responsivo adapta la interfaz a diversas pantallas, no solo a dispositivos móviles ni cambia colores dependiendo del usuario',
  },
];
