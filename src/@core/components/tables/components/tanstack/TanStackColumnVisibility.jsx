import React from 'react';
import { DropdownMenu, IconButton, Flex, Checkbox, Text } from '@radix-ui/themes';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

/**
 * Componente de configuración de visibilidad de columnas para TanStack Table
 * Dropdown con checkboxes para mostrar/ocultar columnas
 */
const TanStackColumnVisibility = ({ table }) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <IconButton variant="ghost" size="2">
                    <DotsVerticalIcon width="16" height="16" />
                </IconButton>
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
                        <DropdownMenu.Item key={column.id} onSelect={(e) => e.preventDefault()}>
                            <Flex gap="2" align="center" style={{ cursor: 'pointer' }}>
                                <Checkbox
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
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
                <DropdownMenu.Item onSelect={() => table.toggleAllColumnsVisible(true)}>
                    <Text size="2">Mostrar todas</Text>
                </DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => table.toggleAllColumnsVisible(false)}>
                    <Text size="2">Ocultar todas</Text>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default TanStackColumnVisibility;
