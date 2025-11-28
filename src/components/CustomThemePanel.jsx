import React, { useState, useEffect } from 'react'
import { Card, Flex, Text, Select, Separator, IconButton, Tooltip, Grid, Button, ScrollArea, Switch, Slider } from '@radix-ui/themes'
import { GearIcon, Cross2Icon, MoonIcon, SunIcon, DesktopIcon } from '@radix-ui/react-icons'

// Opciones de configuración de Radix
const accentColors = ['tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'brown', 'orange', 'sky', 'mint', 'lime', 'yellow', 'amber', 'gold', 'bronze', 'gray']
const grayColors = ['auto', 'gray', 'mauve', 'slate', 'sage', 'olive', 'sand']
const radii = ['none', 'small', 'medium', 'large', 'full']
const scalings = ['90%', '95%', '100%', '105%', '110%']

/**
 * CustomThemePanel - Panel de configuración unificado
 * Reemplaza al ThemePanel de Radix y agrega configuraciones personalizadas
 */
const CustomThemePanel = ({ settings, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [navFontWeight, setNavFontWeight] = useState('500')

  // Cargar valores guardados al montar
  useEffect(() => {
    // Peso de fuente
    const savedWeight = localStorage.getItem('nav-font-weight')
    if (savedWeight) {
      setNavFontWeight(savedWeight)
      document.documentElement.style.setProperty('--nav-item-font-weight', savedWeight)
    }
  }, [])

  const handleNavFontWeightChange = (value) => {
    setNavFontWeight(value)
    document.documentElement.style.setProperty('--nav-item-font-weight', value)
    localStorage.setItem('nav-font-weight', value)
  }

  if (!isOpen) {
    return (
      <Tooltip content="Configuración del Tema">
        <IconButton 
          size="3" 
          radius="full" 
          onClick={() => setIsOpen(true)}
          style={{ 
            position: 'fixed', 
            bottom: '20px', 
            right: '20px', 
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <GearIcon width="20" height="20" />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Card 
      size="2" 
      style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        zIndex: 9999,
        width: '320px',
        maxHeight: '80vh',
        animation: 'fade-in 0.2s ease-out',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Flex justify="between" align="center" p="3" style={{ borderBottom: '1px solid var(--gray-5)' }}>
        <Text size="2" weight="bold">Configuración del Tema</Text>
        <IconButton size="1" variant="ghost" onClick={() => setIsOpen(false)}>
          <Cross2Icon />
        </IconButton>
      </Flex>

      {/* Content Scrollable */}
      <ScrollArea type="hover" scrollbars="vertical" style={{ height: '100%', maxHeight: 'calc(80vh - 50px)' }}>
        <Flex direction="column" gap="4" p="3">
          
          {/* 1. Modo (Appearance) */}
          <Flex direction="column" gap="2">
            <Text size="1" weight="bold" color="gray">MODO</Text>
            <Grid columns="3" gap="2">
              <Button 
                variant={settings.appearance === 'light' ? 'solid' : 'soft'} 
                onClick={() => onUpdate('appearance', 'light')}
                style={{ justifyContent: 'center' }}
              >
                <SunIcon /> Light
              </Button>
              <Button 
                variant={settings.appearance === 'dark' ? 'solid' : 'soft'} 
                onClick={() => onUpdate('appearance', 'dark')}
                style={{ justifyContent: 'center' }}
              >
                <MoonIcon /> Dark
              </Button>
              <Button 
                variant={settings.appearance === 'inherit' ? 'solid' : 'soft'} 
                onClick={() => onUpdate('appearance', 'inherit')}
                style={{ justifyContent: 'center' }}
              >
                <DesktopIcon /> Auto
              </Button>
            </Grid>
          </Flex>

          <Separator size="4" />

          {/* 2. Color de Acento */}
          <Flex direction="column" gap="2">
            <Text size="1" weight="bold" color="gray">COLOR DE ACENTO</Text>
            <Grid columns="6" gap="1">
              {accentColors.map(color => (
                <Tooltip content={color} key={color}>
                  <button
                    onClick={() => onUpdate('accentColor', color)}
                    style={{
                      width: '100%',
                      paddingTop: '100%', // Aspect ratio 1:1
                      borderRadius: 'var(--radius-1)',
                      backgroundColor: `var(--${color}-9)`,
                      border: settings.accentColor === color ? '2px solid var(--color-text)' : 'none',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  />
                </Tooltip>
              ))}
            </Grid>
          </Flex>

          {/* 3. Color Gris */}
          <Flex direction="column" gap="2">
            <Text size="1" weight="bold" color="gray">ESCALA DE GRISES</Text>
            <Select.Root value={settings.grayColor} onValueChange={(val) => onUpdate('grayColor', val)}>
              <Select.Trigger />
              <Select.Content>
                {grayColors.map(gray => (
                  <Select.Item key={gray} value={gray}>{gray.charAt(0).toUpperCase() + gray.slice(1)}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>

          <Separator size="4" />

          {/* 4. Radio y Escala */}
          <Grid columns="2" gap="3">
            <Flex direction="column" gap="2">
              <Text size="1" weight="bold" color="gray">RADIO</Text>
              <Select.Root value={settings.radius} onValueChange={(val) => onUpdate('radius', val)}>
                <Select.Trigger />
                <Select.Content>
                  {radii.map(r => (
                    <Select.Item key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="1" weight="bold" color="gray">ESCALA</Text>
              <Select.Root value={settings.scaling} onValueChange={(val) => onUpdate('scaling', val)}>
                <Select.Trigger />
                <Select.Content>
                  {scalings.map(s => (
                    <Select.Item key={s} value={s}>{s}</Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>
          </Grid>

          {/* 5. Panel Background */}
          <Flex justify="between" align="center">
            <Text size="1" weight="bold" color="gray">PANEL TRANSLÚCIDO</Text>
            <Switch 
              checked={settings.panelBackground === 'translucent'} 
              onCheckedChange={(checked) => onUpdate('panelBackground', checked ? 'translucent' : 'solid')} 
            />
          </Flex>

          <Separator size="4" />

          {/* 6. Personalización de Navegación (TU AGREGADO) */}
          <Flex direction="column" gap="4">
            <Text size="1" weight="bold" color="indigo">PERSONALIZACIÓN AVANZADA</Text>
            
            {/* Peso de Fuente */}
            <Flex justify="between" align="center">
              <Text size="2">Peso de Fuente (Nav)</Text>
              <Select.Root value={navFontWeight} onValueChange={handleNavFontWeightChange}>
                <Select.Trigger variant="soft" color="indigo" />
                <Select.Content>
                  <Select.Item value="400">Normal (400)</Select.Item>
                  <Select.Item value="500">Medium (500)</Select.Item>
                  <Select.Item value="600">Semibold (600)</Select.Item>
                  <Select.Item value="700">Bold (700)</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            {/* Nivel de Traslucidez - Solo si está activo */}
            {settings.panelBackground === 'translucent' && (
              <Flex direction="column" gap="2">
                <Flex justify="between" align="center">
                  <Text size="2">Nivel de Traslucidez</Text>
                  <Text size="1" color="gray">{Math.round((settings.glassOpacity || 0.75) * 100)}%</Text>
                </Flex>
                <Slider 
                  defaultValue={[settings.glassOpacity || 0.75]} 
                  min={0.1} 
                  max={0.95} 
                  step={0.05} 
                  onValueChange={(val) => onUpdate('glassOpacity', val[0])} 
                />
              </Flex>
            )}
          </Flex>

        </Flex>
      </ScrollArea>
    </Card>
  )
}

export default CustomThemePanel
