import { Container } from '@mantine/core';
import { Fragment } from 'react';

import Footer from './Structure/Footer';
import { HeaderMiddle } from './Structure/Header';

export default function WebsiteStructure({children}){
    return <Container size='xl'>
        <HeaderMiddle />
        {children}
        <Footer />
    </Container>
}