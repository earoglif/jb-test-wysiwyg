import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Toolbar } from '../components/toolbar';

export default {
    title: 'UI/Tooltip',
    component: Toolbar,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof Toolbar>;

const Template: ComponentStory<typeof Toolbar> = args => <Toolbar {...args} />;

export const Main = Template.bind({});
Main.args = {
    toggleBold() {
        console.log('toggleBold');
    },
    toggleItalic() {
        console.log('toggleItalic');
    },
    setBlockType() {
        console.log('blockTypeValue');
    },
    blockTypeValue: '2'
};
