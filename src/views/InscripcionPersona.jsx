import { useState, useRef } from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import {
  Box,
  Flex,
  Card,
  Heading,
  Text,
  TextField,
  Select,
  Button,
  TextArea,
  Badge,
  Callout,
} from '@radix-ui/themes'
import {
  User,
  Mail,
  Smartphone,
  Home,
  CheckCircle2,
  Info,
} from 'lucide-react'
import { Wizard } from '@components'

import BreadCrumbs from '@components/breadcrumbs/BreadCrumbs'

/**
 * InscripcionPersona - Formulario de inscripción con Wizard
 *
 * Wizard de 3 pasos para inscribir una persona:
 * 1. Datos Personales
 * 2. Información de Contacto
 * 3. Información Adicional
 */
export default function InscripcionPersona() {
  const wizardRef = useRef(null)
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      // Paso 1: Datos Personales
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      genero: '',
      tipoDocumento: '',
      numeroDocumento: '',

      // Paso 2: Contacto
      email: '',
      telefono: '',
      celular: '',
      direccion: '',
      ciudad: '',
      codigoPostal: '',

      // Paso 3: Información Adicional
      ocupacion: '',
      nivelEducacion: '',
      estadoCivil: '',
      notas: '',
    },
  })

  const [currentStep, setCurrentStep] = useState(0)

  const onSubmit = (data) => {
    console.log('Datos de inscripción:', data)
    alert('¡Persona inscrita exitosamente!')
    methods.reset()
    wizardRef.current?.reset()
  }

  const handleNext = async () => {
    let fieldsToValidate = []

    // Validar campos según el paso actual
    if (currentStep === 0) {
      fieldsToValidate = [
        'nombre',
        'apellido',
        'fechaNacimiento',
        'genero',
        'tipoDocumento',
        'numeroDocumento',
      ]
    } else if (currentStep === 1) {
      fieldsToValidate = ['email', 'telefono', 'direccion', 'ciudad']
    }

    const isValid = await methods.trigger(fieldsToValidate)

    if (isValid) {
      wizardRef.current?.next()
    }
  }

  const handlePrevious = () => {
    wizardRef.current?.previous()
  }

  // Paso 1: Datos Personales
  const renderDatosPersonales = () => (
    <Box>
      <Flex direction="column" gap="4">
        <Flex gap="4">
          <Box style={{ flex: 1 }}>
            <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
              Nombre <Text color="red">*</Text>
            </Text>
            <Controller
              name="nombre"
              control={methods.control}
              rules={{ required: 'El nombre es requerido' }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField.Root
                    {...field}
                    placeholder="Ingrese el nombre"
                    size="3"
                  />
                  {error && (
                    <Text color="red" size="1" mt="1">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </Box>

          <Box style={{ flex: 1 }}>
            <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
              Apellido <Text color="red">*</Text>
            </Text>
            <Controller
              name="apellido"
              control={methods.control}
              rules={{ required: 'El apellido es requerido' }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField.Root
                    {...field}
                    placeholder="Ingrese el apellido"
                    size="3"
                  />
                  {error && (
                    <Text color="red" size="1" mt="1">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </Box>
        </Flex>

        <Flex gap="4">
          <Box style={{ flex: 1 }}>
            <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
              Fecha de Nacimiento <Text color="red">*</Text>
            </Text>
            <Controller
              name="fechaNacimiento"
              control={methods.control}
              rules={{ required: 'La fecha de nacimiento es requerida' }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField.Root
                    {...field}
                    type="date"
                    size="3"
                  />
                  {error && (
                    <Text color="red" size="1" mt="1">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </Box>

          <Box style={{ flex: 1 }}>
            <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
              Género <Text color="red">*</Text>
            </Text>
            <Controller
              name="genero"
              control={methods.control}
              rules={{ required: 'El género es requerido' }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                    size="3"
                  >
                    <Select.Trigger placeholder="Seleccione" style={{ width: '100%' }} />
                    <Select.Content>
                      <Select.Item value="masculino">Masculino</Select.Item>
                      <Select.Item value="femenino">Femenino</Select.Item>
                      <Select.Item value="otro">Otro</Select.Item>
                      <Select.Item value="prefiero-no-decir">
                        Prefiero no decir
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                  {error && (
                    <Text color="red" size="1" mt="1">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </Box>
        </Flex>

        <Flex gap="4">
          <Box style={{ flex: 1 }}>
            <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
              Tipo de Documento <Text color="red">*</Text>
            </Text>
            <Controller
              name="tipoDocumento"
              control={methods.control}
              rules={{ required: 'El tipo de documento es requerido' }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                    size="3"
                  >
                    <Select.Trigger placeholder="Seleccione" style={{ width: '100%' }} />
                    <Select.Content>
                      <Select.Item value="dni">DNI</Select.Item>
                      <Select.Item value="pasaporte">Pasaporte</Select.Item>
                      <Select.Item value="cedula">Cédula</Select.Item>
                      <Select.Item value="otro">Otro</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  {error && (
                    <Text color="red" size="1" mt="1">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </Box>

          <Box style={{ flex: 1 }}>
            <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
              Número de Documento <Text color="red">*</Text>
            </Text>
            <Controller
              name="numeroDocumento"
              control={methods.control}
              rules={{
                required: 'El número de documento es requerido',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Solo se permiten números',
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField.Root
                    {...field}
                    placeholder="Ej: 12345678"
                    size="3"
                  />
                  {error && (
                    <Text color="red" size="1" mt="1">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </Box>
        </Flex>

        <Callout.Root color="blue" size="1">
          <Callout.Icon>
            <Info />
          </Callout.Icon>
          <Callout.Text>
            Complete los datos personales básicos de la persona a inscribir.
          </Callout.Text>
        </Callout.Root>
      </Flex>
    </Box>
  )

  // Paso 2: Información de Contacto
  const renderContacto = () => (
    <Box>
      <Flex direction="column" gap="4">
        <Box>
          <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
            Email <Text color="red">*</Text>
          </Text>
          <Controller
            name="email"
            control={methods.control}
            rules={{
              required: 'El email es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField.Root
                  {...field}
                  type="email"
                  placeholder="correo@ejemplo.com"
                  size="3"
                >
                  <TextField.Slot>
                    <Mail size={16} />
                  </TextField.Slot>
                </TextField.Root>
                {error && (
                  <Text color="red" size="1" mt="1">
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />
        </Box>

        <Flex gap="4">
          <Box style={{ flex: 1 }}>
            <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
              Teléfono <Text color="red">*</Text>
            </Text>
            <Controller
              name="telefono"
              control={methods.control}
              rules={{ required: 'El teléfono es requerido' }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField.Root
                    {...field}
                    placeholder="Ej: 011 4567-8900"
                    size="3"
                  >
                    <TextField.Slot>
                      <Smartphone size={16} />
                    </TextField.Slot>
                  </TextField.Root>
                  {error && (
                    <Text color="red" size="1" mt="1">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </Box>

          <Box style={{ flex: 1 }}>
            <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
              Celular
            </Text>
            <Controller
              name="celular"
              control={methods.control}
              render={({ field }) => (
                <TextField.Root
                  {...field}
                  placeholder="Ej: 011 15-1234-5678"
                  size="3"
                >
                  <TextField.Slot>
                    <Smartphone size={16} />
                  </TextField.Slot>
                </TextField.Root>
              )}
            />
          </Box>
        </Flex>

        <Box>
          <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
            Dirección <Text color="red">*</Text>
          </Text>
          <Controller
            name="direccion"
            control={methods.control}
            rules={{ required: 'La dirección es requerida' }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField.Root
                  {...field}
                  placeholder="Calle, número, piso, depto"
                  size="3"
                >
                  <TextField.Slot>
                    <Home size={16} />
                  </TextField.Slot>
                </TextField.Root>
                {error && (
                  <Text color="red" size="1" mt="1">
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />
        </Box>

        <Flex gap="4">
          <Box style={{ flex: 2 }}>
            <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
              Ciudad <Text color="red">*</Text>
            </Text>
            <Controller
              name="ciudad"
              control={methods.control}
              rules={{ required: 'La ciudad es requerida' }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField.Root
                    {...field}
                    placeholder="Ej: Buenos Aires"
                    size="3"
                  />
                  {error && (
                    <Text color="red" size="1" mt="1">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </Box>

          <Box style={{ flex: 1 }}>
            <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
              Código Postal
            </Text>
            <Controller
              name="codigoPostal"
              control={methods.control}
              render={({ field }) => (
                <TextField.Root
                  {...field}
                  placeholder="1234"
                  size="3"
                />
              )}
            />
          </Box>
        </Flex>

        <Callout.Root color="blue" size="1">
          <Callout.Icon>
            <Info />
          </Callout.Icon>
          <Callout.Text>
            Proporcione la información de contacto para comunicarse con la persona.
          </Callout.Text>
        </Callout.Root>
      </Flex>
    </Box>
  )

  // Paso 3: Información Adicional
  const renderInformacionAdicional = () => (
    <Box>
      <Flex direction="column" gap="4">
        <Flex gap="4">
          <Box style={{ flex: 1 }}>
            <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
              Ocupación
            </Text>
            <Controller
              name="ocupacion"
              control={methods.control}
              render={({ field }) => (
                <TextField.Root
                  {...field}
                  placeholder="Ej: Empleado, Estudiante, etc."
                  size="3"
                />
              )}
            />
          </Box>

          <Box style={{ flex: 1 }}>
            <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
              Nivel de Educación
            </Text>
            <Controller
              name="nivelEducacion"
              control={methods.control}
              render={({ field }) => (
                <Select.Root
                  value={field.value}
                  onValueChange={field.onChange}
                  size="3"
                >
                  <Select.Trigger placeholder="Seleccione" style={{ width: '100%' }} />
                  <Select.Content>
                    <Select.Item value="primaria">Primaria</Select.Item>
                    <Select.Item value="secundaria">Secundaria</Select.Item>
                    <Select.Item value="terciaria">Terciaria</Select.Item>
                    <Select.Item value="universitaria">Universitaria</Select.Item>
                    <Select.Item value="posgrado">Posgrado</Select.Item>
                  </Select.Content>
                </Select.Root>
              )}
            />
          </Box>
        </Flex>

        <Box>
          <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
            Estado Civil
          </Text>
          <Controller
            name="estadoCivil"
            control={methods.control}
            render={({ field }) => (
              <Select.Root
                value={field.value}
                onValueChange={field.onChange}
                size="3"
              >
                <Select.Trigger placeholder="Seleccione" style={{ width: '100%' }} />
                <Select.Content>
                  <Select.Item value="soltero">Soltero/a</Select.Item>
                  <Select.Item value="casado">Casado/a</Select.Item>
                  <Select.Item value="divorciado">Divorciado/a</Select.Item>
                  <Select.Item value="viudo">Viudo/a</Select.Item>
                  <Select.Item value="union-convivencial">
                    Unión Convivencial
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            )}
          />
        </Box>

        <Box>
          <Text as="label" size="2" weight="medium" mb="1" style={{ display: 'block' }}>
            Notas / Observaciones
          </Text>
          <Controller
            name="notas"
            control={methods.control}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Información adicional relevante..."
                size="3"
                rows={4}
              />
            )}
          />
        </Box>

        <Callout.Root color="green" size="1">
          <Callout.Icon>
            <CheckCircle2 />
          </Callout.Icon>
          <Callout.Text>
            Complete los datos adicionales y presione "Inscribir Persona" para finalizar.
          </Callout.Text>
        </Callout.Root>
      </Flex>
    </Box>
  )

  const steps = [
    {
      id: 'step-datos-personales',
      title: 'Datos Personales',
      subtitle: 'Información básica',
      icon: <User size={18} />,
      content: renderDatosPersonales(),
    },
    {
      id: 'step-contacto',
      title: 'Contacto',
      subtitle: 'Email y teléfono',
      icon: <Mail size={18} />,
      content: renderContacto(),
    },
    {
      id: 'step-info-adicional',
      title: 'Información Adicional',
      subtitle: 'Datos complementarios',
      icon: <Info size={18} />,
      content: renderInformacionAdicional(),
    },
  ]

  return (
    <Box p="5">
      <Flex direction="column" gap="5">
        <BreadCrumbs 
          title="Inscripción de Persona" 
          data={[
            { title: 'Inicio', link: '/inicio' }, 
            { title: 'Inscripciones' },
            { title: 'Nueva Inscripción' }
          ]} 
        />

        <Flex justify="end" mb="2">
          <Badge size="3" color="blue">
            Paso {currentStep + 1} de {steps.length}
          </Badge>
        </Flex>

        {/* Wizard Form */}
        <Card size="3">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Wizard
                ref={wizardRef}
                type="modern-horizontal"
                steps={steps}
                onStepChange={setCurrentStep}
              />

              {/* Botones de navegación */}
              <Flex justify="between" mt="6" pt="5" style={{ borderTop: '1px solid var(--gray-5)' }}>
                <Button
                  type="button"
                  variant="soft"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Anterior
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={handleNext}>
                    Siguiente
                  </Button>
                ) : (
                  <Button type="submit" color="green">
                    <CheckCircle2 size={16} />
                    Inscribir Persona
                  </Button>
                )}
              </Flex>
            </form>
          </FormProvider>
        </Card>
      </Flex>
    </Box>
  )
}
