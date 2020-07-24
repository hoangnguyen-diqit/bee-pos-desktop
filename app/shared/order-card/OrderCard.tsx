import React from "react";
import classNames from "classnames";
import { Card, CardBody, ListGroup, ListGroupItem, CardFooter, Button } from "reactstrap";

type Props = {
    item: any,
    currentPage?: string,
    className?: string,
};

export function OrderCard({
    item,
    currentPage,
    className,
}: Props) {

    const items = Array.isArray(item.items) ? item.items : [ {}, {} ];

    return (
        <Card
            className={classNames("bg-white text-black-50", className)}
        >
            <CardBody
            >
                <div className="d-flex">
                    <div className="">{item.title}</div>
                    <div className="flex-fill"></div>
                    <div className="">{item.title}</div>
                </div>
            </CardBody>
            <ListGroup>
                {(Array.isArray(items) && items.length > 0) &&
                    items
                        .map((subItem, subIndex) => {
                            return (
                                <ListGroupItem
                                    key={subIndex}
                                >
                                    {subItem.title || "Order 1" }
                                </ListGroupItem>
                            )
                        })
                }
            </ListGroup>
            {currentPage === "cutTable" &&
                <CardFooter>
                    <Button
                        color="danger"
                        outline
                        block
                    >
                        Checkout
                    </Button>
                </CardFooter>
            }
            {currentPage === "kdsHistory" &&
                <CardFooter>
                    <Button
                        color="danger"
                        outline
                        block
                    >
                        Reprint
                    </Button>
                </CardFooter>
            }
        </Card>
    )
}
