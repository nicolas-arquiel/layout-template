import React from 'react';
import { Checkbox } from '@radix-ui/themes';

/**
 * Checkbox para selección individual de filas en TanStack Table
 * Utiliza el hook de selección de TanStack Table
 */
const TanStackSelectCheckbox = ({ row }) => {
    return (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            disabled={!row.getCanSelect()}
            aria-label="Seleccionar fila"
        />
    );
};

export default TanStackSelectCheckbox;
