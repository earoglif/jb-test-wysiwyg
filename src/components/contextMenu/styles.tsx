import { Box, styled } from '@mui/material';
import { css } from '@emotion/react';

export const ContextMenuWrapper = styled(Box)(
    ({ theme }) => css`
        position: absolute;
        z-index: 10;
        border: 1px solid;
        background-color: ${theme.palette.background.paper};
    `
);
