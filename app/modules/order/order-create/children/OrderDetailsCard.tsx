import React, { ReactNode } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

type Props = {
    children: ReactNode,
};

const defaultProps = {
}

export function OrderDetailsCard({
    children,
}: Props) {

    return (
        <Card className="mb-3">
            <CardHeader>
                Order Details
            </CardHeader>
            <CardBody>
                {children}
                <div className="bg-black-50">
                    <p className="mb-0 small text-black-50">
                        <span>Subtotal:</span>
                    </p>
                    <p className="mb-0 small text-black-50">
                        <span>Tax:</span>
                    </p>
                    <p className="mb-0 small text-black-50">
                        <span>Donation:</span>
                    </p>
                    <p className="mb-0">
                        <span>Total:</span>
                    </p>
                </div>
            </CardBody>
        </Card>
    )
}

OrderDetailsCard.defaultProps = defaultProps;
