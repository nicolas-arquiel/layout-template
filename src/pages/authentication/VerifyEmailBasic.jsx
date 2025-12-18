import { Link } from 'react-router-dom'
import { VITE_APP_BASENAME } from '@config'
import { Box, Card, Heading, Text, Button, Flex, Link as RadixLink } from '@radix-ui/themes'

const VerifyEmailBasic = () => {
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
              Verifica tu correo electrónico ✉️
            </Heading>
            <Text size="2" color="gray" as="p">
              Hemos enviado un enlace a tu dirección de correo electrónico:{' '}
              <Text weight="bold" color="gray">
                hello@pixinvent.com
              </Text>{' '}
              Por favor, sigue el enlace para continuar.
            </Text>
          </Box>
        </Flex>

        <Button size="3" style={{ width: '100%' }} asChild>
          <Link to="/">
            Omitir por ahora
          </Link>
        </Button>

        <Flex justify="center" mt="4" gap="1">
          <Text size="2" color="gray">
            ¿No recibiste un correo electrónico?
          </Text>
          <RadixLink href="#" onClick={e => e.preventDefault()}>
            Reenviar
          </RadixLink>
        </Flex>
      </Card>
    </Box>
  )
}

export default VerifyEmailBasic
