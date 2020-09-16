/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import http from 'http';
import express from 'express';
import path from 'path';
import log from 'electron-log';
import { server as WsServer } from 'websocket';
import { app, BrowserWindow, Tray, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';

import MenuBuilder from './menu';
import { loadDbs } from "./main/nedb";
import { createUDPServer } from './main/socket/UDPSocketServer';
import { IndexRouter } from "./routes/IndexRouter";
import { WebsocketHandler } from './main/socket/WebsocketHandler';
import { IPCRouter } from './IPCRouter';
import { broadcastServer } from './main/socket/UDPBroadcastClient';

export default class AppUpdater {
    constructor() {
        log.transports.file.level = 'info';
        autoUpdater.logger = log;

        try {
            autoUpdater.checkForUpdatesAndNotify();
        } catch (error) {
            console.log(error);
        }
    }
}

let httpServer: any = null;
let mainWindow: BrowserWindow | null = null;
let appIcon: any = null;
let ipcRouter: IPCRouter;

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
) {
    require('electron-debug')();
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map((name) => installer.default(installer[name], forceDownload))
    ).catch(console.log);
};

const createWindow = async () => {

    const expressApp = express();
    expressApp.use('/', IndexRouter());
    httpServer = http.createServer(expressApp);

    const wsServer = new WsServer({
        httpServer: httpServer,
    });
    const websocketHandler = new WebsocketHandler({
        wsServer: wsServer,
    });
    ipcRouter = new IPCRouter({
        websocketHandler,
    })
    httpServer.listen(8887, () => console.log('Example app listening on port 4201!'));

    if (
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
    ) {
        await installExtensions();
    }
    createUDPServer();
    // createTCPServer();
    loadDbs();

    const windowOptions: any = {
        show: false,
        width: 1366,
        height: 728,
        webPreferences: (process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true') &&
            process.env.ERB_SECURE !== 'true'
            ? {
                nodeIntegration: true,
            }
            : {
                preload: path.join(__dirname, 'dist/renderer.prod.js'),
            },
    }

    if (process.platform === 'linux' || process.platform === "win32") {
        windowOptions.icon = path.join(__dirname, '../extraResources/images/logo.png');
    }

    mainWindow = new BrowserWindow(windowOptions);

    mainWindow.loadURL(`file://${__dirname}/app.html`);

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    mainWindow.webContents.on('did-finish-load', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }

        setTimeout(() => {
            broadcastServer({
                onDetected: (data) => {
                    log.info("Send server detected: " + mainWindow?.webContents);
                    if (mainWindow?.webContents) {
                        mainWindow.webContents.send("udpServerResp", data);
                    }
                },
            });
        }, 500);
    });

    mainWindow.on('close', function (event) {
        // if(!app.isQuiting){
            event.preventDefault();

            if (mainWindow) {
                mainWindow.hide();
            }
        // }

        return false;
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    const iconName = process.platform === 'win32' ? '../extraResources/tray-icons/windows-icon.png' : '../extraResources/tray-icons/mac-icon.png';
    const iconPath = path.join(__dirname, iconName);
    appIcon = new Tray(iconPath);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open Bee POS',
            click:  function() {
                if (mainWindow) {
                    mainWindow.show();
                }
            }
        },
        { type: "separator" },
        {
            label: 'Quit',
            click: () => {
                if (mainWindow) {
                    mainWindow = null;
                }
                if (process.platform !== 'darwin') {
                    app.quit();
                }

                appIcon.destroy();
                if (ipcRouter) {
                    ipcRouter.destroyRouter();
                }
                app.exit(0);
            }
        }
    ])

    appIcon.setToolTip('Bee POS')
    appIcon.setContextMenu(contextMenu)

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();
};

/**
 * Add event listeners...
 */
// app.allowRendererProcessReuse = false;

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
    // if (appIcon) appIcon.destroy();
    if (httpServer) {
        httpServer.close();
    }
});

app.on('ready', createWindow);

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();
});
