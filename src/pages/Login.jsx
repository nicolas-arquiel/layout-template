import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LogIn, Mail, Lock } from 'lucide-react'
import { Box, Card, Heading, Text, TextField, Button, Flex, Checkbox } from '@radix-ui/themes'
import { setAuth } from '@src/store/authSlice'

/**
 * Login - Página de inicio de sesión simple
 *
 * @returns {JSX.Element}
 */
export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simular llamada a API
    setTimeout(() => {
      const userData = {
        user: {
          id: 1,
          nombre: 'Juan Pérez',
          email: email,
        },
        permisos: ['*'],
        token: 'mock-jwt-token',
      }

      dispatch(setAuth(userData))
      navigate('/inicio')
      setLoading(false)
    }, 1000)
  }

  return (
    <Box
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <Card
        style={{
          backgroundColor: 'var(--bg-secondary)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Box p="6">
          {/* Header */}
          <Flex direction="column" align="center" mb="6">
            <Flex
              align="center"
              justify="center"
              mb="4"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-9)',
              }}
            >
              <LogIn size={32} color="white" />
            </Flex>
            <Heading size="6" mb="2" align="center">
              Bienvenido
            </Heading>
            <Text size="2" color="gray" align="center">
              Inicia sesión en tu cuenta
            </Text>
          </Flex>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              {/* Email */}
              <Box>
                <Text size="2" weight="medium" mb="2" as="label">
                  Correo Electrónico
                </Text>
                <TextField.Root
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  size="3"
                  required
                >
                  <TextField.Slot>
                    <Mail size={16} />
                  </TextField.Slot>
                </TextField.Root>
              </Box>

              {/* Password */}
              <Box>
                <Text size="2" weight="medium" mb="2" as="label">
                  Contraseña
                </Text>
                <TextField.Root
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  size="3"
                  required
                >
                  <TextField.Slot>
                    <Lock size={16} />
                  </TextField.Slot>
                </TextField.Root>
              </Box>

              {/* Remember & Forgot */}
              <Flex justify="between" align="center">
                <Flex asChild gap="2" align="center">
                  <label style={{ cursor: 'pointer' }}>
                    <Checkbox size="1" />
                    <Text size="2" color="gray">
                      Recordarme
                    </Text>
                  </label>
                </Flex>
                <Button variant="ghost" size="2" type="button">
                  <Text size="2">¿Olvidaste tu contraseña?</Text>
                </Button>
              </Flex>

              {/* Submit Button */}
              <Button type="submit" size="3" disabled={loading} style={{ width: '100%' }}>
                {loading ? (
                  <>
                    <Box
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid white',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Iniciar Sesión
                  </>
                )}
              </Button>
            </Flex>
          </form>

          {/* Footer */}
          <Box mt="6" style={{ textAlign: 'center' }}>
            <Text size="2" color="gray">
              ¿No tienes cuenta?{' '}
              <Button variant="ghost" size="2" style={{ display: 'inline', padding: 0 }}>
                <Text size="2" weight="medium">
                  Regístrate
                </Text>
              </Button>
            </Text>
          </Box>
        </Box>
      </Card>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Box>
  )
}
