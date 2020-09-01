import React from "react";
import classNames from "classnames";
import { Card, CardHeader, CardBody } from "reactstrap";

import { InputFormGroup } from "../../../../core-ui/form-group/InputFormGroup";

type Props = {
    className,
};

export function PaymentDetailsCard({
    className,
}: Props) {

    return (
        <Card className={classNames("mb-3", className)}>
            <CardHeader>
                Payment Details
            </CardHeader>
            <CardBody>
                <InputFormGroup
                    type="textarea"
                    readOnly
                />
            </CardBody>
        </Card>
    )
}
