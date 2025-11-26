# Instalación de Dependencias para TablaVirtualizada

Componente de tabla con virtualización para datasets grandes.

## Dependencia requerida

TablaVirtualizada requiere: `react-window`

## Instalación

La dependencia ya está agregada en `package.json`. Solo necesitas instalar:

```bash
pnpm install
```

## Dependencia Agregada

En `package.json`:
```json
{
  "dependencies": {
    "react-window": "^1.8.10"
  }
}
```

## Verificar Instalación

Después de instalar, ejecuta:

```bash
pnpm run build
```

Si no hay errores, la tabla está lista para usar.

## Documentación

- **TablaVirtualizada**: `src/components/TablaVirtualizada/README.md`

## Cuándo Usar

✅ **Usar TablaVirtualizada cuando:**
- Tienes datasets grandes (10,000+ registros)
- Prioridad en performance y velocidad de renderizado
- Necesitas scroll infinito/continuo
- No necesitas filtros complejos integrados

## Próximos Pasos

Se está desarrollando un sistema de tablas modular con:
- Filtros externos independientes (AdvancedFilter, DateRangeFilter, etc.)
- Soporte para backend y frontend
- Context API para integración automática
- Compatible con tu código actual
