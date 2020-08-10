import React from "react";

type Props = {
    isOpen: boolean,
}

const defaultProps = {
    isOpen: false,
}

export function FooterStickyBar({
    isOpen,
}: Props) {

    return (
        <div className="position-absolute w-100" style={{ bottom: isOpen ? 0 : "-200px", left: 0, right: 0, height: "200px" }}>
            Footer
        </div>
    )
}

FooterStickyBar.defaultProps = defaultProps;
