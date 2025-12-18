import React from 'react';
import { ContextMenu } from '@radix-ui/themes';

const DynamicContextMenu = ({
    children,
    items = []
}) => {
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger asChild>
                {children}
            </ContextMenu.Trigger>

            <ContextMenu.Content /* className="ContextMenuContent" */>
                {items.map((item, index) => {
                    if (item.type === 'separator') {
                        return <ContextMenu.Separator key={index} /* className="ContextMenuSeparator" */ />;
                    }

                    if (item.type === 'item') {
                        return (
                            <ContextMenu.Item shortcut={item.icon}
                                key={index}
                                //className={`ContextMenuItem ${item.className || ''}`}
                                onSelect={item.onClick}
                                disabled={item.disabled}
                            >

                                {item.label}
                            </ContextMenu.Item>
                        );
                    }

                    return null;
                })}
            </ContextMenu.Content>
        </ContextMenu.Root>
    );
};

export default DynamicContextMenu;
