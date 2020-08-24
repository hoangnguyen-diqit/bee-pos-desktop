import React from "react";
import { Collapse } from "reactstrap";

type Props = {
    children: React.ReactNode,
}

export function LeftnavCollapse({
    children,
}: Props) {

    return (
        <Collapse>
            {children}
        </Collapse>
    )
}
