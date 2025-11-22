import { Home, UserPlus, Circle, Users } from 'react-feather'

/**
 * Configuración de navegación vertical
 * Define la estructura del menú lateral con permisos y jerarquías
 *
 * Tipos de items:
 * - header: Encabezado de sección (no clickeable)
 * - item con navLink: Link directo a una ruta
 * - item con children: Grupo colapsible con sub-items
 *
 * Permisos:
 * - permiso: string - Permiso requerido para ver el item
 * - Formato: "modulo" o "modulo:submodulo:accion"
 * - Soporta wildcards: "modulo:*" otorga todos los permisos del módulo
 */
const navigation = [
  {
    header: 'MI APP',
  },
  {
    id: 'inicio',
    title: 'Inicio',
    icon: Home,
    navLink: '/inicio',
  },
  {
    id: 'inscripciones',
    title: 'Inscripciones',
    icon: UserPlus,
    permiso: 'inscripcion',
    children: [
      {
        id: 'inscripcion_aspirante',
        title: 'Inscripcion Aspirante',
        icon: Circle,
        navLink: '/inscripcion-aspirante',
        permiso: 'inscripcion',
      },
      {
        id: 'inscripcion_curso',
        title: 'Inscripcion Curso',
        icon: Circle,
        navLink: '/inscripcion-curso',
        permiso: 'inscripcion',
      },
    ],
  },
  {
    id: 'personas',
    title: 'Personas',
    icon: Users,
    navLink: '/personas',
    permiso: 'personas',
  },
]

export default navigation
