import React, { useEffect, useRef, useState } from 'react';
import { Portal } from '@mui/material';
import { isEqual } from 'lodash';

import { keymap } from 'prosemirror-keymap';
import { MarkType, Node } from 'prosemirror-model';
import { baseKeymap, toggleMark, setBlockType } from 'prosemirror-commands';
import { EditorState, Transaction, Command } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { useProseMirror } from 'hooks/useProseMirror';
import schema from 'components/textEditor/schema';
import errorPlugin from 'components/textEditor/errorPlugin';
import { ContextMenu } from 'components/contextMenu';
import { MainContainer } from 'layout/mainContainer';
import { Toolbar } from 'components/toolbar';
import TextEditor from 'components/textEditor';
import { getStrByPrefix } from 'utils/getStrByPrefix';
import { blockTypeValueProps } from 'data/types';

export const App = () => {
    const [contextMenuVisible, setContextMenuVisible] =
        useState<boolean>(false);
    const [contextMenuPos, setContextMenuPos] = useState({ top: 0, left: 0 });
    const [contextMenuItems, setContextMenuItems] = useState<string[]>([]);
    const [blockTypeValue, setBlockTypeValue] =
        useState<blockTypeValueProps>('p');
    const scrollToSelectionRef = useRef({ from: 0, to: 0 });
    const selectErrorRef = useRef({ from: 0, to: 0 });
    const isAutocomplete = useRef<boolean>(true);

    /**
     * Метод переключения тэгов
     * @property mark - Тип тэга
     * */
    function toggleMarkCommand(mark: MarkType): Command {
        return (
            state: EditorState,
            dispatch: ((tr: Transaction) => void) | undefined
        ) => toggleMark(mark)(state, dispatch);
    }
    const toggleBold = toggleMarkCommand(schema.marks.strong);
    const toggleItalic = toggleMarkCommand(schema.marks.em);

    /**
     *  Метод обработки нажатия на Tab в редакторе
     * */
    const tabClickHandler: Command = (state, dispatch, view) => {
        const { from, to } = state.selection;
        const start = view?.coordsAtPos(from);
        const head = state.selection.$head;

        if (from === to && head.parentOffset === head.parent.content.size) {
            isAutocomplete.current = true;
            setContextMenuVisible(prev => !prev);
            setContextMenuPos({
                top: start?.top ?? 0,
                left: start?.left ?? 0
            });
            setContextMenuItems(getStrByPrefix(head.parent.textContent));
        }
        return true;
    };
    const [state, setState] = useProseMirror({
        schema,
        plugins: [
            keymap({
                ...baseKeymap,
                Tab: tabClickHandler
            }),
            errorPlugin
        ]
    });

    useEffect(() => {
        // Проверяем наличие перемещения каретки. Если есть, то скрывает контекстное меню.
        const { $from, from, to } = state.selection;
        const { level } = $from.parent.attrs;

        if (!isEqual(scrollToSelectionRef.current, { from, to })) {
            setContextMenuVisible(false);
            scrollToSelectionRef.current = { from, to };
        }

        // Устанавливаем тип редактируеемого блока
        setBlockTypeValue(level ? level : 'p');
    }, [state]);

    /**
     * Метод скрывает контекстное меню
     * */
    const clickAwayHandler = () => {
        setContextMenuVisible(false);
    };

    /**
     * Метод добавляет текст выбранной строки на место курсора
     * @param index - Индекс выбранной строки
     * */
    const autocompleteClickHandler = (index: number) => {
        const tr = state.tr;
        tr.insertText(contextMenuItems[index]);
        setState(state.apply(tr));
    };

    /**
     * Метод заменяет ошибочное слово правильным, выбранным из списка
     * @param index - Индекс выбранного правильного слова
     * */
    const fixErrorHandler = (index: number) => {
        const { from, to } = selectErrorRef.current;
        const tr = state.tr;
        tr.insertText(contextMenuItems[index], from, to);
        setState(state.apply(tr));
        setContextMenuVisible(false);
    };

    /**
     * Метод обработки клика по слову, подсвеченному, как ошибка
     * */
    const handleClickOnError = (
        view: EditorView,
        pos: number,
        node: Node,
        nodePos: number,
        event: MouseEvent
    ) => {
        if (!(event.target instanceof HTMLSpanElement)) {
            return;
        }
        const { from } = state.selection;
        const start = view?.coordsAtPos(from);
        const suggestions = event.target.dataset.suggestions?.split(',') || [];
        const errorFrom = Number(event.target.dataset.from);
        const errorTo = Number(event.target.dataset.to);

        isAutocomplete.current = false;
        selectErrorRef.current = { from: errorFrom, to: errorTo };
        setContextMenuPos({
            top: start?.top ?? 0,
            left: start?.left ?? 0
        });
        setContextMenuItems(suggestions);
        setContextMenuVisible(true);
    };

    return (
        <MainContainer>
            <Toolbar
                toggleBold={() =>
                    toggleBold(state, (tr: Transaction) =>
                        setState(state.apply(tr))
                    )
                }
                toggleItalic={() =>
                    toggleItalic(state, (tr: Transaction) =>
                        setState(state.apply(tr))
                    )
                }
                blockTypeValue={blockTypeValue}
                setBlockType={event => {
                    const value = event.target.value as blockTypeValueProps;
                    setBlockTypeValue(value);

                    if (value === 'p') {
                        setBlockType(schema.nodes.paragraph)(
                            state,
                            (tr: Transaction) => setState(state.apply(tr))
                        );
                        return;
                    }
                    setBlockType(schema.nodes.heading, {
                        level: value
                    })(state, (tr: Transaction) => setState(state.apply(tr)));
                }}
            />
            <TextEditor
                state={state}
                onChange={setState}
                handleClickOn={handleClickOnError}
            />
            {contextMenuVisible && (
                <Portal>
                    <ContextMenu
                        menuItems={contextMenuItems}
                        callback={
                            isAutocomplete.current
                                ? autocompleteClickHandler
                                : fixErrorHandler
                        }
                        onClickAway={clickAwayHandler}
                        top={contextMenuPos.top}
                        left={contextMenuPos.left}
                    />
                </Portal>
            )}
        </MainContainer>
    );
};
