import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

import { InputFormGroup } from "../../../../core-ui/form-group/InputFormGroup";

export function PaymentDetailsCard() {

    return (
        <Card className="mb-3">
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
