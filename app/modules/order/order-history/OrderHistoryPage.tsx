import React, { Fragment, useState } from "react";
import { Button } from "reactstrap";

import { Header } from "../../../shared/header/Header";
import { PageInner } from "../../../shared/page-inner/PageInner";
import { RightnavDialog } from "../../../shared/rightnav/RightnavDialog";

export default function OrderHistoryPage({

}) {

    const [ isOpenRightnavDialog, setIsOpenRightnavDialog ] = useState(false);

    const _handleClickClick = () => {
        setIsOpenRightnavDialog(true);
    };

    return (
        <Fragment>
            <Header
                actionComponent={
                    <Fragment>
                        <Button
                            onClick={() => _handleClickClick()}
                        >
                            Click
                        </Button>
                    </Fragment>
                }
            />
            <PageInner>
            </PageInner>
            <RightnavDialog
                isOpen={isOpenRightnavDialog}
                toggleOpen={() => setIsOpenRightnavDialog(!isOpenRightnavDialog)}
                value={{}}
                onChange={() => {

                }}
            />
        </Fragment>
    )
}
