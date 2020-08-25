import React from "react";
import { Card, CardBody, Button, Row, Col, Media } from "reactstrap";
import { useSelector } from "react-redux";

import { groupDistinctBy } from "../../../../utils/ArrayUtils";

import { RootState } from "../../../../store";

import { selectProductsByCategoryId } from "../../../../AppSelector";

const serviceCategories = [
    {
        key: "pizza",
        label: "Pizza",
        items: [
            { label: "Beef pizza" },
        ],
    },
    {
        key: "pasta",
        label: "Pasta",
        items: [
            { label: "Pasta 1" },
            { label: "Pasta 2" },
        ],
    },
    {
        key: "drink",
        label: "Drink",
    },
    {
        key: "rice",
        label: "Rice",
    },
    {
        key: "hotPromo",
        label: "Hot Promo",
    },
    {
        key: "chicken",
        label: "Chicken",
    },
];

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

    const [ selectedCategory, setSelectedCategory ] = React.useState("");
    const serviceCategoriesGroup = groupDistinctBy(serviceCategories, "key");
    const selectedItems = selectedCategory && serviceCategoriesGroup[selectedCategory] ?
        serviceCategoriesGroup[selectedCategory].items || [] : [];

    const products = useSelector<any, any>(state => state.catalogReducer.products);

    const filteredProducts = useSelector<RootState, any>(state => selectProductsByCategoryId(state.catalogReducer, selectedCategory));

    const _handleItemClick = (item) => {
        console.log("Selected item: " + item);
        if (onChange) {
            onChange([
                ...selectedOrderItems,
                item,
            ]);
        }
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
        </Card>
    )
}

FillOrderItemsCard.defaultProps = defaultProps;
