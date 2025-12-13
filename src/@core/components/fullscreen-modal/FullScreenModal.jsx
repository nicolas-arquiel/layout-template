import React, { useState } from 'react';
import { Dialog, IconButton, Flex } from '@radix-ui/themes';
import { X, Minimize2 } from 'lucide-react';
import { useTheme } from '@src/hooks/useTheme';
import { getColorClasses } from './utils/Utils';
import { FullScreenContext } from './FullScreenFooter';
import { FullScreenHeaderContext } from './FullScreenHeader';

/**
 * FullScreenModal - Modal de pantalla completa usando Radix Dialog + Tailwind
 *
 * @param {boolean} open - Estado de apertura del modal
 * @param {function} onOpenChange - Callback para cambiar el estado de apertura
 * @param {string} title - Título del modal
 * @param {string} color - Color del tema (primary, success, danger, warning, info, secondary)
 * @param {ReactNode} children - Contenido del modal
 * @param {ReactNode} customHeader - Header personalizado (reemplaza el header por defecto)
 * @param {boolean} showCloseButton - Mostrar botón de cerrar
 * @param {Component} closeIcon - Icono del botón de cerrar (por defecto Minimize2)
 * @param {string} className - Clase adicional para el contenedor
 * @param {string} bodyClassName - Clase adicional para el body
 */
const FullScreenModal = ({
  open = false,
  onOpenChange,
  title = "Vista Completa",
  color = 'primary',
  children,
  customHeader = null,
  showCloseButton = true,
  closeIcon: CloseIcon = Minimize2,
  className = "",
  bodyClassName = "",
}) => {
  const [footerContent, setFooterContent] = useState(null);
  const [headerContent, setHeaderContent] = useState(null);
  const { themeSettings } = useTheme();

  // Obtener clases de color basadas en el tema
  const colorClasses = getColorClasses(color, themeSettings);

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const defaultHeader = (
    <div
      className={`px-4 py-3 text-white flex justify-between items-center ${colorClasses.header}`}
      style={colorClasses.headerStyle}
    >
      <h4 className="m-0 text-white font-bold text-xl">{title}</h4>

      {/* Contenido personalizado del header entre el título y el botón de cerrar */}
      <div className="flex items-center gap-2">
        {headerContent && (
          <div className="flex items-center gap-2 mr-3">
            {headerContent}
          </div>
        )}

        {showCloseButton && (
          <IconButton
            variant="soft"
            color="gray"
            size="2"
            onClick={handleClose}
            className="!bg-white/20 hover:!bg-white/30 !text-white cursor-pointer"
          >
            <CloseIcon size={16} />
          </IconButton>
        )}
      </div>
    </div>
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        className={`!p-0 !max-w-none !w-screen !h-screen !m-0 !rounded-none ${className}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {/* Card-like structure */}
        <div className="h-full flex flex-col bg-white dark:bg-gray-900">
          {/* Header */}
          {customHeader || defaultHeader}

          {/* Body */}
          <div className={`flex-1 overflow-auto ${bodyClassName}`}>
            <div className="px-6 py-4">
              <FullScreenContext.Provider value={{ setFooterContent }}>
                <FullScreenHeaderContext.Provider value={{ setHeaderContent }}>
                  {children}
                </FullScreenHeaderContext.Provider>
              </FullScreenContext.Provider>
            </div>
          </div>

          {/* Footer */}
          {footerContent && (
            <div
              className={`px-4 py-2 text-white flex justify-end items-center gap-2 ${colorClasses.footer}`}
              style={colorClasses.footerStyle}
            >
              {footerContent}
            </div>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default FullScreenModal;
