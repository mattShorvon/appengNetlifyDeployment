import React from 'react';
import { Container } from 'react-bootstrap';

// Citation: Functional Component Style From: https://github.com/briancodex/react-website-v1/tree/starter
export const Layout = (props) => (
    <Container>
        {props.children}
    </Container>
)