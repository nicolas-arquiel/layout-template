import React, { useState, useMemo } from 'react';
import { Check, ChevronDown, X, Search } from 'lucide-react';
import {
    Button,
    Popover,
    Flex,
    Text,
    TextField,
    Separator,
    Box
} from '@radix-ui/themes';

/**
 * Componente InputSelect adaptado a Radix UI Themes
 * Replica el diseño visual solicitado (Command style)
 * 
 * @param {Object} props
 * @param {Array} props.options - Opciones { label, value, icon? }
 * @param {string|Array} props.value - Valor seleccionado
 * @param {Function} props.onChange - Callback (value) => void
 * @param {string} props.placeholder - Placeholder
 * @param {boolean} props.clearable - Si se puede limpiar
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {boolean} props.multiple - Si permite selección múltiple
 */
const TanStackInputSelect = ({
    options = [],
    value,
    onChange,
    placeholder = "Select...",
    clearable = true,
    disabled = false,
    multiple = false,
    style,
    className
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    // Normalizar valor seleccionado
    const selectedValues = useMemo(() => {
        if (multiple) {
            return Array.isArray(value) ? value : (value ? [value] : []);
        }
        return value ? [value] : [];
    }, [value, multiple]);

    // Filtrar opciones
    const filteredOptions = useMemo(() => {
        if (!searchValue) return options;
        return options.filter(opt =>
            opt.label.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [options, searchValue]);

    const handleSelect = (optionValue) => {
        if (multiple) {
            const newValues = selectedValues.includes(optionValue)
                ? selectedValues.filter(v => v !== optionValue)
                : [...selectedValues, optionValue];
            onChange?.(newValues);
        } else {
            onChange?.(optionValue);
            setIsOpen(false);
        }
    };

    const handleClear = (e) => {
        e?.stopPropagation();
        onChange?.(multiple ? [] : "");
        if (!multiple) setIsOpen(false);
    };

    // Renderizado del trigger (botón)
    const renderTriggerContent = () => {
        if (selectedValues.length === 0) {
            return (
                <Text size="2" color="gray" style={{ flex: 1, textAlign: 'left' }}>
                    {placeholder}
                </Text>
            );
        }

        // Mostrar etiquetas seleccionadas
        const labels = selectedValues.map(val => {
            const opt = options.find(o => o.value === val);
            return opt?.label || val;
        }).join(', ');

        return (
            <Text size="2" style={{ flex: 1, textAlign: 'left', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {labels}
            </Text>
        );
    };

    return (
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>
                <Button
                    variant="outline"
                    disabled={disabled}
                    style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        fontWeight: 'normal',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--gray-12)',
                        ...style
                    }}
                    className={className}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {renderTriggerContent()}

                    <Flex align="center" gap="1" style={{ marginLeft: '8px' }}>
                        {clearable && selectedValues.length > 0 && (
                            <>
                                <div
                                    onClick={handleClear}
                                    style={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '2px',
                                        color: 'var(--gray-10)'
                                    }}
                                >
                                    <X size={14} />
                                </div>
                                <Separator orientation="vertical" style={{ height: '16px', margin: '0 4px' }} />
                            </>
                        )}
                        <ChevronDown size={14} style={{ color: 'var(--gray-10)' }} />
                    </Flex>
                </Button>
            </Popover.Trigger>

            <Popover.Content
                size="1"
                style={{ padding: 0, width: 'var(--radix-popover-trigger-width)', minWidth: '200px' }}
                align="start"
                sideOffset={4}
            >
                {/* Search Input */}
                <Box p="2" style={{ borderBottom: '1px solid var(--gray-4)' }}>
                    <TextField.Root
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        variant="soft"
                        style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                    >
                        <TextField.Slot>
                            <Search size={14} style={{ color: 'var(--gray-10)' }} />
                        </TextField.Slot>
                    </TextField.Root>
                </Box>

                {/* Options List */}
                <Box style={{ maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden' }}>
                    {filteredOptions.length === 0 ? (
                        <Box p="3" style={{ textAlign: 'center' }}>
                            <Text size="2" color="gray">No results found.</Text>
                        </Box>
                    ) : (
                        <Flex direction="column" p="1">
                            {filteredOptions.map(option => {
                                const isSelected = selectedValues.includes(option.value);
                                return (
                                    <Button
                                        key={option.value}
                                        variant="ghost"
                                        onClick={() => handleSelect(option.value)}
                                        style={{
                                            justifyContent: 'flex-start',
                                            height: 'auto',
                                            padding: '8px 12px',
                                            color: 'var(--gray-12)',
                                            fontWeight: 'normal',
                                            cursor: 'pointer',
                                            width: '100%'
                                        }}
                                    >
                                        <Flex align="center" gap="2" style={{ width: '100%', overflow: 'hidden' }}>
                                            <Box style={{ width: '16px', minWidth: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {isSelected && <Check size={14} style={{ color: 'var(--gray-12)' }} />}
                                            </Box>

                                            {option.icon && <option.icon size={14} style={{ color: 'var(--gray-11)', minWidth: '14px' }} />}

                                            <Text size="2" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                                {option.label}
                                            </Text>
                                        </Flex>
                                    </Button>
                                );
                            })}
                        </Flex>
                    )}
                </Box>
            </Popover.Content>
        </Popover.Root>
    );
};

export default TanStackInputSelect;
