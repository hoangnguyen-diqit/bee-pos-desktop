import React from "react";
import { Card, CardBody } from "reactstrap";

type Props = {
    item: any,
};

export function OrderCard({ item }: Props) {

    return (
        <Card className="bg-white text-black-50">
            <CardBody>
                {item.title}
            </CardBody>
        </Card>
    )
}
