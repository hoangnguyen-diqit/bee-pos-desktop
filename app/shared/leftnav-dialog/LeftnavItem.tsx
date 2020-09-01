import React from "react";

type Props = {
    item: any,
}

export function LeftnavItem({
    item,
}: Props) {

    return (
        <div>
            {item ? item.name : ""}
        </div>
    )
}
