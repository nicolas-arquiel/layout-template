# TablaVirtualizada

Tabla con virtualización usando `react-window` para datasets grandes.

## Instalación

```bash
npm install react-window
# o
pnpm add react-window
```

## Uso Básico

```jsx
import TablaVirtualizada, { useTablaColumns, createColumn } from './components/TablaVirtualizada'

const MiComponente = () => {
  const datos = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@example.com' },
    // ... más datos
  ]

  const columnas = useTablaColumns([
    createColumn.id('ID', (row) => row.id),
    createColumn.text('Nombre', (row) => row.nombre),
    createColumn.text('Email', (row) => row.email),
  ])

  return (
    <TablaVirtualizada
      data={datos}
      columns={columnas}
      height={500}
      rowHeight={50}
      onRowClick={(row) => console.log(row)}
    />
  )
}
```

## Helpers de Columnas

### createColumn.id()
Columna numérica de ID con ancho fijo.

```jsx
createColumn.id('ID', (row) => row.id)
```

### createColumn.text()
Columna de texto simple.

```jsx
createColumn.text('Nombre', (row) => row.nombre)
```

### createColumn.nombreCompleto()
Columna de nombre completo con tooltip.

```jsx
createColumn.nombreCompleto(
  'Nombre',
  (row) => row.apellido,
  (row) => row.nombre
)
```

### createColumn.documento()
Columna para DNI/documentos.

```jsx
createColumn.documento('DNI', (row) => row.dni)
```

### createColumn.fecha()
Columna de fecha.

```jsx
createColumn.fecha('Fecha', (row) => row.fecha)
```

### createColumn.estado()
Columna con badge de estado.

```jsx
createColumn.estado('Estado', (row) => row.estado)
```

### createColumn.acciones()
Columna de acciones con botones.

```jsx
createColumn.acciones('Acciones', (row) => (
  <Button onClick={() => editar(row)}>Editar</Button>
))
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `data` | Array | `[]` | Array de datos |
| `columns` | Array | `[]` | Array de columnas |
| `height` | number | `350` | Altura en px |
| `rowHeight` | number | `50` | Altura de fila en px |
| `showHeader` | boolean | `true` | Mostrar header |
| `onRowClick` | function | `null` | Callback al hacer click en fila |
| `isLoading` | boolean | `false` | Estado de carga |
| `noDataMessage` | string | `'No hay resultados...'` | Mensaje sin datos |

## Cuándo Usar

✅ **Usar cuando:**
- Tienes 10,000+ registros
- Prioridad en performance
- No necesitas filtros complejos
- Scroll infinito

❌ **No usar cuando:**
- Necesitas filtros avanzados
- Necesitas sorting/paginación
- Dataset pequeño (< 1000 registros)
