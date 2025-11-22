import { Home, Users, UserPlus, TrendingUp } from 'react-feather'
import { Box, Flex, Grid, Heading, Text, Card } from '@radix-ui/themes'

/**
 * Página Dashboard/Inicio simple
 *
 * @returns {JSX.Element}
 */
export default function Dashboard() {
  const stats = [
    {
      title: 'Total Usuarios',
      value: '2,543',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Inscripciones',
      value: '1,234',
      icon: UserPlus,
      color: 'green',
    },
    {
      title: 'Personas',
      value: '856',
      icon: Users,
      color: 'purple',
    },
    {
      title: 'Crecimiento',
      value: '23.5%',
      icon: TrendingUp,
      color: 'orange',
    },
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
    <Box>
      {/* Header */}
      <Flex align="center" justify="between" mb="6">
        <Box>
          <Heading size="8" mb="2">
            Dashboard
          </Heading>
          <Text color="gray">Bienvenido a UCU Gestión</Text>
        </Box>
        <Flex align="center" gap="2">
          <Home size={24} color="var(--gray-9)" />
        </Flex>
      </Flex>

      {/* Stats Grid */}
      <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="4" mb="6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <Flex align="center" justify="between" p="4">
                <Box>
                  <Text size="2" color="gray" weight="medium">
                    {stat.title}
                  </Text>
                  <Heading size="6" mt="2">
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
                  }}
                >
                  <Icon size={24} />
                </Flex>
              </Flex>
            </Card>
          )
        })}
      </Grid>

      {/* Content Card */}
      <Card style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <Box p="6">
          <Heading size="5" mb="4">
            Sistema de Gestión Universitaria
          </Heading>
          <Text>
            Bienvenido al sistema de gestión de la Universidad de Concepción del Uruguay.
            Este sistema te permite administrar estudiantes, inscripciones y toda la
            información académica de manera centralizada.
          </Text>
        </Box>
      </Card>
    </Box>
  )
}
