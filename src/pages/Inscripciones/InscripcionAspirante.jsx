import { PlusCircledIcon, PersonIcon, EnvelopeClosedIcon, MobileIcon, CalendarIcon } from '@radix-ui/react-icons'
import { Box, Flex, Heading, Text, Card, TextField, Select, TextArea, Button, Grid } from '@radix-ui/themes'

/**
 * Componente de página Inscripción Aspirante con Radix UI
 * Formulario para inscribir aspirantes
 *
 * @returns {JSX.Element}
 */
export default function InscripcionAspirante() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica de envío
  }

  return (
    <Box>
      {/* Header */}
      <Flex align="center" justify="between" mb="6">
        <Box>
          <Heading size="8" mb="2">
            Inscripción Aspirante
          </Heading>
          <Text color="gray">Registra un nuevo aspirante en el sistema</Text>
        </Box>
        <PlusCircledIcon width="32" height="32" color="var(--gray-9)" />
      </Flex>

      {/* Form Card */}
      <Card>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="6">
            {/* Personal Information Section */}
            <Box>
              <Heading size="4" mb="4">
                Información Personal
              </Heading>
              <Grid columns={{ initial: '1', md: '2' }} gap="4">
                {/* Nombre */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Nombre Completo
                  </Text>
                  <TextField.Root placeholder="Juan Pérez" size="3" required>
                    <TextField.Slot>
                      <PersonIcon width="16" height="16" />
                    </TextField.Slot>
                  </TextField.Root>
                </Box>

                {/* Email */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Correo Electrónico
                  </Text>
                  <TextField.Root type="email" placeholder="juan@email.com" size="3" required>
                    <TextField.Slot>
                      <EnvelopeClosedIcon width="16" height="16" />
                    </TextField.Slot>
                  </TextField.Root>
                </Box>

                {/* Teléfono */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Teléfono
                  </Text>
                  <TextField.Root type="tel" placeholder="123-456-7890" size="3" required>
                    <TextField.Slot>
                      <MobileIcon width="16" height="16" />
                    </TextField.Slot>
                  </TextField.Root>
                </Box>

                {/* Fecha Nacimiento */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Fecha de Nacimiento
                  </Text>
                  <TextField.Root type="date" size="3" required>
                    <TextField.Slot>
                      <CalendarIcon width="16" height="16" />
                    </TextField.Slot>
                  </TextField.Root>
                </Box>
              </Grid>
            </Box>

            {/* Academic Information Section */}
            <Box>
              <Heading size="4" mb="4">
                Información Académica
              </Heading>
              <Grid columns={{ initial: '1', md: '2' }} gap="4">
                {/* Nivel Educativo */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Nivel Educativo
                  </Text>
                  <Select.Root defaultValue="" size="3">
                    <Select.Trigger style={{ width: '100%' }} placeholder="Seleccionar..." />
                    <Select.Content>
                      <Select.Item value="secundaria">Secundaria</Select.Item>
                      <Select.Item value="bachillerato">Bachillerato</Select.Item>
                      <Select.Item value="universidad">Universidad</Select.Item>
                      <Select.Item value="postgrado">Postgrado</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Box>

                {/* Institución */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Institución
                  </Text>
                  <TextField.Root placeholder="Nombre de la institución" size="3" required />
                </Box>
              </Grid>
            </Box>

            {/* Comentarios */}
            <Box>
              <Text size="2" weight="medium" mb="2" as="label">
                Comentarios Adicionales
              </Text>
              <TextArea placeholder="Información adicional..." rows={4} size="3" />
            </Box>

            {/* Actions */}
            <Flex justify="end" gap="4" pt="4">
              <Button type="button" variant="outline" size="3">
                Cancelar
              </Button>
              <Button type="submit" size="3">
                <PlusCircledIcon width="20" height="20" />
                Registrar Aspirante
              </Button>
            </Flex>
          </Flex>
        </form>
      </Card>
    </Box>
  )
}
