import { useState } from 'react'
import {
  Grid,
  Box,
  Card,
  Flex,
  Text,
  Heading,
  Button,
  Badge,
  Avatar,
  Tabs,
  Callout,
  Dialog,
  ScrollArea,
  Separator,
  Progress,
  Code,
  Kbd,
  Link,
  Quote,
  Em,
  Strong,
} from '@radix-ui/themes'
import { PersonIcon,
  PlusCircledIcon,
  ArrowUpIcon,
  SymbolIcon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
  InfoCircledIcon,
  PlusIcon,
  GearIcon,
  BellIcon,
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from '@radix-ui/react-icons'
import FormDialog from '../components/FormDialog'
import DataTable from '../components/DataTable'
import { Canvas } from '../components/Canvas'

/**
 * Dashboard Completo - Explorando TODO Radix Themes al máximo
 *
 * Componentes de Radix Themes usados:
 * ✅ Grid, Box, Flex - Layout
 * ✅ Card - Contenedores
 * ✅ Text, Heading - Tipografía
 * ✅ Button - Botones y variantes
 * ✅ Badge - Estados y categorías
 * ✅ Avatar - Avatares con fallback
 * ✅ Tabs - Pestañas
 * ✅ Callout - Alertas y notificaciones
 * ✅ Dialog - Modales (normal y fullScreen para offcanvas)
 * ✅ Table - Tablas con datos (en DataTable component)
 * ✅ DropdownMenu - Menús contextuales (en DataTable)
 * ✅ TextField, TextArea, Select, Switch, Checkbox, RadioGroup - Formularios (en FormDialog)
 * ✅ ScrollArea - Scroll personalizado
 * ✅ Separator - Divisores
 * ✅ Progress - Barras de progreso
 * ✅ Code, Kbd - Código y atajos de teclado
 * ✅ Link, Quote, Em, Strong - Elementos de texto
 */
export default function DashboardCompleto() {
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [canvasOpen, setCanvasOpen] = useState(false)

  // Data de ejemplo para la tabla
  const tableData = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Admin', activo: true },
    { id: 2, nombre: 'María García', email: 'maria@example.com', rol: 'Usuario', activo: true },
    { id: 3, nombre: 'Carlos López', email: 'carlos@example.com', rol: 'Editor', activo: false },
    { id: 4, nombre: 'Ana Martínez', email: 'ana@example.com', rol: 'Usuario', activo: true },
    { id: 5, nombre: 'Pedro Rodríguez', email: 'pedro@example.com', rol: 'Moderador', activo: true },
  ]

  const stats = [
    { title: 'Total Usuarios', value: '2,543', change: '+12.5%', icon: PersonIcon, color: 'blue' },
    { title: 'Nuevos Hoy', value: '234', change: '+5.2%', icon: PlusCircledIcon, color: 'green' },
    { title: 'Crecimiento', value: '23.5%', change: '+2.1%', icon: ArrowUpIcon, color: 'orange' },
    { title: 'Ingresos', value: '$45,678', change: '+8.3%', icon: SymbolIcon, color: 'purple' },
  ]

  const recentUsers = [
    { name: 'Juan Pérez', email: 'juan@example.com', avatar: 'JP' },
    { name: 'María García', email: 'maria@example.com', avatar: 'MG' },
    { name: 'Carlos López', email: 'carlos@example.com', avatar: 'CL' },
  ]

  return (
    <>
      {/* Alert/Callouts Section */}
      <Grid columns={{ initial: '1', md: '2' }} gap="4" mb="6">
        <Callout.Root color="blue">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            Bienvenido al Dashboard completo con <Strong>Radix Themes</Strong>
          </Callout.Text>
        </Callout.Root>

        <Callout.Root color="green">
          <Callout.Icon>
            <CheckCircledIcon />
          </Callout.Icon>
          <Callout.Text>Sistema funcionando correctamente</Callout.Text>
        </Callout.Root>
      </Grid>

      {/* Stats Cards */}
      <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="4" mb="6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <Flex direction="column" gap="3">
                <Flex align="center" justify="between">
                  <Box
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-3)',
                      backgroundColor: `var(--${stat.color}-3)`,
                      color: `var(--${stat.color}-9)`,
                    }}
                  >
                    <Icon size={20} />
                  </Box>
                  <Badge color={stat.color} variant="soft">
                    {stat.change}
                  </Badge>
                </Flex>
                <Box>
                  <Text size="2" color="gray" mb="1">
                    {stat.title}
                  </Text>
                  <Heading size="6" weight="bold">
                    {stat.value}
                  </Heading>
                </Box>
                <Progress value={75} color={stat.color} />
              </Flex>
            </Card>
          )
        })}
      </Grid>

      {/* Tabs Section */}
      <Card mb="6">
        <Tabs.Root defaultValue="overview">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
            <Tabs.Trigger value="reports">Reportes</Tabs.Trigger>
            <Tabs.Trigger value="notifications">
              Notificaciones
              <Badge color="red" variant="solid" ml="2" style={{ borderRadius: '50%', padding: '2px 6px' }}>
                3
              </Badge>
            </Tabs.Trigger>
          </Tabs.List>

          <Box pt="4">
            <Tabs.Content value="overview">
              <Flex direction="column" gap="3">
                <Heading size="4">Resumen General</Heading>
                <Text>
                  Vista general del sistema con <Em>métricas importantes</Em> y accesos rápidos.
                </Text>
                <Quote>
                  "La mejor manera de predecir el futuro es crearlo" - Peter Drucker
                </Quote>
              </Flex>
            </Tabs.Content>

            <Tabs.Content value="analytics">
              <Flex direction="column" gap="3">
                <Heading size="4">Analytics</Heading>
                <Text>Análisis detallado de datos y tendencias del sistema.</Text>
                <Code>const analytics = getData()</Code>
              </Flex>
            </Tabs.Content>

            <Tabs.Content value="reports">
              <Flex direction="column" gap="3">
                <Heading size="4">Reportes</Heading>
                <Text>Genera y descarga reportes personalizados.</Text>
                <Text size="2" color="gray">
                  Usa <Kbd>Ctrl</Kbd> + <Kbd>R</Kbd> para generar reporte rápido
                </Text>
              </Flex>
            </Tabs.Content>

            <Tabs.Content value="notifications">
              <Flex direction="column" gap="3">
                <Callout.Root color="orange">
                  <Callout.Icon>
                    <ExclamationTriangleIcon />
                  </Callout.Icon>
                  <Callout.Text>Tienes 3 notificaciones pendientes</Callout.Text>
                </Callout.Root>
              </Flex>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Card>

      {/* Main Content Grid */}
      <Grid columns={{ initial: '1', lg: '3' }} gap="6" mb="6">
        {/* Left Column - 2/3 */}
        <Box style={{ gridColumn: 'span 2 / span 2' }}>
          <Card>
            <Flex align="center" justify="between" mb="4">
              <Heading size="5">Usuarios del Sistema</Heading>
              <Flex gap="2">
                <Button variant="soft" size="2">
                  <MixerHorizontalIcon width="16" height="16" />
                  Filtrar
                </Button>
                <Button variant="soft" size="2">
                  <MagnifyingGlassIcon width="16" height="16" />
                  Buscar
                </Button>
                <Button size="2" onClick={() => setFormDialogOpen(true)}>
                  <PlusIcon width="16" height="16" />
                  Nuevo Usuario
                </Button>
              </Flex>
            </Flex>

            <Separator size="4" mb="4" />

            {/* Tabla con acciones */}
            <DataTable data={tableData} />
          </Card>
        </Box>

        {/* Right Column - 1/3 */}
        <Box>
          <Flex direction="column" gap="4">
            {/* Recent Activity */}
            <Card>
              <Heading size="4" mb="3">
                Actividad Reciente
              </Heading>
              <ScrollArea style={{ height: 300 }}>
                <Flex direction="column" gap="3">
                  {recentUsers.map((user, index) => (
                    <Flex key={index} align="center" gap="3">
                      <Avatar fallback={user.avatar} color="blue" />
                      <Box style={{ flex: 1 }}>
                        <Text size="2" weight="medium">
                          {user.name}
                        </Text>
                        <Text size="1" color="gray">
                          {user.email}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                </Flex>
              </ScrollArea>
            </Card>

            {/* Quick Actions */}
            <Card>
              <Heading size="4" mb="3">
                Acciones Rápidas
              </Heading>
              <Flex direction="column" gap="2">
                <Button variant="soft" onClick={() => setCanvasOpen(true)}>
                  <GearIcon width="16" height="16" />
                  Configuración
                </Button>
                <Button variant="soft">
                  <BellIcon width="16" height="16" />
                  Notificaciones
                </Button>
                <Link href="https://www.radix-ui.com/themes/docs" target="_blank">
                  <Button variant="soft" style={{ width: '100%' }}>
                    <InfoCircledIcon width="16" height="16" />
                    Ver Docs de Radix
                  </Button>
                </Link>
              </Flex>
            </Card>

            {/* System Status */}
            <Card>
              <Heading size="4" mb="3">
                Estado del Sistema
              </Heading>
              <Flex direction="column" gap="2">
                <Flex justify="between" align="center">
                  <Text size="2">CPU</Text>
                  <Badge color="green">45%</Badge>
                </Flex>
                <Progress value={45} color="green" />

                <Flex justify="between" align="center">
                  <Text size="2">RAM</Text>
                  <Badge color="orange">72%</Badge>
                </Flex>
                <Progress value={72} color="orange" />

                <Flex justify="between" align="center">
                  <Text size="2">Disco</Text>
                  <Badge color="blue">34%</Badge>
                </Flex>
                <Progress value={34} color="blue" />
              </Flex>
            </Card>
          </Flex>
        </Box>
      </Grid>

      {/* Modal de Formulario */}
      <FormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        title="Nuevo Usuario"
        onSubmit={(data) => console.log('Nuevo usuario:', data)}
      />

      {/* Canvas simple para configuración */}
      <Canvas
        open={canvasOpen}
        onOpenChange={setCanvasOpen}
        title="Configuración"
        width="400px"
      >
        <Flex direction="column" gap="4">
          <Callout.Root color="blue">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              Canvas simple sin complejidad de nested/niveles
            </Callout.Text>
          </Callout.Root>

          <Card>
            <Heading size="3" mb="2">
              Tema
            </Heading>
            <Text size="2" color="gray">
              Personaliza la apariencia del sistema
            </Text>
          </Card>

          <Card>
            <Heading size="3" mb="2">
              Notificaciones
            </Heading>
            <Text size="2" color="gray">
              Gestiona tus preferencias de notificaciones
            </Text>
          </Card>

          <Card>
            <Heading size="3" mb="2">
              Privacidad
            </Heading>
            <Text size="2" color="gray">
              Controla tu privacidad y seguridad
            </Text>
          </Card>

          <Separator size="4" />

          <Flex gap="3" justify="end">
            <Button variant="soft" color="gray" onClick={() => setCanvasOpen(false)}>
              Cerrar
            </Button>
            <Button>Guardar Cambios</Button>
          </Flex>
        </Flex>
      </Canvas>
    </>
  )
}
