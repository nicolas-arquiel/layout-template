import React from 'react';
import { Flex } from '@radix-ui/themes';
import { ChevronUp, ChevronDown, Copy, EyeOff, ArrowUpAZ, ArrowDownZA } from 'lucide-react';
import { flexRender } from '@tanstack/react-table';
import DynamicContextMenu from '../../../context-menu/DynamicContextMenu';

/**
 * Componente de encabezado ordenable para TanStack Table
 * Muestra indicadores de ordenamiento y maneja clicks
 * Ahora incluye menú contextual con click derecho usando DynamicContextMenu
 */
const TanStackSortHeader = ({ header }) => {
    const canSort = header.column.getCanSort();
    const isSorted = header.column.getIsSorted();
    const canHide = header.column.getCanHide();

    const handleCopy = (e) => {
        // e.preventDefault(); // No es necesario aquí si se maneja en el onClick del item
        const headerText = header.column.columnDef.header;
        if (typeof headerText === 'string') {
            navigator.clipboard.writeText(headerText);
        }
    };

    const menuItems = [];

    if (canSort) {
        menuItems.push(
            {
                type: 'item',
                label: 'Ordenar Ascendente',
                icon: <ArrowUpAZ size={14} />,
                onClick: () => header.column.toggleSorting(false)
            },
            {
                type: 'item',
                label: 'Ordenar Descendente',
                icon: <ArrowDownZA size={14} />,
                onClick: () => header.column.toggleSorting(true)
            },
            { type: 'separator' }
        );
    }

    if (canHide) {
        menuItems.push({
            type: 'item',
            label: 'Ocultar Columna',
            icon: <EyeOff size={14} />,
            onClick: () => header.column.toggleVisibility(false)
        });
    }

    menuItems.push({
        type: 'item',
        label: 'Copiar Nombre',
        icon: <Copy size={14} />,
        onClick: handleCopy
    });

    return (
        <DynamicContextMenu items={menuItems}>
            <Flex
                align="center"
                gap="1"
                style={{
                    cursor: canSort ? 'pointer' : 'default',
                    userSelect: 'none'
                }}
                onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
            >
                {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                )}
                {canSort && (
                    <div className="ml-1 flex flex-col">
                        {isSorted ? (
                            isSorted === 'asc' ? (
                                <ChevronUp size={14} />
                            ) : (
                                <ChevronDown size={14} />
                            )
                        ) : (
                            <ChevronDown size={14} opacity="0.3" />
                        )}
                    </div>
                )}
            </Flex>
        </DynamicContextMenu>
    );
};

export default TanStackSortHeader;
