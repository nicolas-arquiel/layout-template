import React, { useState, useMemo } from 'react';
import { Container, Heading, Flex, Tabs, Box, Text, Code, Badge } from '@radix-ui/themes';
import {
  TableProvider,
  TableWithClientSideData,
  VirtualizedTableWithFilters,
  TanStackTableWithClientData,
  SearchFilter,
  BigDataSearchFilter,
  DateRangeFilter,
  SelectFilter,
  CheckboxFilter,
  AdvancedFilter,
  ExportFilter
} from '../@core/components/tables';
import { Users, Database, Zap } from 'react-feather';
import BreadCrumbs from '../@core/components/breadcrumbs/BreadCrumbs';
import { createColumnHelper } from '@tanstack/react-table';

// ===== DATOS DE EJEMPLO =====
const generateMockUsers = (count) => {
  const nombres = ['Juan', 'María', 'Pedro', 'Ana', 'Carlos', 'Laura', 'José', 'Sofia', 'Luis', 'Carmen'];
  const apellidos = ['García', 'Martínez', 'López', 'González', 'Rodríguez', 'Fernández', 'Pérez', 'Sánchez', 'Ramírez', 'Torres'];
  const ciudades = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza'];
  const estados = ['activo', 'inactivo', 'pendiente'];
  const roles = ['admin', 'user', 'moderator'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    nombre: nombres[Math.floor(Math.random() * nombres.length)],
    apellido: apellidos[Math.floor(Math.random() * apellidos.length)],
    email: `usuario${i + 1}@example.com`,
    edad: Math.floor(Math.random() * 50) + 18,
    ciudad: ciudades[Math.floor(Math.random() * ciudades.length)],
    estado: estados[Math.floor(Math.random() * estados.length)],
    rol: roles[Math.floor(Math.random() * roles.length)],
    activo: Math.random() > 0.5,
    premium: Math.random() > 0.7,
    created_at: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    salario: Math.floor(Math.random() * 5000) + 2000
  }));
};

const EjemploTablas = () => {
  const [data] = useState(() => generateMockUsers(100));
  const [largeData] = useState(() => generateMockUsers(10000));

  // TanStack Table column definitions
  const columnHelper = createColumnHelper();

  const tanstackColumns = useMemo(() => [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue(),
      size: 80
    }),
    columnHelper.accessor(row => `${row.nombre} ${row.apellido}`, {
      id: 'nombreCompleto',
      header: 'Nombre Completo',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('edad', {
      header: 'Edad',
      cell: info => info.getValue(),
      size: 100
    }),
    columnHelper.accessor('ciudad', {
      header: 'Ciudad',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('estado', {
      header: 'Estado',
      cell: info => {
        const estado = info.getValue();
        const color = estado === 'activo' ? 'green' : estado === 'inactivo' ? 'red' : 'yellow';
        return <Badge color={color}>{estado}</Badge>;
      },
    }),
    columnHelper.accessor('rol', {
      header: 'Rol',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('salario', {
      header: 'Salario',
      cell: info => `${info.getValue()}€`,
    }),
  ], [columnHelper]);

  // Columnas básicas
  const basicColumns = useMemo(() => [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Nombre',
      selector: row => `${row.nombre} ${row.apellido}`,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Ciudad',
      selector: row => row.ciudad,
      sortable: true
    },
    {
      name: 'Estado',
      selector: row => row.estado,
      sortable: true,
      cell: row => (
        <span className={`badge badge-${row.estado === 'activo' ? 'success' : row.estado === 'inactivo' ? 'danger' : 'warning'}`}>
          {row.estado}
        </span>
      )
    }
  ], []);

  // Columnas con filterOptions para AdvancedFilter
  const advancedColumns = useMemo(() => [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '80px',
      filterOptions: {
        value: 'id',
        label: 'ID',
        type: 'number'
      }
    },
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
      filterOptions: {
        value: 'nombre',
        label: 'Nombre',
        type: 'text'
      }
    },
    {
      name: 'Apellido',
      selector: row => row.apellido,
      sortable: true,
      filterOptions: {
        value: 'apellido',
        label: 'Apellido',
        type: 'text'
      }
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      filterOptions: {
        value: 'email',
        label: 'Email',
        type: 'text'
      }
    },
    {
      name: 'Edad',
      selector: row => row.edad,
      sortable: true,
      width: '100px',
      filterOptions: {
        value: 'edad',
        label: 'Edad',
        type: 'number'
      }
    },
    {
      name: 'Ciudad',
      selector: row => row.ciudad,
      sortable: true,
      filterOptions: {
        value: 'ciudad',
        label: 'Ciudad',
        type: 'text',
        options: [
          { value: 'Madrid', label: 'Madrid' },
          { value: 'Barcelona', label: 'Barcelona' },
          { value: 'Valencia', label: 'Valencia' },
          { value: 'Sevilla', label: 'Sevilla' },
          { value: 'Zaragoza', label: 'Zaragoza' }
        ]
      }
    },
    {
      name: 'Estado',
      selector: row => row.estado,
      sortable: true,
      filterOptions: {
        value: 'estado',
        label: 'Estado',
        type: 'text',
        options: [
          { value: 'activo', label: 'Activo' },
          { value: 'inactivo', label: 'Inactivo' },
          { value: 'pendiente', label: 'Pendiente' }
        ]
      },
      cell: row => (
        <span className={`badge badge-${row.estado === 'activo' ? 'success' : row.estado === 'inactivo' ? 'danger' : 'warning'}`}>
          {row.estado}
        </span>
      )
    },
    {
      name: 'Rol',
      selector: row => row.rol,
      sortable: true,
      filterOptions: {
        value: 'rol',
        label: 'Rol',
        type: 'text',
        isMulti: true,
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
          { value: 'moderator', label: 'Moderator' }
        ]
      }
    },
    {
      name: 'Activo',
      selector: row => row.activo ? 'Sí' : 'No',
      sortable: true,
      width: '100px',
      filterOptions: {
        value: 'activo',
        label: 'Activo',
        type: 'boolean'
      }
    },
    {
      name: 'Premium',
      selector: row => row.premium ? 'Sí' : 'No',
      sortable: true,
      width: '100px',
      filterOptions: {
        value: 'premium',
        label: 'Premium',
        type: 'boolean'
      }
    },
    {
      name: 'Fecha Registro',
      selector: row => new Date(row.created_at).toLocaleDateString('es-ES'),
      sortable: true,
      sortField: 'created_at',
      filterOptions: {
        value: 'created_at',
        label: 'Fecha Registro',
        type: 'date'
      }
    },
    {
      name: 'Salario',
      selector: row => `${row.salario}€`,
      sortable: true,
      sortField: 'salario',
      filterOptions: {
        value: 'salario',
        label: 'Salario',
        type: 'number'
      }
    }
  ], []);

  // Columnas para BigDataSearch
  const bigDataColumns = useMemo(() => [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '80px',
      filterOptions: {
        value: 'id',
        label: 'ID'
      }
    },
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
      filterOptions: {
        value: 'nombre',
        label: 'Nombre'
      }
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      filterOptions: {
        value: 'email',
        label: 'Email'
      }
    },
    {
      name: 'Ciudad',
      selector: row => row.ciudad,
      sortable: true,
      filterOptions: {
        value: 'ciudad',
        label: 'Ciudad'
      }
    },
    {
      name: 'Estado',
      selector: row => row.estado,
      sortable: true,
      cell: row => (
        <span className={`badge badge-${row.estado === 'activo' ? 'success' : row.estado === 'inactivo' ? 'danger' : 'warning'}`}>
          {row.estado}
        </span>
      )
    }
  ], []);

  const checkboxFilters = [
    { field: 'activo', value: true, label: 'Solo Activos' },
    { field: 'premium', value: true, label: 'Solo Premium' }
  ];

  const estadoOptions = [
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' },
    { value: 'pendiente', label: 'Pendiente' }
  ];

  return (
    <Container size="4" style={{ padding: '20px' }}>
      <BreadCrumbs
        title="Sistema de Tablas"
        data={[
          { title: 'Componentes', link: '/componentes' },
          { title: 'Tablas' },
        ]}
        dropDown={true}
      />

      <Flex direction="column" gap="4" mb="6" mt="4">
        <Heading size="8">Sistema de Tablas - Ejemplos</Heading>
        <Text size="3" color="gray">
          Ejemplos completos del sistema de tablas con filtros avanzados migrado a Radix UI
        </Text>
      </Flex>

      <Tabs.Root defaultValue="simple">
        <Tabs.List>
          <Tabs.Trigger value="simple">Tabla Simple</Tabs.Trigger>
          <Tabs.Trigger value="search">Con Búsqueda</Tabs.Trigger>
          <Tabs.Trigger value="bigdata">BigData Search</Tabs.Trigger>
          <Tabs.Trigger value="advanced">Filtro Avanzado</Tabs.Trigger>
          <Tabs.Trigger value="multiple">Múltiples Filtros</Tabs.Trigger>
          <Tabs.Trigger value="virtualized">Tabla Virtualizada</Tabs.Trigger>
          <Tabs.Trigger value="tanstack">TanStack Table</Tabs.Trigger>
        </Tabs.List>

        <Box pt="4">
          {/* EJEMPLO 1: Tabla Simple */}
          <Tabs.Content value="simple">
            <Flex direction="column" gap="4">
              <Box>
                <Heading size="5" mb="2">Tabla Simple con TableProvider</Heading>
                <Text size="2" color="gray" mb="4">
                  Tabla básica con datos en cliente, sin filtros.
                </Text>
                <Code size="2" style={{ display: 'block', padding: '10px', marginBottom: '20px' }}>
                  {`<TableProvider tableType="client">
  <TableWithClientSideData
    data={data}
    columns={columns}
    title="Usuarios"
    titleIcon={Users}
  />
</TableProvider>`}
                </Code>
              </Box>

              <TableProvider tableType="client">
                <TableProvider>
                  <TableWithClientSideData
                    data={data}
                    columns={basicColumns}
                    title="Usuarios"
                    titleIcon={Users}
                    iconThemeClass="bg-primary"
                  />
                </TableProvider>
              </TableProvider>
            </Flex>
          </Tabs.Content>

          {/* EJEMPLO 2: Con SearchFilter */}
          <Tabs.Content value="search">
            <Flex direction="column" gap="4">
              <Box>
                <Heading size="5" mb="2">Tabla con Búsqueda Simple</Heading>
                <Text size="2" color="gray" mb="4">
                  SearchFilter busca en múltiples campos simultáneamente.
                </Text>
                <Code size="2" style={{ display: 'block', padding: '10px', marginBottom: '20px' }}>
                  {`<TableProvider tableType="client">
  <SearchFilter fields={['nombre', 'apellido', 'email', 'ciudad']} />
  <TableWithClientSideData data={data} columns={columns} />
</TableProvider>`}
                </Code>
              </Box>

              <TableProvider tableType="client">
                <Flex direction="column" gap="3">
                  <SearchFilter fields={['nombre', 'apellido', 'email', 'ciudad']} />

                  <TableWithClientSideData
                    data={data}
                    columns={basicColumns}
                    title="Usuarios con Búsqueda"
                    titleIcon={Users}
                  />
                </Flex>
              </TableProvider>
            </Flex>
          </Tabs.Content>

          {/* EJEMPLO 3: BigDataSearchFilter */}
          <Tabs.Content value="bigdata">
            <Flex direction="column" gap="4">
              <Box>
                <Heading size="5" mb="2">BigData Search</Heading>
                <Text size="2" color="gray" mb="4">
                  Búsqueda por campo específico (selector + input + botón).
                </Text>
                <Code size="2" style={{ display: 'block', padding: '10px', marginBottom: '20px' }}>
                  {`<TableProvider tableType="client">
  <BigDataSearchFilter columns={columns} />
  <TableWithClientSideData data={data} columns={columns} />
</TableProvider>`}
                </Code>
              </Box>

              <TableProvider tableType="client">
                <Flex direction="column" gap="3">
                  <BigDataSearchFilter
                    columns={bigDataColumns}
                    bigDataSearchKey="usuarios-bigdata"
                  />

                  <TableWithClientSideData
                    data={data}
                    columns={bigDataColumns}
                    title="Usuarios - BigData Search"
                    titleIcon={Database}
                  />
                </Flex>
              </TableProvider>
            </Flex>
          </Tabs.Content>

          {/* EJEMPLO 4: AdvancedFilter */}
          <Tabs.Content value="advanced">
            <Flex direction="column" gap="4">
              <Box>
                <Heading size="5" mb="2">Filtro Avanzado (⭐ Favorito)</Heading>
                <Text size="2" color="gray" mb="4">
                  Filtros con múltiples condiciones, operadores por tipo, select, multi-select, fechas, booleanos.
                </Text>
                <Code size="2" style={{ display: 'block', padding: '10px', marginBottom: '20px' }}>
                  {`<TableProvider tableType="client">
  <AdvancedFilter columns={advancedColumns} />
  <TableWithClientSideData data={data} columns={advancedColumns} />
</TableProvider>`}
                </Code>
              </Box>

              <TableProvider tableType="client">
                <Flex direction="column" gap="3">
                  <AdvancedFilter columns={advancedColumns} />

                  <TableWithClientSideData
                    data={data}
                    columns={advancedColumns}
                    title="Usuarios - Filtro Avanzado"
                    titleIcon={Database}
                  />
                </Flex>
              </TableProvider>

              <Box mt="4" p="4" style={{ backgroundColor: 'var(--gray-3)', borderRadius: 'var(--radius-3)' }}>
                <Heading size="4" mb="2">Prueba estos filtros:</Heading>
                <Flex direction="column" gap="2">
                  <Text size="2">• Edad mayor que 30</Text>
                  <Text size="2">• Salario entre 2500€ y 4000€</Text>
                  <Text size="2">• Ciudad = Madrid O Barcelona (multi-select en Rol)</Text>
                  <Text size="2">• Estado = Activo</Text>
                  <Text size="2">• Premium = Sí</Text>
                  <Text size="2">• Fecha después de 2024-06-01</Text>
                  <Text size="2">• Nombre contiene "Juan" Y Ciudad = "Madrid"</Text>
                </Flex>
              </Box>
            </Flex>
          </Tabs.Content>

          {/* EJEMPLO 5: Múltiples Filtros */}
          <Tabs.Content value="multiple">
            <Flex direction="column" gap="4">
              <Box>
                <Heading size="5" mb="2">Múltiples Filtros Combinados</Heading>
                <Text size="2" color="gray" mb="4">
                  Combinación de varios tipos de filtros: Búsqueda, Fechas, Select, Checkboxes, Exportar.
                </Text>
              </Box>

              <TableProvider tableType="client">
                <Flex direction="column" gap="3">
                  <Flex gap="2" wrap="wrap">
                    <SearchFilter fields={['nombre', 'apellido', 'email']} />
                    <DateRangeFilter dataSearchField="created_at" />
                    <SelectFilter
                      options={estadoOptions}
                      placeHolder="Filtrar por Estado"
                    />
                    <ExportFilter
                      data={data}
                      exportFormats={[
                        { name: 'CSV' }
                      ]}
                    />
                  </Flex>

                  <CheckboxFilter
                    checkboxFilter={checkboxFilters}
                  />

                  <TableWithClientSideData
                    data={data}
                    columns={advancedColumns}
                    title="Usuarios - Múltiples Filtros"
                    titleIcon={Database}
                  />
                </Flex>
              </TableProvider>
            </Flex>
          </Tabs.Content>

          {/* EJEMPLO 6: Tabla Virtualizada */}
          <Tabs.Content value="virtualized">
            <Flex direction="column" gap="4">
              <Box>
                <Heading size="5" mb="2">Tabla Virtualizada (Alto Rendimiento)</Heading>
                <Text size="2" color="gray" mb="4">
                  Para grandes volúmenes de datos (10,000+ registros). Usa react-window para renderizado eficiente.
                </Text>
                <Code size="2" style={{ display: 'block', padding: '10px', marginBottom: '20px' }}>
                  {`<TableProvider tableType="client">
  <SearchFilter fields={['nombre', 'email']} />
  <AdvancedFilter columns={columns} />
  <VirtualizedTableWithFilters
    data={largeData}
    columns={columns}
    rowHeight={50}
  />
</TableProvider>`}
                </Code>
              </Box>

              <TableProvider tableType="client">
                <Flex direction="column" gap="3">
                  <Flex gap="2" wrap="wrap">
                    <SearchFilter fields={['nombre', 'apellido', 'email']} />
                    <AdvancedFilter columns={advancedColumns} />
                  </Flex>

                  <VirtualizedTableWithFilters
                    data={largeData}
                    columns={advancedColumns}
                    title="10,000 Usuarios - Tabla Virtualizada"
                    titleIcon={Zap}
                    rowHeight={50}
                    overscanRowCount={10}
                  />
                </Flex>
              </TableProvider>

              <Box mt="4" p="4" style={{ backgroundColor: 'var(--accent-3)', borderRadius: 'var(--radius-3)' }}>
                <Heading size="4" mb="2">⚡ Performance</Heading>
                <Text size="2">
                  Esta tabla renderiza 10,000 registros sin problemas de performance gracias a la virtualización.
                  Solo renderiza las filas visibles en pantalla.
                </Text>
              </Box>
            </Flex>
          </Tabs.Content>

          {/* EJEMPLO 7: TanStack Table */}
          <Tabs.Content value="tanstack">
            <Flex direction="column" gap="4">
              <Box>
                <Heading size="5" mb="2">TanStack Table (React Table v8)</Heading>
                <Text size="2" color="gray" mb="4">
                  Ejemplo usando @tanstack/react-table con componentes reutilizables para ordenamiento, paginación y filtrado.
                </Text>
                <Code size="2" style={{ display: 'block', padding: '10px', marginBottom: '20px', whiteSpace: 'pre-wrap' }}>
                  {`import { TanStackTableWithClientData } from '@core/components/tables';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue(),
  }),
  // ... más columnas
];

<TanStackTableWithClientData
  data={data}
  columns={columns}
  title="Usuarios"
  titleIcon={Users}
  showSearch={true}
  showPagination={true}
/>`}
                </Code>
              </Box>

              {/* Usar el componente TanStackTableWithClientData */}
              <TanStackTableWithClientData
                data={data}
                columns={tanstackColumns}
                title="Usuarios - TanStack Table"
                titleIcon={Users}
                iconThemeClass="bg-primary"
                showSearch={true}
                showPagination={true}
                initialPageSize={10}
                pageSizeOptions={[10, 20, 50, 100]}
              />

              {/* Features Info */}
              <Box mt="4" p="4" style={{ backgroundColor: 'var(--accent-3)', borderRadius: 'var(--radius-3)' }}>
                <Heading size="4" mb="2">✨ Características TanStack Table</Heading>
                <Flex direction="column" gap="2">
                  <Text size="2">• <strong>Ordenamiento:</strong> Click en los encabezados para ordenar ascendente/descendente</Text>
                  <Text size="2">• <strong>Paginación:</strong> Navega entre páginas y cambia el tamaño de página</Text>
                  <Text size="2">• <strong>Filtrado Global:</strong> Busca en todos los campos simultáneamente</Text>
                  <Text size="2">• <strong>Componentes Reutilizables:</strong> Usa TableContainer, TableHeader y componentes TanStack</Text>
                  <Text size="2">• <strong>Headless UI:</strong> Totalmente personalizable con Radix UI</Text>
                </Flex>
              </Box>
            </Flex>
          </Tabs.Content>
        </Box>
      </Tabs.Root>

      {/* Sección de ayuda */}
      <Box mt="6" p="4" style={{ backgroundColor: 'var(--gray-3)', borderRadius: 'var(--radius-3)' }}>
        <Heading size="4" mb="3">📚 Documentación</Heading>
        <Text size="2" mb="2">
          Para más información sobre el sistema de tablas, consulta:
        </Text>
        <Code size="2">src/@core/components/tables/README.md</Code>
      </Box>
    </Container>
  );
};

export default EjemploTablas;
