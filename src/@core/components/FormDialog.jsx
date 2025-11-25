import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  Button,
  Flex,
  Text,
  TextField,
  TextArea,
  Select,
  Switch,
  Checkbox,
  RadioGroup,
  Heading,
  Callout,
} from '@radix-ui/themes'
import { ExclamationTriangleIcon, CheckCircledIcon } from '@radix-ui/react-icons'

/**
 * FormDialog - Modal con formulario completo usando React Hook Form + Radix
 *
 * Explota componentes de Radix Themes:
 * - Dialog
 * - TextField
 * - TextArea
 * - Select
 * - Switch
 * - Checkbox
 * - RadioGroup
 * - Callout (para errores/success)
 */
export default function FormDialog({ open, onOpenChange, onSubmit, title = 'Nuevo Registro' }) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      descripcion: '',
      categoria: '',
      activo: true,
      acepta: false,
      tipo: 'individual',
    },
  })

  const handleFormSubmit = async (data) => {
    try {
      console.log('Form data:', data)

      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setShowSuccess(true)
      setShowError(false)

      // Llamar callback si existe
      if (onSubmit) {
        onSubmit(data)
      }

      // Reset form después de éxito
      setTimeout(() => {
        reset()
        setShowSuccess(false)
        onOpenChange(false)
      }, 2000)
    } catch (error) {
      setShowError(true)
      setShowSuccess(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content style={{ maxWidth: 550 }}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Completa el formulario con la información requerida
        </Dialog.Description>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Flex direction="column" gap="4">
            {/* Success Message */}
            {showSuccess && (
              <Callout.Root color="green">
                <Callout.Icon>
                  <CheckCircledIcon />
                </Callout.Icon>
                <Callout.Text>¡Formulario enviado exitosamente!</Callout.Text>
              </Callout.Root>
            )}

            {/* Error Message */}
            {showError && (
              <Callout.Root color="red">
                <Callout.Icon>
                  <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text>Ocurrió un error al enviar el formulario</Callout.Text>
              </Callout.Root>
            )}

            {/* Nombre */}
            <label>
              <Text as="div" size="2" mb="1" weight="medium">
                Nombre *
              </Text>
              <TextField.Root
                placeholder="Ingresa el nombre"
                {...register('nombre', {
                  required: 'El nombre es requerido',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                })}
                color={errors.nombre ? 'red' : undefined}
              />
              {errors.nombre && (
                <Text size="1" color="red" mt="1">
                  {errors.nombre.message}
                </Text>
              )}
            </label>

            {/* Email */}
            <label>
              <Text as="div" size="2" mb="1" weight="medium">
                Email *
              </Text>
              <TextField.Root
                type="email"
                placeholder="correo@ejemplo.com"
                {...register('email', {
                  required: 'El email es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
                color={errors.email ? 'red' : undefined}
              />
              {errors.email && (
                <Text size="1" color="red" mt="1">
                  {errors.email.message}
                </Text>
              )}
            </label>

            {/* Teléfono */}
            <label>
              <Text as="div" size="2" mb="1" weight="medium">
                Teléfono
              </Text>
              <TextField.Root placeholder="+54 9 11 1234-5678" {...register('telefono')} />
            </label>

            {/* Categoría (Select) */}
            <label>
              <Text as="div" size="2" mb="1" weight="medium">
                Categoría *
              </Text>
              <Select.Root
                {...register('categoria', { required: 'Selecciona una categoría' })}
                onValueChange={(value) => {
                  // Para que react-hook-form detecte el cambio
                  const event = { target: { name: 'categoria', value } }
                  register('categoria').onChange(event)
                }}
              >
                <Select.Trigger placeholder="Selecciona..." color={errors.categoria ? 'red' : undefined} />
                <Select.Content>
                  <Select.Item value="estudiante">Estudiante</Select.Item>
                  <Select.Item value="docente">Docente</Select.Item>
                  <Select.Item value="administrativo">Administrativo</Select.Item>
                </Select.Content>
              </Select.Root>
              {errors.categoria && (
                <Text size="1" color="red" mt="1">
                  {errors.categoria.message}
                </Text>
              )}
            </label>

            {/* Descripción (TextArea) */}
            <label>
              <Text as="div" size="2" mb="1" weight="medium">
                Descripción
              </Text>
              <TextArea
                placeholder="Descripción detallada..."
                {...register('descripcion')}
                style={{ minHeight: '100px' }}
              />
            </label>

            {/* RadioGroup - Tipo */}
            <label>
              <Text as="div" size="2" mb="2" weight="medium">
                Tipo de Usuario
              </Text>
              <RadioGroup.Root
                value={watch('tipo')}
                onValueChange={(value) => {
                  const event = { target: { name: 'tipo', value } }
                  register('tipo').onChange(event)
                }}
              >
                <Flex direction="column" gap="2">
                  <label>
                    <Flex gap="2" align="center">
                      <RadioGroup.Item value="individual" />
                      <Text size="2">Individual</Text>
                    </Flex>
                  </label>
                  <label>
                    <Flex gap="2" align="center">
                      <RadioGroup.Item value="empresa" />
                      <Text size="2">Empresa</Text>
                    </Flex>
                  </label>
                  <label>
                    <Flex gap="2" align="center">
                      <RadioGroup.Item value="gobierno" />
                      <Text size="2">Gobierno</Text>
                    </Flex>
                  </label>
                </Flex>
              </RadioGroup.Root>
            </label>

            {/* Switch - Activo */}
            <label>
              <Flex gap="2" align="center">
                <Switch {...register('activo')} defaultChecked />
                <Text size="2" weight="medium">
                  Estado Activo
                </Text>
              </Flex>
            </label>

            {/* Checkbox - Acepta términos */}
            <label>
              <Flex gap="2" align="start">
                <Checkbox {...register('acepta', { required: 'Debes aceptar los términos' })} />
                <Flex direction="column">
                  <Text size="2">Acepto los términos y condiciones</Text>
                  {errors.acepta && (
                    <Text size="1" color="red">
                      {errors.acepta.message}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </label>
          </Flex>

          <Flex gap="3" mt="5" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button type="submit">Guardar</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
