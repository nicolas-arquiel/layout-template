import {
  HomeIcon,
  PlusCircledIcon,
  CircleIcon,
  PersonIcon,
  GearIcon,
  FileTextIcon,
  BarChartIcon,
  FileIcon,
  CubeIcon,
  LockClosedIcon,
  StackIcon,
  TableIcon
} from '@radix-ui/react-icons'

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
 * - Items SIN permiso: accesibles para todos (útil para testing)
 */
const navigation = [
  {
    header: 'MI APP',
  },
  {
    id: 'inicio',
    title: 'Inicio',
    icon: HomeIcon,
    navLink: '/inicio',
    // SIN permiso - accesible para todos
  },
  {
    id: 'inscripciones',
    title: 'Inscripciones',
    icon: PlusCircledIcon,
    permiso: 'inscripcion',
    children: [
      {
        id: 'inscripcion_persona',
        title: 'Inscripcion Persona',
        icon: CircleIcon,
        navLink: '/inscripcion-persona',
        permiso: 'inscripcion',
      },
      {
        id: 'inscripcion_aspirante',
        title: 'Inscripcion Aspirante',
        icon: CircleIcon,
        navLink: '/inscripcion-aspirante',
        permiso: 'inscripcion',
      },
      {
        id: 'inscripcion_curso',
        title: 'Inscripcion Curso',
        icon: CircleIcon,
        navLink: '/inscripcion-curso',
        permiso: 'inscripcion',
      },
    ],
  },
  {
    id: 'personas',
    title: 'Personas',
    icon: PersonIcon,
    navLink: '/personas',
    permiso: 'personas',
  },

  {
    header: 'GESTIÓN',
  },
  {
    id: 'reportes',
    title: 'Reportes',
    icon: BarChartIcon,
    badge: 'Nuevo', // Ejemplo de badge en grupo
    // SIN permiso - para testear dropdown
    children: [
      {
        id: 'reportes_ventas',
        title: 'Ventas',
        icon: CircleIcon,
        navLink: '/reportes/ventas',
      },
      {
        id: 'reportes_usuarios',
        title: 'Usuarios',
        icon: CircleIcon,
        navLink: '/reportes/usuarios',
      },
      {
        id: 'reportes_inventario',
        title: 'Inventario',
        icon: CircleIcon,
        navLink: '/reportes/inventario',
      },
    ],
  },
  {
    id: 'documentos',
    title: 'Documentos',
    icon: FileTextIcon,
    navLink: '/documentos',
    // SIN permiso
  },
  {
    id: 'ejemplo_tablas',
    title: 'Ejemplo Tablas',
    icon: TableIcon,
    navLink: '/ejemplo-tablas',
    // SIN permiso - para testear sistema de tablas
  },

  {
    header: 'ADMINISTRACIÓN',
  },
  {
    id: 'configuracion',
    title: 'Configuración',
    icon: GearIcon,
    // SIN permiso - con children ANIDADOS (recursivo) para testear
    children: [
      {
        id: 'config_general',
        title: 'General',
        icon: CircleIcon,
        navLink: '/config/general',
      },
      {
        id: 'config_usuarios',
        title: 'Usuarios',
        icon: PersonIcon,
        // NIVEL 2 - Children con más children (RECURSIVO)
        children: [
          {
            id: 'config_usuarios_lista',
            title: 'Lista de Usuarios',
            icon: CircleIcon,
            navLink: '/config/usuarios/lista',
          },
          {
            id: 'config_usuarios_roles',
            title: 'Roles y Permisos',
            icon: LockClosedIcon,
            // NIVEL 3 - Más anidamiento (RECURSIVO)
            children: [
              {
                id: 'config_roles_admin',
                title: 'Administradores',
                icon: CircleIcon,
                navLink: '/config/roles/admin',
              },
              {
                id: 'config_roles_usuarios',
                title: 'Usuarios',
                icon: CircleIcon,
                navLink: '/config/roles/usuarios',
              },
            ],
          },
          {
            id: 'config_usuarios_grupos',
            title: 'Grupos',
            icon: CircleIcon,
            navLink: '/config/usuarios/grupos',
          },
        ],
      },
      {
        id: 'config_sistema',
        title: 'Sistema',
        icon: CubeIcon,
        children: [
          {
            id: 'config_sistema_database',
            title: 'Base de Datos',
            icon: CircleIcon,
            navLink: '/config/sistema/database',
          },
          {
            id: 'config_sistema_api',
            title: 'API',
            icon: CircleIcon,
            navLink: '/config/sistema/api',
          },
        ],
      },
    ],
  },
  {
    id: 'recursos',
    title: 'Recursos',
    icon: CubeIcon,
    // SIN permiso - con children simples
    children: [
      {
        id: 'recursos_archivos',
        title: 'Archivos',
        icon: FileIcon,
        navLink: '/recursos/archivos',
      },
      {
        id: 'recursos_plantillas',
        title: 'Plantillas',
        icon: StackIcon,
        navLink: '/recursos/plantillas',
      },
    ],
  },
]

export default navigation
