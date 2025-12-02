import React from 'react';
import { Button } from '@radix-ui/themes';
import { RotateCcw } from 'lucide-react';

const ResetButton = ({
  onReset,
  visible = true
}) => {
  if (!visible) return null;

  return (
    <Button
      variant="soft"
      color="red"
      size="2"
      onClick={onReset}
    >
      <RotateCcw size={16} />
      Restablecer
    </Button>
  );
};

export default ResetButton;
