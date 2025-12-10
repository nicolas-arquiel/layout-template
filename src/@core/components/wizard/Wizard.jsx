import { useState, forwardRef, useImperativeHandle, Fragment } from 'react'
import { Flex, Box, Text, Button } from '@radix-ui/themes'
import { ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'
import './Wizard.css'

/**
 * Wizard - Componente stepper personalizado usando Radix UI
 *
 * Similar al bs-stepper pero construido con Radix.
 * Permite crear wizards horizontales, verticales y modernos.
 */
const Wizard = forwardRef((props, ref) => {
  const {
    type = 'horizontal',
    steps,
    separator = <ChevronRight size={17} />,
    className,
    headerClassName,
    contentClassName,
    contentWrapperClassName,
    showHeader = true,
    onStepChange,
  } = props

  const [activeIndex, setActiveIndex] = useState(0)

  // Expone métodos para controlar el wizard desde afuera
  useImperativeHandle(ref, () => ({
    next: () => {
      if (activeIndex < steps.length - 1) {
        goToStep(activeIndex + 1)
      }
    },
    previous: () => {
      if (activeIndex > 0) {
        goToStep(activeIndex - 1)
      }
    },
    to: (stepIndex) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        goToStep(stepIndex)
      }
    },
    reset: () => {
      goToStep(0)
    },
    currentStep: activeIndex,
  }))

  const goToStep = (stepIndex) => {
    setActiveIndex(stepIndex)
    if (onStepChange) {
      onStepChange(stepIndex)
    }
  }

  // Renderiza el header con los pasos
  const renderHeader = () => {
    return steps.map((step, index) => {
      const isCrossed = activeIndex > index
      const isActive = index === activeIndex

      return (
        <Fragment key={step.id}>
          {index !== 0 ? (
            <div className="wizard-separator">
              {separator}
            </div>
          ) : null}
          <div
            className={clsx('wizard-step', {
              'wizard-step-crossed': isCrossed,
              'wizard-step-active': isActive,
            })}
            onClick={() => goToStep(index)}
          >
            <button type="button" className="wizard-step-trigger">
              <span className="wizard-step-box">
                {step.icon ? step.icon : index + 1}
              </span>
              <span className="wizard-step-label">
                <span className="wizard-step-title">{step.title}</span>
                {step.subtitle ? (
                  <span className="wizard-step-subtitle">{step.subtitle}</span>
                ) : null}
              </span>
            </button>
          </div>
        </Fragment>
      )
    })
  }

  // Renderiza el contenido de los pasos
  const renderContent = () => {
    return steps.map((step, index) => {
      const isActive = activeIndex === index

      return (
        <div
          className={clsx('wizard-content', contentClassName, {
            'wizard-content-active': isActive,
          })}
          id={step.id}
          key={step.id}
          style={{ display: isActive ? 'block' : 'none' }}
        >
          {step.content}
        </div>
      )
    })
  }

  return (
    <div
      className={clsx('wizard-container', className, {
        'wizard-vertical': type === 'vertical',
        'wizard-modern-vertical': type === 'modern-vertical',
        'wizard-modern-horizontal': type === 'modern-horizontal',
        'wizard-horizontal': type === 'horizontal',
      })}
    >
      {/* Header con los pasos */}
      {showHeader && (
        <div className={clsx('wizard-header', headerClassName)}>
          {renderHeader()}
        </div>
      )}

      {/* Contenido de los pasos */}
      <div
        className={clsx(
          'wizard-content-wrapper',
          contentWrapperClassName
        )}
      >
        {renderContent()}
      </div>
    </div>
  )
})

Wizard.displayName = 'Wizard'

export default Wizard
