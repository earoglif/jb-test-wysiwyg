import React, { FC } from 'react';
import { ClickAwayListener, BoxProps, MenuItem } from '@mui/material';
import { ContextMenuWrapper } from './styles';

type ContextMenuProps = {
    menuItems: string[];
    callback: (index: number) => void;
    onClickAway: () => void;
};

/**
 * @typedef ContextMenuPropsDoc
 * @property menuItems - Список строк для автозаполнения/исправления
 * @property callback - Функция обратного вызова при клике на пункт меню
 * @property onClickAway - Функция обратного вызова при клике вне меню
 * @property props - Свойства компонента Box
 */

/**
 * Компонент контекстного меню.
 * Применяется для отображения вариантов текста для автозаполнения и вариантов исправления ошибок.
 * @param {ContextMenuPropsDoc}
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
