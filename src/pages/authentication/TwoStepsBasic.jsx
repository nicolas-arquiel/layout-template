import { Link } from 'react-router-dom'
import { VITE_APP_BASENAME } from '@config'
import { Box, Card, Heading, Text, TextField, Button, Flex, Link as RadixLink } from '@radix-ui/themes'

const TwoStepsBasic = () => {
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
            {VITE_APP_BASENAME}
          </Heading>
          <Box style={{ textAlign: 'center' }}>
            <Heading size="5" mb="2">
              Verificación en dos pasos 💬
            </Heading>
            <Text size="2" color="gray" as="p">
              Hemos enviado un código de verificación a su móvil. Ingrese el código del móvil en el campo de abajo.
            </Text>
            <Text size="2" weight="bold" as="p">
              ******0789
            </Text>
          </Box>
        </Flex>

        <form onSubmit={e => e.preventDefault()}>
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
      </Card>
    </Box>
  )
}

export default TwoStepsBasic
