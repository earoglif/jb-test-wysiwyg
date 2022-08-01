import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

describe('App tests', () => {
    it('Errors underlining', async () => {
        render(<App />);
        const errorText = 'Text wth few erors within';
        const textEditor = await screen.queryByTestId('textEditor');

        textEditor && userEvent.type(textEditor, errorText);

        expect(textEditor).toBeInTheDocument();
        screen.debug();
    });
});
