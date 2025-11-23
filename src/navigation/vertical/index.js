import {
  Home,
  UserPlus,
  Circle,
  Users,
  Settings,
  FileText,
  BarChart2,
  Folder,
  Database,
  Shield,
  Package,
  Layers
} from 'react-feather'

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
    icon: Home,
    navLink: '/inicio',
    // SIN permiso - accesible para todos
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

  {
    header: 'GESTIÓN',
  },
  {
    id: 'reportes',
    title: 'Reportes',
    icon: BarChart2,
    // SIN permiso - para testear dropdown
    children: [
      {
        id: 'reportes_ventas',
        title: 'Ventas',
        icon: Circle,
        navLink: '/reportes/ventas',
      },
      {
        id: 'reportes_usuarios',
        title: 'Usuarios',
        icon: Circle,
        navLink: '/reportes/usuarios',
      },
      {
        id: 'reportes_inventario',
        title: 'Inventario',
        icon: Circle,
        navLink: '/reportes/inventario',
      },
    ],
  },
  {
    id: 'documentos',
    title: 'Documentos',
    icon: FileText,
    navLink: '/documentos',
    // SIN permiso
  },

  {
    header: 'ADMINISTRACIÓN',
  },
  {
    id: 'configuracion',
    title: 'Configuración',
    icon: Settings,
    // SIN permiso - con children ANIDADOS (recursivo) para testear
    children: [
      {
        id: 'config_general',
        title: 'General',
        icon: Circle,
        navLink: '/config/general',
      },
      {
        id: 'config_usuarios',
        title: 'Usuarios',
        icon: Users,
        // NIVEL 2 - Children con más children (RECURSIVO)
        children: [
          {
            id: 'config_usuarios_lista',
            title: 'Lista de Usuarios',
            icon: Circle,
            navLink: '/config/usuarios/lista',
          },
          {
            id: 'config_usuarios_roles',
            title: 'Roles y Permisos',
            icon: Shield,
            // NIVEL 3 - Más anidamiento (RECURSIVO)
            children: [
              {
                id: 'config_roles_admin',
                title: 'Administradores',
                icon: Circle,
                navLink: '/config/roles/admin',
              },
              {
                id: 'config_roles_usuarios',
                title: 'Usuarios',
                icon: Circle,
                navLink: '/config/roles/usuarios',
              },
            ],
          },
          {
            id: 'config_usuarios_grupos',
            title: 'Grupos',
            icon: Circle,
            navLink: '/config/usuarios/grupos',
          },
        ],
      },
      {
        id: 'config_sistema',
        title: 'Sistema',
        icon: Database,
        children: [
          {
            id: 'config_sistema_database',
            title: 'Base de Datos',
            icon: Circle,
            navLink: '/config/sistema/database',
          },
          {
            id: 'config_sistema_api',
            title: 'API',
            icon: Circle,
            navLink: '/config/sistema/api',
          },
        ],
      },
    ],
  },
  {
    id: 'recursos',
    title: 'Recursos',
    icon: Package,
    // SIN permiso - con children simples
    children: [
      {
        id: 'recursos_archivos',
        title: 'Archivos',
        icon: Folder,
        navLink: '/recursos/archivos',
      },
      {
        id: 'recursos_plantillas',
        title: 'Plantillas',
        icon: Layers,
        navLink: '/recursos/plantillas',
      },
    ],
  },
]

export default navigation
