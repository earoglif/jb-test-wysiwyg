import React, { FC } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextEditor from '../components/textEditor';
import { useProseMirror } from '../hooks/useProseMirror';
import schema from '../components/textEditor/schema';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';

export default {
    title: 'UI/TextEditor',
    component: TextEditor,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof TextEditor>;

const TextEditorWrapper: FC = () => {
    const [state, setState] = useProseMirror({
        schema,
        plugins: [
            keymap({
                ...baseKeymap
            })
        ]
    });
    return <TextEditor state={state} onChange={setState} />;
};

const Template: ComponentStory<typeof TextEditor> = args => (
    <TextEditorWrapper {...args} />
);

export const Main = Template.bind({});
