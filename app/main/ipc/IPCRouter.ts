import log from "electron-log";
import { ipcMain, BrowserWindow, dialog } from "electron";

import { OrderRepo } from "../nedb/orderdb";

export class IPCRouter {

    _orderRepo: OrderRepo;

    constructor(opts) {
        this.startRouter();

        this._orderRepo = new OrderRepo();
    }

    startRouter() {
        ipcMain.on("message", (ev, args) => {
            this._handleMessage(ev, args);
        })
    }

    destroyRouter() {
        ipcMain.removeListener("message", (ev, args) => {
        })
    }

    _handleMessage = (ev, args) => {
        const type = args.type || "";

        if (type === "showHelloDialog") {
            // this._showHelloDialog();
        } else if (type === "getOrders") {
            this._getOrders(ev, args);
        } else if (type === "insertOrder") {
            this._insertOrder(ev, args);
        }
    }

    _showHelloDialog = () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        log.info("Focused window: " + focusedWindow);
        if (focusedWindow) {
            dialog.showMessageBoxSync(focusedWindow, {
                type: 'question',
                buttons: ['Leave', 'Stay'],
                title: 'Do you want to leave this site?',
                message: 'Changes you made may not be saved.',
                defaultId: 0,
                cancelId: 1
            })
        }
    }

    _getOrders = async(ev, args) => {
        try {
            const docs = await this._orderRepo.getOrders(args.filterMap);
            ev.sender.send("getOrdersResp", {
                orders: docs,
            })
        } catch (err) {
            ev.sender.send("getOrdersError", { })
        }
    }

    _insertOrder = async(ev, args) => {
        try {
            const order = await this._orderRepo.getOrders(args.order);
            ev.sender.send("insertOrderResp", {
                order: order,
            })
        } catch (err) {
            ev.sender.send("insertOrderError", { })
        }
    }
}
