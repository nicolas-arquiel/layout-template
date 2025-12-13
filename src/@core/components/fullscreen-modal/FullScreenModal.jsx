import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Minimize2 } from 'lucide-react';
import { useTheme } from '@src/hooks/useTheme';
import { getColorClasses } from './utils/Utils';
import { FullScreenContext } from './FullScreenFooter';
import { FullScreenHeaderContext } from './FullScreenHeader';

/**
 * FullScreenModal - Modal de pantalla completa usando ReactDOM.createPortal + Tailwind
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
 * @param {number} zIndex - Z-index del modal (por defecto 1050)
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
  zIndex = 1050,
}) => {
  const [footerContent, setFooterContent] = useState(null);
  const [headerContent, setHeaderContent] = useState(null);
  const { themeSettings } = useTheme();

  // Obtener clases de color basadas en el tema
  const colorClasses = getColorClasses(color, themeSettings);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const originalStyles = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight
      };
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      return () => {
        document.body.style.overflow = originalStyles.overflow;
        document.body.style.paddingRight = originalStyles.paddingRight;
      };
    }
  }, [open]);

  // Manejar ESC key para cerrar
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && open && onOpenChange) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [open, onOpenChange]);

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
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/30 text-white rounded transition-colors duration-200 cursor-pointer border-0"
            aria-label="Cerrar modal"
          >
            <CloseIcon size={16} />
          </button>
        )}
      </div>
    </div>
  );

  if (!open) return null;

  const modalContent = (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-white ${className}`}
      style={{
        zIndex,
      }}
    >
      {/* Card-like structure */}
      <div className="h-full flex flex-col bg-white">
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
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default FullScreenModal;
