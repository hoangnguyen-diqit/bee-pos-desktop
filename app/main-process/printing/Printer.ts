import path from "path";
import fs from "fs";
import pdf from "html-pdf";
import { app, ipcMain } from "electron";
import { getPrinters, printDirect } from "@thiagoelg/node-printer";

export function uiGetPrinters() {
    return getPrinters();
}

export function uiPrintFile(data) {
    var template = path.join(app.getPath('userData'), "data", "tmpl", 'bill.html');
    var filename = template.replace('.html', '.pdf');
    var templateHtml = `
        <html>
        <head>
            <meta charset="utf8">
            <title>SuitArt Business Card</title>
            <style>
                html,
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Sackers Gothic Std';
                    font-weight: 500;
                    font-size: 7px;
                    background: rgb(241, 241, 241);
                    -webkit-print-color-adjust: exact;
                    box-sizing: border-box;
                }
                .page {
                    position: relative;
                    height: 90mm;
                    width: 50mm;
                    display: block;
                    background: black;
                    page-break-after: auto;
                    margin: 50px;
                    overflow: hidden;
                }
                @media print {
                    body {
                        background: black;
                    }
                    .page {
                        margin: 0;
                        height: 100%;
                        width: 100%;
                    }
                }
                .page.first {
                    border-left: 5px solid green;
                }
                .bottom {
                    position: absolute;
                    left: 5mm;
                    right: 5mm;
                    bottom: 5mm;
                }
                .group {
                    margin-top: 3mm;
                }
                .line {
                    color: white;
                    position: relative;
                }
                .center {
                    text-align: center;
                }
                .logo {
                    position: relative;
                    width: 80%;
                    left: 10%;
                    top: 15%;
                }
            </style>
        </head>
        <body>
            <div class="page">
                <div class="bottom">
                    <div class="line">Marc Bachmann</div>
                    <div class="line">cto</div>
                    <div class="group">
                        <div class="line">p: +41 00 000 00 00</div>
                        <div class="line">github: marcbachmann</div>
                    </div>
                    <div class="group">
                        <div class="line">suitart ag</div>
                        <div class="line">räffelstrasse 25</div>
                        <div class="line">8045 zürich</div>
                    </div>
                </div>
            </div>
            <div class="page">
                <img class="logo" src="{{image}}">
                <div class="bottom">
                    <div class="line center">8045 zürich</div>
                </div>
            </div>
        </body>
        </html>
    `
    // var templateHtml = fs.readFileSync(template, 'utf8');

    // var image = path.join('file://', __dirname, 'image.png')
    // templateHtml = templateHtml.replace('{{image}}', image)

    var options = {
        width: '80mm',
        height: '90mm'
    }

    pdf
        .create(templateHtml, options)
        .toFile(filename, function (err, pdf) {
            if (err) {
                console.log(err);
                return undefined;
            }
            console.log(pdf.filename);
            // return printFile({ printer: "epson", filename: pdf.filename, ...options });

            return printDirect({
                printer: "epson",
                // filename: pdf.filename,
                data: templateHtml,
                type: "PDF",
                success: function(id) {
                    console.log('printed with id ' + id);
                },
                error: function(err) {
                    console.error('error on printing: ' + err);
                },
                ...options
            });
        });

    return true;
}

// 570px, 80mm
ipcMain.on("getPrinters", (event, args) => {
    event.sender.send("getPrintersResp", uiGetPrinters() || []);
});

ipcMain.on("printFile", (event, args) => {
    event.sender.send("printFileResp", uiPrintFile(args) || []);
});
