import React, { ChangeEvent, useEffect } from 'react';
import { MainContainer } from 'layout/mainContainer';
import { Toolbar } from 'components/toolbar';
import TextEditor from 'components/textEditor';

import { keymap } from 'prosemirror-keymap';
import { MarkType } from 'prosemirror-model';
import { baseKeymap, toggleMark, setBlockType } from 'prosemirror-commands';
import { EditorState, Transaction } from 'prosemirror-state';

import { useProseMirror } from 'hooks/useProseMirror';
import schema from 'components/textEditor/schema';
import errorPlugin from 'components/textEditor/errorPlugin';
import autocompletePlugin from 'components/textEditor/autocompletePlugin';

function toggleMarkCommand(mark: MarkType): any {
    return (
        state: EditorState,
        dispatch: ((tr: Transaction) => void) | undefined
    ) => toggleMark(mark)(state, dispatch);
}
const toggleBold = toggleMarkCommand(schema.marks.strong);
const toggleItalic = toggleMarkCommand(schema.marks.em);

export const App = () => {
    const [state, setState] = useProseMirror({
        schema,
        plugins: [
            keymap({
                ...baseKeymap
            }),
            errorPlugin,
            autocompletePlugin
        ]
    });

    useEffect(() => {
        // console.log('RENDER:', schema);
    }, []);

    useEffect(() => {
        console.log('State update:', state, state.tr.getMeta('tooltipVisible'));
    }, [state]);

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
                setBlockType={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    if (value === 'p') {
                        setBlockType(schema.nodes.paragraph)(
                            state,
                            (tr: Transaction) => setState(state.apply(tr))
                        );
                        return;
                    }
                    setBlockType(schema.nodes.heading, { level: value })(
                        state,
                        (tr: Transaction) => setState(state.apply(tr))
                    );
                }}
            />
            <TextEditor state={state} onChange={setState} />
        </MainContainer>
    );
};
