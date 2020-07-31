/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, Tray, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

import MenuBuilder from './menu';
import { loadDbs } from "./core/nedb";
import { loadPrinters } from "./main-process/printing";
import { createUDPServer, createTCPServer } from './core/websocket/websocket-client';

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

let mainWindow: BrowserWindow | null = null;
let appIcon: any = null;

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
    if (
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
    ) {
        await installExtensions();
    }
    createUDPServer();
    createTCPServer();
    loadDbs();
    loadPrinters();

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

    if (process.platform === 'linux') {
        windowOptions.icon = path.join(__dirname, './assets/app-icon/png/512.png')
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

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, iconName);
    appIcon = new Tray(iconPath);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click:  function() {
                if (mainWindow) {
                    mainWindow.show();
                }
            }
        },
        {
            label: 'Remove',
            click: () => {
                // event.sender.send('tray-removed');
                appIcon.destroy();
                app.quit();
            }
        }
    ])

    appIcon.setToolTip('Electron Demo in the tray.')
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
});

app.on('ready', createWindow);

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();
});
