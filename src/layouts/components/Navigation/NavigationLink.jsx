import React from 'react'
import { useDispatch } from 'react-redux'
import { closeMobileMenu } from '../../../store/layoutSlice'
import NavigationItem from './NavigationItem'

/**
 * NavigationLink - Wrapper para NavigationItem con lógica de cierre mobile
 * Mantiene compatibilidad con código existente
 *
 * @param {Object} props
 * @param {Object} props.item - Item de navegación
 * @param {boolean} [props.nested] - Si es item anidado
 * @param {boolean} [props.forceExpanded] - Fuerza visualización expandida
 * @returns {JSX.Element}
 */
const NavigationLink = ({ item, nested = false, forceExpanded = false }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    // Cerrar menú mobile al hacer click en un link
    dispatch(closeMobileMenu())
  }

  // Crear item modificado con handler de click
  const itemWithHandler = {
    ...item,
    onClick: handleClick,
  }

  return <NavigationItem item={itemWithHandler} nested={nested} showTooltip forceExpanded={forceExpanded} />
}

export default NavigationLink
