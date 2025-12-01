import RecursosArchivos from '@/pages/Recursos/Archivos'
import RecursosPlantillas from '@/pages/Recursos/Plantillas'

const resourceRoutes = [
  {
    path: 'recursos/archivos',
    element: <RecursosArchivos />,
  },
  {
    path: 'recursos/plantillas',
    element: <RecursosPlantillas />,
  },
]

export default resourceRoutes
