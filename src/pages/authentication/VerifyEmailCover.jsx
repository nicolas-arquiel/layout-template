import { Link } from 'react-router-dom'
import { VITE_APP_BASENAME } from '@config'
import { Box, Heading, Text, Button, Flex, Grid, Link as RadixLink } from '@radix-ui/themes'

const VerifyEmailCover = () => {
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
            Verifica tu correo electrónico ✉️
          </Heading>
          <Text size="2" color="gray" as="p" mb="4">
            Hemos enviado un enlace a tu dirección de correo electrónico:{' '}
            <Text weight="bold" color="gray">
              hello@pixinvent.com
            </Text>{' '}
            Por favor, sigue el enlace para continuar.
          </Text>

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
        </Box>
      </Flex>
    </Grid>
  )
}

export default VerifyEmailCover
