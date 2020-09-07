import React, { useState } from "react";
import { Card, CardBody, Button, Row, Col, Media } from "reactstrap";
import { useSelector } from "react-redux";

import { createUuidv4 } from "../../../../utils/UuidUtils";
import { parseProductPrice } from "../../../../utils/OrderUtils";

import { RootState } from "../../../../store";
import { ToppingsSelectPopup } from "../../../../shared/toppings-select-popup/ToppingsSelectPopup";

type Props = {
    options: any[],
    selectedOrderItems: any[],
    onChange: (data) => void,
};

const defaultProps = {
    options: [],
    selectedOrderItems: [],
}

export function FillOrderItemsCard({
    options,
    selectedOrderItems,
    onChange,
}: Props) {

    const[ isOpenToppingsSelectPopup, setIsOpenToppingsSelectPopup ] = useState<boolean>(false);

    const [ selectedCategory, setSelectedCategory ] = React.useState("");
    const products = useSelector<RootState, any>(state => state.catalogReducer.products);
    const filteredProducts = products.filter(product => product.category.uuid === selectedCategory);

    const _handleItemClick = (item) => {
        console.log("Selected item: " + item);
        if (onChange) {
            onChange([
                ...selectedOrderItems,
                {
                    uuid: createUuidv4(),
                    product: item,
                    quantity: 1,
                    price: parseProductPrice(item, 1),
                },
            ]);
        }

        setIsOpenToppingsSelectPopup(true);
    }


    const _handleToppingsSelected = (toppings) => {

    }

    console.log("Order create item render 0: " + JSON.stringify(options));

    return (
        <Card>
            <CardBody className="p-0">
                <Row>
                    <Col xs={4}>
                        {(Array.isArray(options) && options.length > 0) &&
                            options
                            .map((item, index) => {
                                return (
                                    <Button
                                        color="light"
                                        block
                                        key={index}
                                        onClick={() => setSelectedCategory(item.uuid)}
                                    >
                                        <span>{item.name}</span>
                                    </Button>
                                )
                            })
                        }
                    </Col>
                    <Col xs={8}>
                        <Row>
                            {(Array.isArray(filteredProducts) && filteredProducts.length > 0) &&
                                filteredProducts
                                .map((item, index) => {
                                    return (
                                        <Col key={index} xs={6} className="mb-3">
                                            <Media
                                                className="d-flex align-items-center"
                                                onClick={() => _handleItemClick(item)}
                                            >
                                                <Media left className="mr-3">
                                                    <img src={item.thumnail || item.image} style={{ width: "64px", height: "64px" }}/>
                                                </Media>
                                                <Media body>{item.name}</Media>
                                            </Media>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </CardBody>
            <ToppingsSelectPopup
                isOpen={isOpenToppingsSelectPopup}
                toggleOpen={() => setIsOpenToppingsSelectPopup(!isOpenToppingsSelectPopup)}
                onOk={(toppings) => _handleToppingsSelected(toppings)}
            />
        </Card>
    )
}

FillOrderItemsCard.defaultProps = defaultProps;
