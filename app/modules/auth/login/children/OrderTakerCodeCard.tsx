import React from "react";
import { Button } from "reactstrap";

import { AppContext } from "../../../../AppContext";

import { InputFormGroup } from "../../../../core-ui/form-group/InputFormGroup";

export function OrderTakerCodeCard() {

    const {
        history,
        updateProfile,
    } = React.useContext(AppContext);

    const _handleNextClick = () => {
        updateProfile({
            id: "123456",
        })
        if (history) {
            history.push(`/home`);
        }
    }

    return (
        <div className="bg-white p-3" style={{ width: "576px" }}>
            <p className="text-center">Please scan QR code to active your Order Taker</p>
            <InputFormGroup
            />
            <div>
                <Button
                    color="danger"
                    block
                    onClick={() => _handleNextClick()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
