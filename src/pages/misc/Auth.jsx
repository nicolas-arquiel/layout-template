import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Flex, Card, Heading, Text, Spinner } from '@radix-ui/themes'
import { Shield } from 'lucide-react'

/**
 * Auth - Página intermedia de autenticación
 * Se muestra después del login mientras se verifican permisos y datos del usuario
 * 
 * TODO: Agregar lógica real cuando exista API:
 * - Verificar carreras activas
 * - Validar permisos de autogestión
 * - Redirigir según tipo de usuario
 */
const Auth = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    // TODO: Implementar lógica real cuando exista API
    // Por ahora, redirige directamente al inicio después de 1 segundo
    
    const timer = setTimeout(() => {
      if (user) {
        // TODO: Verificar carreras activas y permisos
        // const carrerasActivas = await getCarrerasActivas(user.id)
        // const tieneAutogestion = carrerasActivas?.some(c => c.autogestionactivo)
        
        // if (tieneAutogestion) {
        //   navigate('/inicio')
        // } else {
        //   navigate('/not-authorized')
        // }

        // Por ahora, siempre redirige al inicio
        navigate('/inicio')
      } else {
        // Si no hay usuario, volver al login
        navigate('/login')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [user, navigate])

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--gray-2)',
        padding: '2rem',
      }}
    >
      <Card size="4" style={{ maxWidth: '500px', width: '100%' }}>
        <Flex direction="column" align="center" gap="4" style={{ textAlign: 'center' }}>
          {/* Icon */}
          <Flex
            align="center"
            justify="center"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--blue-3)',
            }}
          >
            <Shield size={40} color="var(--blue-9)" />
          </Flex>

          {/* Title */}
          <Heading size="6">
            Autenticando... 🔐
          </Heading>

          {/* Message */}
          <Text size="3" color="gray">
            Por favor espera mientras verificamos tu información.
          </Text>

          {/* Spinner */}
          <Spinner size="3" />

          {/* User Info */}
          {user && (
            <Flex direction="column" gap="1" style={{ marginTop: '1rem' }}>
              <Text size="2" weight="bold">
                {user.nombre} {user.apellido}
              </Text>
              <Text size="1" color="gray">
                {user.email}
              </Text>
            </Flex>
          )}

          {/* TODO Info */}
          <Card variant="surface" style={{ marginTop: '1rem', width: '100%' }}>
            <Flex direction="column" gap="2">
              <Text size="2" weight="bold" color="amber">
                🚧 En Desarrollo
              </Text>
              <Text size="1" color="gray">
                Esta página verificará permisos y carreras activas cuando se conecte a la API.
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Auth
