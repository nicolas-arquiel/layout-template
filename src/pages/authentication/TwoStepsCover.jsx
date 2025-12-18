import { Link } from 'react-router-dom'
import { VITE_APP_BASENAME } from '@config'
import { Box, Heading, Text, TextField, Button, Flex, Grid, Link as RadixLink } from '@radix-ui/themes'

const TwoStepsCover = () => {
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
            {VITE_APP_BASENAME}
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
            Verificación en dos pasos 💬
          </Heading>
          <Text size="2" color="gray" as="p">
            Hemos enviado un código de verificación a su móvil. Ingrese el código del móvil en el campo de abajo.
          </Text>
          <Text size="2" weight="bold" as="p" mb="5">
            ******0789
          </Text>

          <form onSubmit={e => e.preventDefault()} style={{ marginTop: '1.5rem' }}>
            <Flex direction="column" gap="4">
              <Box>
                <Text as="label" size="2" mb="2" style={{ display: 'block' }}>
                  Escriba su código de seguridad de 6 dígitos
                </Text>
                <Flex gap="2" justify="between">
                  {[...Array(6)].map((_, index) => (
                    <TextField.Root
                      key={index}
                      size="3"
                      style={{ width: '40px', textAlign: 'center' }}
                      maxLength={1}
                      className="text-center"
                    />
                  ))}
                </Flex>
              </Box>

              <Button size="3" style={{ width: '100%' }} asChild>
                <Link to="/">
                  Iniciar sesión
                </Link>
              </Button>
            </Flex>
          </form>

          <Flex justify="center" mt="4" gap="1">
            <Text size="2" color="gray">
              ¿No recibiste el código?
            </Text>
            <RadixLink href="#" onClick={e => e.preventDefault()}>
              Reenviar
            </RadixLink>
            <Text size="2" color="gray">
              o
            </Text>
            <RadixLink href="#" onClick={e => e.preventDefault()}>
              Llámanos
            </RadixLink>
          </Flex>
        </Box>
      </Flex>
    </Grid>
  )
}

export default TwoStepsCover
