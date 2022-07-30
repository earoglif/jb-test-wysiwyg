/**
 * Тултип
 * */

import React, { FC } from 'react';
import { Box, BoxProps, Stack, IconButton, Select, MenuItem } from '@mui/material';
import { FormatBold, FormatItalic } from '@mui/icons-material';

type ToolbarProps = {
    toggleBold: () => any;
    toggleItalic: any;
    setBlockType: any;
};
export const Toolbar: FC<ToolbarProps & BoxProps> = ({
    toggleBold,
    toggleItalic,
    setBlockType,
    ...props
}) => {
    return (
        <Box sx={{ mb: 2 }} {...props}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Box flexGrow={1}>
                    <Select
                        defaultValue="p"
                        size="small"
                        onChange={setBlockType}
                    >
                        <MenuItem value="p">Paragraph</MenuItem>
                        <MenuItem value="1">Header 1</MenuItem>
                        <MenuItem value="2">Header 2</MenuItem>
                        <MenuItem value="3">Header 3</MenuItem>
                        <MenuItem value="4">Header 4</MenuItem>
                    </Select>
                    <IconButton aria-label="bold" onClick={toggleBold}>
                        <FormatBold />
                    </IconButton>
                    <IconButton aria-label="italic" onClick={toggleItalic}>
                        <FormatItalic />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    );
};
