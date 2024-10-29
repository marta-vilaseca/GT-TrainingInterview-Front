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
