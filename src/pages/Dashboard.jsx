import { Home, Users, UserPlus, TrendingUp } from 'react-feather'
import { Box, Flex, Grid, Heading, Text, Card, Button } from '@radix-ui/themes'

/**
 * Componente de página Dashboard/Inicio con Radix UI
 * Muestra estadísticas y tarjetas de resumen usando Radix Grid
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
      trend: '+12.5%',
    },
    {
      title: 'Inscripciones',
      value: '1,234',
      icon: UserPlus,
      color: 'green',
      trend: '+8.2%',
    },
    {
      title: 'Personas',
      value: '856',
      icon: Users,
      color: 'purple',
      trend: '+4.3%',
    },
    {
      title: 'Crecimiento',
      value: '23.5%',
      icon: TrendingUp,
      color: 'orange',
      trend: '+2.1%',
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
          <Text color="gray">Bienvenido a tu panel de control</Text>
        </Box>
        <Flex align="center" gap="2">
          <Home size={24} color="var(--gray-9)" />
        </Flex>
      </Flex>

      {/* Stats Grid - Responsive: 1 col mobile, 2 cols tablet, 4 cols desktop */}
      <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="4" mb="6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} variant="surface">
              <Flex align="center" justify="between">
                <Box>
                  <Text size="2" color="gray" weight="medium">
                    {stat.title}
                  </Text>
                  <Heading size="6" mt="2">
                    {stat.value}
                  </Heading>
                  <Text size="2" color="green" mt="2">
                    {stat.trend}
                  </Text>
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

      {/* Content Cards - 8/4 split on desktop */}
      <Grid columns={{ initial: '1', lg: '3' }} gap="4">
        {/* Recent Activity - 2/3 on desktop */}
        <Box style={{ gridColumn: 'span 1 / span 1', lg: { gridColumn: 'span 2 / span 2' } }}>
          <Card>
            <Heading size="5" mb="4">
              Actividad Reciente
            </Heading>
            <Flex direction="column" gap="4">
              {[1, 2, 3].map((item) => (
                <Flex
                  key={item}
                  align="center"
                  gap="4"
                  pb="4"
                  style={{
                    borderBottom: item !== 3 ? '1px solid var(--gray-5)' : 'none',
                  }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--blue-3)',
                    }}
                  >
                    <Users size={20} color="var(--blue-9)" />
                  </Flex>
                  <Box style={{ flex: 1 }}>
                    <Text size="2" weight="medium">
                      Nueva inscripción registrada
                    </Text>
                    <Text size="1" color="gray">
                      Hace {item} hora{item > 1 ? 's' : ''}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Flex>
          </Card>
        </Box>

        {/* Quick Actions - 1/3 on desktop */}
        <Card>
          <Heading size="5" mb="4">
            Acciones Rápidas
          </Heading>
          <Flex direction="column" gap="3">
            <Button variant="outline" size="3">
              <Flex align="center" gap="3">
                <UserPlus size={20} />
                <Text>Nueva Inscripción</Text>
              </Flex>
            </Button>
            <Button variant="outline" size="3">
              <Flex align="center" gap="3">
                <Users size={20} />
                <Text>Gestionar Personas</Text>
              </Flex>
            </Button>
          </Flex>
        </Card>
      </Grid>
    </Box>
  )
}
