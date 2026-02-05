import React, { useState } from 'react';
import {
    Theme,
    Flex,
    Button,
    Card,
    Heading,
    Text,
    Box,
    Badge,
    Grid,
    Separator,
    Code
} from '@radix-ui/themes';
import { Sparkles, Layers, FileText } from 'lucide-react';
import FormDialog from '../@core/components/form-dialog/FormDialog';
import FormDialogSliding from '../@core/components/form-dialog/FormDialogSliding';

/**
 * FormDialogExamples - Página de demostración de componentes de diálogo
 * 
 * Muestra dos variantes de modales de formulario:
 * 1. FormDialog - Modal tradicional centrado
 * 2. FormDialogSliding - Modal con paneles deslizantes
 */
export default function FormDialogExamples() {
    const [openBasic, setOpenBasic] = useState(false);
    const [openSliding, setOpenSliding] = useState(false);

    const handleBasicSubmit = (data) => {
        console.log('FormDialog básico - Datos:', data);
        // Aquí puedes hacer la llamada a tu API
    };

    const handleSlidingSubmit = (data) => {
        console.log('FormDialogSliding - Datos:', data);
        // Aquí puedes hacer la llamada a tu API
    };

    return (
        <Theme accentColor="indigo" grayColor="slate" radius="medium" scaling="95%">
            <Box
                style={{
                    minHeight: '100vh',
                    backgroundColor: 'var(--gray-2)',
                    padding: '2rem',
                }}
            >
                <Box style={{ maxWidth: 1200, margin: '0 auto' }}>
                    {/* Header */}
                    <Flex direction="column" gap="4" mb="6">
                        <Flex align="center" gap="3">
                            <Box
                                style={{
                                    background: 'linear-gradient(135deg, var(--indigo-9), var(--purple-9))',
                                    padding: '12px',
                                    borderRadius: 'var(--radius-3)',
                                }}
                            >
                                <Layers size={28} color="white" />
                            </Box>
                            <Box>
                                <Heading size="8">Form Dialog Components</Heading>
                                <Text size="3" color="gray">
                                    Ejemplos de componentes de diálogo con formularios
                                </Text>
                            </Box>
                        </Flex>

                        <Card variant="surface" style={{ backgroundColor: 'var(--accent-2)' }}>
                            <Flex align="center" gap="2">
                                <Sparkles size={16} color="var(--accent-11)" />
                                <Text size="2" color="accent">
                                    Esta página demuestra dos variantes de modales de formulario con diferentes
                                    estilos y funcionalidades.
                                </Text>
                            </Flex>
                        </Card>
                    </Flex>

                    {/* Grid de ejemplos */}
                    <Grid columns={{ initial: '1', md: '2' }} gap="5">
                        {/* FormDialog Básico */}
                        <Card size="3">
                            <Flex direction="column" gap="4">
                                <Flex align="center" justify="between">
                                    <Flex align="center" gap="2">
                                        <FileText size={20} color="var(--accent-9)" />
                                        <Heading size="5">FormDialog</Heading>
                                    </Flex>
                                    <Badge color="blue" size="2">
                                        Tradicional
                                    </Badge>
                                </Flex>

                                <Separator size="4" />

                                <Text size="2" color="gray">
                                    Modal centrado tradicional con formulario completo. Ideal para formularios
                                    simples y directos.
                                </Text>

                                <Box>
                                    <Text size="2" weight="bold" mb="2" as="div">
                                        Características:
                                    </Text>
                                    <Flex direction="column" gap="2">
                                        <Flex align="center" gap="2">
                                            <Box
                                                style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--accent-9)',
                                                }}
                                            />
                                            <Text size="2">Modal centrado en pantalla</Text>
                                        </Flex>
                                        <Flex align="center" gap="2">
                                            <Box
                                                style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--accent-9)',
                                                }}
                                            />
                                            <Text size="2">Validación con React Hook Form</Text>
                                        </Flex>
                                        <Flex align="center" gap="2">
                                            <Box
                                                style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--accent-9)',
                                                }}
                                            />
                                            <Text size="2">Mensajes de éxito/error</Text>
                                        </Flex>
                                        <Flex align="center" gap="2">
                                            <Box
                                                style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--accent-9)',
                                                }}
                                            />
                                            <Text size="2">Componentes Radix UI</Text>
                                        </Flex>
                                    </Flex>
                                </Box>

                                <Card variant="surface" style={{ backgroundColor: 'var(--gray-3)' }}>
                                    <Text size="1" weight="medium" color="gray" mb="2" as="div">
                                        USO BÁSICO
                                    </Text>
                                    <Code size="1" style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
                                        {`<FormDialog
  open={open}
  onOpenChange={setOpen}
  onSubmit={handleSubmit}
  title="Nuevo Registro"
/>`}
                                    </Code>
                                </Card>

                                <Button size="3" onClick={() => setOpenBasic(true)}>
                                    Abrir FormDialog
                                </Button>
                            </Flex>
                        </Card>

                        {/* FormDialogSliding */}
                        <Card size="3">
                            <Flex direction="column" gap="4">
                                <Flex align="center" justify="between">
                                    <Flex align="center" gap="2">
                                        <Layers size={20} color="var(--purple-9)" />
                                        <Heading size="5">FormDialogSliding</Heading>
                                    </Flex>
                                    <Badge color="purple" size="2">
                                        Avanzado
                                    </Badge>
                                </Flex>

                                <Separator size="4" />

                                <Text size="2" color="gray">
                                    Modal con paneles deslizantes y vista previa en tiempo real. Perfecto para
                                    formularios complejos con múltiples secciones.
                                </Text>

                                <Box>
                                    <Text size="2" weight="bold" mb="2" as="div">
                                        Características:
                                    </Text>
                                    <Flex direction="column" gap="2">
                                        <Flex align="center" gap="2">
                                            <Box
                                                style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--purple-9)',
                                                }}
                                            />
                                            <Text size="2">Paneles deslizantes animados</Text>
                                        </Flex>
                                        <Flex align="center" gap="2">
                                            <Box
                                                style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--purple-9)',
                                                }}
                                            />
                                            <Text size="2">Vista previa en tiempo real</Text>
                                        </Flex>
                                        <Flex align="center" gap="2">
                                            <Box
                                                style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--purple-9)',
                                                }}
                                            />
                                            <Text size="2">Panel de ayuda contextual</Text>
                                        </Flex>
                                        <Flex align="center" gap="2">
                                            <Box
                                                style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--purple-9)',
                                                }}
                                            />
                                            <Text size="2">Animaciones fluidas</Text>
                                        </Flex>
                                    </Flex>
                                </Box>

                                <Card variant="surface" style={{ backgroundColor: 'var(--gray-3)' }}>
                                    <Text size="1" weight="medium" color="gray" mb="2" as="div">
                                        USO BÁSICO
                                    </Text>
                                    <Code size="1" style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
                                        {`<FormDialogSliding
  open={open}
  onClose={() => setOpen(false)}
  onSubmit={handleSubmit}
  title="Crear Usuario"
/>`}
                                    </Code>
                                </Card>

                                <Button size="3" color="purple" onClick={() => setOpenSliding(true)}>
                                    Abrir FormDialogSliding
                                </Button>
                            </Flex>
                        </Card>
                    </Grid>

                    {/* Sección de comparación */}
                    <Card size="3" mt="6">
                        <Heading size="5" mb="4">
                            Comparación de Componentes
                        </Heading>
                        <Box style={{ overflowX: 'auto' }}>
                            <table
                                style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                }}
                            >
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--gray-6)' }}>
                                        <th style={{ padding: '12px', textAlign: 'left' }}>
                                            <Text weight="bold" size="2">
                                                Característica
                                            </Text>
                                        </th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>
                                            <Text weight="bold" size="2">
                                                FormDialog
                                            </Text>
                                        </th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>
                                            <Text weight="bold" size="2">
                                                FormDialogSliding
                                            </Text>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid var(--gray-4)' }}>
                                        <td style={{ padding: '12px' }}>
                                            <Text size="2">Posición</Text>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <Badge color="blue">Centrado</Badge>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <Badge color="purple">Lateral derecho</Badge>
                                        </td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--gray-4)' }}>
                                        <td style={{ padding: '12px' }}>
                                            <Text size="2">Vista previa</Text>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <Text size="2">❌</Text>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <Text size="2">✅</Text>
                                        </td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--gray-4)' }}>
                                        <td style={{ padding: '12px' }}>
                                            <Text size="2">Panel de ayuda</Text>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <Text size="2">❌</Text>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <Text size="2">✅</Text>
                                        </td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--gray-4)' }}>
                                        <td style={{ padding: '12px' }}>
                                            <Text size="2">Animaciones</Text>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <Badge color="gray">Básicas</Badge>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <Badge color="green">Avanzadas</Badge>
                                        </td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--gray-4)' }}>
                                        <td style={{ padding: '12px' }}>
                                            <Text size="2">Complejidad</Text>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <Badge color="blue">Simple</Badge>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <Badge color="orange">Compleja</Badge>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '12px' }}>
                                            <Text size="2">Mejor uso</Text>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <Text size="2">Formularios simples</Text>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <Text size="2">Formularios complejos</Text>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Box>
                    </Card>

                    {/* Tips */}
                    <Grid columns={{ initial: '1', md: '2' }} gap="4" mt="6">
                        <Card variant="surface" style={{ backgroundColor: 'var(--blue-2)' }}>
                            <Flex direction="column" gap="2">
                                <Text weight="bold" size="3" color="blue">
                                    💡 Cuándo usar FormDialog
                                </Text>
                                <Text size="2" color="gray">
                                    Ideal para formularios rápidos, registros simples, o cuando necesitas una
                                    interfaz familiar y directa. Perfecto para aplicaciones tradicionales.
                                </Text>
                            </Flex>
                        </Card>

                        <Card variant="surface" style={{ backgroundColor: 'var(--purple-2)' }}>
                            <Flex direction="column" gap="2">
                                <Text weight="bold" size="3" color="purple">
                                    ✨ Cuándo usar FormDialogSliding
                                </Text>
                                <Text size="2" color="gray">
                                    Perfecto para formularios extensos, cuando necesitas mostrar vista previa,
                                    o cuando quieres una experiencia más moderna y dinámica.
                                </Text>
                            </Flex>
                        </Card>
                    </Grid>
                </Box>

                {/* Componentes de diálogo */}
                <FormDialog
                    open={openBasic}
                    onOpenChange={setOpenBasic}
                    onSubmit={handleBasicSubmit}
                    title="FormDialog - Ejemplo"
                />

                <FormDialogSliding
                    open={openSliding}
                    onClose={() => setOpenSliding(false)}
                    onSubmit={handleSlidingSubmit}
                    title="FormDialogSliding - Ejemplo"
                />
            </Box>
        </Theme>
    );
}
