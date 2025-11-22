import { Home, Users, UserPlus, TrendingUp } from 'react-feather'
import { cn } from '../utils/cn'

/**
 * Componente de página Dashboard/Inicio
 * Muestra estadísticas y tarjetas de resumen
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Bienvenido a tu panel de control
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Home size={24} className="text-gray-400" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                    {stat.trend}
                  </p>
                </div>
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-lg',
                    {
                      'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400':
                        stat.color === 'blue',
                      'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400':
                        stat.color === 'green',
                      'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400':
                        stat.color === 'purple',
                      'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400':
                        stat.color === 'orange',
                    }
                  )}
                >
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Content Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Actividad Reciente
          </h2>
          <div className="mt-4 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 dark:border-gray-800"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <Users size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Nueva inscripción registrada
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Hace {item} hora{item > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Acciones Rápidas
          </h2>
          <div className="mt-4 grid gap-3">
            <button className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
              <UserPlus size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Nueva Inscripción
              </span>
            </button>
            <button className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
              <Users size={20} className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Gestionar Personas
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
