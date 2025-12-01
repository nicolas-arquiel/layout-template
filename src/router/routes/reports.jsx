import ReportesVentas from '@/pages/Reportes/Ventas'
import ReportesUsuarios from '@/pages/Reportes/UsuariosReporte'
import ReportesInventario from '@/pages/Reportes/Inventario'

const reportRoutes = [
  {
    path: 'reportes/ventas',
    element: <ReportesVentas />,
  },
  {
    path: 'reportes/usuarios',
    element: <ReportesUsuarios />,
  },
  {
    path: 'reportes/inventario',
    element: <ReportesInventario />,
  },
]

export default reportRoutes
