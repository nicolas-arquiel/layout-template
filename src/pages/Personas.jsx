import { PersonIcon, MagnifyingGlassIcon, PlusIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Box, Flex, Heading, Text, Button, TextField, Select, Card, Table, Badge, IconButton } from '@radix-ui/themes'

/**
 * Componente de página Personas con Radix UI
 * Lista y gestión de personas
 *
 * @returns {JSX.Element}
 */
export default function Personas() {
  const personas = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', telefono: '123-456-7890', estado: 'Activo' },
    { id: 2, nombre: 'María García', email: 'maria@email.com', telefono: '098-765-4321', estado: 'Activo' },
    { id: 3, nombre: 'Carlos López', email: 'carlos@email.com', telefono: '555-123-4567', estado: 'Inactivo' },
  ]

  return (
    <Box>
      {/* Header */}
      <Flex align="center" justify="between" mb="6" direction={{ initial: 'column', sm: 'row' }} gap="4">
        <Box>
          <Heading size="8" mb="2">
            Personas
          </Heading>
          <Text color="gray">Gestiona el registro de personas</Text>
        </Box>
        <Button size="3">
          <PlusIcon width="20" height="20" />
          Nueva Persona
        </Button>
      </Flex>

      {/* MagnifyingGlassIcon & Filters */}
      <Card mb="4" style={{ backgroundColor: 'var(--content-bg)' }}>
        <Flex direction={{ initial: 'column', sm: 'row' }} gap="4" p="4">
          <Box style={{ flex: 1 }}>
            <TextField.Root placeholder="Buscar personas..." size="3">
              <TextField.Slot>
                <MagnifyingGlassIcon width="16" height="16" />
              </TextField.Slot>
            </TextField.Root>
          </Box>
          <Select.Root defaultValue="todos" size="3">
            <Select.Trigger style={{ minWidth: '180px' }} />
            <Select.Content>
              <Select.Item value="todos">Todos los estados</Select.Item>
              <Select.Item value="activo">Activo</Select.Item>
              <Select.Item value="inactivo">Inactivo</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>
      </Card>

      {/* Table */}
      <Card style={{ backgroundColor: 'var(--content-bg)' }}>
        <Box style={{ overflowX: 'auto' }}>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Teléfono</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="right">Acciones</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {personas.map((persona) => (
                <Table.Row key={persona.id}>
                  <Table.Cell>
                    <Flex align="center" gap="3">
                      <Flex
                        align="center"
                        justify="center"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--blue-3)',
                          color: 'var(--blue-9)',
                        }}
                      >
                        <PersonIcon width="20" height="20" />
                      </Flex>
                      <Text weight="medium">{persona.nombre}</Text>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2" color="gray">
                      {persona.email}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2" color="gray">
                      {persona.telefono}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={persona.estado === 'Activo' ? 'green' : 'red'} variant="soft">
                      {persona.estado}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell align="right">
                    <Flex gap="2" justify="end">
                      <IconButton variant="ghost" color="blue" size="2">
                        <Pencil1Icon width="18" height="18" />
                      </IconButton>
                      <IconButton variant="ghost" color="red" size="2">
                        <TrashIcon width="18" height="18" />
                      </IconButton>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

        {/* Pagination */}
        <Flex
          align="center"
          justify="between"
          pt="4"
          style={{ borderTop: '1px solid var(--gray-6)' }}
        >
          <Text size="2" color="gray">
            Mostrando <Text weight="medium">1</Text> a <Text weight="medium">3</Text> de{' '}
            <Text weight="medium">3</Text> resultados
          </Text>
          <Flex gap="2">
            <Button variant="outline" size="2">
              Anterior
            </Button>
            <Button variant="outline" size="2">
              Siguiente
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Box>
  )
}
