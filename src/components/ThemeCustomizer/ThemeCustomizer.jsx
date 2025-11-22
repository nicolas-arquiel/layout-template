import { useState, useEffect } from 'react'
import { Settings, Sliders, Sun, Moon, X } from 'react-feather'
import {
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
  ScrollArea,
} from '@radix-ui/themes'
import { useThemeConfig } from '../../App'

/**
 * Theme Customizer Component como Canvas lateral
 * Panel deslizable desde la derecha para personalizar el tema
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
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [open])

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
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50,
          borderRadius: 'var(--radius-3) 0 0 var(--radius-3)',
          boxShadow: 'var(--shadow-5)',
        }}
        title="Personalización del Tema (Presiona T)"
      >
        <Settings size={18} />
      </Button>

      {/* Canvas Offcanvas Container */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {/* Backdrop */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: open ? 1 : 0,
            transition: 'opacity 300ms ease-in-out',
          }}
          onClick={() => setOpen(false)}
        />

        {/* Canvas Panel */}
        <div
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            height: '100%',
            width: '400px',
            backgroundColor: 'var(--color-background)',
            transform: open ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 300ms ease-in-out',
            boxShadow: 'var(--shadow-6)',
            borderLeft: '1px solid var(--gray-6)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <Flex
            align="center"
            justify="between"
            p="4"
            style={{
              borderBottom: '1px solid var(--gray-6)',
              minHeight: '64px',
            }}
          >
            <Flex align="center" gap="2">
              <Sliders size={22} />
              <Heading size="5">Personalizar Tema</Heading>
            </Flex>
            <Button variant="ghost" onClick={() => setOpen(false)} style={{ cursor: 'pointer' }}>
              <X size={20} />
            </Button>
          </Flex>

          {/* Scrollable Content */}
          <ScrollArea style={{ flex: 1 }}>
            <Box p="5">
              <Flex direction="column" gap="5">
                {/* Descripción */}
                <Text size="2" color="gray">
                  Personaliza la apariencia completa de la aplicación. Presiona <strong>T</strong>{' '}
                  para abrir este panel en cualquier momento.
                </Text>

                <Separator size="4" />

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
                        <label style={{ cursor: 'pointer' }}>
                          <RadioGroup.Item value="light" />
                          <Flex align="center" gap="2">
                            <Sun size={16} />
                            <Text>Claro</Text>
                          </Flex>
                        </label>
                      </Flex>
                      <Flex asChild align="center" gap="2">
                        <label style={{ cursor: 'pointer' }}>
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
                          minWidth: '70px',
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
                    Bordes: <strong>{themeConfig.radius}</strong>
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
                        None
                      </Text>
                      <Text size="1" color="gray">
                        Full
                      </Text>
                    </Flex>
                  </Flex>
                </Box>

                <Separator size="4" />

                {/* ===== ZOOM/SCALING ===== */}
                <Box>
                  <Heading size="3" mb="3">
                    Zoom: <strong>{themeConfig.scaling}</strong>
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
                          Mantener navbar visible al scroll
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
                        Ancho Sidebar: <strong>{themeConfig.sidebarWidth}px</strong>
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
                        <Flex direction="column" gap="2">
                          <Flex asChild align="center" gap="2">
                            <label style={{ cursor: 'pointer' }}>
                              <RadioGroup.Item value="boxed" />
                              <Text>Contenedor (Boxed)</Text>
                            </label>
                          </Flex>
                          <Flex asChild align="center" gap="2">
                            <label style={{ cursor: 'pointer' }}>
                              <RadioGroup.Item value="full" />
                              <Text>Completo (Full Width)</Text>
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

                <Separator size="4" />

                {/* Actions */}
                <Flex gap="3" direction="column">
                  <Button variant="soft" color="red" onClick={resetThemeConfig} size="3">
                    Restablecer Valores
                  </Button>
                  <Button onClick={() => setOpen(false)} size="3">
                    Cerrar Panel
                  </Button>
                </Flex>

                {/* Keyboard Hint */}
                <Box
                  p="3"
                  style={{ background: 'var(--accent-3)', borderRadius: 'var(--radius-3)' }}
                >
                  <Text size="2">
                    💡 <strong>Tip:</strong> Presiona{' '}
                    <kbd
                      style={{
                        background: 'var(--accent-9)',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-2)',
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                      }}
                    >
                      T
                    </kbd>{' '}
                    para abrir este panel
                  </Text>
                </Box>
              </Flex>
            </Box>
          </ScrollArea>
        </div>
      </div>
    </>
  )
}
