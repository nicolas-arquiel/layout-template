import { useState, useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { Box, Heading, Text, TextField, Button, Flex, Callout, Grid, Checkbox, Link } from '@radix-ui/themes'
import { setAuth, clearAuth } from '@src/store/authSlice'
import { generateMockJwt } from '@src/utils/jwtUtils'

/**
 * Login - Página de inicio de sesión profesional
 * Basado en el sistema de producción de UCU
 */
export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  // Valores por defecto en desarrollo
  const isDev = import.meta.env.DEV
  const defaultValues = {
    email: isDev ? 'admin@test.com' : '',
    password: isDev ? 'admin123' : ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(clearAuth())
  }, [])

  /**
   * Submit handler - Simula login y navega
   */
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setApiError('')

      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simular datos de usuario
      const mockUser = {
        id: 1,
        nombre: 'Usuario',
        apellido: 'Demo',
        email: data.email,
        isSuperAdmin: isDev ? 1 : 0,
        persona: {
          es_empleado: 1,
          empleado_activo: 1
        }
      };

      const token = generateMockJwt({
        user: mockUser,
      });

      const userData = {
        user: mockUser,
        permisos: 'personas:*,inscripcion:*,reportes:*,configuracion:*,recursos:*',
        token: token,
      }

      dispatch(setAuth(userData))
      navigate('/inicio')
    } catch (err) {
      console.error('Error en login:', err)
      setApiError(
        err?.data?.message ||
        (err?.status === 'FETCH_ERROR' && 'Error de conexión con el servidor') ||
        'Error al iniciar sesión. Por favor, intenta nuevamente.'
      )
    } finally {
      setLoading(false)
    }
  }

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
          {/* Aquí iría la imagen de portada si estuviera disponible */}
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
          <Heading size="6" mb="1" weight="bold">
            Sistema de Caja
          </Heading>

          {/* Error Alert */}
          {apiError && (
            <Callout.Root color="red" mb="4" mt="4">
              <Callout.Icon>
                <AlertCircle size={16} />
              </Callout.Icon>
              <Callout.Text>{apiError}</Callout.Text>
            </Callout.Root>
          )}

          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '1.5rem' }}>
            <Flex direction="column" gap="4">
              {/* Email */}
              <Box>
                <Text as="label" size="2" mb="1" style={{ display: 'block' }}>
                  Email
                </Text>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Formato de email inválido'
                    }
                  }}
                  render={({ field }) => (
                    <TextField.Root
                      size="3"
                      placeholder="usuario"
                      {...field}
                    >
                    </TextField.Root>
                  )}
                />
                {errors.email && (
                  <Text size="1" color="red" mt="1">
                    {errors.email.message}
                  </Text>
                )}
              </Box>

              {/* Password */}
              <Box>
                <Flex justify="between" align="center" mb="1">
                  <Text as="label" size="2">
                    Password
                  </Text>
                  <Link asChild size="1">
                    <RouterLink to="/forgot-password">
                      Has olvidado tu contraseña
                    </RouterLink>
                  </Link>
                </Flex>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: 'La contraseña es requerida'
                  }}
                  render={({ field }) => (
                    <TextField.Root
                      type="password"
                      size="3"
                      placeholder="••••••••"
                      {...field}
                    >
                      <TextField.Slot side="right">
                        <Lock size={16} />
                      </TextField.Slot>
                    </TextField.Root>
                  )}
                />
                {errors.password && (
                  <Text size="1" color="red" mt="1">
                    {errors.password.message}
                  </Text>
                )}
              </Box>

              {/* Remember Me */}
              <Flex align="center" gap="2">
                <Checkbox id="remember-me" defaultChecked={false} />
                <Text as="label" size="2" htmlFor="remember-me">
                  Recordar
                </Text>
              </Flex>

              {/* Submit Button */}
              <Button
                type="submit"
                size="3"
                disabled={loading}
                style={{ width: '100%', cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Grid>
  )
}
