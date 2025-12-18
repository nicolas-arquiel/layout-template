import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconButton, Theme, Heading, Button } from '@radix-ui/themes';
import { Minimize2 } from 'lucide-react';
import { useTheme } from '@src/hooks/useTheme';
import { getColorClasses } from './utils/Utils';
import { cn } from '@src/lib/utils';
import { FullScreenContext } from './FullScreenFooter';
import { FullScreenHeaderContext } from './FullScreenHeader';

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
  zIndex = 1050
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

  if (!open) return null;

  const defaultHeader = (
    <div
      className={cn(
        "flex justify-between items-center px-12 py-8 text-white flex-shrink-0",
        colorClasses.header
      )}
      style={colorClasses.headerStyle}
    >
      <Heading size="6" trim="start" className="m-0 text-white font-bold">{title}</Heading>

      {/* Contenido personalizado del header entre el título y el botón de cerrar */}
      <div className="flex items-center gap-2">
        {headerContent && (
          <div className="flex items-center gap-2 mr-3">
            {headerContent}
          </div>
        )}

        {showCloseButton && (
            <Button
              variant="soft"
            color="gray"
              size="2"
              onClick={handleClose}
              className="!bg-white/50 hover:!bg-white/30 cursor-pointer !rounded-xl !h-10 !w-auto !px-4"
            >
              <CloseIcon size={18} />
            </Button>
        )}
      </div>
    </div>
  );

  const modalContent = (
    <Theme
      appearance={themeSettings.appearance}
      accentColor={themeSettings.accentColor}
      grayColor={themeSettings.grayColor}
      radius={themeSettings.radius}
      scaling={themeSettings.scaling}
      className={cn(
        "fixed inset-0 flex flex-col w-screen h-screen bg-[var(--color-background)] text-[var(--text-color)]",
        className
      )}
      style={{
        zIndex,
        margin: 0,
        padding: 0,
        maxWidth: 'none',
        borderRadius: 0
      }}
    >
      {/* Header */}
      {customHeader || defaultHeader}

      {/* Body */}
      <div
        className={cn("flex-1 overflow-auto box-border p-12", bodyClassName)}
      >
        <FullScreenContext.Provider value={{ setFooterContent }}>
          <FullScreenHeaderContext.Provider value={{ setHeaderContent }}>
            {children}
          </FullScreenHeaderContext.Provider>
        </FullScreenContext.Provider>
      </div>

      {/* Footer */}
      {footerContent && (
        <div
          className={cn(
            "flex justify-end items-center gap-2 px-8 py-6 text-white flex-shrink-0",
            colorClasses.footer
          )}
          style={{ ...colorClasses.footerStyle, borderRadius: 0 }}
        >
          {footerContent}
        </div>
      )}
    </Theme>
  );

  // Renderizar en el body usando Portal
  return createPortal(modalContent, document.body);
};

export default FullScreenModal;
