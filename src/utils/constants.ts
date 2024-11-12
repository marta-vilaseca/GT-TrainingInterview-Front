// src/utils/constants.ts

// Experience levels
export const experienceLevels = {
  'Trainee - 0-1 Years': 'Trainee',
  'Junior - 1-2 Years': 'Junior',
  'Semi-Senior - 2-4 Years': 'Semi-Senior',
  'Senior - 4+ Years': 'Senior',
  'Lead - 8+ Years': 'Lead',
};

// Roles
export const roles = {
  'UX/UI Designer': 'diseñador ux/ui',
  'Frontend Developer': 'frontend',
  'Backend Developer': 'backend',
};

// Themes
export type RoleType = 'diseñador ux/ui' | 'frontend' | 'backend';

export const themes: { [key in RoleType]: string[] } = {
  'diseñador ux/ui': [
    'Investigación de usuarios y perfiles',
    'Prototipado y wireframing',
    'Accesibilidad y usabilidad',
    'Tipografía y diseño visual',
    'Flujo de usuario y arquitectura de la información',
  ],
  frontend: [
    'HTML y semántica',
    'CSS y estilización',
    'Javascript y manipulación del DOM',
    'Frameworks y librerías (React, Vue, Angular)',
    'Control de versiones y herramientas de construcción',
  ],
  backend: [
    'Seguridad y Autenticación',
    'Escalabilidad y Rendimiento',
    'Manejo de errores y logs',
    'Arquitecturas',
    'Control de versiones y despliegue continuo',
  ],
};

// Chat messages
export const correct_answer: string[] = [
  '¡Correcto!',
  '¡Muy bien!',
  '¡Eso es!',
  '¡Genial!',
];

export const continue_question: string[] = [
  '¡Vas muy bien! ¿Quieres seguir con más preguntas o prefieres finalizar aquí?',
  '¡Hasta ahora has hecho un excelente trabajo! ¿Deseas continuar con más preguntas o terminamos por hoy?',
  '¡Buen progreso! ¿Te gustaría responder a algunas preguntas más o quieres cerrar la entrevista en este punto?',
  '¡Gran avance! ¿Quieres seguir con la siguiente ronda de preguntas o prefieres parar aquí?',
  '¡Excelente hasta aquí! ¿Quieres continuar con más preguntas o damos por concluida esta sesión?',
  '¡Estás haciendo un trabajo fantástico! ¿Quieres seguir practicando o prefieres terminar ahora?',
  '¡Bien hecho! ¿Te gustaría avanzar con más preguntas o prefieres finalizar la entrevista?',
  '¡Muy buen ritmo! ¿Quieres seguir con el entrenamiento o prefieres detenerte aquí?',
  '¡Vas súper bien! ¿Te gustaría responder a más preguntas o damos por terminada la entrevista?',
  '¡Estás progresando increíblemente! ¿Te gustaría seguir practicando con más preguntas o prefieres finalizar esta sesión?',
];

export const continue_ok_message: string[] = [
  '¡Perfecto! Vamos con la siguiente ronda. Recuerda que cada pregunta te acerca más a tu meta.',
  '¡Excelente decisión! Aquí va la siguiente pregunta. Aprovecha cada respuesta para aprender y mejorar.',
  '¡Súper! Sigamos avanzando. Cada respuesta es una oportunidad para perfeccionar tus habilidades.',
  '¡Buen trabajo hasta ahora! Continuemos con la siguiente pregunta. ¡Tú puedes!',
  '¡Vamos bien! Aquí tienes la próxima pregunta. Mantén el enfoque y sigue adelante.',
  '¡Adelante! Sigamos con el entrenamiento. Cada paso cuenta en tu progreso.',
  '¡Genial! Aquí viene la próxima. Aprovecha para aplicar lo que has aprendido hasta ahora.',
  '¡Estás haciendo un gran trabajo! Sigamos con la próxima pregunta para continuar mejorando.',
  '¡Me alegra que quieras seguir! Aquí va la siguiente. ¡Recuerda que cada intento es un avance!',
  '¡Listo para más! Vamos con la siguiente pregunta y sigamos fortaleciendo tus habilidades.',
];

export const exit_message: string[] = [
  '¡Excelente trabajo hasta aquí! Gracias por participar en esta práctica de entrevista. Recuerda que la preparación es clave, y cada paso te acerca a tu objetivo. Si deseas continuar en otro momento, aquí estaré para ayudarte. ¡Hasta la próxima y mucha suerte!',
];
