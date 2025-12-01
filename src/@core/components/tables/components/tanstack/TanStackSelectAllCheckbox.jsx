import React from 'react';
import { Checkbox } from '@radix-ui/themes';

/**
 * Checkbox para selección de todas las filas en TanStack Table
 * Muestra estado indeterminado cuando solo algunas filas están seleccionadas
 */
const TanStackSelectAllCheckbox = ({ table }) => {
    const allRowsSelected = table.getIsAllRowsSelected();
    const someRowsSelected = table.getIsSomeRowsSelected();

    return (
        <Checkbox
            checked={allRowsSelected}
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            aria-label="Seleccionar todas las filas"
            // Radix UI Checkbox usa 'indeterminate' para el estado parcial
            {...(someRowsSelected && !allRowsSelected ? { checked: 'indeterminate' } : {})}
        />
    );
};

export default TanStackSelectAllCheckbox;
