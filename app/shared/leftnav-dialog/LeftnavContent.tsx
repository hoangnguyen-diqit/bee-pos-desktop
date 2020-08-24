import React from "react";

import { LeftnavCollapse } from "./LeftnavCollapse";
import { LeftnavItem } from "./LeftnavItem";

const leftnavItems = [
    {
        title: "Group 1",
        items: [
            { title: "Item 1" },
        ],
    },
    {
        title: "Logout",
    }
];

export function LeftnavContent({

}) {

    return (
        <div>
            {(Array.isArray(leftnavItems) && leftnavItems.length > 0) &&
                leftnavItems
                    .map((item, index) => {
                        if (Array.isArray(item.items) && item.items.length > 0) {
                            return (
                                <LeftnavCollapse
                                    key={index}
                                >
                                    {item.items
                                        .map((subItem, subIndex) => {
                                            return (
                                                <LeftnavItem
                                                    key={`${index}_${subIndex}`}
                                                    item={subItem}
                                                />
                                            )
                                        })
                                    }
                                </LeftnavCollapse>
                            )
                        } else {
                            return (
                                <LeftnavItem
                                    key={index}
                                    item={item}
                                />
                            )
                        }
                    })
            }
        </div>
    )
}
