import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
    Flex,
    Text,
    Button,
    TextField,
    TextArea,
    Select,
    Switch,
    Checkbox,
    RadioGroup,
    Heading,
    Callout,
    Box,
    Card,
    IconButton,
    Separator,
    Badge
} from '@radix-ui/themes';
import { AlertTriangle, CheckCircle2, FileText, User, X, ChevronRight, ChevronsRight, Info } from 'lucide-react';

// --- CONFIGURACIÓN DE PANELES ---
const MAIN_PANEL_WIDTH = 520;
const GAP = 20;
const ANIMATION_CURVE = 'cubic-bezier(0.25, 0.8, 0.25, 1)';

const PANEL_CONFIG = {
    'preview': {
        id: 'preview',
        title: 'Vista Previa',
        pushRatio: 0.65,
        fitContentHeight: false,
        width: MAIN_PANEL_WIDTH,
        verticalAlign: 'top'
    },
    'help': {
        id: 'help',
        title: 'Ayuda',
        pushRatio: 0.0,
        fitContentHeight: true,
        width: 420,
        verticalAlign: 'bottom'
    }
};

/**
 * FormDialogSliding - Variante del FormDialog con paneles deslizantes
 * 
 * Características:
 * - Panel principal con formulario
 * - Panel secundario deslizante para vista previa
 * - Panel de ayuda contextual
 * - Animaciones fluidas
 * - Integración con React Hook Form
 */
export default function FormDialogSliding({
    open,
    onClose,
    onSubmit,
    title = 'Nuevo Registro',
    initialData = null
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeView, setActiveView] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const lastConfigRef = useRef(PANEL_CONFIG['preview']);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        defaultValues: initialData || {
            nombre: '',
            email: '',
            telefono: '',
            descripcion: '',
            categoria: '',
            activo: true,
            acepta: false,
            tipo: 'individual',
        },
    });

    // Sincronizar estado interno con prop externa
    React.useEffect(() => {
        setIsOpen(open);
    }, [open]);

    // Actualizar configuración del panel
    if (activeView) {
        lastConfigRef.current = PANEL_CONFIG[activeView];
    }
    const currentConfig = activeView ? PANEL_CONFIG[activeView] : lastConfigRef.current;

    // Cálculos de posicionamiento
    const mainPanelTransform = isOpen
        ? `translateX(${activeView ? PANEL_CONFIG[activeView].pushRatio * 100 : 0}%)`
        : 'translateX(110%)';

    const visibleMainWidth = MAIN_PANEL_WIDTH * (1 - (activeView ? PANEL_CONFIG[activeView].pushRatio : 0));
    const secondaryPanelRight = visibleMainWidth + GAP + 10;

    const secondaryTransform = activeView ? 'translateX(0)' : 'translateX(50%)';

    const isBottom = currentConfig.verticalAlign === 'bottom';

    const closeAll = () => {
        setActiveView(null);
        setTimeout(() => {
            setIsOpen(false);
            reset();
            setShowSuccess(false);
            setShowError(false);
            if (onClose) onClose();
        }, 0);
    };

    const handleFormSubmit = async (data) => {
        try {
            console.log('Form data:', data);

            // Simular API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setShowSuccess(true);
            setShowError(false);

            if (onSubmit) {
                onSubmit(data);
            }

            setTimeout(() => {
                closeAll();
            }, 2000);
        } catch (error) {
            setShowError(true);
            setShowSuccess(false);
        }
    };

    const formData = watch();

    return (
        <>
            {/* OVERLAY */}
            <Box
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    zIndex: 100,
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transition: 'opacity 0.5s ease',
                }}
                onClick={closeAll}
            />

            {/* PANEL SECUNDARIO */}
            <Card
                style={{
                    position: 'fixed',
                    zIndex: 110,
                    width: currentConfig.width,
                    top: currentConfig.fitContentHeight ? (isBottom ? 'auto' : 10) : 10,
                    bottom: currentConfig.fitContentHeight ? (isBottom ? 10 : 'auto') : 10,
                    height: currentConfig.fitContentHeight ? 'fit-content' : 'auto',
                    maxHeight: 'calc(100vh - 20px)',
                    right: secondaryPanelRight,
                    transform: secondaryTransform,
                    opacity: activeView ? 1 : 0,
                    pointerEvents: activeView ? 'auto' : 'none',
                    transition: `all 0.6s ${ANIMATION_CURVE}`,
                    boxShadow: 'var(--shadow-5)',
                }}
            >
                {(activeView === 'preview' || (activeView === null && currentConfig.id === 'preview')) && (
                    <PreviewContent onClose={() => setActiveView(null)} data={formData} />
                )}
                {(activeView === 'help' || (activeView === null && currentConfig.id === 'help')) && (
                    <HelpContent onClose={() => setActiveView(null)} />
                )}
            </Card>

            {/* PANEL PRINCIPAL */}
            <Card
                style={{
                    position: 'fixed',
                    top: 10,
                    bottom: 10,
                    right: 10,
                    width: MAIN_PANEL_WIDTH,
                    zIndex: 120,
                    transform: mainPanelTransform,
                    transition: `transform 0.6s ${ANIMATION_CURVE}`,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-6)',
                }}
            >
                {isOpen && (
                    <MainFormContent
                        title={title}
                        onClose={closeAll}
                        onAction={(view) => setActiveView(activeView === view ? null : view)}
                        activeView={activeView}
                        register={register}
                        handleSubmit={handleSubmit}
                        handleFormSubmit={handleFormSubmit}
                        errors={errors}
                        watch={watch}
                        showSuccess={showSuccess}
                        showError={showError}
                    />
                )}
            </Card>
        </>
    );
}

// --- COMPONENTE PRINCIPAL DEL FORMULARIO ---
function MainFormContent({
    title,
    onClose,
    onAction,
    activeView,
    register,
    handleSubmit,
    handleFormSubmit,
    errors,
    watch,
    showSuccess,
    showError,
}) {
    return (
        <Flex direction="column" height="100%">
            {/* HEADER */}
            <Flex
                justify="between"
                align="center"
                p="4"
                style={{ borderBottom: '1px solid var(--gray-4)' }}
            >
                <Heading size="5">{title}</Heading>
                <Flex gap="2">
                    <Button
                        variant="ghost"
                        color="gray"
                        size="2"
                        onClick={() => onAction('preview')}
                    >
                        Vista Previa {activeView === 'preview' && <ChevronsRight size={16} />}
                    </Button>
                    <IconButton variant="ghost" onClick={onClose}>
                        <X size={16} />
                    </IconButton>
                </Flex>
            </Flex>

            {/* FORM BODY */}
            <Box flexGrow="1" p="4" style={{ overflowY: 'auto' }}>
                <form onSubmit={handleSubmit(handleFormSubmit)} id="main-form">
                    <Flex direction="column" gap="4">
                        {/* Success/Error Messages */}
                        {showSuccess && (
                            <Callout.Root color="green">
                                <Callout.Icon>
                                    <CheckCircle2 size={16} />
                                </Callout.Icon>
                                <Callout.Text>¡Formulario enviado exitosamente!</Callout.Text>
                            </Callout.Root>
                        )}

                        {showError && (
                            <Callout.Root color="red">
                                <Callout.Icon>
                                    <AlertTriangle size={16} />
                                </Callout.Icon>
                                <Callout.Text>Ocurrió un error al enviar el formulario</Callout.Text>
                            </Callout.Root>
                        )}

                        {/* Información del Usuario */}
                        <Card variant="surface" style={{ backgroundColor: 'var(--gray-2)' }}>
                            <Flex align="center" gap="2" mb="3">
                                <User size={16} />
                                <Text weight="bold" size="3">
                                    Información Personal
                                </Text>
                            </Flex>

                            <Flex direction="column" gap="3">
                                {/* Nombre */}
                                <label>
                                    <Text as="div" size="2" mb="1" weight="medium">
                                        Nombre *
                                    </Text>
                                    <TextField.Root
                                        placeholder="Ingresa el nombre"
                                        {...register('nombre', {
                                            required: 'El nombre es requerido',
                                            minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                                        })}
                                        color={errors.nombre ? 'red' : undefined}
                                    />
                                    {errors.nombre && (
                                        <Text size="1" color="red" mt="1">
                                            {errors.nombre.message}
                                        </Text>
                                    )}
                                </label>

                                {/* Email */}
                                <label>
                                    <Text as="div" size="2" mb="1" weight="medium">
                                        Email *
                                    </Text>
                                    <TextField.Root
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        {...register('email', {
                                            required: 'El email es requerido',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Email inválido',
                                            },
                                        })}
                                        color={errors.email ? 'red' : undefined}
                                    />
                                    {errors.email && (
                                        <Text size="1" color="red" mt="1">
                                            {errors.email.message}
                                        </Text>
                                    )}
                                </label>

                                {/* Teléfono */}
                                <label>
                                    <Text as="div" size="2" mb="1" weight="medium">
                                        Teléfono
                                    </Text>
                                    <TextField.Root
                                        placeholder="+54 9 11 1234-5678"
                                        {...register('telefono')}
                                    />
                                </label>
                            </Flex>
                        </Card>

                        <Separator size="4" />

                        {/* Detalles Adicionales */}
                        <Card variant="surface" style={{ backgroundColor: 'var(--gray-2)' }}>
                            <Flex align="center" gap="2" mb="3">
                                <FileText size={16} />
                                <Text weight="bold" size="3">
                                    Detalles Adicionales
                                </Text>
                            </Flex>

                            <Flex direction="column" gap="3">
                                {/* Categoría */}
                                <label>
                                    <Text as="div" size="2" mb="1" weight="medium">
                                        Categoría *
                                    </Text>
                                    <Select.Root
                                        {...register('categoria', { required: 'Selecciona una categoría' })}
                                        onValueChange={(value) => {
                                            const event = { target: { name: 'categoria', value } };
                                            register('categoria').onChange(event);
                                        }}
                                    >
                                        <Select.Trigger
                                            placeholder="Selecciona..."
                                            color={errors.categoria ? 'red' : undefined}
                                            style={{ width: '100%' }}
                                        />
                                        <Select.Content>
                                            <Select.Item value="estudiante">Estudiante</Select.Item>
                                            <Select.Item value="docente">Docente</Select.Item>
                                            <Select.Item value="administrativo">Administrativo</Select.Item>
                                        </Select.Content>
                                    </Select.Root>
                                    {errors.categoria && (
                                        <Text size="1" color="red" mt="1">
                                            {errors.categoria.message}
                                        </Text>
                                    )}
                                </label>

                                {/* Descripción */}
                                <label>
                                    <Text as="div" size="2" mb="1" weight="medium">
                                        Descripción
                                    </Text>
                                    <TextArea
                                        placeholder="Descripción detallada..."
                                        {...register('descripcion')}
                                        style={{ minHeight: '80px' }}
                                    />
                                </label>

                                {/* Tipo de Usuario */}
                                <label>
                                    <Text as="div" size="2" mb="2" weight="medium">
                                        Tipo de Usuario
                                    </Text>
                                    <RadioGroup.Root
                                        value={watch('tipo')}
                                        onValueChange={(value) => {
                                            const event = { target: { name: 'tipo', value } };
                                            register('tipo').onChange(event);
                                        }}
                                    >
                                        <Flex direction="column" gap="2">
                                            <label>
                                                <Flex gap="2" align="center">
                                                    <RadioGroup.Item value="individual" />
                                                    <Text size="2">Individual</Text>
                                                </Flex>
                                            </label>
                                            <label>
                                                <Flex gap="2" align="center">
                                                    <RadioGroup.Item value="empresa" />
                                                    <Text size="2">Empresa</Text>
                                                </Flex>
                                            </label>
                                            <label>
                                                <Flex gap="2" align="center">
                                                    <RadioGroup.Item value="gobierno" />
                                                    <Text size="2">Gobierno</Text>
                                                </Flex>
                                            </label>
                                        </Flex>
                                    </RadioGroup.Root>
                                </label>

                                {/* Switch - Activo */}
                                <label>
                                    <Flex gap="2" align="center">
                                        <Switch {...register('activo')} defaultChecked />
                                        <Text size="2" weight="medium">
                                            Estado Activo
                                        </Text>
                                    </Flex>
                                </label>

                                {/* Checkbox - Acepta términos */}
                                <label>
                                    <Flex gap="2" align="start">
                                        <Checkbox
                                            {...register('acepta', { required: 'Debes aceptar los términos' })}
                                        />
                                        <Flex direction="column">
                                            <Text size="2">Acepto los términos y condiciones</Text>
                                            {errors.acepta && (
                                                <Text size="1" color="red">
                                                    {errors.acepta.message}
                                                </Text>
                                            )}
                                        </Flex>
                                    </Flex>
                                </label>
                            </Flex>
                        </Card>
                    </Flex>
                </form>
            </Box>

            {/* FOOTER */}
            <Box p="4" style={{ borderTop: '1px solid var(--gray-4)' }}>
                <Flex gap="2" direction="column">
                    <Button
                        variant={activeView === 'help' ? 'solid' : 'soft'}
                        color="gray"
                        style={{ width: '100%', justifyContent: 'space-between' }}
                        onClick={() => onAction('help')}
                    >
                        <Flex align="center" gap="2">
                            <Info size={16} />
                            ¿Necesitas ayuda?
                        </Flex>
                        <ChevronRight size={16} />
                    </Button>
                    <Button type="submit" form="main-form" style={{ width: '100%' }}>
                        Guardar
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
}

// --- PANEL DE VISTA PREVIA ---
function PreviewContent({ onClose, data }) {
    return (
        <Flex direction="column" height="100%">
            <Flex
                justify="between"
                align="center"
                p="4"
                style={{ borderBottom: '1px solid var(--gray-4)' }}
            >
                <Heading size="4">Vista Previa</Heading>
                <IconButton variant="ghost" onClick={onClose} color="gray">
                    <ChevronRight size={20} />
                </IconButton>
            </Flex>
            <Box p="4" flexGrow="1" style={{ overflowY: 'auto' }}>
                <Flex direction="column" gap="3">
                    <Box>
                        <Text size="1" color="gray" weight="medium">
                            INFORMACIÓN PERSONAL
                        </Text>
                        <Separator my="2" size="4" />
                        <Flex direction="column" gap="2">
                            <Flex justify="between">
                                <Text weight="bold" size="2">
                                    Nombre:
                                </Text>
                                <Text size="2">{data.nombre || '-'}</Text>
                            </Flex>
                            <Flex justify="between">
                                <Text weight="bold" size="2">
                                    Email:
                                </Text>
                                <Text size="2">{data.email || '-'}</Text>
                            </Flex>
                            <Flex justify="between">
                                <Text weight="bold" size="2">
                                    Teléfono:
                                </Text>
                                <Text size="2">{data.telefono || '-'}</Text>
                            </Flex>
                        </Flex>
                    </Box>

                    <Box>
                        <Text size="1" color="gray" weight="medium">
                            DETALLES
                        </Text>
                        <Separator my="2" size="4" />
                        <Flex direction="column" gap="2">
                            <Flex justify="between">
                                <Text weight="bold" size="2">
                                    Categoría:
                                </Text>
                                <Badge>{data.categoria || 'Sin categoría'}</Badge>
                            </Flex>
                            <Flex justify="between">
                                <Text weight="bold" size="2">
                                    Tipo:
                                </Text>
                                <Badge color="blue">{data.tipo}</Badge>
                            </Flex>
                            <Flex justify="between">
                                <Text weight="bold" size="2">
                                    Estado:
                                </Text>
                                <Badge color={data.activo ? 'green' : 'gray'}>
                                    {data.activo ? 'Activo' : 'Inactivo'}
                                </Badge>
                            </Flex>
                        </Flex>
                    </Box>

                    {data.descripcion && (
                        <Box>
                            <Text size="1" color="gray" weight="medium">
                                DESCRIPCIÓN
                            </Text>
                            <Separator my="2" size="4" />
                            <Text size="2">{data.descripcion}</Text>
                        </Box>
                    )}
                </Flex>
            </Box>
        </Flex>
    );
}

// --- PANEL DE AYUDA ---
function HelpContent({ onClose }) {
    return (
        <Flex direction="column">
            <Flex justify="between" align="center" p="4">
                <Heading size="4">Ayuda</Heading>
                <IconButton variant="ghost" onClick={onClose} color="gray">
                    <ChevronRight size={20} />
                </IconButton>
            </Flex>
            <Box px="4" pb="6">
                <Flex direction="column" gap="3">
                    <Card variant="surface">
                        <Text weight="bold" size="2" mb="2" as="div">
                            Campos Requeridos
                        </Text>
                        <Text size="2" color="gray">
                            Los campos marcados con asterisco (*) son obligatorios para completar el
                            formulario.
                        </Text>
                    </Card>

                    <Card variant="surface">
                        <Text weight="bold" size="2" mb="2" as="div">
                            Vista Previa
                        </Text>
                        <Text size="2" color="gray">
                            Usa el botón "Vista Previa" para ver cómo se verán tus datos antes de
                            guardarlos.
                        </Text>
                    </Card>

                    <Card variant="surface">
                        <Text weight="bold" size="2" mb="2" as="div">
                            Validación
                        </Text>
                        <Text size="2" color="gray">
                            El formulario validará automáticamente los campos al intentar guardar. Revisa
                            los mensajes de error en rojo.
                        </Text>
                    </Card>
                </Flex>
            </Box>
        </Flex>
    );
}
