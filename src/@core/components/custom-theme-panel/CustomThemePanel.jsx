import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Flex, Text, Select, Separator, IconButton, Tooltip, Grid, Button, ScrollArea, Switch } from '@radix-ui/themes'
import { Settings, X, Moon, Sun, Monitor } from 'lucide-react'
import { setMenuLayout } from '@src/store/layoutSlice'
import { useTheme } from '@src/hooks/useTheme'

// Opciones de configuración de Radix
const accentColors = ['tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'brown', 'orange', 'sky', 'mint', 'lime', 'yellow', 'amber', 'gold', 'bronze', 'gray']
const grayColors = ['auto', 'gray', 'mauve', 'slate', 'sage', 'olive', 'sand']
const radii = ['none', 'small', 'medium', 'large', 'full']
const scalings = ['90%', '95%', '100%', '105%', '110%']

// Colores disponibles para semánticos
const successColors = ['green', 'teal', 'jade', 'grass', 'mint']
const dangerColors = ['red', 'tomato', 'ruby', 'crimson']
const warningColors = ['amber', 'yellow', 'orange', 'gold']
const infoColors = ['cyan', 'blue', 'sky', 'iris']



/**
 * CustomThemePanel - Panel de configuración unificado
 * Reemplaza al ThemePanel de Radix y agrega configuraciones personalizadas
 */
const CustomThemePanel = () => {
  const { themeSettings: settings, updateTheme: onUpdate } = useTheme()
  const dispatch = useDispatch()
  const menuLayout = useSelector((state) => state.layout.menuLayout)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  
  const [isOpen, setIsOpen] = useState(false)
  
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem('reduced-motion') === 'true')
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('high-contrast') === 'true')
  const [sepiaMode, setSepiaMode] = useState(() => localStorage.getItem('sepia-mode') === 'true')
  const [grayscaleMode, setGrayscaleMode] = useState(() => localStorage.getItem('grayscale-mode') === 'true')
  const [textSpacing, setTextSpacing] = useState(() => localStorage.getItem('dyslexic-spacing') === 'true')
  const [bigCursor, setBigCursor] = useState(() => localStorage.getItem('big-cursor') === 'true')
  const [underlineLinks, setUnderlineLinks] = useState(() => localStorage.getItem('underline-links') === 'true')

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      // Si es mobile y está en horizontal, forzar vertical
      if (mobile && menuLayout === 'horizontal') {
        dispatch(setMenuLayout('vertical'))
      }
    }

    window.addEventListener('resize', handleResize)
    
    // Check inicial
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [menuLayout, dispatch])

  // Aplicar clases al montar y cuando cambien
  useEffect(() => {
    if (reducedMotion) document.documentElement.classList.add('reduce-motion')
    else document.documentElement.classList.remove('reduce-motion')

    if (highContrast) document.documentElement.classList.add('high-contrast')
    else document.documentElement.classList.remove('high-contrast')

    if (sepiaMode) document.documentElement.classList.add('sepia-mode')
    else document.documentElement.classList.remove('sepia-mode')

    if (grayscaleMode) document.documentElement.classList.add('grayscale-mode')
    else document.documentElement.classList.remove('grayscale-mode')

    if (textSpacing) document.documentElement.classList.add('dyslexic-spacing')
    else document.documentElement.classList.remove('dyslexic-spacing')

    if (bigCursor) document.documentElement.classList.add('big-cursor')
    else document.documentElement.classList.remove('big-cursor')

    if (underlineLinks) document.documentElement.classList.add('underline-links')
    else document.documentElement.classList.remove('underline-links')
  }, [reducedMotion, highContrast, sepiaMode, grayscaleMode, textSpacing, bigCursor, underlineLinks])

  const toggleMotion = (checked) => {
    setReducedMotion(checked)
    localStorage.setItem('reduced-motion', checked)
    if (checked) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
  }

  const toggleContrast = (checked) => {
    setHighContrast(checked)
    localStorage.setItem('high-contrast', checked)
    if (checked) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }

  const toggleSepia = (checked) => {
    setSepiaMode(checked)
    localStorage.setItem('sepia-mode', checked)
    if (checked) {
      document.documentElement.classList.add('sepia-mode')
    } else {
      document.documentElement.classList.remove('sepia-mode')
    }
  }

  const toggleGrayscale = (checked) => {
    setGrayscaleMode(checked)
    localStorage.setItem('grayscale-mode', checked)
    if (checked) {
      document.documentElement.classList.add('grayscale-mode')
    } else {
      document.documentElement.classList.remove('grayscale-mode')
    }
  }

  const toggleSpacing = (checked) => {
    setTextSpacing(checked)
    localStorage.setItem('dyslexic-spacing', checked)
    if (checked) {
      document.documentElement.classList.add('dyslexic-spacing')
    } else {
      document.documentElement.classList.remove('dyslexic-spacing')
    }
  }

  const toggleCursor = (checked) => {
    setBigCursor(checked)
    localStorage.setItem('big-cursor', checked)
    if (checked) {
      document.documentElement.classList.add('big-cursor')
    } else {
      document.documentElement.classList.remove('big-cursor')
    }
  }

  const toggleLinks = (checked) => {
    setUnderlineLinks(checked)
    localStorage.setItem('underline-links', checked)
    if (checked) {
      document.documentElement.classList.add('underline-links')
    } else {
      document.documentElement.classList.remove('underline-links')
    }
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
          <Settings size={20} />
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
          <X />
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
                <Sun /> Light
              </Button>
              <Button 
                variant={settings.appearance === 'dark' ? 'solid' : 'soft'} 
                onClick={() => onUpdate('appearance', 'dark')}
                style={{ justifyContent: 'center' }}
              >
                <Moon /> Dark
              </Button>
              <Button 
                variant={settings.appearance === 'inherit' ? 'solid' : 'soft'} 
                onClick={() => onUpdate('appearance', 'inherit')}
                style={{ justifyContent: 'center' }}
              >
                <Monitor /> Auto
              </Button>
            </Grid>
          </Flex>

          <Separator size="4" />

          {/* 2. Layout del Menú */}
          <Flex direction="column" gap="2">
            <Text size="1" weight="bold" color="gray">LAYOUT DEL MENÚ</Text>
            <Grid columns="2" gap="2">
              <Button 
                variant={menuLayout === 'vertical' ? 'solid' : 'soft'} 
                onClick={() => dispatch(setMenuLayout('vertical'))}
                style={{ justifyContent: 'center' }}
              >
                Vertical (Sidebar)
              </Button>
              
              <Tooltip content={isMobile ? "No disponible en móviles" : "Barra de navegación superior"}>
                <Button 
                  variant={menuLayout === 'horizontal' ? 'solid' : 'soft'} 
                  onClick={() => !isMobile && dispatch(setMenuLayout('horizontal'))}
                  disabled={isMobile}
                  style={{ 
                    justifyContent: 'center',
                    opacity: isMobile ? 0.5 : 1,
                    cursor: isMobile ? 'not-allowed' : 'pointer'
                  }}
                >
                  Horizontal (Navbar)
                </Button>
              </Tooltip>
            </Grid>
          </Flex>

          <Separator size="4" />

          {/* 3. Color de Acento */}
          <Flex direction="column" gap="2">
            <Text size="1" weight="bold" color="gray">COLOR DE ACENTO (PRIMARY)</Text>
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

          <Separator size="4" />

          {/* 3.5 Colores Semánticos */}
          <Flex direction="column" gap="3">
            <Text size="1" weight="bold" color="gray">COLORES SEMÁNTICOS</Text>
            
            {/* Success */}
            <Flex direction="column" gap="1">
               <Text size="1">Success</Text>
               <Grid columns="5" gap="1">
                  {successColors.map(color => (
                    <Tooltip content={color} key={color}>
                      <button
                        onClick={() => onUpdate('successColor', color)}
                        style={{
                          width: '100%',
                          height: '24px',
                          borderRadius: 'var(--radius-1)',
                          backgroundColor: `var(--${color}-9)`,
                          border: settings.successColor === color ? '2px solid var(--color-text)' : 'none',
                          cursor: 'pointer'
                        }}
                      />
                    </Tooltip>
                  ))}
               </Grid>
            </Flex>

            {/* Danger */}
            <Flex direction="column" gap="1">
               <Text size="1">Danger</Text>
               <Grid columns="5" gap="1">
                  {dangerColors.map(color => (
                    <Tooltip content={color} key={color}>
                      <button
                        onClick={() => onUpdate('dangerColor', color)}
                        style={{
                          width: '100%',
                          height: '24px',
                          borderRadius: 'var(--radius-1)',
                          backgroundColor: `var(--${color}-9)`,
                          border: settings.dangerColor === color ? '2px solid var(--color-text)' : 'none',
                          cursor: 'pointer'
                        }}
                      />
                    </Tooltip>
                  ))}
               </Grid>
            </Flex>

            {/* Warning */}
            <Flex direction="column" gap="1">
               <Text size="1">Warning</Text>
               <Grid columns="5" gap="1">
                  {warningColors.map(color => (
                    <Tooltip content={color} key={color}>
                      <button
                        onClick={() => onUpdate('warningColor', color)}
                        style={{
                          width: '100%',
                          height: '24px',
                          borderRadius: 'var(--radius-1)',
                          backgroundColor: `var(--${color}-9)`,
                          border: settings.warningColor === color ? '2px solid var(--color-text)' : 'none',
                          cursor: 'pointer'
                        }}
                      />
                    </Tooltip>
                  ))}
               </Grid>
            </Flex>

            {/* Info */}
            <Flex direction="column" gap="1">
               <Text size="1">Info</Text>
               <Grid columns="5" gap="1">
                  {infoColors.map(color => (
                    <Tooltip content={color} key={color}>
                      <button
                        onClick={() => onUpdate('infoColor', color)}
                        style={{
                          width: '100%',
                          height: '24px',
                          borderRadius: 'var(--radius-1)',
                          backgroundColor: `var(--${color}-9)`,
                          border: settings.infoColor === color ? '2px solid var(--color-text)' : 'none',
                          cursor: 'pointer'
                        }}
                      />
                    </Tooltip>
                  ))}
               </Grid>
            </Flex>
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

          <Separator size="4" />

          {/* 5. Accesibilidad Funcional */}
          <Flex direction="column" gap="4">
            <Text size="1" weight="bold" color="indigo">ACCESIBILIDAD</Text>
            
            {/* Reducción de Movimiento */}
            <Flex justify="between" align="center">
              <Flex direction="column">
                <Text size="2">Reducir Movimiento</Text>
                <Text size="1" color="gray">Desactiva animaciones</Text>
              </Flex>
              <Switch checked={reducedMotion} onCheckedChange={toggleMotion} />
            </Flex>

            {/* Alto Contraste */}
            <Flex justify="between" align="center">
              <Flex direction="column">
                <Text size="2">Alto Contraste</Text>
                <Text size="1" color="gray">Aumenta legibilidad</Text>
              </Flex>
              <Switch checked={highContrast} onCheckedChange={toggleContrast} />
            </Flex>

            {/* Modo Lectura (Sepia) */}
            <Flex justify="between" align="center">
              <Flex direction="column">
                <Text size="2">Modo Lectura</Text>
                <Text size="1" color="gray">Filtro cálido (Sepia)</Text>
              </Flex>
              <Switch checked={sepiaMode} onCheckedChange={toggleSepia} />
            </Flex>

            {/* Modo Enfoque (Grayscale) */}
            <Flex justify="between" align="center">
              <Flex direction="column">
                <Text size="2">Modo Enfoque</Text>
                <Text size="1" color="gray">Escala de grises</Text>
              </Flex>
              <Switch checked={grayscaleMode} onCheckedChange={toggleGrayscale} />
            </Flex>

            {/* Espaciado Texto */}
            <Flex justify="between" align="center">
              <Flex direction="column">
                <Text size="2">Espaciado Texto</Text>
                <Text size="1" color="gray">Mejora lectura (Dislexia)</Text>
              </Flex>
              <Switch checked={textSpacing} onCheckedChange={toggleSpacing} />
            </Flex>

            {/* Cursor Grande */}
            <Flex justify="between" align="center">
              <Flex direction="column">
                <Text size="2">Cursor Grande</Text>
                <Text size="1" color="gray">Puntero más visible</Text>
              </Flex>
              <Switch checked={bigCursor} onCheckedChange={toggleCursor} />
            </Flex>

            {/* Enlaces Subrayados */}
            <Flex justify="between" align="center">
              <Flex direction="column">
                <Text size="2">Subrayar Enlaces</Text>
                <Text size="1" color="gray">Identificar links</Text>
              </Flex>
              <Switch checked={underlineLinks} onCheckedChange={toggleLinks} />
            </Flex>
          </Flex>

        </Flex>
      </ScrollArea>
    </Card>
  )
}

export default CustomThemePanel
