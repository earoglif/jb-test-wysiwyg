/**
 * Хук для взаиможействия с React-компонентами.
 * Взято отсбда: https://github.com/abingham/use-prosemirror/blob/main/src/useProseMirror.ts
 * */

import { useState, SetStateAction, Dispatch } from 'react';
import { EditorState } from 'prosemirror-state';

type ConfigProps = Parameters<typeof EditorState.create>[0];
type AddProps = {
    scrollToSelection: number;
}

export const useProseMirror = (
    config: ConfigProps
): [EditorState, Dispatch<SetStateAction<EditorState>>] => {
    return useState(() => EditorState.create(config));
};
