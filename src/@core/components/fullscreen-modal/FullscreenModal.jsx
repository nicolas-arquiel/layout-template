import React from 'react'
import { Dialog } from '@radix-ui/themes'

const FullscreenModal = ({ children, trigger, title, ...props }) => {
  return (
    <Dialog.Root {...props}>
      {trigger && <Dialog.Trigger>{trigger}</Dialog.Trigger>}
      <Dialog.Content style={{ maxWidth: 450 }}>
        {title && <Dialog.Title>{title}</Dialog.Title>}
        {children}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default FullscreenModal
