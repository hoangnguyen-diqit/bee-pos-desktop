import React from "react";
import { Container } from "reactstrap";

import { AppContext } from "../../AppContext";

type Props = {
    children: React.ReactNode,
}

export function PageInner({
    children,
}: Props) {

    const {
        isOpenLeftnav,
    } = React.useContext(AppContext);

    return (
        <Container
            fluid
            style={{ marginTop: "56px", marginLeft: isOpenLeftnav ? "300px" : "0" }}
            className="position-relative pt-3 transition-margin-left-default"
        >
            {children}
        </Container>
    )
}
