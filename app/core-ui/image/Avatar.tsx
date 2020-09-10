import React from "react";

import { Image } from "./Image";

type Props = {
    src: string,
    alt?: string,
    className?: string,
    width?: string,
    height?: string,
    circle?: boolean,
}

const defaultProps = {
    src: "",
    alt: "",
    width: "24px",
    height: "24px",
    circle: true,
};

export function Avatar({
    src,
    alt,
    width,
    height,
    circle,
}: Props) {

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            circle={circle}
        />
    )
}

Avatar.defaultProps = defaultProps;
