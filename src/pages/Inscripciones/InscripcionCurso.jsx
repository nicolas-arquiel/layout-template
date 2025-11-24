import { ReaderIcon, PersonIcon, CalendarIcon, SymbolIcon } from '@radix-ui/react-icons'
import { Box, Flex, Heading, Text, Card, TextField, Select, TextArea, Button, Grid } from '@radix-ui/themes'

/**
 * Componente de página Inscripción Curso con Radix UI
 * Formulario para inscribir estudiantes a cursos
 *
 * @returns {JSX.Element}
 */
export default function InscripcionCurso() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica de envío
  }

  const cursos = [
    { id: 1, nombre: 'Matemáticas Básicas', disponibles: 15 },
    { id: 2, nombre: 'Programación Web', disponibles: 8 },
    { id: 3, nombre: 'Diseño Gráfico', disponibles: 20 },
  ]

  const estudiantes = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Carlos López' },
  ]

  return (
    <Box>
      {/* Header */}
      <Flex align="center" justify="between" mb="6">
        <Box>
          <Heading size="8" mb="2">
            Inscripción a Curso
          </Heading>
          <Text color="gray">Inscribe estudiantes en los cursos disponibles</Text>
        </Box>
        <ReaderIcon width="32" height="32" color="var(--gray-9)" />
      </Flex>

      {/* Form Card */}
      <Card>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="6">
            {/* Course Selection */}
            <Box>
              <Heading size="4" mb="4">
                Selección de Curso
              </Heading>
              <Grid columns={{ initial: '1', md: '2' }} gap="4">
                {/* Curso */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Curso
                  </Text>
                  <Select.Root defaultValue="" size="3">
                    <Select.Trigger style={{ width: '100%' }} placeholder="Seleccionar curso..." />
                    <Select.Content>
                      {cursos.map((curso) => (
                        <Select.Item key={curso.id} value={String(curso.id)}>
                          {curso.nombre} ({curso.disponibles} disponibles)
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Box>

                {/* Estudiante */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Estudiante
                  </Text>
                  <Select.Root defaultValue="" size="3">
                    <Select.Trigger style={{ width: '100%' }} placeholder="Seleccionar estudiante..." />
                    <Select.Content>
                      {estudiantes.map((estudiante) => (
                        <Select.Item key={estudiante.id} value={String(estudiante.id)}>
                          {estudiante.nombre}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Box>
              </Grid>
            </Box>

            {/* Schedule Information */}
            <Box>
              <Heading size="4" mb="4">
                Información de Horario
              </Heading>
              <Grid columns={{ initial: '1', md: '2' }} gap="4">
                {/* Fecha Inicio */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Fecha de Inicio
                  </Text>
                  <TextField.Root type="date" size="3" required>
                    <TextField.Slot>
                      <CalendarIcon width="16" height="16" />
                    </TextField.Slot>
                  </TextField.Root>
                </Box>

                {/* Fecha Fin */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Fecha de Finalización
                  </Text>
                  <TextField.Root type="date" size="3" required>
                    <TextField.Slot>
                      <CalendarIcon width="16" height="16" />
                    </TextField.Slot>
                  </TextField.Root>
                </Box>

                {/* Horario */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Horario
                  </Text>
                  <Select.Root defaultValue="matutino" size="3">
                    <Select.Trigger style={{ width: '100%' }} />
                    <Select.Content>
                      <Select.Item value="matutino">Matutino (8:00 - 12:00)</Select.Item>
                      <Select.Item value="vespertino">Vespertino (13:00 - 17:00)</Select.Item>
                      <Select.Item value="nocturno">Nocturno (18:00 - 22:00)</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Box>

                {/* Modalidad */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Modalidad
                  </Text>
                  <Select.Root defaultValue="presencial" size="3">
                    <Select.Trigger style={{ width: '100%' }} />
                    <Select.Content>
                      <Select.Item value="presencial">Presencial</Select.Item>
                      <Select.Item value="virtual">Virtual</Select.Item>
                      <Select.Item value="hibrido">Híbrido</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Box>
              </Grid>
            </Box>

            {/* Payment Information */}
            <Box>
              <Heading size="4" mb="4">
                Información de Pago
              </Heading>
              <Grid columns={{ initial: '1', md: '2' }} gap="4">
                {/* Costo */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Costo del Curso
                  </Text>
                  <TextField.Root type="number" placeholder="0.00" size="3" required min="0" step="0.01">
                    <TextField.Slot>
                      <SymbolIcon width="16" height="16" />
                    </TextField.Slot>
                  </TextField.Root>
                </Box>

                {/* Método de Pago */}
                <Box>
                  <Text size="2" weight="medium" mb="2" as="label">
                    Método de Pago
                  </Text>
                  <Select.Root defaultValue="efectivo" size="3">
                    <Select.Trigger style={{ width: '100%' }} />
                    <Select.Content>
                      <Select.Item value="efectivo">Efectivo</Select.Item>
                      <Select.Item value="tarjeta">Tarjeta de Crédito</Select.Item>
                      <Select.Item value="transferencia">Transferencia Bancaria</Select.Item>
                      <Select.Item value="online">Pago en Línea</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Box>
              </Grid>
            </Box>

            {/* Observaciones */}
            <Box>
              <Text size="2" weight="medium" mb="2" as="label">
                Observaciones
              </Text>
              <TextArea placeholder="Notas adicionales sobre la inscripción..." rows={4} size="3" />
            </Box>

            {/* Actions */}
            <Flex justify="end" gap="4" pt="4">
              <Button type="button" variant="outline" size="3">
                Cancelar
              </Button>
              <Button type="submit" size="3">
                <ReaderIcon width="20" height="20" />
                Confirmar Inscripción
              </Button>
            </Flex>
          </Flex>
        </form>
      </Card>
    </Box>
  )
}
