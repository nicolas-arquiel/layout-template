import React from 'react';
import { Button } from '@radix-ui/themes';
import { ResetIcon } from '@radix-ui/react-icons';

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
      <ResetIcon width="16" height="16" />
      Restablecer
    </Button>
  );
};

export default ResetButton;
