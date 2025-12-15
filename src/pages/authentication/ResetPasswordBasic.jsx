import { Link } from 'react-router-dom'
import { ChevronLeft, Lock } from 'lucide-react'
import { Box, Card, Heading, Text, TextField, Button, Flex, Link as RadixLink } from '@radix-ui/themes'

const ResetPasswordBasic = () => {
  return (
    <Box
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--gray-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <Card size="4" style={{ width: '100%', maxWidth: '400px' }}>
        <Flex direction="column" align="center" gap="4" mb="4">
          <Heading size="6" style={{ color: 'var(--accent-9)' }}>
            Sistema de Caja UCU
          </Heading>
          <Box style={{ textAlign: 'center' }}>
            <Heading size="5" mb="2">
              Restablecer Contraseña 🔒
            </Heading>
            <Text size="2" color="gray">
              Su nueva contraseña debe ser diferente a las contraseñas utilizadas anteriormente
            </Text>
          </Box>
        </Flex>

        <form onSubmit={e => e.preventDefault()}>
          <Flex direction="column" gap="4">
            <Box>
              <Text as="label" size="2" mb="1" style={{ display: 'block' }}>
                Nueva Contraseña
              </Text>
              <TextField.Root
                size="3"
                placeholder="••••••••"
                type="password"
                autoFocus
              >
                <TextField.Slot side="right">
                  <Lock size={16} />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            <Box>
              <Text as="label" size="2" mb="1" style={{ display: 'block' }}>
                Confirmar Contraseña
              </Text>
              <TextField.Root
                size="3"
                placeholder="••••••••"
                type="password"
              >
                <TextField.Slot side="right">
                  <Lock size={16} />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            <Button size="3" style={{ width: '100%' }}>
              Establecer nueva contraseña
            </Button>
          </Flex>
        </form>

        <Flex justify="center" mt="4">
          <RadixLink asChild size="2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link to="/pages/login-basic" style={{ display: 'flex', alignItems: 'center' }}>
              <ChevronLeft size={16} />
              Volver al inicio de sesión
            </Link>
          </RadixLink>
        </Flex>
      </Card>
    </Box>
  )
}

export default ResetPasswordBasic
