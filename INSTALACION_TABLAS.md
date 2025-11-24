# Instalación de Dependencias para Tablas

Se agregaron dos nuevos componentes de tablas que requieren dependencias adicionales:

## 1. TablaVirtualizada
Requiere: `react-window`

## 2. TablaFiltrable
Requiere: `@tanstack/react-table`

## Instalación

Las dependencias ya están agregadas en `package.json`. Solo necesitas instalar:

### Con npm:
```bash
npm install
```

### Con pnpm:
```bash
pnpm install
```

### Con yarn:
```bash
yarn install
```

## Dependencias Agregadas

En `package.json`:
```json
{
  "dependencies": {
    "@tanstack/react-table": "^8.20.6",
    "react-window": "^1.8.10"
  }
}
```

## Verificar Instalación

Después de instalar, ejecuta:

```bash
npm run build
```

Si no hay errores, las tablas están listas para usar.

## Uso

Ver la página de ejemplo en:
- **Ruta**: `/ejemplo-tablas`
- **Menú**: "Ejemplo Tablas" en el sidebar

## Documentación

- **TablaVirtualizada**: `src/components/TablaVirtualizada/README.md`
- **TablaFiltrable**: `src/components/TablaFiltrable/README.md`
