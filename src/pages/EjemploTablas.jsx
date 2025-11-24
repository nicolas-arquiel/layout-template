import { useState } from 'react'
import { Box, Flex, Heading, Text, Card, Tabs, Button, Badge } from '@radix-ui/themes'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import TablaVirtualizada, {
  useTablaColumns,
  createColumn,
} from '../components/TablaVirtualizada'
import TablaFiltrable, { columnTemplates } from '../components/TablaFiltrable'

/**
 * EjemploTablas - Página de demostración de tablas
 *
 * Muestra:
 * 1. TablaVirtualizada - Para grandes datasets con virtualización
 * 2. TablaFiltrable - Con filtros, sorting y paginación
 */
export default function EjemploTablas() {
  // Datos de ejemplo
  const generateData = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      nombre: `Persona ${i + 1}`,
      apellido: `Apellido ${i + 1}`,
      email: `persona${i + 1}@example.com`,
      dni: `${20000000 + i}`,
      fechaNacimiento: new Date(1990, 0, 1 + (i % 365))
        .toISOString()
        .split('T')[0],
      estado: ['Activo', 'Inactivo', 'Pendiente'][i % 3],
      activo: i % 2 === 0,
      puntaje: Math.floor(Math.random() * 100),
    }))
  }

  const datosVirtualizada = generateData(10000) // 10k registros
  const datosFiltrable = generateData(100) // 100 registros

  // ============================================
  // TABLA VIRTUALIZADA - Configuración
  // ============================================

  const columnasVirtualizada = useTablaColumns([
    createColumn.id('ID', (row) => row.id),
    createColumn.nombreCompleto(
      'Nombre',
      (row) => row.apellido,
      (row) => row.nombre
    ),
    createColumn.documento('DNI', (row) => row.dni),
    createColumn.fecha('Fecha Nac.', (row) => row.fechaNacimiento),
    createColumn.estado('Estado', (row) => row.estado),
    createColumn.acciones('Acciones', (row) => (
      <Flex gap="2">
        <Button size="1" variant="soft">
          <Pencil1Icon width="12" height="12" />
          Editar
        </Button>
        <Button size="1" variant="soft" color="red">
          <TrashIcon width="12" height="12" />
        </Button>
      </Flex>
    )),
  ])

  // ============================================
  // TABLA FILTRABLE - Configuración
  // ============================================

  const columnasFiltrable = [
    columnTemplates.id('id', 'ID'),
    columnTemplates.text('nombre', 'Nombre'),
    columnTemplates.text('apellido', 'Apellido'),
    columnTemplates.text('email', 'Email'),
    columnTemplates.fecha('fechaNacimiento', 'Fecha Nacimiento'),
    columnTemplates.estado('estado', 'Estado', {
      Activo: 'green',
      Inactivo: 'gray',
      Pendiente: 'orange',
    }),
    columnTemplates.boolean('activo', 'Activo'),
    columnTemplates.numero('puntaje', 'Puntaje', 0),
    columnTemplates.acciones(
      (info) => (
        <Flex gap="2" justify="center">
          <Button
            size="1"
            variant="soft"
            onClick={() => console.log('Editar', info.row.original)}
          >
            <Pencil1Icon width="12" height="12" />
          </Button>
          <Button
            size="1"
            variant="soft"
            color="red"
            onClick={() => console.log('Eliminar', info.row.original)}
          >
            <TrashIcon width="12" height="12" />
          </Button>
        </Flex>
      ),
      'Acciones'
    ),
  ]

  // Estado para tabla filtrable con backend
  const [queryBackend, setQueryBackend] = useState(null)

  const handleQueryChange = (query) => {
    console.log('Query para backend:', query)
    setQueryBackend(query)
    // Aquí harías el fetch al backend:
    // fetch('/api/datos', {
    //   method: 'POST',
    //   body: JSON.stringify(query)
    // })
  }

  return (
    <Box p="5">
      <Flex direction="column" gap="5">
        {/* Header */}
        <Box>
          <Heading size="7" mb="2">
            Ejemplos de Tablas
          </Heading>
          <Text size="3" color="gray">
            Tablas virtualizadas y con filtros avanzados
          </Text>
        </Box>

        {/* Tabs con ejemplos */}
        <Tabs.Root defaultValue="virtualizada">
          <Tabs.List>
            <Tabs.Trigger value="virtualizada">
              Tabla Virtualizada (10k registros)
            </Tabs.Trigger>
            <Tabs.Trigger value="filtrable">
              Tabla con Filtros (100 registros)
            </Tabs.Trigger>
            <Tabs.Trigger value="backend">Filtros Backend</Tabs.Trigger>
          </Tabs.List>

          {/* Tab 1: Tabla Virtualizada */}
          <Tabs.Content value="virtualizada">
            <Card mt="4">
              <Flex direction="column" gap="4">
                <Box>
                  <Heading size="5" mb="2">
                    TablaVirtualizada
                  </Heading>
                  <Text size="2" color="gray" mb="3">
                    Usa react-window para renderizar solo filas visibles.
                    Perfecto para datasets grandes (10k+ registros).
                  </Text>
                  <Flex gap="2" mb="3">
                    <Badge color="blue">10,000 registros</Badge>
                    <Badge color="green">Virtualización</Badge>
                    <Badge color="purple">Alto rendimiento</Badge>
                  </Flex>
                </Box>

                <TablaVirtualizada
                  data={datosVirtualizada}
                  columns={columnasVirtualizada}
                  height={500}
                  rowHeight={60}
                  onRowClick={(row) =>
                    console.log('Click en fila:', row)
                  }
                />
              </Flex>
            </Card>
          </Tabs.Content>

          {/* Tab 2: Tabla Filtrable */}
          <Tabs.Content value="filtrable">
            <Card mt="4">
              <Flex direction="column" gap="4">
                <Box>
                  <Heading size="5" mb="2">
                    TablaFiltrable (TanStack Table)
                  </Heading>
                  <Text size="2" color="gray" mb="3">
                    Tabla completa con filtros por columna, búsqueda global,
                    sorting y paginación. Ideal para datasets medianos con
                    interactividad.
                  </Text>
                  <Flex gap="2" mb="3">
                    <Badge color="blue">Filtros</Badge>
                    <Badge color="green">Sorting</Badge>
                    <Badge color="purple">Paginación</Badge>
                    <Badge color="orange">Búsqueda global</Badge>
                  </Flex>
                </Box>

                <TablaFiltrable
                  data={datosFiltrable}
                  columns={columnasFiltrable}
                  pageSize={10}
                  enableFilters={true}
                  enableSorting={true}
                  enablePagination={true}
                  enableGlobalFilter={true}
                />
              </Flex>
            </Card>
          </Tabs.Content>

          {/* Tab 3: Filtros Backend */}
          <Tabs.Content value="backend">
            <Card mt="4">
              <Flex direction="column" gap="4">
                <Box>
                  <Heading size="5" mb="2">
                    Tabla con Backend Integration
                  </Heading>
                  <Text size="2" color="gray" mb="3">
                    Los filtros, sorting y paginación se manejan en el backend.
                    La tabla genera automáticamente el query para enviar al
                    servidor.
                  </Text>
                  <Flex gap="2" mb="3">
                    <Badge color="red">Backend</Badge>
                    <Badge color="blue">Query Builder</Badge>
                    <Badge color="green">API Ready</Badge>
                  </Flex>
                </Box>

                <TablaFiltrable
                  data={datosFiltrable}
                  columns={columnasFiltrable}
                  pageSize={10}
                  manualFiltering={true}
                  manualSorting={true}
                  manualPagination={true}
                  pageCount={10} // Total de páginas del backend
                  onQueryChange={handleQueryChange}
                />

                {/* Mostrar query generado */}
                {queryBackend && (
                  <Box>
                    <Heading size="4" mb="2">
                      Query generado para backend:
                    </Heading>
                    <Box
                      p="3"
                      style={{
                        backgroundColor: 'var(--gray-2)',
                        borderRadius: 'var(--radius-2)',
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        overflow: 'auto',
                      }}
                    >
                      <pre>{JSON.stringify(queryBackend, null, 2)}</pre>
                    </Box>
                    <Text size="1" color="gray" mt="2">
                      Envía este objeto al endpoint de tu backend (ej:
                      POST /api/datos)
                    </Text>
                  </Box>
                )}
              </Flex>
            </Card>
          </Tabs.Content>
        </Tabs.Root>

        {/* Información de uso */}
        <Card>
          <Heading size="4" mb="3">
            ¿Cuál tabla usar?
          </Heading>
          <Flex direction="column" gap="3">
            <Box>
              <Text weight="bold" size="2">
                TablaVirtualizada
              </Text>
              <Text size="2" color="gray">
                • Datasets muy grandes (10k+ registros)
                <br />
                • No necesitas filtros complejos
                <br />
                • Prioridad en performance
                <br />• Scroll infinito
              </Text>
            </Box>
            <Box>
              <Text weight="bold" size="2">
                TablaFiltrable
              </Text>
              <Text size="2" color="gray">
                • Datasets medianos (hasta ~1000 registros en frontend)
                <br />
                • Necesitas filtros, sorting, paginación
                <br />
                • Integración con backend para datasets grandes
                <br />• Funcionalidad completa de tabla
              </Text>
            </Box>
          </Flex>
        </Card>
      </Flex>
    </Box>
  )
}
