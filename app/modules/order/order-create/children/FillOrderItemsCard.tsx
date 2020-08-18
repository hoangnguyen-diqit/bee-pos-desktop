import React from "react";
import { Card, CardBody, Button, Row, Col, Media } from "reactstrap";

import { groupDistinctBy } from "../../../../utils/ArrayUtils";

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
    selectedOrderItems: any[],
    onChange: (data) => void,
};

const defaultProps = {
    selectedOrderItems: [],
}

export function FillOrderItemsCard({
    selectedOrderItems,
    onChange,
}: Props) {

    const [ selectedCategory, setSelectedCategory ] = React.useState("");
    const serviceCategoriesGroup = groupDistinctBy(serviceCategories, "key");
    const selectedItems = selectedCategory && serviceCategoriesGroup[selectedCategory] ?
        serviceCategoriesGroup[selectedCategory].items || [] : [];

    const _handleItemClick = (item) => {
        console.log("Selected item: " + item);
        if (onChange) {
            onChange([
                ...selectedOrderItems,
                item,
            ]);
        }
    }

    return (
        <Card>
            <CardBody className="p-0">
                <Row>
                    <Col xs={4}>
                        {(Array.isArray(serviceCategories) && serviceCategories.length > 0) &&
                            serviceCategories
                            .map((item, index) => {
                                return (
                                    <Button
                                        color="light"
                                        block
                                        key={index}
                                        onClick={() => setSelectedCategory(item.key)}
                                    >
                                        <span>{item.label}</span>
                                    </Button>
                                )
                            })
                        }
                    </Col>
                    <Col xs={8}>
                        <Row>
                            {(Array.isArray(selectedItems) && selectedItems.length > 0) &&
                                selectedItems
                                .map((item, index) => {
                                    return (
                                        <Col key={index}
                                        >
                                            <Media
                                                className="align-items-center"
                                                onClick={() => _handleItemClick(item)}
                                            >
                                                <Media left>
                                                    <img src="" style={{ width: "64px", height: "64px" }}/>
                                                </Media>
                                                <Media body>{item.label}</Media>
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
