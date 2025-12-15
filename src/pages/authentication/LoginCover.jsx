import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, Github, Lock } from 'lucide-react'
import { Box, Heading, Text, TextField, Button, Flex, Grid, Checkbox, Link as RadixLink, Separator } from '@radix-ui/themes'

const LoginCover = () => {
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
            Bienvenido a Sistema de Caja! 👋
          </Heading>
          <Text size="2" color="gray" mb="5" as="p">
            Por favor inicia sesión en tu cuenta y comienza la aventura
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

              {/* Password */}
              <Box>
                <Flex justify="between" align="center" mb="1">
                  <Text as="label" size="2">
                    Contraseña
                  </Text>
                  <RadixLink asChild size="1">
                    <Link to="/pages/forgot-password-cover">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </RadixLink>
                </Flex>
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

              {/* Remember Me */}
              <Flex align="center" gap="2">
                <Checkbox id="remember-me-cover" defaultChecked={false} />
                <Text as="label" size="2" htmlFor="remember-me-cover">
                  Recordarme
                </Text>
              </Flex>

              {/* Submit Button */}
              <Button size="3" style={{ width: '100%' }}>
                Iniciar sesión
              </Button>
            </Flex>
          </form>

          <Flex justify="center" mt="4">
            <Text size="2" color="gray">
              ¿Nuevo en nuestra plataforma?{' '}
              <RadixLink asChild>
                <Link to="/pages/register-cover">
                  Crear una cuenta
                </Link>
              </RadixLink>
            </Text>
          </Flex>

          <Flex align="center" gap="2" my="4">
            <Separator style={{ flex: 1 }} />
            <Text size="1" color="gray">o</Text>
            <Separator style={{ flex: 1 }} />
          </Flex>

          <Flex justify="center" gap="3">
            <Button variant="soft" color="indigo">
              <Facebook size={16} />
            </Button>
            <Button variant="soft" color="sky">
              <Twitter size={16} />
            </Button>
            <Button variant="soft" color="crimson">
              <Mail size={16} />
            </Button>
            <Button variant="soft" color="gray">
              <Github size={16} />
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Grid>
  )
}

export default LoginCover
