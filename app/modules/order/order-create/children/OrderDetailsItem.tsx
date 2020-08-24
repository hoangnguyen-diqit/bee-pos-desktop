import React from "react";
import { useSelector } from "react-redux";

import { formatCurrency } from "../../../../utils/NumberUtils";

import { selectPriceByProductId } from "../../../../AppSelector";

import { QuantityChangeButton } from "../../../../core-ui/button/QuantityChangeButton";

type Props = {
    item: any,
    onChange: (data) => void,
}

export function OrderDetailsItem({
    item,
    onChange,
}: Props) {

    const productPrices = useSelector<any, any>(state => selectPriceByProductId(state.catalogReducer, item?.uuid));
    const productPrice = Array.isArray(productPrices) && productPrices.length > 0 ? productPrices[0] : {};
    const productItemPrice = Array.isArray(productPrice.prices) && productPrice.prices.length > 0 ? productPrice.prices[0] : {};
    console.log("Found product price: " + JSON.stringify(productItemPrice));

    return (
        <div
            className="d-flex"
        >
            <div className="mr-auto">
                {item && item.name ? item.name : "Title"}
            </div>
            <div>
                <QuantityChangeButton
                    value={item.quantity}
                    onChange={(value) => onChange(value)}
                />
                <span>{formatCurrency(productItemPrice?.price)}</span>
            </div>
        </div>
    )
}
