import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

const deliveryTypes = [
    { name: "delivery" },
    { name: "takeAway" },
    { name: "eatIn" },
];

export function WaitTimeCard() {

    return (
        <Card className="mb-3">
            <CardHeader>
                Wait Time
            </CardHeader>
            <CardBody>
                <Row>
                    {(Array.isArray(deliveryTypes) && deliveryTypes.length > 0) &&
                        deliveryTypes
                        .map((item, index) => {
                            return (
                                <Col
                                    key={index}
                                    xs={4}
                                >
                                    <div
                                        className="d-flex"
                                    >
                                        <span className="mr-auto">{item.name}</span>
                                        <span>{item.name}</span>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
            </CardBody>
        </Card>
    )
}
