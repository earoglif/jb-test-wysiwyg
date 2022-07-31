import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ContextMenu } from '../components/contextMenu';

export default {
    title: 'UI/ContextMenu',
    component: ContextMenu,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof ContextMenu>;

const Template: ComponentStory<typeof ContextMenu> = args => (
    <ContextMenu {...args} />
);

export const Full = Template.bind({});
Full.args = {
    menuItems: [
        'The best kinds of people are warm and kind.',
        'They are always there and they never mind.',
        'The best kinds of people smile and embrace.',
        'They support you with strength and grace.'
    ],
    callback() {
        console.log('Item click...');
    },
    onClickAway() {
        console.log('Click away...');
    }
};

export const Empty = Template.bind({});
Empty.args = {
    menuItems: [],
    callback() {
        console.log('Item click...');
    },
    onClickAway() {
        console.log('Click away...');
    }
};