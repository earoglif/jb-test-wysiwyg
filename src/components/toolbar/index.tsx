import React, { FC } from 'react';
import {
    Box,
    BoxProps,
    Stack,
    IconButton,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';
import { FormatBold, FormatItalic } from '@mui/icons-material';
import {blockTypeValueProps} from 'data/types';

type ToolbarProps = {
    /** Переключение режима "Жирный" */
    toggleBold: () => void;
    /** Переключение режима "Курсив" */
    toggleItalic: () => void;
    /** Значение типа абзаца/заголовка */
    blockTypeValue: blockTypeValueProps;
    /** Переключение типа абзаца/заголовка */
    setBlockType: (event: SelectChangeEvent<blockTypeValueProps>) => void;
};

/**
 * Верхнее меню редактора
 * */
export const Toolbar: FC<ToolbarProps & BoxProps> = ({
    toggleBold,
    toggleItalic,
    blockTypeValue,
    setBlockType,
    ...props
}) => {
    return (
        <Box sx={{ mb: 2 }} {...props}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Box flexGrow={1}>
                    <Select
                        value={blockTypeValue}
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
