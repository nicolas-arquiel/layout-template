import { Home, User, PlusCircle, ArrowUp, CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react'
import { Grid, Box, Card, Flex, Text, Heading, Button, Badge, Callout, Separator } from '@radix-ui/themes'
import BreadCrumbs from '@components/breadcrumbs/BreadCrumbs'

/**
 * Dashboard - Página de inicio con ejemplos de colores semánticos
 * Demuestra el uso de colores personalizables desde CustomThemePanel
 */
export default function Dashboard() {
  const stats = [
    { title: 'Total Usuarios', value: '2,543', icon: User, color: 'blue' },
    { title: 'Inscripciones', value: '1,234', icon: PlusCircle, color: 'green' },
    { title: 'Personas', value: '856', icon: User, color: 'purple' },
    { title: 'Crecimiento', value: '23.5%', icon: ArrowUp, color: 'orange' },
  ]

  const getIconColor = (color) => {
    const colors = {
      blue: 'var(--blue-9)',
      green: 'var(--green-9)',
      purple: 'var(--purple-9)',
      orange: 'var(--orange-9)',
    }
    return colors[color] || colors.blue
  }

  const getIconBgColor = (color) => {
    const colors = {
      blue: 'var(--blue-3)',
      green: 'var(--green-3)',
      purple: 'var(--purple-3)',
      orange: 'var(--orange-3)',
    }
    return colors[color] || colors.blue
  }

  return (
    <>
      <BreadCrumbs 
        title="Dashboard" 
        data={[{ title: 'Inicio' }]} 
      />

      {/* Stats Grid */}
      <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="4" mb="6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Box key={index}>
              <Card>
                <Flex align="center" justify="between">
                  <Box>
                    <Text size="2" weight="medium" color="gray" mb="2">
                      {stat.title}
                    </Text>
                    <Heading size="6" weight="bold">
                      {stat.value}
                    </Heading>
                  </Box>
                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-3)',
                      backgroundColor: getIconBgColor(stat.color),
                      color: getIconColor(stat.color),
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={24} />
                  </Flex>
                </Flex>
              </Card>
            </Box>
          )
        })}
      </Grid>

      {/* Main Content Card */}
      <Card mb="6">
        <Flex align="center" gap="3" mb="4">
          <Home size={28} color="var(--accent-9)" />
          <Heading size="5" weight="medium">
            Sistema de Gestión Universitaria
          </Heading>
        </Flex>
        <Text size="3" color="gray" style={{ lineHeight: '1.6' }}>
          Bienvenido al sistema de gestión de la Universidad de Concepción del Uruguay (UCU).
          Este sistema te permite administrar estudiantes, inscripciones y toda la información
          académica de manera centralizada y eficiente.
        </Text>
      </Card>

      {/* ========== DEMOSTRACIÓN DE COLORES SEMÁNTICOS ========== */}
      <Card mb="6">
        <Heading size="5" mb="4">🎨 Colores Semánticos Personalizables</Heading>
        <Text size="2" color="gray" mb="4">
          Estos colores se pueden cambiar desde el panel de configuración (⚙️ abajo a la derecha).
          Los cambios se guardan automáticamente en localStorage.
        </Text>

        <Separator size="4" mb="4" />

        {/* Botones con Radix UI */}
        <Box mb="5">
          <Text size="2" weight="bold" mb="3">1. Botones con Radix UI (usando accentColor)</Text>
          <Flex gap="3" wrap="wrap">
            <Button>Primary (Accent)</Button>
            <Button variant="soft"  color="green">Success</Button>
            <Button variant="soft"  color="red">Danger</Button>
            <Button variant="soft"  color="amber">Warning</Button>
            <Button variant="soft"  color="cyan">Info</Button>
            <Button  variant="soft">Secondary</Button>
          </Flex>
        </Box>

        <Separator size="4" mb="4" />

        {/* Botones con CSS Variables */}
        <Box mb="5">
          <Text size="2" weight="bold" mb="3">2. Botones con CSS Variables (personalizables)</Text>
          <Flex gap="3" wrap="wrap">
            <button 
              className="px-4 py-2 rounded-md text-white font-medium transition-colors"
              style={{ 
                backgroundColor: 'var(--color-primary)',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-primary-hover)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-primary)'}
            >
              Primary
            </button>
            <button 
              className="px-4 py-2 rounded-md text-white font-medium transition-colors"
              style={{ 
                backgroundColor: 'var(--color-success)',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-success-hover)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-success)'}
            >
              Success
            </button>
            <button 
              className="px-4 py-2 rounded-md text-white font-medium transition-colors"
              style={{ 
                backgroundColor: 'var(--color-danger)',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-danger-hover)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-danger)'}
            >
              Danger
            </button>
            <button 
              className="px-4 py-2 rounded-md text-white font-medium transition-colors"
              style={{ 
                backgroundColor: 'var(--color-warning)',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-warning-hover)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-warning)'}
            >
              Warning
            </button>
            <button 
              className="px-4 py-2 rounded-md text-white font-medium transition-colors"
              style={{ 
                backgroundColor: 'var(--color-info)',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-info-hover)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-info)'}
            >
              Info
            </button>
          </Flex>
        </Box>

        <Separator size="4" mb="4" />

        {/* Badges */}
        <Box mb="5">
          <Text size="2" weight="bold" mb="3">3. Badges</Text>
          <Flex gap="3" wrap="wrap">
            <Badge color="indigo">Primary</Badge>
            <Badge color="green">Success</Badge>
            <Badge color="red">Danger</Badge>
            <Badge color="amber">Warning</Badge>
            <Badge color="cyan">Info</Badge>
            <Badge variant="soft">Secondary</Badge>
          </Flex>
        </Box>

        <Separator size="4" mb="4" />

        {/* Callouts */}
        <Box mb="5">
          <Text size="2" weight="bold" mb="3">4. Callouts / Alertas</Text>
          <Flex direction="column" gap="3">
            <Callout.Root color="green">
              <Callout.Icon>
                <CheckCircle2 />
              </Callout.Icon>
              <Callout.Text>
                ¡Operación exitosa! Los datos se guardaron correctamente.
              </Callout.Text>
            </Callout.Root>

            <Callout.Root color="red">
              <Callout.Icon>
                <XCircle />
              </Callout.Icon>
              <Callout.Text>
                Error: No se pudo completar la operación. Intenta nuevamente.
              </Callout.Text>
            </Callout.Root>

            <Callout.Root color="amber">
              <Callout.Icon>
                <AlertTriangle />
              </Callout.Icon>
              <Callout.Text>
                Advertencia: Esta acción no se puede deshacer.
              </Callout.Text>
            </Callout.Root>

            <Callout.Root color="cyan">
              <Callout.Icon>
                <Info />
              </Callout.Icon>
              <Callout.Text>
                Información: Los cambios se aplicarán en 24 horas.
              </Callout.Text>
            </Callout.Root>
          </Flex>
        </Box>

        <Separator size="4" mb="4" />

        {/* Fondos con colores semánticos */}
        <Box>
          <Text size="2" weight="bold" mb="3">5. Fondos con colores semánticos</Text>
          <Grid columns={{ initial: '1', sm: '2', lg: '5' }} gap="3">
            <Box 
              p="4" 
              style={{ 
                backgroundColor: 'var(--color-primary-light)',
                borderLeft: '4px solid var(--color-primary)',
                borderRadius: 'var(--radius-3)'
              }}
            >
              <Text size="2" weight="bold" style={{ color: 'var(--color-primary)' }}>Primary</Text>
              <Text size="1" color="gray">Acción principal</Text>
            </Box>

            <Box 
              p="4" 
              style={{ 
                backgroundColor: 'var(--color-success-light)',
                borderLeft: '4px solid var(--color-success)',
                borderRadius: 'var(--radius-3)'
              }}
            >
              <Text size="2" weight="bold" style={{ color: 'var(--color-success)' }}>Success</Text>
              <Text size="1" color="gray">Operación exitosa</Text>
            </Box>

            <Box 
              p="4" 
              style={{ 
                backgroundColor: 'var(--color-danger-light)',
                borderLeft: '4px solid var(--color-danger)',
                borderRadius: 'var(--radius-3)'
              }}
            >
              <Text size="2" weight="bold" style={{ color: 'var(--color-danger)' }}>Danger</Text>
              <Text size="1" color="gray">Error o peligro</Text>
            </Box>

            <Box 
              p="4" 
              style={{ 
                backgroundColor: 'var(--color-warning-light)',
                borderLeft: '4px solid var(--color-warning)',
                borderRadius: 'var(--radius-3)'
              }}
            >
              <Text size="2" weight="bold" style={{ color: 'var(--color-warning)' }}>Warning</Text>
              <Text size="1" color="gray">Advertencia</Text>
            </Box>

            <Box 
              p="4" 
              style={{ 
                backgroundColor: 'var(--color-info-light)',
                borderLeft: '4px solid var(--color-info)',
                borderRadius: 'var(--radius-3)'
              }}
            >
              <Text size="2" weight="bold" style={{ color: 'var(--color-info)' }}>Info</Text>
              <Text size="1" color="gray">Información</Text>
            </Box>
          </Grid>
        </Box>
      </Card>

      {/* Instrucciones */}
      <Card>
        <Heading size="4" mb="3">📝 Cómo usar</Heading>
        <Flex direction="column" gap="2">
          <Text size="2">
            1. Haz clic en el botón de configuración (⚙️) en la esquina inferior derecha
          </Text>
          <Text size="2">
            2. Ve a la sección "COLORES SEMÁNTICOS"
          </Text>
          <Text size="2">
            3. Cambia los colores de Success, Danger, Warning o Info
          </Text>
          <Text size="2">
            4. Los cambios se aplican inmediatamente y se guardan en localStorage
          </Text>
          <Text size="2">
            5. El color Primary usa el "Accent Color" del tema
          </Text>
        </Flex>
      </Card>
    </>
  )
}
