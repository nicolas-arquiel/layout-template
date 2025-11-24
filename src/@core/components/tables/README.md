# Sistema de Tablas con Radix UI

Sistema modular y completo de tablas con filtros avanzados, paginación, ordenamiento y soporte para virtualización. Migrado de Bootstrap a Radix UI.

## 📋 Características

- ✅ **Modo Cliente y Async**: Filtrado en cliente o integración con backend
- ✅ **Filtros Modulares**: Funcionan independientes o conectados con Context
- ✅ **Filtros Disponibles**: Search, BigDataSearch, DateRange, Select, Checkbox, Advanced
- ✅ **Tabla Virtualizada**: Integración con TablaVirtualizada para grandes volúmenes
- ✅ **Query String Auto**: Generación automática para backend
- ✅ **Radix UI**: Componentes modernos y accesibles
- ✅ **TypeScript Ready**: Tipado completo disponible

## 📁 Estructura

```
src/@core/components/tables/
├── components/          # UI Components (Radix UI)
│   ├── AdvancedFilter.jsx
│   ├── BigDataSearchInput.jsx
│   ├── CheckboxFilter.jsx
│   ├── DataCounter.jsx
│   ├── DateRangeInput.jsx
│   ├── ExportarBtn.jsx
│   ├── ResetButton.jsx
│   ├── SearchInput.jsx
│   ├── SelectFilterInput.jsx
│   ├── TableContainer.jsx
│   └── TableHeader.jsx
├── context/             # Context API
│   └── TableContext.js
├── filters/             # Filter Wrappers
│   ├── AdvancedFilter.js
│   ├── BigDataSearchFilter.js
│   ├── CheckboxFilter.js
│   ├── DateRangeFilter.js
│   ├── ExportFilter.js
│   ├── SearchFilter.js
│   └── SelectFilter.js
├── hooks/               # Custom Hooks
│   ├── useDataExport.js
│   ├── useDataFilter.js
│   ├── useFilterHandlers.js
│   ├── useFilterOperators.js
│   ├── usePagination.js
│   ├── useTableData.js
│   └── useTableFilters.js
├── tables/              # Table Components
│   ├── BasicTable.js
│   ├── TableWithAsyncData.js
│   ├── TableWithClientSideData.js
│   └── VirtualizedTableWithFilters.js
├── utils/               # Utilities
│   └── queryStringUtils.js
└── constants/           # Constants
    └── filterConstants.js
```

## 🚀 Uso Rápido

### 1. Tabla Simple (Cliente)

```jsx
import {
  TableProvider,
  TableWithClientSideData,
  SearchFilter
} from '@/@core/components/tables';

function MiComponente() {
  const [data, setData] = useState([...]);

  const columns = [
    { name: 'Nombre', selector: row => row.nombre, sortable: true },
    { name: 'Email', selector: row => row.email }
  ];

  return (
    <TableProvider tableType="client">
      <SearchFilter fields={['nombre', 'email']} />

      <TableWithClientSideData
        data={data}
        columns={columns}
        title="Usuarios"
      />
    </TableProvider>
  );
}
```

### 2. Tabla con Backend (Async)

```jsx
import {
  TableProvider,
  TableWithAsyncData,
  BigDataSearchFilter,
  DateRangeFilter
} from '@/@core/components/tables';

function MiComponente() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAsyncParamsChange = async (queryString) => {
    const response = await fetch(`/api/users?${queryString}`);
    const result = await response.json();
    setData(result.data);
    setTotal(result.total);
  };

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      filterOptions: { value: 'nombre', label: 'Nombre' }
    },
    {
      name: 'Email',
      selector: row => row.email,
      filterOptions: { value: 'email', label: 'Email' }
    }
  ];

  return (
    <TableProvider
      tableType="async"
      onAsyncParamsChange={handleAsyncParamsChange}
      useQueryString={true}
    >
      <BigDataSearchFilter columns={columns} />
      <DateRangeFilter dataSearchField="created_at" />

      <TableWithAsyncData
        data={data}
        columns={columns}
        allCountData={total}
        title="Usuarios"
      />
    </TableProvider>
  );
}
```

### 3. Tabla Virtualizada (Alto Rendimiento)

```jsx
import {
  TableProvider,
  VirtualizedTableWithFilters,
  SearchFilter,
  AdvancedFilter
} from '@/@core/components/tables';
import { Search } from 'react-feather';

function MiComponente() {
  const [data, setData] = useState([...10000 items]);

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      filterOptions: {
        value: 'nombre',
        label: 'Nombre',
        type: 'text'
      }
    },
    {
      name: 'Edad',
      selector: row => row.edad,
      filterOptions: {
        value: 'edad',
        label: 'Edad',
        type: 'number'
      }
    }
  ];

  return (
    <TableProvider tableType="client">
      <SearchFilter fields={['nombre', 'email']} />
      <AdvancedFilter columns={columns} />

      <VirtualizedTableWithFilters
        data={data}
        columns={columns}
        title="Usuarios"
        titleIcon={Search}
        rowHeight={50}
      />
    </TableProvider>
  );
}
```

## 🔧 Filtros Disponibles

### SearchFilter
Búsqueda simple en múltiples campos:
```jsx
<SearchFilter
  fields={['nombre', 'email', 'telefono']}
  title="Buscar"
/>
```

### BigDataSearchFilter
Búsqueda con selector de campo (para datasets grandes):
```jsx
<BigDataSearchFilter
  columns={columns}
  bigDataSearchKey="usuarios"
/>
```

### DateRangeFilter
Filtro de rango de fechas con Flatpickr:
```jsx
<DateRangeFilter
  dataSearchField="created_at"
/>
```

### SelectFilter
Filtro con dropdown de opciones:
```jsx
<SelectFilter
  options={[
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' }
  ]}
  placeHolder="Estado"
/>
```

### CheckboxFilter
Filtros múltiples con checkboxes:
```jsx
<CheckboxFilter
  checkboxFilter={[
    { field: 'activo', value: true, label: 'Activos' },
    { field: 'premium', value: true, label: 'Premium' }
  ]}
/>
```

### AdvancedFilter (⭐ Favorito)
Filtro avanzado con múltiples condiciones y operadores:
```jsx
<AdvancedFilter
  columns={columns}
  onFilter={(filters) => console.log(filters)}
/>
```

**Soporte para:**
- **Text**: contains, equals, startsWith, endsWith, not_equals
- **Number**: eq, gt, lt, gte, lte, neq
- **Date**: eq, gt, lt
- **Boolean**: true, false
- **Select**: opciones predefinidas
- **Multi-Select**: múltiples valores

**Configuración de columnas:**
```jsx
const columns = [
  {
    name: 'Nombre',
    selector: row => row.nombre,
    filterOptions: {
      value: 'nombre',
      label: 'Nombre',
      type: 'text' // text | number | date | boolean
    }
  },
  {
    name: 'Estado',
    selector: row => row.estado,
    filterOptions: {
      value: 'estado',
      label: 'Estado',
      type: 'text',
      options: [
        { value: 'activo', label: 'Activo' },
        { value: 'inactivo', label: 'Inactivo' }
      ]
    }
  },
  {
    name: 'Tags',
    selector: row => row.tags,
    filterOptions: {
      value: 'tags',
      label: 'Tags',
      type: 'text',
      isMulti: true, // Permite selección múltiple
      options: [
        { value: 'vip', label: 'VIP' },
        { value: 'premium', label: 'Premium' }
      ]
    }
  }
];
```

## 📊 Configuración de Columnas

```jsx
const columns = [
  {
    name: 'Nombre',                    // Título de la columna
    selector: row => row.nombre,       // Accessor de datos
    sortable: true,                    // ¿Ordenable?
    sortField: 'nombre',               // Campo para ordenar en backend
    filterOptions: {                   // Configuración para AdvancedFilter
      value: 'nombre',                 // Campo en el objeto
      label: 'Nombre',                 // Label visible
      type: 'text',                    // Tipo de campo
      options: [...],                  // Opciones para select (opcional)
      isMulti: false                   // Multi-select (opcional)
    }
  }
];
```

## 🎨 Personalización

### TableContainer
```jsx
<TableWithClientSideData
  customClassCard="shadow-lg"
  customClassCardBody="p-0"
  title="Mi Tabla"
  titleIcon={Users}
  iconThemeClass="bg-primary"
/>
```

### Controles Personalizados
```jsx
<TableWithClientSideData
  showFilteredDataCount={true}
  showResetAllBtn={true}
  paginationPerPage={10}
/>
```

## 🔄 Context API

### TableProvider Props

```jsx
<TableProvider
  tableType="client"              // 'client' | 'async'
  onAsyncParamsChange={callback}  // Callback para async mode
  initialLoad={true}              // Cargar datos al montar
  defaultPaginationPerPage={7}    // Items por página
  useQueryString={true}           // Generar query strings
>
  {children}
</TableProvider>
```

### useTable Hook

```jsx
import { useTable } from '@/@core/components/tables';

function MiComponente() {
  const {
    data,              // Datos filtrados
    originalData,      // Datos originales
    filters,           // Filtros activos
    hasActiveFilters,  // ¿Hay filtros activos?
    resetFilters,      // Función para resetear
    setFilter,         // Función para setear filtro
    pagination,        // Estado de paginación
    loading            // Estado de carga
  } = useTable();
}
```

## 📦 Exportación

```jsx
import { ExportFilter } from '@/@core/components/tables';

<ExportFilter
  data={data}
  exportFormats={[
    { name: 'CSV' },
    { name: 'Excel', foo: handleExportExcel },
    { name: 'PDF', foo: handleExportPDF }
  ]}
  exportarDatos={exportarDatos}
/>
```

## 🔌 Backend Integration

### Query String Generado

Para modo async, el sistema genera automáticamente query strings:

```
pagination[page]=1&pagination[perpage]=7
&likeSearch[nombre]=john
&dateFilter[field]=created_at&dateFilter[min]=2024-01-01&dateFilter[max]=2024-12-31
&fixedSearch[0][field]=activo&fixedSearch[0][value]=true
&advancedFilter[0][field]=edad&advancedFilter[0][operator]=gt&advancedFilter[0][value]=18&advancedFilter[0][type]=number
&order[field]=nombre&order[order]=ASC
```

### Formato de Respuesta Esperado

```json
{
  "data": [...],
  "total": 1000,
  "page": 1,
  "perpage": 7
}
```

## 🛠️ Hooks Disponibles

### useTableFilters
```jsx
const {
  filters,
  hasActiveFilters,
  setFilter,
  resetFilters,
  setBigDataSearch,
  setDateRange,
  setAdvancedFilters,
  clearSpecificFilter
} = useTableFilters();
```

### useTableData
```jsx
const {
  data,
  originalData,
  loading,
  setData,
  setOriginalData,
  setLoading,
  refreshData
} = useTableData();
```

### useFilterHandlers
```jsx
const {
  paramsFilter,
  handleCheckboxFilter,
  handleFilter,
  handleBigDataFilter,
  handleBigDataFilterClient,
  handleFilterClick,
  handleDateFilter,
  handleOptionChange,
  handleSort,
  handleSelectOption
} = useFilterHandlers(setAsyncParams, resetPagination);
```

## 💡 Ejemplos Avanzados

### Filtros Independientes (Sin Context)

```jsx
function MiComponente() {
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = (filters) => {
    // Tu lógica de filtrado
    const filtered = data.filter(item => {
      return filters.some(f =>
        item[f.field].toString().includes(f.value)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <>
      <AdvancedFilter
        columns={columns}
        onFilter={handleFilter}
      />

      {/* Tabla sin TableProvider */}
      <BasicTable
        data={filteredData}
        columns={columns}
      />
    </>
  );
}
```

### Múltiples Tablas en la Misma Página

```jsx
function MiComponente() {
  return (
    <>
      <TableProvider tableType="client">
        <TableWithClientSideData data={usuarios} columns={columnasUsuarios} />
      </TableProvider>

      <TableProvider tableType="client">
        <TableWithClientSideData data={productos} columns={columnasProductos} />
      </TableProvider>
    </>
  );
}
```

## 🎯 Mejores Prácticas

1. **Usa TableProvider** para aprovechar toda la funcionalidad
2. **Modo Client** para < 1000 registros
3. **Modo Async** para grandes datasets
4. **VirtualizedTable** para > 10,000 registros en cliente
5. **AdvancedFilter** es el más potente, úsalo cuando necesites filtros complejos
6. **Configura filterOptions** en columns para habilitar AdvancedFilter
7. **useQueryString={true}** para backends que esperan query strings
8. **Memoiza columns** con useMemo para evitar re-renders

## 🐛 Troubleshooting

### Filtros no funcionan
- Verifica que estés dentro de `<TableProvider>`
- Revisa que `tableType` esté correctamente configurado
- Para modo async, verifica que `onAsyncParamsChange` esté definido

### AdvancedFilter no muestra campos
- Agrega `filterOptions` a tus columnas
- Verifica que `value`, `label` y `type` estén definidos

### Performance issues
- Usa `VirtualizedTableWithFilters` para grandes datasets
- Memoiza tus columns con `useMemo`
- Considera pagination en lugar de mostrar todos los datos

## 📝 Migración desde Bootstrap

Si tienes tablas antiguas con Bootstrap/Reactstrap:

1. Reemplaza `Card/CardBody` con componentes de Radix UI
2. Los filtros mantienen la misma API
3. TableContext es retrocompatible
4. AdvancedFilter ahora usa Radix UI Dialog en lugar de Dropdown

## 🤝 Contribuir

Este sistema está diseñado para ser modular y extensible. Puedes:

- Agregar nuevos tipos de filtros
- Extender los operadores en `filterConstants.js`
- Crear tus propios componentes UI
- Agregar nuevos hooks personalizados

## 📄 Licencia

Parte del proyecto layout-template
