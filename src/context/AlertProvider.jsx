import React, { useState, useCallback, useRef } from 'react';
import { Dialog, Button, Flex, Text, Box } from '@radix-ui/themes';
import { AlertContext } from './AlertContext';
import { CheckCircle, AlertTriangle, Info, XCircle, Loader } from 'lucide-react';

const ICONS = {
  success: <CheckCircle size={24} color="var(--grass-9)" />,
  error: <XCircle size={24} color="var(--red-9)" />,
  warning: <AlertTriangle size={24} color="var(--orange-9)" />,
  info: <Info size={24} color="var(--blue-9)" />,
};

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    message: '',
    html: null,
    icon: null,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    onConfirm: null,
    onCancel: null,
    allowOutsideClick: false,
    isLoading: false, // Controls spinner on confirm button
    isPageLoading: false, // Controls full page loading overlay
    customContent: null,
    _countdown: undefined, // Internal for timed alerts
  });

  const resolveRef = useRef(null);

  const closeAlert = useCallback((result = false) => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
    if (resolveRef.current) {
      resolveRef.current(result);
      resolveRef.current = null;
    }
  }, []);

  const handleConfirm = useCallback(async () => {
    // If it's a timed alert (has countdown), we allow confirm even if "isLoading" was set initially
    
    if (alertState.isLoading && alertState._countdown === undefined) return;

    try {
      if (alertState.onConfirm) {
        setAlertState(prev => ({ ...prev, isLoading: true }));
        const result = alertState.onConfirm();
        if (result instanceof Promise) {
           await result;
        }
      }
      closeAlert(true);
    } catch (error) {
      console.error("Error in alert confirmation:", error);
      setAlertState(prev => ({ ...prev, isLoading: false }));
    }
  }, [alertState, closeAlert]);

  const handleCancel = useCallback(() => {
    if (alertState.isLoading && alertState._countdown === undefined) return;
    
    if (alertState.onCancel) alertState.onCancel();
    closeAlert(false);
  }, [alertState, closeAlert]);


  const showConfirmAlert = useCallback((options) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setAlertState({
        isOpen: true,
        title: options.title || 'Confirmación',
        message: options.message || '',
        html: options.html || null,
        icon: options.icon || null,
        showConfirmButton: options.showConfirmButton ?? true,
        showCancelButton: options.showCancelButton ?? true,
        confirmButtonText: options.confirmButtonText || 'Aceptar',
        cancelButtonText: options.cancelButtonText || 'Cancelar',
        onConfirm: options.onConfirm,
        onCancel: options.onCancel,
        allowOutsideClick: options.allowOutsideClick ?? false,
        isLoading: false,
        isPageLoading: false,
        customContent: null,
        _countdown: undefined,
      });
    });
  }, []);

  const simpleAlert = useCallback((options) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setAlertState({
        isOpen: true,
        title: options.title || 'Alerta',
        message: options.message || '',
        html: options.html || null,
        icon: options.icon || null,
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        cancelButtonText: '',
        onConfirm: null,
        onCancel: null,
        allowOutsideClick: options.allowOutsideClick ?? false,
        isLoading: false,
        isPageLoading: false,
        customContent: null,
        _countdown: undefined,
      });
    });
  }, []);

  const simpleAlertNoButtons = useCallback((options) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setAlertState({
        isOpen: true,
        title: options.title || 'Alerta',
        message: options.message || '',
        html: options.html || null,
        icon: options.icon || null,
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonText: '',
        cancelButtonText: '',
        onConfirm: null,
        onCancel: null,
        allowOutsideClick: options.allowOutsideClick ?? false,
        isLoading: false,
        isPageLoading: false,
        customContent: null,
        _countdown: undefined,
      });
    });
  }, []);

  const loadingAlert = useCallback((message = "Cargando...") => {
    return new Promise((resolve) => {
      setAlertState({
        isOpen: true,
        title: message,
        message: '',
        html: null,
        icon: null,
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        isLoading: false,
        isPageLoading: true, // Special flag for loading state
        customContent: (
            <Flex justify="center" align="center" p="4">
                <Loader size={48} className="animate-spin text-blue-500" />
            </Flex>
        ),
        _countdown: undefined,
      });
      resolve({ isConfirmed: true }); 
    });
  }, []);

   const loadingAlertWithMessage = useCallback((message) => {
        return loadingAlert(message);
   }, [loadingAlert]);


  const timedAlert = useCallback((options) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      const { seconds = 5, title, html, icon } = options;
      
      setAlertState({
        isOpen: true,
        title: title || 'Alerta',
        message: '',
        html: html || null,
        icon: icon || null,
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: 'Entendido',
        allowOutsideClick: false,
        isLoading: false, 
        isPageLoading: false,
        customContent: null,
        _countdown: seconds
      });
    });
  }, []);

  const closeAllAlerts = useCallback(() => {
    closeAlert(false);
  }, [closeAlert]);


  return (
    <AlertContext.Provider value={{ showConfirmAlert, simpleAlert, simpleAlertNoButtons, loadingAlert, loadingAlertWithMessage, timedAlert, closeAllAlerts }}>
      {children}
      
      <Dialog.Root open={alertState.isOpen} onOpenChange={(open) => {
          if (!open && alertState.allowOutsideClick) {
              closeAlert(false);
          }
      }}>
        <Dialog.Content maxWidth="450px" aria-describedby="alert-description">
            
            <Dialog.Title size="5" weight="bold" mb="4">
                <Flex align="center" gap="3">
                    {/* Icon next to title */}
                    {alertState.icon && ICONS[alertState.icon] && (
                        <Box
                            style={{
                                padding: '8px',
                                borderRadius: '50%',
                                backgroundColor: `var(--${
                                    alertState.icon === 'success' ? 'grass' :
                                    alertState.icon === 'error' ? 'red' :
                                    alertState.icon === 'warning' ? 'orange' :
                                    'blue'
                                }-3)`,
                                color: `var(--${
                                    alertState.icon === 'success' ? 'grass' :
                                    alertState.icon === 'error' ? 'red' :
                                    alertState.icon === 'warning' ? 'orange' :
                                    'blue'
                                }-9)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {React.cloneElement(ICONS[alertState.icon], { size: 20, color: 'currentColor' })}
                        </Box>
                    )}
                    {alertState.title}
                </Flex>
            </Dialog.Title>
            
            {/* Always render Description for a11y, hide if empty */}
            <Dialog.Description 
                id="alert-description" 
                size="2" 
                color="gray"
                style={{ display: alertState.message ? 'block' : 'none' }}
                mb="4"
            >
                {alertState.message}
            </Dialog.Description>

            {alertState.html && (
                <Box 
                    mb="4"
                    width="100%" 
                    dangerouslySetInnerHTML={{ __html: alertState.html }} 
                />
            )}

            {alertState.customContent}

            {/* Buttons */}
            {!alertState.isPageLoading && (
                <>
                    {alertState._countdown !== undefined ? (
                        <TimedAlertContent 
                            initialSeconds={alertState._countdown} 
                            onConfirm={handleConfirm}
                        />
                    ) : (
                        (alertState.showConfirmButton || alertState.showCancelButton) && (
                            <Flex gap="3" mt="4" justify="end" width="100%">
                                {alertState.showCancelButton && (
                                    <Button 
                                        variant="soft" 
                                        color="gray" 
                                        onClick={handleCancel}
                                        disabled={alertState.isLoading}
                                    >
                                        {alertState.cancelButtonText}
                                    </Button>
                                )}
                                {alertState.showConfirmButton && (
                                    <Button 
                                        onClick={handleConfirm}
                                        disabled={alertState.isLoading}
                                    >
                                        {alertState.isLoading && <Loader className="animate-spin" size={16} />}
                                        {alertState.confirmButtonText}
                                    </Button>
                                )}
                            </Flex>
                        )
                    )}
                </>
            )}
        </Dialog.Content>
      </Dialog.Root>
    </AlertContext.Provider>
  );
};

// Componente auxiliar para manejar el contador del TimedAlert
const TimedAlertContent = ({ initialSeconds, onConfirm }) => {
    const [countdown, setCountdown] = React.useState(initialSeconds);
    
    React.useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const isFinished = countdown <= 0;

    return (
        <Flex gap="3" mt="4" justify="end" width="100%">
            <Button disabled={!isFinished} onClick={onConfirm}>
                {isFinished ? 'Entendido' : `Entendido (${countdown})`}
            </Button>
        </Flex>
    );
};
