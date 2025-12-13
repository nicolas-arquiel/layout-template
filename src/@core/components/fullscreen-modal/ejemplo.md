# FullScreenModal - Ejemplos de Uso

Modal de pantalla completa usando Radix Dialog + Tailwind, integrado con el sistema de temas.

## Migración desde Reactstrap

### Antes (Reactstrap)
```jsx
import { FullScreenModal, FullScreenFooter, FullScreenHeader } from '@core/components/fullscreen-modal';
import { Button } from 'reactstrap';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>

      <FullScreenModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Mi Modal"
        color="primary"
      >
        <FullScreenHeader>
          <Button size="sm">Acción Extra</Button>
        </FullScreenHeader>

        <div>Contenido del modal aquí</div>

        <FullScreenFooter>
          <Button color="secondary" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button color="primary">
            Guardar
          </Button>
        </FullScreenFooter>
      </FullScreenModal>
    </>
  );
};
```

### Después (Radix + Tailwind)
```jsx
import { FullScreenModal, FullScreenFooter, FullScreenHeader } from '@core/components/fullscreen-modal';
import { Button } from '@radix-ui/themes';

const MyComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir Modal</Button>

      <FullScreenModal
        open={open}
        onOpenChange={setOpen}
        title="Mi Modal"
        color="primary"
      >
        <FullScreenHeader>
          <Button size="2" variant="soft">Acción Extra</Button>
        </FullScreenHeader>

        <div>Contenido del modal aquí</div>

        <FullScreenFooter>
          <Button variant="soft" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button>
            Guardar
          </Button>
        </FullScreenFooter>
      </FullScreenModal>
    </>
  );
};
```

## Cambios principales

1. **Prop `isOpen` → `open`**: Radix usa `open` en lugar de `isOpen`
2. **Prop `onClose` → `onOpenChange`**: Radix usa `onOpenChange` que recibe un booleano
3. **Componentes de Radix**: Usar `Button` de `@radix-ui/themes` en lugar de Reactstrap
4. **Colores**: Los colores semánticos funcionan igual (primary, success, danger, warning, info, secondary)

## Ejemplos Completos

### Ejemplo 1: Modal Básico

```jsx
import { useState } from 'react';
import { FullScreenModal } from '@core/components/fullscreen-modal';
import { Button } from '@radix-ui/themes';

export default function BasicExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Abrir Modal
      </Button>

      <FullScreenModal
        open={open}
        onOpenChange={setOpen}
        title="Modal Básico"
        color="primary"
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Contenido del Modal</h2>
          <p>Este es un modal de pantalla completa.</p>
        </div>
      </FullScreenModal>
    </>
  );
}
```

### Ejemplo 2: Modal con Footer

```jsx
import { useState } from 'react';
import { FullScreenModal, FullScreenFooter } from '@core/components/fullscreen-modal';
import { Button, Flex } from '@radix-ui/themes';

export default function ModalWithFooter() {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    console.log('Guardando...');
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Abrir Modal con Footer
      </Button>

      <FullScreenModal
        open={open}
        onOpenChange={setOpen}
        title="Editar Documento"
        color="success"
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Formulario</h2>
          <p>Aquí va el contenido del formulario...</p>
        </div>

        <FullScreenFooter>
          <Flex gap="3">
            <Button variant="soft" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar Cambios
            </Button>
          </Flex>
        </FullScreenFooter>
      </FullScreenModal>
    </>
  );
}
```

### Ejemplo 3: Modal con Header y Footer Personalizados

```jsx
import { useState } from 'react';
import {
  FullScreenModal,
  FullScreenFooter,
  FullScreenHeader,
} from '@core/components/fullscreen-modal';
import { Button, Flex, Badge } from '@radix-ui/themes';
import { Download, Share2 } from 'lucide-react';

export default function CompleteExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Abrir Modal Completo
      </Button>

      <FullScreenModal
        open={open}
        onOpenChange={setOpen}
        title="Vista de Detalles"
        color="info"
      >
        {/* Acciones adicionales en el header */}
        <FullScreenHeader>
          <Flex gap="2">
            <Badge>Nuevo</Badge>
            <Button size="2" variant="soft">
              <Share2 size={14} />
              Compartir
            </Button>
            <Button size="2" variant="soft">
              <Download size={14} />
              Descargar
            </Button>
          </Flex>
        </FullScreenHeader>

        {/* Contenido principal */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Detalles del Proyecto</h2>
          <div className="space-y-4">
            <p>Información detallada aquí...</p>
            <p>Más contenido...</p>
          </div>
        </div>

        {/* Footer con acciones */}
        <FullScreenFooter>
          <Flex gap="3">
            <Button variant="soft" color="gray" onClick={() => setOpen(false)}>
              Cerrar
            </Button>
            <Button variant="soft">
              Guardar Borrador
            </Button>
            <Button>
              Publicar
            </Button>
          </Flex>
        </FullScreenFooter>
      </FullScreenModal>
    </>
  );
}
```

### Ejemplo 4: Todos los Colores Semánticos

```jsx
import { useState } from 'react';
import { FullScreenModal } from '@core/components/fullscreen-modal';
import { Button, Flex } from '@radix-ui/themes';

export default function ColorExamples() {
  const [openColor, setOpenColor] = useState(null);

  const colors = [
    { name: 'primary', label: 'Primary' },
    { name: 'success', label: 'Success' },
    { name: 'danger', label: 'Danger' },
    { name: 'warning', label: 'Warning' },
    { name: 'info', label: 'Info' },
    { name: 'secondary', label: 'Secondary' },
  ];

  return (
    <>
      <Flex gap="2" wrap="wrap">
        {colors.map(({ name, label }) => (
          <Button key={name} onClick={() => setOpenColor(name)}>
            Modal {label}
          </Button>
        ))}
      </Flex>

      {colors.map(({ name, label }) => (
        <FullScreenModal
          key={name}
          open={openColor === name}
          onOpenChange={(open) => setOpenColor(open ? name : null)}
          title={`Modal ${label}`}
          color={name}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Modal con color {label}</h2>
            <p>Este modal usa el color semántico "{name}".</p>
            <p>
              El color se adapta automáticamente según la configuración del
              tema del usuario.
            </p>
          </div>
        </FullScreenModal>
      ))}
    </>
  );
}
```

### Ejemplo 5: Header Personalizado Completo

```jsx
import { useState } from 'react';
import { FullScreenModal } from '@core/components/fullscreen-modal';
import { Button, Flex, IconButton } from '@radix-ui/themes';
import { X, Settings } from 'lucide-react';

export default function CustomHeaderExample() {
  const [open, setOpen] = useState(false);

  const customHeader = (
    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex justify-between items-center">
      <Flex align="center" gap="3">
        <Settings size={24} />
        <div>
          <h4 className="font-bold text-lg mb-0">Configuración Avanzada</h4>
          <p className="text-xs opacity-80 mb-0">Personaliza tu experiencia</p>
        </div>
      </Flex>
      <IconButton
        variant="soft"
        size="2"
        onClick={() => setOpen(false)}
        className="!bg-white/20 hover:!bg-white/30 cursor-pointer"
      >
        <X size={16} />
      </IconButton>
    </div>
  );

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Abrir con Header Personalizado
      </Button>

      <FullScreenModal
        open={open}
        onOpenChange={setOpen}
        customHeader={customHeader}
      >
        <div className="p-4">
          <p>Contenido con header completamente personalizado.</p>
        </div>
      </FullScreenModal>
    </>
  );
}
```

## Props del FullScreenModal

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Estado de apertura del modal |
| `onOpenChange` | `function` | - | Callback cuando cambia el estado (recibe booleano) |
| `title` | `string` | `"Vista Completa"` | Título del modal |
| `color` | `string` | `'primary'` | Color semántico: `primary`, `success`, `danger`, `warning`, `info`, `secondary` |
| `children` | `ReactNode` | - | Contenido del modal |
| `customHeader` | `ReactNode` | `null` | Header personalizado (reemplaza el default) |
| `showCloseButton` | `boolean` | `true` | Mostrar botón de cerrar |
| `closeIcon` | `Component` | `Minimize2` | Icono del botón de cerrar (de lucide-react) |
| `className` | `string` | `""` | Clase CSS adicional para el contenedor |
| `bodyClassName` | `string` | `""` | Clase CSS adicional para el body |

## Integración con el Sistema de Temas

El componente se integra automáticamente con el sistema de temas de Radix:

- Los colores semánticos (`primary`, `success`, etc.) se mapean a los colores de Radix configurados en el `CustomThemePanel`
- El modal respeta el modo claro/oscuro configurado
- Los gradientes usan las variables CSS de Radix para mantener consistencia

### Utilidades Exportadas

```jsx
import {
  getColorClasses,      // Obtiene clases y estilos para un color
  getRadixColor,        // Mapea color semántico a color de Radix
  getGradientClass,     // Obtiene clases de gradiente
  getSolidColorStyle,   // Obtiene estilo de color sólido
  getSoftColorStyle,    // Obtiene estilo de color suave
} from '@core/components/fullscreen-modal';
```

## Características

✅ **Pantalla completa**: Ocupa todo el viewport
✅ **Scroll automático**: El body tiene scroll cuando el contenido lo requiere
✅ **Bloqueo de scroll**: El body principal se bloquea cuando el modal está abierto
✅ **Escape para cerrar**: Presionar ESC cierra el modal
✅ **Click fuera para cerrar**: Click en el overlay cierra el modal (Radix default)
✅ **Accesibilidad**: Radix Dialog maneja focus trap y aria labels
✅ **Temas dinámicos**: Se adapta al tema configurado en tiempo real
✅ **Header/Footer flexibles**: Usa Context para contenido dinámico
✅ **Gradientes**: Header y footer con gradientes del color seleccionado
