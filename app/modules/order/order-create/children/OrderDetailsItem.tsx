import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { formatCurrency } from "../../../../utils/NumberUtils";

import { selectPriceByProductId } from "../../../../AppSelector";

import { QuantityChangeButton } from "../../../../core-ui/button/QuantityChangeButton";

type Props = {
    className?: string,
    item: any,
    onChange: (data) => void,
}

export function OrderDetailsItem({
    className,
    item,
    onChange,
}: Props) {

    const productPrices = useSelector<any, any>(state => selectPriceByProductId(state.catalogReducer, item?.product?.uuid));
    const productPrice = Array.isArray(productPrices) && productPrices.length > 0 ? productPrices[0] : {};
    const productItemPrice = Array.isArray(productPrice.prices) && productPrice.prices.length > 0 ? productPrice.prices[0] : {};
    console.log("Found product price: " + JSON.stringify(productItemPrice));

    return (
        <div
            className={classNames("d-flex", className)}
        >
            <div className="mr-auto">
                {item && item.product ? item.product.name : "Title"}
            </div>
            <div>
                <QuantityChangeButton
                    value={item.quantity}
                    onChange={(value) => onChange(value)}
                />
                <div
                    className="d-inline-flex justify-content-end"
                    style={{ width: "80px" }}
                >
                    <span>{formatCurrency(productItemPrice?.price)}</span>
                </div>
            </div>
        </div>
    )
}
