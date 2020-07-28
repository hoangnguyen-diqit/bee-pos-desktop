import React from "react";
import { Container } from "reactstrap";

type Props = {
    children: React.ReactNode,
}

export function PageInner({
    children,
}: Props) {

    return (
        <Container
            fluid
            style={{ marginTop: "56px" }}
            className="position-relative pt-3"
        >
            {children}
        </Container>
    )
}
