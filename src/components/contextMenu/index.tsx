import React, { FC } from 'react';
import { ClickAwayListener, BoxProps, MenuItem } from '@mui/material';
import { ContextMenuWrapper } from './styles';

type ContextMenuProps = {
    /** Список строк для автозаполнения/исправления */
    menuItems: string[];
    /** Функция обратного вызова при клике на пункт меню */
    callback: (index: number) => void;
    /** Функция обратного вызова при клике вне меню */
    onClickAway: () => void;
};

/**
 * Компонент контекстного меню.
 * Применяется для отображения вариантов текста для автозаполнения и вариантов исправления ошибок.
 */
export const ContextMenu: FC<ContextMenuProps & BoxProps> = ({
    menuItems,
    callback,
    onClickAway,
    ...props
}) => {
    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <ContextMenuWrapper {...props}>
                {menuItems.length
                    ? menuItems.map((item, index) => (
                          <MenuItem
                              key={index}
                              onClick={() => {
                                  callback && callback(index);
                              }}
                          >
                              {item}
                          </MenuItem>
                      ))
                    : '...'}
            </ContextMenuWrapper>
        </ClickAwayListener>
    );
};
