# TablaFiltrable

Tabla avanzada con TanStack Table (React Table v8).

## Características

- ✅ Filtros por columna
- ✅ Búsqueda global
- ✅ Sorting multi-columna
- ✅ Paginación
- ✅ Query builder para backend
- ✅ Totalmente personalizable

## Instalación

```bash
npm install @tanstack/react-table
# o
pnpm add @tanstack/react-table
```

## Uso Básico

```jsx
import TablaFiltrable, { columnTemplates } from './components/TablaFiltrable'

const MiComponente = () => {
  const datos = [
    { id: 1, nombre: 'Juan', email: 'juan@example.com', activo: true },
    // ... más datos
  ]

  const columnas = [
    columnTemplates.id('id', 'ID'),
    columnTemplates.text('nombre', 'Nombre'),
    columnTemplates.text('email', 'Email'),
    columnTemplates.boolean('activo', 'Activo'),
  ]

  return (
    <TablaFiltrable
      data={datos}
      columns={columnas}
      pageSize={10}
    />
  )
}
```

## Templates de Columnas

### columnTemplates.id()
```jsx
columnTemplates.id('id', 'ID')
```

### columnTemplates.text()
```jsx
columnTemplates.text('nombre', 'Nombre')
```

### columnTemplates.nombreCompleto()
```jsx
columnTemplates.nombreCompleto('apellido', 'nombre', 'Nombre Completo')
```

### columnTemplates.fecha()
```jsx
columnTemplates.fecha('fechaNacimiento', 'Fecha Nacimiento')
```

### columnTemplates.estado()
Con mapa de colores personalizado:
```jsx
columnTemplates.estado('estado', 'Estado', {
  Activo: 'green',
  Inactivo: 'gray',
  Pendiente: 'orange'
})
```

### columnTemplates.boolean()
```jsx
columnTemplates.boolean('activo', 'Activo')
```

### columnTemplates.numero()
```jsx
columnTemplates.numero('cantidad', 'Cantidad', 2) // 2 decimales
```

### columnTemplates.moneda()
```jsx
columnTemplates.moneda('precio', 'Precio', 'ARS')
```

### columnTemplates.acciones()
```jsx
columnTemplates.acciones(
  (info) => (
    <Button onClick={() => editar(info.row.original)}>
      Editar
    </Button>
  ),
  'Acciones'
)
```

## Modo Backend

Para manejar filtros, sorting y paginación en el backend:

```jsx
const [datos, setDatos] = useState([])
const [cargando, setCargando] = useState(false)
const [totalPaginas, setTotalPaginas] = useState(0)

const handleQueryChange = async (query) => {
  setCargando(true)

  // query contiene:
  // {
  //   filters: { nombre: 'Juan', estado: 'Activo' },
  //   sorting: [{ field: 'nombre', order: 'asc' }],
  //   pagination: { page: 1, pageSize: 10, offset: 0 }
  // }

  const response = await fetch('/api/datos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  })

  const result = await response.json()
  setDatos(result.data)
  setTotalPaginas(result.totalPages)
  setCargando(false)
}

return (
  <TablaFiltrable
    data={datos}
    columns={columnas}
    isLoading={cargando}
    manualFiltering={true}
    manualSorting={true}
    manualPagination={true}
    pageCount={totalPaginas}
    onQueryChange={handleQueryChange}
  />
)
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `data` | Array | `[]` | Datos de la tabla |
| `columns` | Array | `[]` | Definición de columnas |
| `enableFilters` | boolean | `true` | Habilitar filtros |
| `enableSorting` | boolean | `true` | Habilitar sorting |
| `enablePagination` | boolean | `true` | Habilitar paginación |
| `enableGlobalFilter` | boolean | `true` | Búsqueda global |
| `manualFiltering` | boolean | `false` | Filtros en backend |
| `manualSorting` | boolean | `false` | Sorting en backend |
| `manualPagination` | boolean | `false` | Paginación en backend |
| `pageSize` | number | `10` | Tamaño de página |
| `pageCount` | number | - | Total de páginas (backend) |
| `onFiltersChange` | function | - | Callback filtros |
| `onSortingChange` | function | - | Callback sorting |
| `onPaginationChange` | function | - | Callback paginación |
| `onQueryChange` | function | - | Callback query completo |
| `isLoading` | boolean | `false` | Estado de carga |
| `emptyMessage` | string | `'No hay datos...'` | Mensaje sin datos |

## Columnas Personalizadas

Puedes crear columnas completamente personalizadas:

```jsx
const columnas = [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
    cell: (info) => (
      <Flex gap="2">
        <Avatar />
        <Text>{info.getValue()}</Text>
      </Flex>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
]
```

## Cuándo Usar

✅ **Usar cuando:**
- Necesitas filtros avanzados
- Necesitas sorting y paginación
- Dataset mediano (< 5000 registros frontend)
- Dataset grande con backend
- Funcionalidad completa de tabla

❌ **No usar cuando:**
- Dataset muy grande sin backend (> 10k)
- Solo necesitas scroll simple
- No necesitas interactividad
