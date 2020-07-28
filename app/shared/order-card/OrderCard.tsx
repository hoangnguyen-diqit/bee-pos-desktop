import React from "react";
import classNames from "classnames";
import { Card, CardBody, ListGroup, ListGroupItem, CardFooter, Button, CardHeader } from "reactstrap";

const orderColorsMap = {
    takeAway: "#7ad778",
    delivery: "#ff1744",
    eatIn: "#FFBD5A",
    oc: "#4192DC",
};

type Props = {
    item: any,
    currentPage?: string,
    className?: string,
};

const defaultProps = {
}

export function OrderCard({
    item,
    currentPage,
    className,
}: Props) {

    const [ countdown, setCountdown ] = React.useState(item.countdown);
    const items = Array.isArray(item.items) ? item.items : [ {}, {} ];

    React.useEffect(() => {
        const countdownInt = setInterval(function() {
            setCountdown(countdown - 1);
            if (countdown === 0) {
                clearInterval(countdownInt);
            }
        }, 1 * 1000);
    }, [ countdown ]);

    return (
        <Card
            className={classNames("bg-white text-black-50 mb-3", className)}
        >
            <CardHeader style={{ paddingTop: "4px", paddingBottom: "4px", backgroundColor: orderColorsMap[item.type] || orderColorsMap.delivery }}>
            </CardHeader>
            <CardBody
            >
                <div className="d-flex mb-3">
                    <div className="">{item.title}</div>
                    <div className="flex-fill text-center">{(items || []).length}&nbsp;items</div>
                    <div className="">{countdown}</div>
                </div>
                <div className="d-flex">
                    <div className="d-flex align-items-center">
                        <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-person-circle mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
                            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
                        </svg>
                        {item.title}
                    </div>
                    <div className="flex-fill"></div>
                    <div className="">{item.title}</div>
                </div>
            </CardBody>
            <ListGroup style={{ height: "220px", overflowY: "auto" }}>
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
                        block
                    >
                        Reprint
                    </Button>
                </CardFooter>
            }
        </Card>
    )
}

OrderCard.defaultProps = defaultProps;
