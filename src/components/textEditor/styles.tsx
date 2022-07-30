import { styled } from '@mui/material';
import { css } from '@emotion/react';

export const TextEditorWrapper = styled('div')(
    ({ theme }) => css`
        position: relative;
        .ProseMirror {
            min-height: ${theme.spacing(30)};
            padding: 0 ${theme.spacing()};
            margin-top: ${theme.spacing(2)};
            border: 1px solid lightgray;
            border-radius: ${(theme.shape.borderRadius as number) * 1.25}px;
        }
        .error {
            border-bottom: 2px solid red;
            &:hover {
                cursor: pointer;
            }
        }
    `
);
