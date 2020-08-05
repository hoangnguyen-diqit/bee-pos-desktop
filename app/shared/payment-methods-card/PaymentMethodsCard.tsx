import React from "react";
import classNames from "classnames";
import { Row, Col, Button } from "reactstrap";

type Props = {
    options: any[],
    className?: string,
};

export function PaymentMethodsCard({
    options,
    className,
}: Props) {

    return (
        <div className={classNames(className, "py-2 px-3 bg-dark rounded")}>
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
