import { useState } from 'react'
import {
  Table,
  Badge,
  DropdownMenu,
  IconButton,
  Dialog,
  Flex,
  Text,
  Heading,
  Button,
  Callout,
} from '@radix-ui/themes'
import { MoreVertical, Eye, Edit, Trash2, ExternalLink, Info } from 'react-feather'
import { useNavigate } from 'react-router-dom'

/**
 * DataTable - Tabla completa con Radix Themes
 *
 * Features:
 * - Table de Radix con estilos
 * - Columna de acciones con DropdownMenu
 * - Modal de detalles
 * - Confirmación de eliminación
 * - Navegación a otra página
 * - Badges para estados
 */
export default function DataTable({ data = [] }) {
  const navigate = useNavigate()
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleViewDetails = (item) => {
    setSelectedItem(item)
    setDetailsOpen(true)
  }

  const handleEdit = (item) => {
    setSelectedItem(item)
    // Aquí puedes abrir un modal de edición o navegar
    console.log('Editar:', item)
  }

  const handleDeleteConfirm = (item) => {
    setSelectedItem(item)
    setDeleteOpen(true)
  }

  const handleDelete = () => {
    console.log('Eliminado:', selectedItem)
    setDeleteOpen(false)
    setSelectedItem(null)
  }

  const handleNavigate = (item) => {
    navigate(`/personas?id=${item.id}`)
  }

  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Rol</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Acciones</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.RowHeaderCell>{item.id}</Table.RowHeaderCell>
              <Table.Cell>
                <Text weight="medium">{item.nombre}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="2" color="gray">
                  {item.email}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Badge color="blue" variant="soft">
                  {item.rol}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Badge color={item.activo ? 'green' : 'gray'} variant={item.activo ? 'solid' : 'soft'}>
                  {item.activo ? 'Activo' : 'Inactivo'}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                {/* DropdownMenu en columna Acciones */}
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <IconButton variant="ghost" size="1">
                      <MoreVertical size={16} />
                    </IconButton>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Content>
                    {/* Ver Detalles - Abre Modal */}
                    <DropdownMenu.Item onSelect={() => handleViewDetails(item)}>
                      <Flex gap="2" align="center">
                        <Eye size={14} />
                        <Text>Ver Detalles</Text>
                      </Flex>
                    </DropdownMenu.Item>

                    {/* Editar */}
                    <DropdownMenu.Item onSelect={() => handleEdit(item)}>
                      <Flex gap="2" align="center">
                        <Edit size={14} />
                        <Text>Editar</Text>
                      </Flex>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator />

                    {/* Navegar a otra página */}
                    <DropdownMenu.Item onSelect={() => handleNavigate(item)}>
                      <Flex gap="2" align="center">
                        <ExternalLink size={14} />
                        <Text>Ir a Perfil</Text>
                      </Flex>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator />

                    {/* Eliminar */}
                    <DropdownMenu.Item color="red" onSelect={() => handleDeleteConfirm(item)}>
                      <Flex gap="2" align="center">
                        <Trash2 size={14} />
                        <Text>Eliminar</Text>
                      </Flex>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* Modal de Detalles */}
      <Dialog.Root open={detailsOpen} onOpenChange={setDetailsOpen}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Detalles del Usuario</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Información completa del registro seleccionado
          </Dialog.Description>

          {selectedItem && (
            <Flex direction="column" gap="3">
              <Callout.Root color="blue">
                <Callout.Icon>
                  <Info />
                </Callout.Icon>
                <Callout.Text>
                  ID: {selectedItem.id} - {selectedItem.nombre}
                </Callout.Text>
              </Callout.Root>

              <Flex direction="column" gap="2">
                <Flex justify="between">
                  <Text weight="medium">Nombre:</Text>
                  <Text>{selectedItem.nombre}</Text>
                </Flex>
                <Flex justify="between">
                  <Text weight="medium">Email:</Text>
                  <Text size="2" color="gray">
                    {selectedItem.email}
                  </Text>
                </Flex>
                <Flex justify="between">
                  <Text weight="medium">Rol:</Text>
                  <Badge color="blue" variant="soft">
                    {selectedItem.rol}
                  </Badge>
                </Flex>
                <Flex justify="between">
                  <Text weight="medium">Estado:</Text>
                  <Badge color={selectedItem.activo ? 'green' : 'gray'}>
                    {selectedItem.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </Flex>
              </Flex>
            </Flex>
          )}

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cerrar
              </Button>
            </Dialog.Close>
            <Button onClick={() => handleEdit(selectedItem)}>Editar</Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      {/* Modal de Confirmación de Eliminación */}
      <Dialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
        <Dialog.Content style={{ maxWidth: 400 }}>
          <Dialog.Title>Confirmar Eliminación</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            ¿Estás seguro que deseas eliminar este registro?
          </Dialog.Description>

          {selectedItem && (
            <Callout.Root color="red" mb="4">
              <Callout.Text>
                Se eliminará: <strong>{selectedItem.nombre}</strong>
              </Callout.Text>
            </Callout.Root>
          )}

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button color="red" onClick={handleDelete}>
              Eliminar
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
