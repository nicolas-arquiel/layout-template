import React from 'react';
import { Flex, Text, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

/**
 * Componente de búsqueda global para TanStack Table
 * Integra con el filtro global de TanStack
 */
const TanStackSearchInput = ({
    value,
    onChange,
    resultCount,
    placeholder = "Buscar en todos los campos..."
}) => {
    return (
        <Flex gap="2" align="center" style={{ flex: 1 }}>
            <TextField.Root
                placeholder={placeholder}
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                style={{ flex: 1, minWidth: '200px' }}
            >
                <TextField.Slot>
                    <MagnifyingGlassIcon width="16" height="16" />
                </TextField.Slot>
            </TextField.Root>
            {resultCount !== undefined && (
                <Text size="2" color="gray">
                    {resultCount} resultado{resultCount !== 1 ? 's' : ''}
                </Text>
            )}
        </Flex>
    );
};

export default TanStackSearchInput;
