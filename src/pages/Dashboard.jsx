import { Home, Users, UserPlus, TrendingUp } from 'react-feather'
import { Container, Row, Col, Card, CardBody, CardHeader, CardTitle } from '../components/ui'

/**
 * Dashboard - Página de inicio con Cards estilo Vuexy
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
    <Container fluid>
      {/* Stats Grid */}
      <Row>
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Col key={index} xs={12} sm={6} lg={3}>
              <Card>
                <CardBody className="!p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-2">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl font-bold">
                        {stat.value}
                      </h3>
                    </div>
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-3)',
                        backgroundColor: getIconBgColor(stat.color),
                        color: getIconColor(stat.color),
                      }}
                    >
                      <Icon size={24} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          )
        })}
      </Row>

      {/* Main Content Card */}
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Home size={28} color="var(--accent-9)" />
                <CardTitle>Sistema de Gestión Universitaria</CardTitle>
              </div>
            </CardHeader>
            <CardBody className="!pt-0">
              <p className="text-base leading-relaxed text-gray-700">
                Bienvenido al sistema de gestión de la Universidad de Concepción del Uruguay (UCU).
                Este sistema te permite administrar estudiantes, inscripciones y toda la información
                académica de manera centralizada y eficiente.
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
