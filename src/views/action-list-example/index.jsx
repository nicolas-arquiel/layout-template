
import React, { useState } from "react";
import { Box, Flex, Heading, Text, Separator, Card } from "@radix-ui/themes";
import { Circle, FileText, Monitor, MousePointer2 } from "lucide-react";
import ActionListItem from "@core/components/action-list/ActionListItem";

// Simple dummy components for modals/canvas
const DummyForm = ({ closeModal }) => (
  <Box p="4">
    <Heading size="4" mb="2">Dummy Form Component</Heading>
    <Text as="p" mb="4">This is a component rendered inside the modal/canvas.</Text>
    <button onClick={closeModal} className="px-4 py-2 bg-blue-500 text-white rounded">
      Close
    </button>
  </Box>
);

const ActionListExample = () => {
  const [canvasOpenState, setCanvasOpenState] = useState({});

  const toggleCanvas = (id) => {
    setCanvasOpenState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDirectAction = (actionName) => {
    alert(`Action triggered: ${actionName}`);
  };

  const items = [
    {
      id: "link_item",
      type: "link",
      title: "Navigate to Dashboard",
      subtitle: "This is a simple link item",
      icon: <Monitor size={20} />,
      navlink: "/inicio",
    },
    {
      id: "modal_item",
      type: "modalform",
      title: "Open Modal Form",
      subtitle: "Opens a centered dialog",
      icon: <FileText size={20} />,
      component: DummyForm,
    },
    {
      id: "canvas_item",
      type: "canvasform",
      title: "Open Canvas Form",
      subtitle: "Opens a side canvas",
      icon: <FileText size={20} />,
      component: DummyForm,
      textSend: "Submit",
      onSubmit: (data) => alert("Canvas submitted: " + JSON.stringify(data)),
    },
    {
      id: "fullscreen_item",
      type: "fullscreen",
      title: "Open Fullscreen Modal",
      subtitle: "Opens a fullscreen modal",
      icon: <Monitor size={20} />,
      component: DummyForm,
    },
    {
      id: "action_item",
      type: "action",
      title: "Direct Action",
      subtitle: "Triggers a JS function",
      icon: <MousePointer2 size={20} />,
      action: "my_custom_action",
    },
  ];

  return (
    <Box p="5">
      <Heading mb="4">ActionList Component Examples</Heading>
      <Separator size="4" mb="4" />
      
      <Card size="2">
        <Flex direction="column" gap="4" p="4">
          <Heading size="4">List Variations</Heading>
          <div className="border rounded-md overflow-hidden">
            {items.map((item) => (
              <ActionListItem
                key={item.id}
                item={item}
                canvasOpenState={canvasOpenState}
                toggleCanvas={toggleCanvas}
                handleDirectAction={handleDirectAction}
              />
            ))}
          </div>
        </Flex>
      </Card>
    </Box>
  );
};

export default ActionListExample;
