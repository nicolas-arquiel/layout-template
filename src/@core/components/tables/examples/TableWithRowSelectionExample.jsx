import React, { useState } from 'react';
import { Flex, Button, Badge, Text } from '@radix-ui/themes';
import TanStackTableWithClientData from '@/@core/components/tables/tables/TanStackTableWithClientData';

/**
 * EJEMPLO DE USO: TanStack Table con Selección de Filas
 * 
 * Este ejemplo demuestra cómo usar la funcionalidad de selección de filas
 * en TanStackTableWithClientData
 */

// Datos de ejemplo
const sampleData = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', edad: 28 },
    { id: 2, nombre: 'María García', email: 'maria@example.com', edad: 34 },
    { id: 3, nombre: 'Carlos López', email: 'carlos@example.com', edad: 45 },
    { id: 4, nombre: 'Ana Martínez', email: 'ana@example.com', edad: 29 },
    { id: 5, nombre: 'Pedro Sánchez', email: 'pedro@example.com', edad: 52 },
];

// Definición de columnas
const columns = [
    {
        accessorKey: 'nombre',
        header: 'Nombre',
        size: 200,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        size: 250,
    },
    {
        accessorKey: 'edad',
        header: 'Edad',
        size: 100,
    },
];

const TableWithRowSelectionExample = () => {
    const [selectedRows, setSelectedRows] = useState([]);

    // Callback que se ejecuta cuando cambia la selección
    const handleRowSelectionChange = (rows) => {
        setSelectedRows(rows);
        console.log('Filas seleccionadas:', rows);
    };

    // Ejemplo de procesamiento de filas seleccionadas
    const handleProcessSelected = () => {
        if (selectedRows.length === 0) {
            alert('No hay filas seleccionadas');
            return;
        }

        // Aquí puedes procesar las filas seleccionadas como necesites
        const nombres = selectedRows.map(row => row.nombre).join(', ');
        alert(`Procesando ${selectedRows.length} filas: ${nombres}`);
    };

    const handleDeleteSelected = () => {
        if (selectedRows.length === 0) {
            alert('No hay filas seleccionadas');
            return;
        }

        const ids = selectedRows.map(row => row.id);
        console.log('IDs a eliminar:', ids);
        alert(`Se eliminarían ${selectedRows.length} registros`);
    };

    return (
        <Flex direction="column" gap="4">
            {/* Información de selección y acciones */}
            <Flex gap="3" align="center">
                <Badge size="2" color={selectedRows.length > 0 ? 'blue' : 'gray'}>
                    {selectedRows.length} {selectedRows.length === 1 ? 'fila seleccionada' : 'filas seleccionadas'}
                </Badge>

                {selectedRows.length > 0 && (
                    <>
                        <Button
                            onClick={handleProcessSelected}
                            variant="soft"
                        >
                            Procesar Seleccionados
                        </Button>
                        <Button
                            onClick={handleDeleteSelected}
                            variant="soft"
                            color="red"
                        >
                            Eliminar Seleccionados
                        </Button>
                    </>
                )}
            </Flex>

            {/* Tabla con selección de filas habilitada */}
            <TanStackTableWithClientData
                data={sampleData}
                columns={columns}
                title="Usuarios"
                enableRowSelection={true}
                onRowSelectionChange={handleRowSelectionChange}
                showSearch={true}
                showPagination={true}
                showColumnVisibility={true}
                initialPageSize={10}
            />

            {/* Mostrar datos de filas seleccionadas */}
            {selectedRows.length > 0 && (
                <Flex direction="column" gap="2" p="3" style={{
                    background: 'var(--gray-2)',
                    borderRadius: 'var(--radius-3)',
                    border: '1px solid var(--gray-6)'
                }}>
                    <Text weight="bold" size="2">Datos de filas seleccionadas:</Text>
                    <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                        {JSON.stringify(selectedRows, null, 2)}
                    </pre>
                </Flex>
            )}
        </Flex>
    );
};

export default TableWithRowSelectionExample;
