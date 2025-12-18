import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ChevronRight } from 'lucide-react'
import { Heading, Text } from '@radix-ui/themes'

/**
 * BreadCrumbs - Componente de navegación simple y limpio
 * 
 * Layout: [Title] | [Item1 > Item2 > Item3]
 * 
 * @param {string} title - Título principal (izquierda)
 * @param {Array} data - Array de items del breadcrumb trail
 * @param {string} data[].title - Texto del item
 * @param {string} data[].link - Link opcional del item
 */
const BreadCrumbs = ({ data, title }) => {
  const renderBreadCrumbs = () => {
    return data.map((item, index) => {
      const Wrapper = item.link ? Link : Fragment
      const isLastItem = data.length - 1 === index
      
      return (
        <Fragment key={index}>
          <Wrapper {...(item.link ? { to: item.link } : {})}>
            <Text 
              size="3"
              className="transition-colors cursor-pointer"
              style={!isLastItem ? { color: 'var(--accent-9)' } : { color: 'var(--gray-11)' }}
            >
              {item.title}
            </Text>
          </Wrapper>
          {!isLastItem && (
            <ChevronRight 
              size={16} 
              className="flex-shrink-0" 
              style={{ color: 'var(--gray-9)' }}
            />
          )}
        </Fragment>
      )
    })
  }

  return (
    <div className="w-full mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Title */}
        {title && (
          <Heading size="6" weight="light">
            {title}
          </Heading>
        )}
        
        {/* Separator */}
        {data && data.length > 0 && (
          <>
            <div 
              className="h-6 w-px flex-shrink-0 mx-2" 
              style={{ backgroundColor: 'var(--gray-6)' }}
            />
            
            {/* Breadcrumb Trail */}
            <nav className="flex items-center gap-2" aria-label="Breadcrumb">
              {renderBreadCrumbs()}
            </nav>
          </>
        )}
      </div>
    </div>
  )
}

BreadCrumbs.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string, // Opcional
      title: PropTypes.string.isRequired
    })
  )
}

BreadCrumbs.defaultProps = {
  data: []
}

export default BreadCrumbs
