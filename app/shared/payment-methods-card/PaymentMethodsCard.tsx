import React from "react";
import { Row, Col, Button } from "reactstrap";

type Props = {
    options: any[],
};

export function PaymentMethodsCard({
    options,
}: Props) {

    return (
        <div>
            <Row>
                {(Array.isArray(options) && options.length > 0) &&
                    options
                        .map((item, index) => {
                            return (
                                <Col
                                    key={index}
                                    xs={3}
                                >
                                    <Button
                                        color="light"
                                        block
                                    >
                                        {item.label}
                                    </Button>
                                </Col>
                            )
                        })
                }
            </Row>
        </div>
    )
}
