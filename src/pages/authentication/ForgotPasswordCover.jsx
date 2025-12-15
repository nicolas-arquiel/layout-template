import { Link } from 'react-router-dom'
import { ChevronLeft, Mail } from 'lucide-react'
import { Box, Heading, Text, TextField, Button, Flex, Grid, Link as RadixLink } from '@radix-ui/themes'

const ForgotPasswordCover = () => {
  return (
    <Grid
      columns={{ initial: '1', md: '2fr 1fr' }}
      gap="0"
      style={{ minHeight: '100vh', width: '100%' }}
    >
      {/* Left Side - Cover */}
      <Box
        display={{ initial: 'none', md: 'block' }}
        style={{
          backgroundColor: 'var(--gray-2)',
          position: 'relative',
        }}
      >
        {/* Brand Logo */}
        <Box style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 1 }}>
          <Heading size="6" style={{ color: 'var(--accent-9)' }}>
            Sistema de Caja UCU
          </Heading>
        </Box>

        {/* Image Placeholder */}
        <Flex align="center" justify="center" style={{ height: '100%', width: '100%' }}>
          {/* Placeholder for illustration */}
        </Flex>
      </Box>

      {/* Right Side - Form */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{
          backgroundColor: 'var(--color-background)',
          padding: '2rem'
        }}
      >
        <Box style={{ width: '100%', maxWidth: '400px' }}>
          <Heading size="6" mb="2" weight="bold">
            ¿Has olvidado tu contraseña? 🔒
          </Heading>
          <Text size="2" color="gray" mb="5" as="p">
            Ingrese su correo electrónico y le enviaremos instrucciones para restablecer su contraseña
          </Text>

          <form onSubmit={e => e.preventDefault()} style={{ marginTop: '1.5rem' }}>
            <Flex direction="column" gap="4">
              {/* Email */}
              <Box>
                <Text as="label" size="2" mb="1" style={{ display: 'block' }}>
                  Email
                </Text>
                <TextField.Root
                  size="3"
                  placeholder="john@example.com"
                  type="email"
                  autoFocus
                >
                  <TextField.Slot>
                    <Mail size={16} />
                  </TextField.Slot>
                </TextField.Root>
              </Box>

              {/* Submit Button */}
              <Button size="3" style={{ width: '100%' }}>
                Enviar correo
              </Button>
            </Flex>
          </form>

          <Flex justify="center" mt="4">
            <RadixLink asChild size="2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/pages/login-cover" style={{ display: 'flex', alignItems: 'center' }}>
                <ChevronLeft size={16} />
                Volver al Inicio
              </Link>
            </RadixLink>
          </Flex>
        </Box>
      </Flex>
    </Grid>
  )
}

export default ForgotPasswordCover
