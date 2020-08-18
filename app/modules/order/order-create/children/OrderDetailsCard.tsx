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
            </CardBody>
        </Card>
    )
}

OrderDetailsCard.defaultProps = defaultProps;
