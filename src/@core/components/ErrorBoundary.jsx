import React from 'react'
import { Card, Heading, Text, Button, Flex, Callout } from '@radix-ui/themes'
import { AlertTriangle, RefreshCw } from 'lucide-react'

/**
 * ErrorBoundary - Captura errores en sus componentes hijos y muestra una UI de fallback
 * Evita que toda la aplicación se rompa cuando falla una parte (ej: una vista específica)
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la UI alternativa
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.error("Uncaught error:", error, errorInfo)
    this.setState({ errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      // UI de Fallback personalizada
      return (
        <Card style={{ 
          maxWidth: '600px', 
          margin: '2rem auto', 
          padding: '2rem',
          backgroundColor: 'var(--color-panel-solid)',
          border: '1px solid var(--red-6)'
        }}>
          <Flex direction="column" align="center" gap="4" style={{ textAlign: 'center' }}>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '50%', 
              backgroundColor: 'var(--red-3)',
              color: 'var(--red-9)'
            }}>
              <AlertTriangle size={48} />
            </div>
            
            <Heading size="6" color="red">
              ¡Algo salió mal!
            </Heading>
            
            <Text size="3" color="gray">
              Ha ocurrido un error inesperado al cargar esta sección.
            </Text>

            {this.state.error && (
              <Callout.Root color="red" style={{ width: '100%', textAlign: 'left', marginTop: '1rem' }}>
                <Callout.Icon>
                  <AlertTriangle size={16} />
                </Callout.Icon>
                <Callout.Text style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  {this.state.error.toString()}
                </Callout.Text>
              </Callout.Root>
            )}

            <Button size="3" mt="4" onClick={this.handleReset}>
              <RefreshCw size={18} />
              Recargar Página
            </Button>
          </Flex>
        </Card>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
