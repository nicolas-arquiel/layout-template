import React from 'react';
import { DropdownMenu, IconButton, Flex, Text } from '@radix-ui/themes';
import { MoreVertical, ChevronRight } from 'lucide-react';

/**
 * Componente de acciones de fila para TanStack Table
 * Muestra un dropdown con las acciones disponibles para una fila específica
 * Soporta items simples, separadores y submenús
 * 
 * @param {Object} row - Objeto de fila de TanStack Table
 * @param {Array|Function} actions - Array de acciones o función que retorna acciones
 */
const TanStackRowActions = ({ row, actions = [], displayMode = 'menu' }) => {
    // Si actions es una función, ejecutarla con la fila actual
    const resolvedActions = typeof actions === 'function' ? actions(row) : actions;

    if (!resolvedActions || resolvedActions.length === 0) return null;

    // Detectar si es móvil (menos de 768px)
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Renderizado como botones individuales
    if (displayMode === 'buttons') {
        return (
            <Flex gap="2" align="center" style={{ width: isMobile ? '100%' : 'auto' }}>
                {resolvedActions.map((action, index) => {
                    if (action.type === 'separator') return null;

                    const IconComponent = action.icon;

                    if (action.type === 'submenu') return null;

                    if (isMobile) {
                        return (
                            <IconButton
                                key={index}
                                variant="soft"
                                size="3"
                                color={action.color}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick?.(row.original);
                                }}
                                disabled={action.disabled}
                                style={{ cursor: 'pointer', flex: 1 }}
                            >
                                <Flex gap="2" align="center">
                                    {IconComponent && <IconComponent size={18} />}
                                    {action.label}
                                </Flex>
                            </IconButton>
                        );
                    }

                    return (
                        <IconButton
                            key={index}
                            variant="ghost"
                            size="1"
                            color={action.color}
                            onClick={(e) => {
                                e.stopPropagation();
                                action.onClick?.(row.original);
                            }}
                            disabled={action.disabled}
                            style={{ cursor: 'pointer' }}
                            title={action.label}
                        >
                            {IconComponent && <IconComponent size={16} />}
                        </IconButton>
                    );
                })}
            </Flex>
        );
    }

    // Renderizado como Dropdown Menu (default)
    const renderAction = (action, index) => {
        // Separador
        if (action.type === "separator") {
            return <DropdownMenu.Separator key={`separator-${index}`} />;
        }

        // Item simple
        if (action.type === "item") {
            const IconComponent = action.icon;

            return (
                <DropdownMenu.Item
                    key={index}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevenir eventos de fila
                        action.onClick?.(row.original);
                    }}
                    disabled={action.disabled}
                    color={action.color} // Soporte para color (ej: 'red' para eliminar)
                    style={{ cursor: 'pointer' }}
                >
                    <Flex align="center" gap="2" justify="between" width="100%">
                        <Flex align="center" gap="2">
                            {IconComponent && (
                                <IconComponent
                                    size={14}
                                />
                            )}
                            <Text
                                size="2"
                            >
                                {action.label}
                            </Text>
                        </Flex>

                        {action.shortcut && (
                            <Text
                                size="1"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    letterSpacing: "0.1em"
                                }}
                            >
                                {action.shortcut}
                            </Text>
                        )}
                    </Flex>
                </DropdownMenu.Item>
            );
        }

        // Submenu
        if (action.type === "submenu") {
            const IconComponent = action.icon;

            return (
                <DropdownMenu.Sub key={index}>
                    <DropdownMenu.SubTrigger style={{ cursor: 'pointer' }}>
                        <Flex align="center" gap="2">
                            {IconComponent && (
                                <IconComponent
                                    size={14}
                                />
                            )}
                            <Text size="2">{action.label}</Text>
                        </Flex>
                    </DropdownMenu.SubTrigger>

                    <DropdownMenu.SubContent>
                        <DropdownMenu.RadioGroup
                            value={action.value}
                            onValueChange={(value) => action.onValueChange?.(value, row.original)}
                        >
                            {action.items.map((item) => {
                                const ItemIcon = item.icon;

                                return (
                                    <DropdownMenu.RadioItem
                                        key={item.value}
                                        value={item.value}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Flex align="center" gap="2">
                                            {ItemIcon && <ItemIcon size={14} />}
                                            <Text size="2">{item.label}</Text>
                                        </Flex>
                                    </DropdownMenu.RadioItem>
                                );
                            })}
                        </DropdownMenu.RadioGroup>
                    </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
            );
        }

        return null;
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <IconButton
                    variant="ghost"
                    size="1"
                    aria-label="Acciones"
                    style={{ cursor: 'pointer' }}
                >
                    <MoreVertical size={16} />
                </IconButton>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content align="end" sideOffset={4}>
                {resolvedActions.map((action, index) => renderAction(action, index))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default TanStackRowActions;
