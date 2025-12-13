import React, { useContext, useEffect } from "react";

/**
 * Context para comunicar el contenido del footer al FullScreenModal
 */
const FullScreenContext = React.createContext();

/**
 * FullScreenFooter - Componente para agregar un footer al modal
 *
 * Este componente no renderiza nada directamente, solo pasa su contenido
 * al footer del FullScreenModal a través del contexto.
 *
 * @param {ReactNode} children - Contenido a mostrar en el footer
 *
 * @example
 * <FullScreenModal open={true} onOpenChange={setOpen}>
 *   <p>Contenido del modal</p>
 *   <FullScreenFooter>
 *     <Button>Cancelar</Button>
 *     <Button>Guardar</Button>
 *   </FullScreenFooter>
 * </FullScreenModal>
 */
const FullScreenFooter = ({ children }) => {
  const context = useContext(FullScreenContext);

  useEffect(() => {
    if (context && context.setFooterContent) {
      context.setFooterContent(children);
    }
    return () => {
      if (context && context.setFooterContent) {
        context.setFooterContent(null);
      }
    };
  }, [children, context]);

  return null; // No renderiza nada
};

export default FullScreenFooter;
export { FullScreenContext };
