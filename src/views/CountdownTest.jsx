import React from 'react';
import { Card, Flex, Heading, Text, Grid, Box } from '@radix-ui/themes';
import { CuentaRegresivaEvento, CuentaRegresivaInicio, CuentaRegresivaFin } from '../@core/components/countdown';
import { DateTime } from 'luxon';

const CountdownTest = () => {
  // Helpers para generar fechas relativas
  const ahora = DateTime.now().setZone('America/Argentina/Buenos_Aires');
  
  const eventoFuturo = ahora.plus({ days: 2, hours: 5, minutes: 30 });
  const eventoCercano = ahora.plus({ minutes: 45, seconds: 10 });
  const eventoEnCurso = {
    inicio: ahora.minus({ hours: 1 }),
    fin: ahora.plus({ hours: 2 })
  };
  const eventoPasado = ahora.minus({ days: 1, hours: 2 });

  const formatDate = (dt) => dt.toFormat('yyyy-MM-dd');
  const formatTime = (dt) => dt.toFormat('HH:mm');

  return (
    <Box p="6">
      <Box mb="6">
        <Heading size="6" mb="2">Prueba de Componente Countdown</Heading>
        <Text color="gray" size="2">Verificando diferentes estados y configuraciones del componente.</Text>
      </Box>

      <Grid columns={{ initial: '1', md: '2' }} gap="6">
        {/* Caso 1: Evento por iniciar (Futuro Lejano) */}
        <Card variant="surface">
          <Flex direction="column" gap="4" align="center" p="4">
            <Heading size="3">Evento Futuro (+2 días)</Heading>
            <CuentaRegresivaInicio
              fecha={formatDate(eventoFuturo)}
              hora={formatTime(eventoFuturo)}
              permitirCambioModo={true}
            />
            <Text size="1" color="gray" align="center">
              Debe mostrar "Comienza en X días Y horas" o cuenta regresiva.
              <br/>Click para cambiar modo.
            </Text>
          </Flex>
        </Card>

        {/* Caso 2: Evento por iniciar (Cercano) */}
        <Card variant="surface">
          <Flex direction="column" gap="4" align="center" p="4">
            <Heading size="3">Evento Cercano (+45 min)</Heading>
            <CuentaRegresivaInicio
              fecha={formatDate(eventoCercano)}
              hora={formatTime(eventoCercano)}
              permitirCambioModo={true}
              colorInicio="info"
            />
            <Text size="1" color="gray" align="center">
              Prueba de color 'info'.
            </Text>
          </Flex>
        </Card>

        {/* Caso 3: Evento En Curso */}
        <Card variant="surface">
          <Flex direction="column" gap="4" align="center" p="4">
            <Heading size="3">Evento En Curso</Heading>
            <CuentaRegresivaEvento
              fechaInicio={formatDate(eventoEnCurso.inicio)}
              horaInicio={formatTime(eventoEnCurso.inicio)}
              fechaFin={formatDate(eventoEnCurso.fin)}
              horaFin={formatTime(eventoEnCurso.fin)}
              permitirCambioModo={true}
              textoFinaliza="Termina en"
            />
            <Text size="1" color="gray" align="center">
              Debe mostrar "Termina en...". Color 'warning' por defecto.
            </Text>
          </Flex>
        </Card>

        {/* Caso 4: Evento Finalizado */}
        <Card variant="surface">
          <Flex direction="column" gap="4" align="center" p="4">
            <Heading size="3">Evento Finalizado</Heading>
            <CuentaRegresivaFin
              fecha={formatDate(eventoPasado)}
              hora={formatTime(eventoPasado)}
              permitirCambioModo={true}
            />
            <Text size="1" color="gray" align="center">
              Debe mostrar "Finalizó hace...". No debe permitir cambiar modo.
            </Text>
          </Flex>
        </Card>
      </Grid>
    </Box>
  );
};

export default CountdownTest;
