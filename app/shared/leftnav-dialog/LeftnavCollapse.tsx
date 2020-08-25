import React from "react";
import { Collapse, Card, CardHeader } from "reactstrap";

import { LeftnavItem } from "./LeftnavItem";

type Props = {
    headerData: any,
    children: React.ReactNode,
}

const defaultProps = {
    headerData: {},
}

export function LeftnavCollapse({
    headerData,
    children,
}: Props) {

    return (
        <Card>
            <CardHeader>
                <LeftnavItem
                    item={headerData || {}}
                />
            </CardHeader>
            <Collapse
                isOpen={true}
            >
                {children}
            </Collapse>
        </Card>
    )
}

LeftnavCollapse.defaultProps = defaultProps;
