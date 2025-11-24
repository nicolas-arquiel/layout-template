import { HeartIcon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'

/**
 * Componente Footer para el layout principal con Radix UI
 * Muestra información de copyright y créditos
 *
 * @returns {JSX.Element}
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      asChild
      style={{
        borderTop: '1px solid var(--gray-6)',
      }}
      px="6"
      py="4"
    >
      <footer>
        <Flex
          direction={{ initial: 'column', sm: 'row' }}
          align="center"
          justify="between"
          gap="2"
        >
          <Text size="2" color="gray">
            © {currentYear} Mi App. Todos los derechos reservados.
          </Text>

          <Flex align="center" gap="1">
            <Text size="2" color="gray">
              Hecho con
            </Text>
            <HeartIcon width="14" height="14" fill="var(--red-9)" color="var(--red-9)" />
            <Text size="2" color="gray">
              usando React + Radix UI
            </Text>
          </Flex>
        </Flex>
      </footer>
    </Box>
  )
}
