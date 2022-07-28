import React, {FC, ReactNode} from 'react';
import {Container} from '@mui/material';

type MainContainerProps = {
    children: ReactNode;
}
export const MainContainer: FC<MainContainerProps> = ({children}) => {
    return <Container>{children}</Container>
}