import React from "react";
import classNames from "classnames";
import Img from "react-image";

import logoImage from "../../assets/images/logo.png";

type Props = {
    src: string,
    alt?: string,
    className?: string,
    width?: string,
    height?: string,
    circle?: boolean,
}

const defaultProps = {
    src: "https://www.example.com/foo.jpg",
    alt: "",
    width: "120px",
    height: "120px",
    circle: false,
};

export function Image({
    src,
    alt,
    className,
    width,
    height,
    circle,
}: Props) {

    return (
        <Img
            src={src}
            alt={alt}
            className={classNames("", className, {
                "rounded-circle": circle,
            })}
            style={{ width: width, height: height }}
            unloader={
                <img src={logoImage} alt="" />
            }
        />
    )
}

Image.defaultProps = defaultProps;
