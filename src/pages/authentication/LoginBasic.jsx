import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, Github, Lock } from 'lucide-react'
import { Box, Card, Heading, Text, TextField, Button, Flex, Checkbox, Link as RadixLink, Separator } from '@radix-ui/themes'

const LoginBasic = () => {
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
              Bienvenido a Sistema de Caja! 👋
            </Heading>
            <Text size="2" color="gray">
              Por favor inicia sesión en tu cuenta y comienza la aventura
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
                placeholder="john@example.com"
                type="email"
                autoFocus
              >
                <TextField.Slot>
                  <Mail size={16} />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            <Box>
              <Flex justify="between" align="center" mb="1">
                <Text as="label" size="2">
                  Contraseña
                </Text>
                <RadixLink asChild size="1">
                  <Link to="/pages/forgot-password-basic">
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

            <Flex align="center" gap="2">
              <Checkbox id="remember-me-basic" defaultChecked={false} />
              <Text as="label" size="2" htmlFor="remember-me-basic">
                Recordarme
              </Text>
            </Flex>

            <Button size="3" style={{ width: '100%' }}>
              Iniciar sesión
            </Button>
          </Flex>
        </form>

        <Flex justify="center" mt="4">
          <Text size="2" color="gray">
            ¿Nuevo en nuestra plataforma?{' '}
            <RadixLink asChild>
              <Link to="/pages/register-basic">
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
      </Card>
    </Box>
  )
}

export default LoginBasic
