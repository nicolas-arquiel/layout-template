import React, { createElement } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, X, ArrowRight } from "lucide-react";
import { Dialog, Flex, Box, Text, Button, IconButton, Badge } from "@radix-ui/themes";
import CanvasForm from "@core/components/canvas/CanvasForm";
import FullScreenModal from "@core/components/fullscreen-modal/FullScreenModal";
import { cn } from "@src/lib/utils";

/**
 * Generic ModalForm wrapper using Radix Dialog
 */
const ModalForm = ({ openModal, setOpenModal, children, title, maxWidth = 500 }) => {
  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Content style={{ maxWidth: maxWidth }}>
        <Flex justify="between" align="center" mb="4">
             {title && <Dialog.Title mb="0">{title}</Dialog.Title>}
            <Dialog.Close>
            <IconButton
                variant="ghost"
                color="gray"
                size="2"
            >
                <X size={18} />
            </IconButton>
            </Dialog.Close>
        </Flex>
        
        <Box>
            {children}
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
};

/**
 * ActionListItem - Generic generic list item component with various action types.
 * 
 * Supported types:
 * - link: Navigates to a route.
 * - modalform: Opens a centered dialog.
 * - canvasform: Opens a side canvas.
 * - fullscreen: Opens a fullscreen modal.
 * - action: Executes a callback function.
 * 
 * Props:
 * @param {object} item - Configuration object for the item.
 * @param {object} canvasOpenState - State object tracking open/close status of modals/canvases.
 * @param {function} toggleCanvas - Function to toggle state by item ID.
 * @param {function} handleDirectAction - Callback for 'action' type items.
 * @param {object} extraData - Additional data to pass to rendered components.
 * @param {string} className - Optional className override for the list item container.
 * @param {boolean} showChevron - Whether to show the right chevron arrow (default: true).
 */
const ActionListItem = ({
  item,
  canvasOpenState = {},
  toggleCanvas = () => {},
  handleDirectAction = () => {},
  extraData = {},
  className,
  showChevron = true
}) => {
  // Shared content render
  const renderContent = () => (
    <>
      <Flex align="center" gap="3" className="w-full">
        {/* Icon wrapper */}
        {item.icon && (
            <Box className={cn("text-primary-500", item.iconClassName)}>
            {item.icon}
            </Box>
        )}
        
        <Box className="flex-1">
            <Flex align="center" gap="2">
                <Text as="div" weight="medium" size="2" className="text-gray-900">
                    {item.title}
                </Text>
                {item.badge && (
                    <Badge color={item.badgeColor || 'blue'} variant="soft" radius="full">
                        {item.badge}
                    </Badge>
                )}
            </Flex>
            {item.subtitle && (
                <Text as="div" size="1" color="gray" className="text-gray-500 mt-0.5">
                    {item.subtitle}
                </Text>
            )}
        </Box>

        {showChevron && (
            <Box className="text-gray-400">
                <ChevronRight size={18} />
            </Box>
        )}
      </Flex>
    </>
  );

  // Common list item styles
  const baseClassName = "flex items-center justify-between w-full p-4 border-b border-gray-100 hover:bg-gray-50/80 transition-all duration-200 text-left bg-white cursor-pointer group";
  const finalClassName = cn(baseClassName, className, item.className);

  // === LINK ===
  if (item.type === "link") {
    return (
      <Link
        to={item.navlink}
        className={finalClassName}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {renderContent()}
      </Link>
    );
  }

  // === MODAL FORM ===
  if (item.type === "modalform") {
    return (
      <React.Fragment key={item.id}>
        <button
          className={finalClassName}
          onClick={() => toggleCanvas(item.id)}
          type="button"
        >
          {renderContent()}
        </button>
        <ModalForm
          openModal={canvasOpenState[item.id]}
          setOpenModal={(open) => !open && toggleCanvas(item.id)}
          title={item.modalTitle || item.title}
          maxWidth={item.modalWidth}
        >
          {item.component && createElement(item.component, {
            closeModal: () => toggleCanvas(item.id),
            ...extraData,
            ...item.componentProps
          })}
        </ModalForm>
      </React.Fragment>
    );
  }

  // === CANVAS FORM ===
  if (item.type === "canvasform") {
    return (
      <React.Fragment key={item.id}>
        <button
          className={finalClassName}
          onClick={() => toggleCanvas(item.id)}
          type="button"
        >
          {renderContent()}
        </button>
        <CanvasForm
          id={item.id}
          canvasOpen={canvasOpenState[item.id]}
          toggleCanvas={() => toggleCanvas(item.id)}
          component={item.component}
          componentProps={{
            toggleCanvas: () => toggleCanvas(item.id),
            ...extraData,
            ...item.componentProps
          }}
          backBtn
          textSend={item.textSend}
          onSubmitCallback={item.onSubmit}
          title={item.canvasTitle || item.title}
          width={item.canvasWidth}
        />
      </React.Fragment>
    );
  }

  // === FULLSCREEN MODAL ===
  if (item.type === "fullscreen") {
    return (
      <React.Fragment key={item.id}>
        <button
          className={finalClassName}
          onClick={() => toggleCanvas(item.id)}
          type="button"
        >
          {renderContent()}
        </button>

        <FullScreenModal
          open={canvasOpenState[item.id]}
          onOpenChange={(open) => toggleCanvas(item.id)}
          title={item.modalTitle || item.title}
          color={item.color || "primary"}
          bodyClassName={item.bodyClassName}
          {...item.modalProps}
        >
          {item.component && createElement(item.component, {
            toggleCanvas: () => toggleCanvas(item.id),
            ...extraData,
            ...item.componentProps
          })}
        </FullScreenModal>
      </React.Fragment>
    );
  }

  // === ACTION ===
  if (item.type === "action") {
    return (
      <button
        className={finalClassName}
        onClick={() => handleDirectAction(item.action)}
        type="button"
      >
        {renderContent()}
      </button>
    );
  }

  // Default fallback (just display)
  return (
      <div className={finalClassName}>
          {renderContent()}
      </div>
  );
};

export default ActionListItem;
