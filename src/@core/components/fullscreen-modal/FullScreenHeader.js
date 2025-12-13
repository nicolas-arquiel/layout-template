import React, { useContext, useEffect } from "react";

/**
 * Context para comunicar el contenido del header al FullScreenModal
 */
const FullScreenHeaderContext = React.createContext();

/**
 * FullScreenHeader - Componente para agregar contenido personalizado al header del modal
 *
 * Este componente no renderiza nada directamente, solo pasa su contenido
 * al header del FullScreenModal a través del contexto.
 *
 * @param {ReactNode} children - Contenido a mostrar en el header
 *
 * @example
 * <FullScreenModal open={true} onOpenChange={setOpen}>
 *   <FullScreenHeader>
 *     <Button>Acción</Button>
 *   </FullScreenHeader>
 *   <p>Contenido del modal</p>
 * </FullScreenModal>
 */
const FullScreenHeader = ({ children }) => {
  const context = useContext(FullScreenHeaderContext);

  useEffect(() => {
    if (context && context.setHeaderContent) {
      context.setHeaderContent(children);
    }
    return () => {
      if (context && context.setHeaderContent) {
        context.setHeaderContent(null);
      }
    };
  }, [children, context]);

  return null; // No renderiza nada
};

export default FullScreenHeader;
export { FullScreenHeaderContext };
