import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react'
import { Box, Card, Heading, Text, TextField, Button, Flex, Callout } from '@radix-ui/themes'
import { setAuth } from '@src/store/authSlice'

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

  /**
   * Validación de email (opcional - adaptar según necesidad)
   */
  const validateEmail = (email) => {
    // Aquí puedes agregar validaciones específicas de dominio si lo necesitas
    // Por ahora acepta cualquier email válido
    return true
  }

  /**
   * Submit handler - Simula login y navega
   */
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setApiError('')

      // TODO: Reemplazar con llamada real a API cuando esté disponible
      // const response = await login({
      //   username: data.email,
      //   password: data.password,
      // }).unwrap()

      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simular datos de usuario
      const userData = {
        user: {
          id: 1,
          nombre: 'Usuario',
          apellido: 'Demo',
          email: data.email,
          isSuperAdmin: isDev, // En dev es admin, en prod depende del backend
        },
        permisos: 'personas:*,inscripcion:*,reportes:*,configuracion:*,recursos:*',
        token: 'mock-jwt-token',
      }

      dispatch(setAuth(userData))
      
      // TODO: Obtener permisos del usuario si es necesario
      // const permisosUser = await getPermisos(userData.user.id).unwrap()
      // dispatch(updatePermisos(permisosUser))

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
    <Box
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--gray-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        size="4"
        style={{
          width: '100%',
          maxWidth: '450px',
          margin: '1rem',
        }}
      >
        {/* Header */}
        <Flex direction="column" gap="4" mb="5">
          <Flex direction="column" align="center" gap="3">
            <Flex
              align="center"
              justify="center"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--accent-9)',
              }}
            >
              <LogIn size={32} color="white" />
            </Flex>
            <Heading size="6" align="center">
              Iniciar Sesión
            </Heading>
            <Text size="2" color="gray" align="center">
              Ingresa tus credenciales para acceder al sistema
            </Text>
          </Flex>
        </Flex>

        {/* Error Alert */}
        {apiError && (
          <Callout.Root color="red" mb="4">
            <Callout.Icon>
              <AlertCircle size={16} />
            </Callout.Icon>
            <Callout.Text>{apiError}</Callout.Text>
          </Callout.Root>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="4">
            {/* Email */}
            <Box>
              <Text size="2" weight="medium" mb="2" as="label" htmlFor="email">
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
                    id="email"
                    type="email"
                    placeholder="ejemplo@email.com"
                    size="3"
                    {...field}
                  >
                    <TextField.Slot>
                      <Mail size={16} />
                    </TextField.Slot>
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
              <Flex justify="between" align="center" mb="2">
                <Text size="2" weight="medium" as="label" htmlFor="password">
                  Contraseña
                </Text>
                {/* Descomentar si necesitas "Olvidé mi contraseña" */}
                {/* <Link to="/forgot-password">
                  <Text size="1" color="gray">
                    ¿Olvidaste tu contraseña?
                  </Text>
                </Link> */}
              </Flex>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'La contraseña es requerida'
                }}
                render={({ field }) => (
                  <TextField.Root
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    size="3"
                    {...field}
                  >
                    <TextField.Slot>
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

            {/* Submit Button */}
            <Button
              type="submit"
              size="3"
              disabled={loading}
              style={{ width: '100%', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? (
                <>
                  <Box
                    style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid white',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  Ingresando...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Ingresar
                </>
              )}
            </Button>
          </Flex>
        </form>

        {/* Footer - Descomentar si necesitas registro */}
        {/* <Box mt="5" style={{ textAlign: 'center' }}>
          <Text size="2" color="gray">
            ¿No tienes cuenta?{' '}
            <Link to="/register">
              <Text size="2" weight="medium" color="blue">
                Regístrate
              </Text>
            </Link>
          </Text>
        </Box> */}
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
