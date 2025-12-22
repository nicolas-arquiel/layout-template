import React from 'react';
import { DropdownMenu, IconButton, Flex, Checkbox, Text, Button } from '@radix-ui/themes';
import { MoreVertical } from 'lucide-react';

/**
 * Componente de configuración de visibilidad de columnas para TanStack Table
 * Dropdown con checkboxes para mostrar/ocultar columnas
 */
const TanStackColumnVisibility = ({ table }) => {
    // Detectar si es móvil (menos de 768px)
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                {isMobile ? (
                    <Button variant="outline" style={{ width: '100%', cursor: 'pointer' }}>
                        <MoreVertical size={16} />
                        Columnas
                    </Button>
                ) : (
                    <IconButton variant="ghost" size="2" style={{ cursor: 'pointer' }}>
                        <MoreVertical size={16} />
                    </IconButton>
                )}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Label>
                    <Text size="2" weight="medium">Columnas visibles</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                {table.getAllLeafColumns().map(column => {
                    // Solo mostrar columnas que tienen header definido
                    if (!column.columnDef.header) return null;

                    return (
                        <DropdownMenu.Item key={column.id} onSelect={(e) => {
                            column.toggleVisibility()
                            e.preventDefault()
                        }}
                            style={{
                                cursor: 'pointer'
                            }}>
                            <Flex gap="2" align="center" >
                                <Checkbox
                                    checked={column.getIsVisible()}
                                />
                                <Text size="2">
                                    {typeof column.columnDef.header === 'string'
                                        ? column.columnDef.header
                                        : column.id}
                                </Text>
                            </Flex>
                        </DropdownMenu.Item>
                    );
                })}
                <DropdownMenu.Separator />
                <DropdownMenu.Item style={{
                    cursor: 'pointer'
                }} onSelect={() => table.toggleAllColumnsVisible(true)}>
                    <Text size="2">Mostrar todas</Text>
                </DropdownMenu.Item>
                <DropdownMenu.Item style={{
                    cursor: 'pointer'
                }} onSelect={() => table.toggleAllColumnsVisible(false)}>
                    <Text size="2">Ocultar todas</Text>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root >
    );
};

export default TanStackColumnVisibility;
