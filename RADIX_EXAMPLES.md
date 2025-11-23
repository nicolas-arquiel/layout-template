# 🎨 Guía de Uso: Radix Themes

Este proyecto usa **Radix Themes** para todos los componentes de UI, combinado con **Tailwind CSS** para utilidades.

## 📦 Componentes Disponibles

### Layout Components

- **Container** - Limita el ancho del contenido
- **Grid** - Sistema de grid CSS responsive
- **Flex** - Flexbox con props responsive
- **Box** - Div base con todas las props de layout
- **Section** - Sección con padding predefinido

### UI Components

- **Card** - Cards con box-shadow (estilo Vuexy, sin border)
- **Button** - Botones con variants
- **Text** - Textos con sizes y weights
- **Heading** - Headings (h1-h6)
- **Avatar** - Avatares con fallback
- **Badge** - Badges para notificaciones
- **Separator** - Líneas divisoras
- **Tooltip** - Tooltips accesibles
- **DropdownMenu** - Menús desplegables
- **Dialog** - Modales/Dialogs
- **Tabs** - Pestañas
- **Table** - Tablas

## 🎯 Ejemplos de Uso

### 1. Layout Básico con Grid Responsive

```jsx
import { Container, Grid, Box, Card } from '@radix-ui/themes'

function MyPage() {
  return (
    <Container size="4" px={{ initial: '4', md: '6' }}>
      {/* Grid: 1 columna móvil, 2 tablet, 3 desktop */}
      <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="4">
        <Box>
          <Card>Contenido 1</Card>
        </Box>
        <Box>
          <Card>Contenido 2</Card>
        </Box>
        <Box>
          <Card>Contenido 3</Card>
        </Box>
      </Grid>
    </Container>
  )
}
```

**Breakpoints de Radix:**
- `initial` - 0px (mobile)
- `xs` - 520px
- `sm` - 768px
- `md` - 1024px
- `lg` - 1280px
- `xl` - 1640px

### 2. Card con Box-Shadow (Vuexy Style)

```jsx
import { Card, Flex, Text, Heading } from '@radix-ui/themes'

function StatsCard() {
  return (
    <Card>
      {/* El box-shadow se aplica automáticamente por CSS */}
      <Flex direction="column" gap="2">
        <Text size="2" color="gray">Total Usuarios</Text>
        <Heading size="6">2,543</Heading>
      </Flex>
    </Card>
  )
}
```

**Estilos aplicados automáticamente:**
- ✅ Box-shadow: `0 4px 24px 0 rgba(34, 41, 47, 0.1)`
- ✅ Sin border
- ✅ Border-radius: `0.428rem`
- ✅ Padding: `1.5rem`
- ✅ Margin-bottom: `2rem`

### 3. Grid con Diferentes Layouts

```jsx
import { Grid, Box } from '@radix-ui/themes'

// Grid de 4 columnas iguales
<Grid columns="4" gap="4">
  <Box>Col 1</Box>
  <Box>Col 2</Box>
  <Box>Col 3</Box>
  <Box>Col 4</Box>
</Grid>

// Grid con columnas de tamaño específico
<Grid columns="1fr 2fr 1fr" gap="4">
  <Box>Sidebar</Box>
  <Box>Main Content</Box>
  <Box>Sidebar</Box>
</Grid>

// Grid responsive complejo
<Grid
  columns={{
    initial: '1',      // 1 col en móvil
    sm: '2',          // 2 cols en tablet
    md: '3',          // 3 cols en desktop
    lg: '4'           // 4 cols en pantallas grandes
  }}
  gap={{
    initial: '3',     // Gap pequeño en móvil
    md: '4'           // Gap más grande en desktop
  }}
>
  {/* Contenido */}
</Grid>
```

### 4. Flex Layout

```jsx
import { Flex, Box, Text } from '@radix-ui/themes'

// Horizontal layout
<Flex align="center" justify="between" gap="4">
  <Text>Izquierda</Text>
  <Text>Derecha</Text>
</Flex>

// Vertical layout
<Flex direction="column" gap="3">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Flex>

// Responsive direction
<Flex
  direction={{ initial: 'column', md: 'row' }}
  gap="4"
>
  <Box>Vertical en móvil, horizontal en desktop</Box>
</Flex>
```

### 5. Container con Diferentes Tamaños

```jsx
import { Container } from '@radix-ui/themes'

// Container pequeño (max-width: 448px)
<Container size="1">
  Contenido estrecho
</Container>

// Container mediano (max-width: 688px)
<Container size="2">
  Contenido mediano
</Container>

// Container grande (max-width: 1136px)
<Container size="4">
  Contenido ancho (RECOMENDADO para la app)
</Container>
```

### 6. Tipografía con Text y Heading

```jsx
import { Text, Heading } from '@radix-ui/themes'

// Headings
<Heading size="8">Título Principal</Heading>
<Heading size="6">Título Sección</Heading>
<Heading size="4">Subtítulo</Heading>

// Text con diferentes tamaños y pesos
<Text size="3" weight="medium">Texto mediano</Text>
<Text size="2" color="gray">Texto secundario</Text>
<Text size="1" color="gray">Texto pequeño</Text>

// Text con responsive size
<Text size={{ initial: '2', md: '3' }}>
  Tamaño responsive
</Text>
```

### 7. Botones con Radix

```jsx
import { Button, Flex } from '@radix-ui/themes'

<Flex gap="3">
  <Button variant="solid" color="blue">
    Guardar
  </Button>

  <Button variant="soft" color="gray">
    Cancelar
  </Button>

  <Button variant="ghost" color="red">
    Eliminar
  </Button>
</Flex>
```

**Variants disponibles:**
- `solid` - Fondo sólido
- `soft` - Fondo suave
- `surface` - Estilo superficie
- `outline` - Solo borde
- `ghost` - Transparente

### 8. Avatar con Fallback

```jsx
import { Avatar, Flex } from '@radix-ui/themes'

<Flex gap="3" align="center">
  <Avatar
    size="3"
    src="https://example.com/avatar.jpg"
    fallback="JD"
    color="blue"
  />
  <Avatar
    size="2"
    fallback="MG"
    color="green"
  />
</Flex>
```

### 9. Badge para Notificaciones

```jsx
import { Badge, Flex } from '@radix-ui/themes'

<Flex gap="2">
  <Badge color="blue" variant="soft">Nuevo</Badge>
  <Badge color="green" variant="solid">Activo</Badge>
  <Badge color="red" variant="surface">Urgente</Badge>
</Flex>
```

### 10. DropdownMenu (Ya usado en Navbar)

```jsx
import { DropdownMenu, Button } from '@radix-ui/themes'

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="soft">
      Opciones
    </Button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Content>
    <DropdownMenu.Item>Editar</DropdownMenu.Item>
    <DropdownMenu.Item>Duplicar</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item color="red">Eliminar</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### 11. Dialog (Modal)

```jsx
import { Dialog, Button, Flex } from '@radix-ui/themes'

<Dialog.Root>
  <Dialog.Trigger>
    <Button>Abrir Modal</Button>
  </Dialog.Trigger>

  <Dialog.Content style={{ maxWidth: 450 }}>
    <Dialog.Title>Editar Perfil</Dialog.Title>
    <Dialog.Description>
      Modifica tu información personal
    </Dialog.Description>

    {/* Contenido del formulario */}

    <Flex gap="3" mt="4" justify="end">
      <Dialog.Close>
        <Button variant="soft" color="gray">
          Cancelar
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button>Guardar</Button>
      </Dialog.Close>
    </Flex>
  </Dialog.Content>
</Dialog.Root>
```

### 12. Tabs

```jsx
import { Tabs, Box, Text } from '@radix-ui/themes'

<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Información</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Configuración</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Notificaciones</Tabs.Trigger>
  </Tabs.List>

  <Box pt="3">
    <Tabs.Content value="tab1">
      <Text>Contenido de Información</Text>
    </Tabs.Content>

    <Tabs.Content value="tab2">
      <Text>Contenido de Configuración</Text>
    </Tabs.Content>

    <Tabs.Content value="tab3">
      <Text>Contenido de Notificaciones</Text>
    </Tabs.Content>
  </Box>
</Tabs.Root>
```

### 13. Table

```jsx
import { Table } from '@radix-ui/themes'

<Table.Root variant="surface">
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    <Table.Row>
      <Table.RowHeaderCell>Juan Pérez</Table.RowHeaderCell>
      <Table.Cell>juan@example.com</Table.Cell>
      <Table.Cell>
        <Badge color="green">Activo</Badge>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.RowHeaderCell>María García</Table.RowHeaderCell>
      <Table.Cell>maria@example.com</Table.Cell>
      <Table.Cell>
        <Badge color="gray">Inactivo</Badge>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

### 14. Tooltip

```jsx
import { Tooltip, IconButton } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'

<Tooltip content="Información adicional">
  <IconButton variant="ghost">
    <InfoCircledIcon />
  </IconButton>
</Tooltip>
```

### 15. Separator

```jsx
import { Separator, Box } from '@radix-ui/themes'

<Box>
  <Text>Sección 1</Text>
  <Separator my="3" size="4" />
  <Text>Sección 2</Text>
</Box>
```

## 🎨 Props Comunes de Layout

### Spacing Props (Margin y Padding)

Todos los componentes de layout aceptan:

```jsx
// Margin
m="4"    // margin all sides
mx="4"   // margin horizontal (left + right)
my="4"   // margin vertical (top + bottom)
mt="4"   // margin top
mr="4"   // margin right
mb="4"   // margin bottom
ml="4"   // margin left

// Padding
p="4"    // padding all sides
px="4"   // padding horizontal
py="4"   // padding vertical
pt="4"   // padding top
pr="4"   // padding right
pb="4"   // padding bottom
pl="4"   // padding left

// Responsive spacing
px={{ initial: '4', md: '6' }}
```

**Escala de spacing (1-9):**
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `5` = 24px
- `6` = 32px
- `7` = 40px
- `8` = 48px
- `9` = 64px

### Width y Height

```jsx
<Box width="100px" height="200px">...</Box>
<Box minWidth="300px" maxWidth="600px">...</Box>

// Con Tailwind
<Box className="w-full h-screen">...</Box>
```

## 🌈 Colores

Radix Themes usa un sistema de colores con variables CSS:

```jsx
// Colores disponibles
color="blue" | "green" | "red" | "orange" | "purple" | "pink" | "gray" | ...

// Usar en componentes
<Text color="blue">Texto azul</Text>
<Badge color="green">Badge verde</Badge>
<Button color="red">Botón rojo</Button>

// Acceder a variables CSS
style={{ color: 'var(--blue-9)' }}
style={{ backgroundColor: 'var(--green-3)' }}
```

## 📱 Responsive Design

Todos los props de layout soportan valores responsive:

```jsx
<Box
  display={{ initial: 'none', md: 'block' }}
  p={{ initial: '2', sm: '3', md: '4', lg: '5' }}
  width={{ initial: '100%', md: '50%' }}
>
  Contenido responsive
</Box>
```

## 🎯 Ejemplo Completo: Página con Todo

```jsx
import {
  Container, Grid, Box, Card,
  Flex, Text, Heading, Button,
  Avatar, Badge, Separator
} from '@radix-ui/themes'

function CompleteExample() {
  return (
    <Container size="4" px={{ initial: '4', md: '6' }} py="6">
      {/* Header */}
      <Flex align="center" justify="between" mb="6">
        <Flex align="center" gap="3">
          <Avatar size="3" fallback="JD" color="blue" />
          <Box>
            <Heading size="5">Juan Doe</Heading>
            <Text size="2" color="gray">juan@example.com</Text>
          </Box>
        </Flex>
        <Badge color="green" variant="soft">Pro</Badge>
      </Flex>

      <Separator size="4" mb="6" />

      {/* Stats Grid */}
      <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="4" mb="6">
        <Card>
          <Text size="2" color="gray" mb="2">Usuarios</Text>
          <Heading size="6">2,543</Heading>
        </Card>
        <Card>
          <Text size="2" color="gray" mb="2">Ingresos</Text>
          <Heading size="6">$12,345</Heading>
        </Card>
        <Card>
          <Text size="2" color="gray" mb="2">Conversión</Text>
          <Heading size="6">23.5%</Heading>
        </Card>
        <Card>
          <Text size="2" color="gray" mb="2">Crecimiento</Text>
          <Heading size="6">+15%</Heading>
        </Card>
      </Grid>

      {/* Main Content */}
      <Grid columns={{ initial: '1', lg: '3fr 1fr' }} gap="6">
        <Card>
          <Heading size="4" mb="4">Contenido Principal</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>

          <Flex gap="3" mt="4">
            <Button variant="solid">Guardar</Button>
            <Button variant="soft" color="gray">Cancelar</Button>
          </Flex>
        </Card>

        <Card>
          <Heading size="4" mb="4">Sidebar</Heading>
          <Flex direction="column" gap="3">
            <Text size="2">Item 1</Text>
            <Text size="2">Item 2</Text>
            <Text size="2">Item 3</Text>
          </Flex>
        </Card>
      </Grid>
    </Container>
  )
}
```

## 📚 Recursos

- [Radix Themes Docs](https://www.radix-ui.com/themes/docs)
- [Radix Themes Components](https://www.radix-ui.com/themes/docs/components)
- [Radix Colors](https://www.radix-ui.com/colors)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 💡 Tips

1. **Usa Radix para estructura, Tailwind para detalles**
   ```jsx
   <Card className="hover:scale-105 transition-transform">
     {/* Radix Card + Tailwind utilities */}
   </Card>
   ```

2. **Combina props responsive de Radix con Tailwind**
   ```jsx
   <Box p={{ initial: '2', md: '4' }} className="bg-gradient-to-r from-blue-500 to-purple-500">
     Lo mejor de ambos mundos
   </Box>
   ```

3. **Las Cards tienen box-shadow automático** (gracias al CSS custom)
   - No necesitas agregar clases ni estilos
   - Funcionan en dark mode automáticamente

4. **Usa variables CSS de Radix**
   ```jsx
   style={{
     backgroundColor: 'var(--blue-3)',
     color: 'var(--blue-9)',
     borderRadius: 'var(--radius-3)'
   }}
   ```
