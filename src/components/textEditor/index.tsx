import React, {
    useRef,
    useImperativeHandle,
    forwardRef,
    CSSProperties,
    useLayoutEffect
} from 'react';
import { EditorView, EditorProps, DirectEditorProps } from 'prosemirror-view';
import { EditorState, Transaction } from 'prosemirror-state';
import { TextEditorWrapper } from './styles';

export interface Handle {
    view: EditorView | null;
}

interface PropsBase extends EditorProps {
    state: EditorState;
    style?: CSSProperties;
    className?: string;
}

interface PropsWithOnChange {
    onChange: (state: EditorState) => void;
    dispatchTransaction?: never;
}
interface PropsWithDispatchTransaction {
    onChange?: never;
    dispatchTransaction: (transaction: Transaction) => void;
}

type Props = PropsBase & (PropsWithOnChange | PropsWithDispatchTransaction);

/**
 * Обертка для редактора. Взято и немного доработано отсюда: https://github.com/abingham/use-prosemirror/blob/main/src/ProseMirror.tsx
 * */
export default forwardRef<Handle, Props>(function ProseMirror(
    props,
    ref
): JSX.Element {
    const root = useRef<HTMLDivElement>(null!);
    const initialProps = useRef(props);
    const viewRef = useRef<EditorView | null>(null);
    const { state, ...restProps } = props;

    viewRef.current?.updateState(state);
    viewRef.current?.setProps(buildProps(restProps));

    useLayoutEffect(() => {
        const view = new EditorView(root.current, {
            state: initialProps.current.state,
            ...buildProps(initialProps.current)
        });
        viewRef.current = view;
        return () => {
            view.destroy();
        };
    }, []);
    useImperativeHandle(ref, () => ({
        get view() {
            return viewRef.current;
        }
    }));
    return (
        <TextEditorWrapper
            data-testid='textEditor'
            ref={root}
            style={props.style}
            className={props.className}
            spellCheck={false} //Отключение проверки орфографии браузером
        />
    );

    function buildProps(props: Partial<Props>): Partial<DirectEditorProps> {
        return {
            ...props,
            dispatchTransaction: transaction => {
                if (props.dispatchTransaction) {
                    props.dispatchTransaction(transaction);
                } else if (props.onChange && viewRef.current) {
                    props.onChange(viewRef.current.state.apply(transaction));
                }
            }
        };
    }
});
