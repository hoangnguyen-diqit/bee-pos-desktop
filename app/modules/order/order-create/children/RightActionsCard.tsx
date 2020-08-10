import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";

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

export function RightActionsCard() {

    const [ selectedCategory, setSelectedCategory ] = React.useState("");
    const serviceCategoriesGroup = groupDistinctBy(serviceCategories, "key");
    const selectedItems = selectedCategory && serviceCategoriesGroup[selectedCategory] ?
        serviceCategoriesGroup[selectedCategory].items || [] : [];

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
                                                {item.label}
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
