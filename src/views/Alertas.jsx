import React from 'react';
import { Box, Button, Card, Flex, Heading, Text, Grid, Separator } from '@radix-ui/themes';
import { Bell, CheckCircle, AlertTriangle, Info, XCircle, Clock, Loader } from 'lucide-react';
import useCustomAlert from '@src/hooks/useCustomAlert';
import { BreadCrumbs } from '@core/components';

const Alertas = () => {
  const { 
    simpleAlert, 
    showConfirmAlert, 
    timedAlert, 
    loadingAlert, 
    loadingAlertWithMessage,
    simpleAlertNoButtons,
    closeAllAlerts 
  } = useCustomAlert();

  const handleSimpleSuccess = async () => {
    await simpleAlert({
      title: 'Operación Exitosa',
      message: 'Los cambios se han guardado correctamente.',
      icon: 'success'
    });
  };

  const handleSimpleError = async () => {
    await simpleAlert({
      title: 'Error',
      message: 'No se pudo conectar con el servidor.',
      icon: 'error'
    });
  };

  const handleSimpleInfo = async () => {
    await simpleAlert({
      title: 'Información',
      message: 'Hay una nueva actualización disponible.',
      icon: 'info'
    });
  };

  const handleSimpleWarning = async () => {
    await simpleAlert({
      title: 'Advertencia',
      message: 'Esta acción no se puede deshacer.',
      icon: 'warning'
    });
  };

  const handleConfirm = async () => {
    const confirmed = await showConfirmAlert({
      title: '¿Estás seguro?',
      message: 'Se eliminará el registro permanentemente.',
      icon: 'warning',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      onConfirm: async () => {
        // Simular operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Eliminado!');
      }
    });

    if (confirmed) {
      await simpleAlert({ title: 'Eliminado', message: 'El registro fue eliminado.', icon: 'success' });
    } else {
      console.log('Cancelado');
    }
  };

  const handleTimed = async () => {
    await timedAlert({
      title: 'Aviso Importante',
      html: '<p>Este mensaje se cerrará automáticamente o podrás cerrarlo en unos segundos.</p>',
      icon: 'info',
      seconds: 5
    });
  };

  const handleLoading = async () => {
    await loadingAlert('Procesando datos...');
    
    // Simular proceso
    setTimeout(() => {
      closeAllAlerts();
      simpleAlert({ title: 'Listo', message: 'Proceso terminado', icon: 'success' });
    }, 3000);
  };

  const handleLoadingMessage = async () => {
      await loadingAlertWithMessage('Cargando configuración...');
      setTimeout(() => {
          closeAllAlerts();
      }, 2000);
  }

  const handleNoButtons = async () => {
      simpleAlertNoButtons({
          title: 'Alerta sin botones',
          message: 'Haz clic fuera para cerrar (si allowOutsideClick es true) o espera...',
          allowOutsideClick: true
      });
  }

  return (
    <Box p="4">
      <BreadCrumbs 
        title="Alertas" 
        data={[{ title: 'Inicio', link: '/inicio' }, { title: 'Alertas' }]} 
      />
      <Text color="gray" mb="6" as="p">
        Ejemplos de uso del hook <code>useCustomAlert</code> con Radix UI.
      </Text>

      <Grid columns={{ initial: '1', md: '2' }} gap="4">
        
        {/* Alertas Simples */}
        <Card>
          <Flex direction="column" gap="3">
            <Heading size="4">Alertas Simples</Heading>
            <Separator size="4" />
            <Flex gap="3" wrap="wrap">
              <Button color="green" onClick={handleSimpleSuccess}>
                <CheckCircle size={16} /> Success
              </Button>
              <Button color="red" onClick={handleSimpleError}>
                <XCircle size={16} /> Error
              </Button>
              <Button color="blue" onClick={handleSimpleInfo}>
                <Info size={16} /> Info
              </Button>
              <Button color="orange" onClick={handleSimpleWarning}>
                <AlertTriangle size={16} /> Warning
              </Button>
            </Flex>
          </Flex>
        </Card>

        {/* Confirmación */}
        <Card>
          <Flex direction="column" gap="3">
            <Heading size="4">Confirmación</Heading>
            <Separator size="4" />
            <Text size="2">Muestra un diálogo con opciones de Aceptar/Cancelar y soporta operaciones asíncronas.</Text>
            <Button variant="soft" onClick={handleConfirm}>
              <AlertTriangle size={16} /> Probar Confirmación
            </Button>
          </Flex>
        </Card>

        {/* Temporizador */}
        <Card>
          <Flex direction="column" gap="3">
            <Heading size="4">Temporizador</Heading>
            <Separator size="4" />
            <Text size="2">Botón deshabilitado hasta que termine la cuenta regresiva.</Text>
            <Button variant="outline" onClick={handleTimed}>
              <Clock size={16} /> Probar Timed Alert (5s)
            </Button>
          </Flex>
        </Card>

        {/* Carga */}
        <Card>
          <Flex direction="column" gap="3">
            <Heading size="4">Loading</Heading>
            <Separator size="4" />
            <Text size="2">Muestra un spinner de carga. Debe cerrarse programáticamente.</Text>
            <Flex gap="3">
                <Button variant="ghost" onClick={handleLoading}>
                <Loader size={16} /> Loading (3s)
                </Button>
                 <Button variant="ghost" onClick={handleLoadingMessage}>
                <Loader size={16} /> Loading Message (2s)
                </Button>
            </Flex>
          </Flex>
        </Card>

         {/* Sin Botones */}
         <Card>
          <Flex direction="column" gap="3">
            <Heading size="4">Sin Botones</Heading>
            <Separator size="4" />
            <Text size="2">Alerta informativa simple sin botones de acción explícitos.</Text>
            <Button variant="surface" onClick={handleNoButtons}>
              Probar Sin Botones
            </Button>
          </Flex>
        </Card>

      </Grid>
    </Box>
  );
};

export default Alertas;
