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
            style={{ marginTop: "56px", marginLeft: isOpenLeftnav ? "300px" : "0", height: "calc(100vh - 56px)" }}
            className="page-inner position-relative pt-3 transition-margin-left-default overflow-hidden"
        >
            {children}
        </Container>
    )
}
