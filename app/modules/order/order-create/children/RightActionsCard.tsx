import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";

const serviceCategories = [
    {

    },
    {

    },
];

export function RightActionsCard() {


    return (
        <Card>
            <CardBody className="p-0">
                <Row>
                    <Col xs={4}>
                        {(Array.isArray(serviceCategories) && serviceCategories.length > 0) &&
                            serviceCategories
                                .map((item, index) => {
                                    return (
                                        <Button
                                            color="light"
                                            block
                                            key={index}
                                        >
                                            <span>Pasta</span>
                                        </Button>
                                    )
                                })
                        }
                    </Col>
                    <Col xs={8}>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}
