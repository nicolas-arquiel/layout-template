import { Home, Users, UserPlus, TrendingUp } from 'react-feather'
import { Container, Grid, Box, Card, Flex, Text, Heading } from '@radix-ui/themes'

/**
 * Dashboard - Página de inicio con Radix Themes
 * Grid responsive + Cards con box-shadow estilo Vuexy
 *
 * @returns {JSX.Element}
 */
export default function Dashboard() {
  const stats = [
    { title: 'Total Usuarios', value: '2,543', icon: Users, color: 'blue' },
    { title: 'Inscripciones', value: '1,234', icon: UserPlus, color: 'green' },
    { title: 'Personas', value: '856', icon: Users, color: 'purple' },
    { title: 'Crecimiento', value: '23.5%', icon: TrendingUp, color: 'orange' },
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
    <Container size="4" px={{ initial: '4', md: '6' }}>
      {/* Stats Grid - Responsive: 1 col mobile, 2 tablet, 4 desktop */}
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
      <Card>
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
    </Container>
  )
}
