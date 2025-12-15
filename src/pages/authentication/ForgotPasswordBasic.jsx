import { Link } from 'react-router-dom'
import { ChevronLeft, Mail } from 'lucide-react'
import { Box, Card, Heading, Text, TextField, Button, Flex, Link as RadixLink } from '@radix-ui/themes'

const ForgotPasswordBasic = () => {
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
              ¿Has olvidado tu contraseña? 🔒
            </Heading>
            <Text size="2" color="gray">
              Ingrese su correo electrónico y le enviaremos las instrucciones para restablecer su contraseña
            </Text>
          </Box>
        </Flex>

        <form onSubmit={e => e.preventDefault()}>
          <Flex direction="column" gap="4">
            <Box>
              <Text as="label" size="2" mb="1" style={{ display: 'block' }}>
                Email
              </Text>
              <TextField.Root
                size="3"
                placeholder="ejemplo@ucu.edu.ar"
                type="email"
                autoFocus
              >
                <TextField.Slot>
                  <Mail size={16} />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            <Button size="3" style={{ width: '100%' }}>
              Enviar correo
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

export default ForgotPasswordBasic
