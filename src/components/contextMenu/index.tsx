/**
 * Компонент контекстного меню.
 * Применяется для отображения вариантов текста для автозаполнения и вариантов исправления ошибок.
 */

import React, { FC, useEffect } from 'react';
import { ClickAwayListener, BoxProps, Menu, MenuItem } from '@mui/material';
import { ContextMenuWrapper } from './styles';

type ContextMenuProps = {
    menuItems: string[];
    callback: (index: number) => void;
    onClickAway: () => void;
};
export const ContextMenu: FC<ContextMenuProps & BoxProps> = ({
    menuItems,
    callback,
    onClickAway,
    ...props
}) => {
    useEffect(() => {
        console.log('ContextMenu render:', menuItems);
    }, []);

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <ContextMenuWrapper {...props}>
                {menuItems.length &&
                    menuItems.map((item, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => {
                                callback(index);
                            }}
                        >
                            {item}
                        </MenuItem>
                    ))}
            </ContextMenuWrapper>
        </ClickAwayListener>
    );
};
