import { useState } from 'react';
import {
  FullScreenModal,
  FullScreenFooter,
  FullScreenHeader,
} from '@/@core/components/fullscreen-modal';
import {
  Button,
  Flex,
  Text,
  Heading,
  Card,
  Badge,
  TextField,
  TextArea,
  Grid,
  Callout,
  Code,
  Separator,
} from '@radix-ui/themes';
import {
  Download,
  Share2,
  Save,
  X,
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Maximize2,
} from 'lucide-react';

/**
 * Página de ejemplos del FullScreenModal
 * Demuestra todos los casos de uso del componente migrado de Reactstrap a Radix + Tailwind
 */
export default function FullScreenModalExamples() {
  // Estados para cada modal de ejemplo
  const [modalBasico, setModalBasico] = useState(false);
  const [modalConFooter, setModalConFooter] = useState(false);
  const [modalCompleto, setModalCompleto] = useState(false);
  const [modalPrimary, setModalPrimary] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalDanger, setModalDanger] = useState(false);
  const [modalWarning, setModalWarning] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [modalFormulario, setModalFormulario] = useState(false);
  const [modalCustomHeader, setModalCustomHeader] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });

  const handleSave = () => {
    console.log('Datos guardados:', formData);
    setModalFormulario(false);
  };

  return (
    <div className="p-6">
      <Heading size="8" mb="2">
        FullScreenModal - Ejemplos
      </Heading>
      <Text color="gray" size="4" mb="6">
        Componente migrado de Reactstrap a Radix UI + Tailwind, integrado con el sistema de temas
      </Text>

      {/* Sección: Información */}
      <Card mb="6">
        <Heading size="4" mb="3">
          📋 Sobre este componente
        </Heading>
        <Flex direction="column" gap="2">
          <Text>
            <strong>FullScreenModal</strong> es un modal que ocupa toda la pantalla, ideal para
            editar formularios extensos o mostrar información detallada.
          </Text>
          <Text color="gray" size="2">
            ✅ Integrado con sistema de temas • ✅ Soporta colores semánticos • ✅ Header y Footer personalizables
          </Text>
        </Flex>
      </Card>

      {/* Sección 1: Modal Básico */}
      <Card mb="6">
        <Flex direction="column" gap="4">
          <div>
            <Heading size="5" mb="2">
              1️⃣ Modal Básico
            </Heading>
            <Text color="gray" size="2" mb="3">
              Modal simple con título y contenido. Sin header ni footer personalizado.
            </Text>
            <Button onClick={() => setModalBasico(true)}>
              <Maximize2 size={16} />
              Abrir Modal Básico
            </Button>
          </div>

          <Callout.Root size="1">
            <Callout.Icon>
              <Info size={16} />
            </Callout.Icon>
            <Callout.Text>
              <Code>open</Code> y <Code>onOpenChange</Code> controlan el estado del modal
            </Callout.Text>
          </Callout.Root>
        </Flex>
      </Card>

      {/* Sección 2: Modal con Footer */}
      <Card mb="6">
        <Flex direction="column" gap="4">
          <div>
            <Heading size="5" mb="2">
              2️⃣ Modal con Footer
            </Heading>
            <Text color="gray" size="2" mb="3">
              Incluye botones de acción en el footer usando el componente <Code>FullScreenFooter</Code>
            </Text>
            <Button onClick={() => setModalConFooter(true)}>
              <Maximize2 size={16} />
              Abrir Modal con Footer
            </Button>
          </div>
        </Flex>
      </Card>

      {/* Sección 3: Modal Completo */}
      <Card mb="6">
        <Flex direction="column" gap="4">
          <div>
            <Heading size="5" mb="2">
              3️⃣ Modal Completo
            </Heading>
            <Text color="gray" size="2" mb="3">
              Con header personalizado y footer. Incluye badges y botones adicionales.
            </Text>
            <Button onClick={() => setModalCompleto(true)}>
              <Maximize2 size={16} />
              Abrir Modal Completo
            </Button>
          </div>
        </Flex>
      </Card>

      {/* Sección 4: Colores Semánticos */}
      <Card mb="6">
        <Flex direction="column" gap="4">
          <Heading size="5" mb="3">
            4️⃣ Colores Semánticos
          </Heading>
          <Text color="gray" size="2" mb="3">
            Los colores se adaptan automáticamente según la configuración del tema
          </Text>

          <Grid columns="3" gap="3">
            <Button onClick={() => setModalPrimary(true)} variant="surface">
              Primary
            </Button>
            <Button onClick={() => setModalSuccess(true)} variant="surface" color="green">
              Success
            </Button>
            <Button onClick={() => setModalDanger(true)} variant="surface" color="red">
              Danger
            </Button>
            <Button onClick={() => setModalWarning(true)} variant="surface" color="orange">
              Warning
            </Button>
            <Button onClick={() => setModalInfo(true)} variant="surface" color="blue">
              Info
            </Button>
          </Grid>
        </Flex>
      </Card>

      {/* Sección 5: Formulario */}
      <Card mb="6">
        <Flex direction="column" gap="4">
          <div>
            <Heading size="5" mb="2">
              5️⃣ Modal con Formulario
            </Heading>
            <Text color="gray" size="2" mb="3">
              Ideal para editar información extensa con múltiples campos
            </Text>
            <Button onClick={() => setModalFormulario(true)}>
              <Maximize2 size={16} />
              Abrir Formulario
            </Button>
          </div>
        </Flex>
      </Card>

      {/* Sección 6: Header Personalizado */}
      <Card mb="6">
        <Flex direction="column" gap="4">
          <div>
            <Heading size="5" mb="2">
              6️⃣ Header Completamente Personalizado
            </Heading>
            <Text color="gray" size="2" mb="3">
              Reemplaza el header por defecto con tu propio diseño usando <Code>customHeader</Code>
            </Text>
            <Button onClick={() => setModalCustomHeader(true)}>
              <Maximize2 size={16} />
              Abrir con Header Personalizado
            </Button>
          </div>
        </Flex>
      </Card>

      {/* ============================================ */}
      {/* MODALES */}
      {/* ============================================ */}

      {/* Modal Básico */}
      <FullScreenModal
        open={modalBasico}
        onOpenChange={setModalBasico}
        title="Modal Básico"
        color="primary"
      >
        <Heading size="6" mb="4">
          Contenido del Modal
        </Heading>
        <Text mb="4">
          Este es un modal básico de pantalla completa. Ocupa todo el viewport y tiene scroll
          automático cuando el contenido es largo.
        </Text>
        <Text color="gray">
          Puedes cerrar este modal presionando <Code>ESC</Code>, haciendo clic en el botón de
          cerrar, o haciendo clic fuera del contenido.
        </Text>
      </FullScreenModal>

      {/* Modal con Footer */}
      <FullScreenModal
        open={modalConFooter}
        onOpenChange={setModalConFooter}
        title="Editar Documento"
        color="success"
      >
        <Heading size="6" mb="4">
          Documento #12345
        </Heading>
        <Text mb="4">
          Aquí va el contenido del documento. El footer contiene los botones de acción.
        </Text>
        <Callout.Root color="green">
          <Callout.Icon>
            <CheckCircle2 size={16} />
          </Callout.Icon>
          <Callout.Text>Los cambios se guardarán al hacer clic en "Guardar"</Callout.Text>
        </Callout.Root>

        <FullScreenFooter>
          <Flex gap="3">
            <Button variant="soft" color="gray" onClick={() => setModalConFooter(false)}>
              <X size={16} />
              Cancelar
            </Button>
            <Button onClick={() => setModalConFooter(false)}>
              <Save size={16} />
              Guardar Cambios
            </Button>
          </Flex>
        </FullScreenFooter>
      </FullScreenModal>

      {/* Modal Completo */}
      <FullScreenModal
        open={modalCompleto}
        onOpenChange={setModalCompleto}
        title="Vista de Detalles"
        color="info"
      >
        <FullScreenHeader>
          <Flex gap="2" align="center">
            <Badge color="blue">Nuevo</Badge>
            <Button size="2" variant="soft">
              <Share2 size={14} />
              Compartir
            </Button>
            <Button size="2" variant="soft">
              <Download size={14} />
              Descargar
            </Button>
          </Flex>
        </FullScreenHeader>

        <Flex direction="column" gap="6">
          <div>
            <Heading size="7" mb="4">
              Proyecto: Sistema de Gestión
            </Heading>
            <Text color="gray" mb="6">
              Última actualización: Hoy a las 10:30 AM
            </Text>
          </div>

          <Card>
            <Heading size="4" mb="3">
              Descripción
            </Heading>
            <Text>
              Este es un proyecto de ejemplo que demuestra las capacidades del FullScreenModal con
              header y footer personalizados. Puedes agregar cualquier contenido aquí.
            </Text>
          </Card>

          <Card>
            <Heading size="4" mb="3">
              Características
            </Heading>
            <Flex direction="column" gap="2">
              <Text>✅ Header con botones y badges personalizados</Text>
              <Text>✅ Contenido scrolleable con múltiples secciones</Text>
              <Text>✅ Footer con acciones contextuales</Text>
              <Text>✅ Integración completa con el tema</Text>
            </Flex>
          </Card>
        </Flex>

        <FullScreenFooter>
          <Flex gap="3">
            <Button variant="soft" color="gray" onClick={() => setModalCompleto(false)}>
              Cerrar
            </Button>
            <Button variant="soft">Guardar Borrador</Button>
            <Button>Publicar</Button>
          </Flex>
        </FullScreenFooter>
      </FullScreenModal>

      {/* Modal Primary */}
      <FullScreenModal
        open={modalPrimary}
        onOpenChange={setModalPrimary}
        title="Modal Primary"
        color="primary"
      >
        <Callout.Root>
          <Callout.Icon>
            <Info size={16} />
          </Callout.Icon>
          <Callout.Text>
            Este modal usa el color <strong>primary</strong> que se mapea al{' '}
            <Code>accentColor</Code> configurado en el tema
          </Callout.Text>
        </Callout.Root>
      </FullScreenModal>

      {/* Modal Success */}
      <FullScreenModal
        open={modalSuccess}
        onOpenChange={setModalSuccess}
        title="Operación Exitosa"
        color="success"
      >
        <Callout.Root color="green">
          <Callout.Icon>
            <CheckCircle2 size={16} />
          </Callout.Icon>
          <Callout.Text>
            Este modal usa el color <strong>success</strong> que se mapea al{' '}
            <Code>successColor</Code> del tema (generalmente verde o jade)
          </Callout.Text>
        </Callout.Root>
      </FullScreenModal>

      {/* Modal Danger */}
      <FullScreenModal
        open={modalDanger}
        onOpenChange={setModalDanger}
        title="¡Atención! Acción Peligrosa"
        color="danger"
      >
        <Callout.Root color="red">
          <Callout.Icon>
            <AlertCircle size={16} />
          </Callout.Icon>
          <Callout.Text>
            Este modal usa el color <strong>danger</strong> que se mapea al{' '}
            <Code>dangerColor</Code> del tema (generalmente rojo o tomato)
          </Callout.Text>
        </Callout.Root>
      </FullScreenModal>

      {/* Modal Warning */}
      <FullScreenModal
        open={modalWarning}
        onOpenChange={setModalWarning}
        title="Advertencia"
        color="warning"
      >
        <Callout.Root color="orange">
          <Callout.Icon>
            <AlertTriangle size={16} />
          </Callout.Icon>
          <Callout.Text>
            Este modal usa el color <strong>warning</strong> que se mapea al{' '}
            <Code>warningColor</Code> del tema (generalmente naranja o ámbar)
          </Callout.Text>
        </Callout.Root>
      </FullScreenModal>

      {/* Modal Info */}
      <FullScreenModal
        open={modalInfo}
        onOpenChange={setModalInfo}
        title="Información"
        color="info"
      >
        <Callout.Root color="blue">
          <Callout.Icon>
            <Info size={16} />
          </Callout.Icon>
          <Callout.Text>
            Este modal usa el color <strong>info</strong> que se mapea al <Code>infoColor</Code>{' '}
            del tema (generalmente azul o cyan)
          </Callout.Text>
        </Callout.Root>
      </FullScreenModal>

      {/* Modal Formulario */}
      <FullScreenModal
        open={modalFormulario}
        onOpenChange={setModalFormulario}
        title="Crear Nueva Tarea"
        color="primary"
      >
        <Flex direction="column" gap="4">
          <div>
            <Text size="2" weight="medium" mb="2" as="div">
              Nombre de la tarea *
            </Text>
            <TextField.Root
              placeholder="Ingresa el nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

          <div>
            <Text size="2" weight="medium" mb="2" as="div">
              Descripción
            </Text>
            <TextArea
              placeholder="Describe la tarea..."
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              style={{ minHeight: '200px' }}
            />
          </div>

          <Separator size="4" />

          <Callout.Root>
            <Callout.Icon>
              <Info size={16} />
            </Callout.Icon>
            <Callout.Text>
              Los campos marcados con <strong>*</strong> son obligatorios
            </Callout.Text>
          </Callout.Root>
        </Flex>

        <FullScreenFooter>
          <Flex gap="3">
            <Button
              variant="soft"
              color="gray"
              onClick={() => {
                setModalFormulario(false);
                setFormData({ nombre: '', descripcion: '' });
              }}
            >
              <X size={16} />
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!formData.nombre}>
              <Save size={16} />
              Guardar Tarea
            </Button>
          </Flex>
        </FullScreenFooter>
      </FullScreenModal>

      {/* Modal con Header Personalizado */}
      <FullScreenModal
        open={modalCustomHeader}
        onOpenChange={setModalCustomHeader}
        customHeader={
          <div className="px-6 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white flex justify-between items-center">
            <Flex align="center" gap="3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Maximize2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Header Personalizado</h4>
                <p className="text-sm opacity-80 m-0">Con gradiente y diseño único</p>
              </div>
            </Flex>
            <Button
              variant="soft"
              size="2"
              onClick={() => setModalCustomHeader(false)}
              className="!bg-white/20 hover:!bg-white/30 cursor-pointer"
            >
              <X size={16} />
            </Button>
          </div>
        }
      >
        <Heading size="6" mb="4">
          Contenido con Header Personalizado
        </Heading>
        <Text mb="4">
          Puedes reemplazar completamente el header por defecto usando la prop{' '}
          <Code>customHeader</Code>. Esto te da control total sobre el diseño.
        </Text>
        <Callout.Root color="purple">
          <Callout.Icon>
            <Info size={16} />
          </Callout.Icon>
          <Callout.Text>
            El header personalizado puede incluir cualquier contenido JSX
          </Callout.Text>
        </Callout.Root>

        <FullScreenFooter>
          <Button onClick={() => setModalCustomHeader(false)}>Cerrar</Button>
        </FullScreenFooter>
      </FullScreenModal>
    </div>
  );
}
