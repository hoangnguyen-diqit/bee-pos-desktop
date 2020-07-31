import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { Header } from '../../../shared/header/Header';
import { PageInner } from '../../../shared/page-inner/PageInner';

import { WaitTimeCard } from './children/WaitTimeCard';
import { SalesCard } from './children/SalesCard';
import { RightActionsCard } from './children/RightActionsCard';

export default function OrderCreatePage() {

    return (
        <>
            <Header
            />
            <PageInner>
                <Container fluid>
                    <Row>
                        <Col xs="8">
                            <WaitTimeCard
                            />
                            <SalesCard
                            />
                        </Col>
                        <Col xs="4">
                            <RightActionsCard
                            />
                        </Col>
                    </Row>
                </Container>
            </PageInner>
        </>
    )
}