import { useState, useEffect } from 'react'
import { Settings, Sliders, Sun, Moon } from 'react-feather'
import {
  Dialog,
  Flex,
  Box,
  Button,
  Text,
  Heading,
  Select,
  Slider,
  Switch,
  RadioGroup,
  Separator,
} from '@radix-ui/themes'
import { useThemeConfig } from '../../App'

/**
 * Theme Customizer Component con Radix UI
 * Panel completo para personalizar todos los aspectos del tema
 * Se abre con la tecla 'T' o botón flotante
 *
 * @returns {JSX.Element}
 */
export default function ThemeCustomizer() {
  const { themeConfig, updateThemeConfig, resetThemeConfig } = useThemeConfig()
  const [open, setOpen] = useState(false)

  // Tecla T para abrir el customizer
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Abrir con T, cerrar con Escape
      if ((e.key === 't' || e.key === 'T') && !e.target.matches('input, textarea, [contenteditable]')) {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Mapeo de radius para slider
  const getRadiusValue = (radius) => {
    const map = { none: 0, small: 25, medium: 50, large: 75, full: 100 }
    return map[radius] || 50
  }

  const setRadiusFromValue = (value) => {
    if (value === 0) return 'none'
    if (value <= 25) return 'small'
    if (value <= 50) return 'medium'
    if (value <= 75) return 'large'
    return 'full'
  }

  // Colores disponibles
  const accentColors = [
    'blue',
    'green',
    'red',
    'purple',
    'orange',
    'pink',
    'cyan',
    'yellow',
    'indigo',
    'teal',
  ]

  return (
    <>
      {/* Floating Settings Button */}
      <Button
        onClick={() => setOpen(true)}
        size="3"
        style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 999,
          borderRadius: 'var(--radius-3) 0 0 var(--radius-3)',
          boxShadow: 'var(--shadow-5)',
        }}
        title="Personalización del Tema (Presiona T)"
      >
        <Settings size={18} />
      </Button>

      {/* Dialog */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content maxWidth="550px" style={{ maxHeight: '85vh', overflow: 'auto' }}>
          {/* Header */}
          <Dialog.Title>
            <Flex align="center" gap="2">
              <Sliders size={22} />
              <Text>Personalizar Tema</Text>
            </Flex>
          </Dialog.Title>

          <Dialog.Description size="2" mb="4">
            Personaliza la apariencia completa de la aplicación. Presiona <strong>T</strong> para
            abrir este panel en cualquier momento.
          </Dialog.Description>

          <Flex direction="column" gap="5">
            {/* ===== APARIENCIA ===== */}
            <Box>
              <Heading size="3" mb="3">
                Apariencia
              </Heading>
              <RadioGroup.Root
                value={themeConfig.appearance}
                onValueChange={(value) => updateThemeConfig('appearance', value)}
              >
                <Flex gap="4">
                  <Flex asChild align="center" gap="2">
                    <label>
                      <RadioGroup.Item value="light" />
                      <Flex align="center" gap="2">
                        <Sun size={16} />
                        <Text>Claro</Text>
                      </Flex>
                    </label>
                  </Flex>
                  <Flex asChild align="center" gap="2">
                    <label>
                      <RadioGroup.Item value="dark" />
                      <Flex align="center" gap="2">
                        <Moon size={16} />
                        <Text>Oscuro</Text>
                      </Flex>
                    </label>
                  </Flex>
                </Flex>
              </RadioGroup.Root>
            </Box>

            <Separator size="4" />

            {/* ===== COLOR PRINCIPAL ===== */}
            <Box>
              <Heading size="3" mb="3">
                Color Principal
              </Heading>
              <Flex gap="2" wrap="wrap">
                {accentColors.map((color) => (
                  <Button
                    key={color}
                    size="2"
                    variant={themeConfig.accentColor === color ? 'solid' : 'soft'}
                    color={color}
                    onClick={() => updateThemeConfig('accentColor', color)}
                    style={{
                      minWidth: '80px',
                      textTransform: 'capitalize',
                      cursor: 'pointer',
                    }}
                  >
                    {color}
                  </Button>
                ))}
              </Flex>
            </Box>

            <Separator size="4" />

            {/* ===== COLOR GRIS ===== */}
            <Box>
              <Heading size="3" mb="3">
                Color Gris
              </Heading>
              <Select.Root
                value={themeConfig.grayColor}
                onValueChange={(value) => updateThemeConfig('grayColor', value)}
              >
                <Select.Trigger style={{ width: '100%' }} />
                <Select.Content>
                  <Select.Item value="gray">Gray</Select.Item>
                  <Select.Item value="slate">Slate</Select.Item>
                  <Select.Item value="mauve">Mauve</Select.Item>
                  <Select.Item value="sage">Sage</Select.Item>
                  <Select.Item value="olive">Olive</Select.Item>
                  <Select.Item value="sand">Sand</Select.Item>
                </Select.Content>
              </Select.Root>
            </Box>

            <Separator size="4" />

            {/* ===== BORDES REDONDEADOS ===== */}
            <Box>
              <Heading size="3" mb="3">
                Bordes Redondeados: {themeConfig.radius}
              </Heading>
              <Flex direction="column" gap="2">
                <Slider
                  value={[getRadiusValue(themeConfig.radius)]}
                  onValueChange={([value]) => {
                    updateThemeConfig('radius', setRadiusFromValue(value))
                  }}
                  max={100}
                  step={25}
                />
                <Flex justify="between">
                  <Text size="1" color="gray">
                    Ninguno
                  </Text>
                  <Text size="1" color="gray">
                    Completo
                  </Text>
                </Flex>
              </Flex>
            </Box>

            <Separator size="4" />

            {/* ===== ZOOM/SCALING ===== */}
            <Box>
              <Heading size="3" mb="3">
                Zoom: {themeConfig.scaling}
              </Heading>
              <Flex direction="column" gap="2">
                <Slider
                  value={[parseInt(themeConfig.scaling)]}
                  onValueChange={([value]) => updateThemeConfig('scaling', `${value}%`)}
                  min={90}
                  max={110}
                  step={5}
                />
                <Flex justify="between">
                  <Text size="1" color="gray">
                    90%
                  </Text>
                  <Text size="1" color="gray">
                    110%
                  </Text>
                </Flex>
              </Flex>
            </Box>

            <Separator size="4" />

            {/* ===== LAYOUT OPTIONS ===== */}
            <Box>
              <Heading size="3" mb="3">
                Opciones de Layout
              </Heading>
              <Flex direction="column" gap="4">
                {/* Navbar Sticky */}
                <Flex justify="between" align="center">
                  <Flex direction="column" gap="1">
                    <Text weight="medium">Navbar Fijo</Text>
                    <Text size="1" color="gray">
                      Mantener navbar visible al hacer scroll
                    </Text>
                  </Flex>
                  <Switch
                    checked={themeConfig.navbarSticky}
                    onCheckedChange={(checked) => updateThemeConfig('navbarSticky', checked)}
                  />
                </Flex>

                {/* Sidebar Width */}
                <Box>
                  <Text weight="medium" mb="2">
                    Ancho Sidebar: {themeConfig.sidebarWidth}px
                  </Text>
                  <Flex direction="column" gap="2">
                    <Slider
                      value={[themeConfig.sidebarWidth]}
                      onValueChange={([value]) => updateThemeConfig('sidebarWidth', value)}
                      min={240}
                      max={400}
                      step={20}
                    />
                    <Flex justify="between">
                      <Text size="1" color="gray">
                        240px
                      </Text>
                      <Text size="1" color="gray">
                        400px
                      </Text>
                    </Flex>
                  </Flex>
                </Box>

                {/* Content Width */}
                <Box>
                  <Text weight="medium" mb="2">
                    Ancho del Contenido
                  </Text>
                  <RadioGroup.Root
                    value={themeConfig.contentWidth}
                    onValueChange={(value) => updateThemeConfig('contentWidth', value)}
                  >
                    <Flex gap="4">
                      <Flex asChild align="center" gap="2">
                        <label>
                          <RadioGroup.Item value="boxed" />
                          <Text>Contenedor (Boxed)</Text>
                        </label>
                      </Flex>
                      <Flex asChild align="center" gap="2">
                        <label>
                          <RadioGroup.Item value="full" />
                          <Text>Completo (Full)</Text>
                        </label>
                      </Flex>
                    </Flex>
                  </RadioGroup.Root>
                </Box>

                {/* Footer Type */}
                <Box>
                  <Text weight="medium" mb="2">
                    Tipo de Footer
                  </Text>
                  <Select.Root
                    value={themeConfig.footerType}
                    onValueChange={(value) => updateThemeConfig('footerType', value)}
                  >
                    <Select.Trigger style={{ width: '100%' }} />
                    <Select.Content>
                      <Select.Item value="static">Estático</Select.Item>
                      <Select.Item value="sticky">Pegajoso (Sticky)</Select.Item>
                      <Select.Item value="hidden">Oculto</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Box>
              </Flex>
            </Box>
          </Flex>

          {/* Actions */}
          <Flex gap="3" mt="6" justify="end">
            <Button variant="soft" color="red" onClick={resetThemeConfig}>
              Restablecer
            </Button>
            <Button onClick={() => setOpen(false)}>Cerrar</Button>
          </Flex>

          {/* Keyboard Hint */}
          <Box mt="4" p="3" style={{ background: 'var(--accent-3)', borderRadius: 'var(--radius-3)' }}>
            <Text size="2">
              <strong>Tip:</strong> Presiona <kbd style={{
                background: 'var(--accent-9)',
                color: 'white',
                padding: '2px 6px',
                borderRadius: 'var(--radius-2)',
                fontWeight: 'bold'
              }}>T</kbd> para abrir este panel
            </Text>
          </Box>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
