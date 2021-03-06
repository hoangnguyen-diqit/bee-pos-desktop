import React, { Fragment, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import { WsEvent } from '../../../thirdparty/ws';
import { IPCEvent } from '../../../thirdparty/ipc';

import {
    apiMenu_exportAllData,
} from '../../../core/api-service/MenuService';

import { Header } from '../../../shared/header/Header';
import { PageInner } from '../../../shared/page-inner/PageInner';

import { WaitTimeCard } from './children/WaitTimeCard';
import { SalesCard } from './children/SalesCard';
import { RightActionsCard } from './children/RightActionsCard';

export default function HomePage() {

    useEffect(() => {
        apiMenu_exportAllData()
            .then(() => {
            })
            .catch(() => {
            })
    }, []);

    return (
        <Fragment>
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
            <WsEvent
                event="helloClient"
                handler={(data) => console.log("Home page ", data)}
            />
            <IPCEvent
                event="helloClient"
                handler={(data) => console.log("Home page 2 ", data)}
            />
        </Fragment>
    )
}
