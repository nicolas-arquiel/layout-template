import { BarChartIcon, SymbolIcon, ArrowUpIcon, BackpackIcon } from '@radix-ui/react-icons'
import { PageTemplate } from '@components'
import { Card, Grid, Heading, Text, Flex, Box } from '@radix-ui/themes'

export default function ReportesVentas() {
  const stats = [
    { title: 'Ventas Totales', value: '$45,678', icon: SymbolIcon, color: 'green' },
    { title: 'Órdenes', value: '234', icon: BackpackIcon, color: 'blue' },
    { title: 'Crecimiento', value: '+23.5%', icon: ArrowUpIcon, color: 'orange' },
  ]

  return (
    <PageTemplate
      icon={BarChartIcon}
      title="Reporte de Ventas"
      description="Análisis detallado de ventas y transacciones"
      badge="Dashboard"
    >
      {/* Stats Cards */}
      <Grid columns={{ initial: '1', sm: '3' }} gap="4" mb="6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <Flex align="center" gap="3">
                <Box
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-3)',
                    backgroundColor: `var(--${stat.color}-3)`,
                    color: `var(--${stat.color}-9)`,
                  }}
                >
                  <Icon size={24} />
                </Box>
                <Box>
                  <Text size="2" color="gray" mb="1">
                    {stat.title}
                  </Text>
                  <Heading size="5">{stat.value}</Heading>
                </Box>
              </Flex>
            </Card>
          )
        })}
      </Grid>

      {/* Charts Placeholder */}
      <Grid columns={{ initial: '1', md: '2' }} gap="4">
        <Card>
          <Heading size="4" mb="3">
            Ventas por Mes
          </Heading>
          <Box
            style={{
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--gray-2)',
              borderRadius: 'var(--radius-2)',
            }}
          >
            <Text size="2" color="gray">
              Gráfico de ventas mensuales
            </Text>
          </Box>
        </Card>

        <Card>
          <Heading size="4" mb="3">
            Top Productos
          </Heading>
          <Box
            style={{
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--gray-2)',
              borderRadius: 'var(--radius-2)',
            }}
          >
            <Text size="2" color="gray">
              Ranking de productos más vendidos
            </Text>
          </Box>
        </Card>
      </Grid>
    </PageTemplate>
  )
}
