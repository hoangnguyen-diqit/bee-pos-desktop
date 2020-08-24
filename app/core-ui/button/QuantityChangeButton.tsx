import React, { Fragment } from "react";
import Icon from "@mdi/react";
import { mdiMinus, mdiPlus } from "@mdi/js";
import { Button } from "reactstrap";

type Props = {
    value: number,
    onChange: (value) => void,
};

const defaultProps = {
    value: 0,
}

export function QuantityChangeButton({
    value,
    onChange,
}: Props) {

    return (
        <Fragment>
            <Button
                className="p-0"
                onClick={() => onChange(value - 1)}
            >
                <Icon path={mdiMinus} size={1} />
            </Button>
            <span>{value}</span>
            <Button
                className="p-0"
                onClick={() => onChange(value + 1)}
            >
                <Icon path={mdiPlus} size={1} />
            </Button>
        </Fragment>
    )
}

QuantityChangeButton.defaultProps = defaultProps;
