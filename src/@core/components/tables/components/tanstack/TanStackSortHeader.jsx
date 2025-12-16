import React from 'react';
import { Flex } from '@radix-ui/themes';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { flexRender } from '@tanstack/react-table';

/**
 * Componente de encabezado ordenable para TanStack Table
 * Muestra indicadores de ordenamiento y maneja clicks
 */
const TanStackSortHeader = ({ header }) => {
    const canSort = header.column.getCanSort();
    const isSorted = header.column.getIsSorted();

    return (
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
    );
};

export default TanStackSortHeader;
