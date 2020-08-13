import path from "path";
import fs from "fs";
import pdf from "html-pdf";
import ptp from "pdf-to-printer";
import format from "string-template";
import { app, ipcMain } from "electron";
import { getPrinters, printDirect, getSupportedPrintFormats } from "@thiagoelg/node-printer";

export function uiGetPrinters() {
    return getPrinters();
}

export function uiPrintFile(data) {
    console.log("Start to print");
    var template = path.join(app.getPath('userData'), "data", "tmpl", 'bill.html');
    var filename = template.replace('.html', '.pdf');
    var templateHtml = `
        <html>
        <head>
            <meta charset="utf8">
            <title>Order print</title>
            <style>
                html {
                    margin: 0;
                    padding: 0;
                    width: 80mm;
                }
                body {
                    margin: 0;
                    padding: 0;
                    width: 80mm;
                    padding: 10px;
                    font-family: 'Sackers Gothic Std';
                    -webkit-print-color-adjust: exact;
                    box-sizing: border-box;
                }
                .page {
                    position: relative;
                    width: 80mm;
                    display: block;
                    page-break-after: auto;
                    overflow: hidden;
                }
                @media print {
                    body {

                    }
                    .page {
                        margin: 0;
                        height: 100%;
                        width: 80mm;
                    }
                }
            </style>
        </head>
        <body>
            <div class="page">
                <div>
                    <h1 style="text-align: center">Đơn hàng</h1>
                    <p>{subTitle}</p>
                    <p>{subTitle}</p>
                    <h2>Chi tiết</h2>
                    <hr/>
                    <div style="display: flex">
                        <div style="flex: 70">Cafe sữa đá</div>
                        <div style="flex: 30; text-align: right">75.000</div>
                    </div>
                    <h2>Tổng cộng</h2>
                    <hr/>
                    <div style="display: flex">
                        <div style="flex: 70">Thanh toán</div>
                        <div style="flex: 30; text-align: right">75.000</div>
                    </div>
                    <p>Lorem ipsum</p>
                    <h3 style="text-align: center">Diqit</h3>
                </div>
            </div>
        </body>
        </html>
    `
    // var templateHtml = fs.readFileSync(template, 'utf8');

    // var image = path.join('file://', __dirname, 'image.png')
    // templateHtml = templateHtml.replace('{{image}}', image)
    templateHtml = format(templateHtml, {
        subTitle: "Lorem ipsum"
    });

    var options = {
        width: '80mm',
        height: '90mm',
    };

    if (process.platform === "win32") {
        console.log("Print on Windows");
        console.log("Supported formats: " + getSupportedPrintFormats());
        pdf
            .create(templateHtml, {
                width: '80mm',
                height: "297mm",
                // width: '3.14in',
                // height: "11.7in",
                // format: 'A4', orientation: "portrait",
            })
            .toFile(filename, function(err, res) {
                console.log("Start to print2");
                ptp.print(res.filename, {
                    printer: data.printerName || "epson",
                    // win32: ['-print-settings "fit"'],
                })
                    .then((res) => {
                        console.log(res);
                        fs.unlink(filename, (err2 => {
                            if (err2) {
                                console.log("Unlink file error: " + err2);
                            }
                        }));
                    })
                    .catch(console.error);
            })

        // pdf
        //     .create(templateHtml, { width: '80mm', height: '90mm', })
        //     .toBuffer(function(err, buffer) {
        //         if (err) {
        //             console.log(err);
        //             return undefined;
        //         }

        //         pdfium.render({ data: buffer, outputFormat: "EMF" }, (err2, emfBuffer) => {
        //             if(err2) {
        //                 return console.error('error from async convert: ', err2);
        //             }

        //             // Now we have EMF file, send it to printer as EMF format
        //             console.log('data type is: '+typeof(buffer) + ', is buffer: ' + Buffer.isBuffer(buffer));

        //             ptp.print({
        //                 printer: data.printerName || "epson",
        //                 // data: buffer,
        //                 data: emfBuffer,
        //                 type: 'EMF',
        //                 success: function(id) {
        //                     console.log('printed with id ' + id);
        //                 },
        //                 error: function(err) {
        //                     console.error('error on printing: ' + err);
        //                 }
        //             })
        //         });
        //     });
    } else {
        pdf
            .create(templateHtml, {
                type: "pdf",
                width: '3.14in',
                height: "11.7in",
            })
            .toBuffer(function(err, buffer) {
            // .toFile(filename, function (err, pdf) {
                if (err) {
                    console.log(err);
                    return undefined;
                }
                // console.log(pdf.filename);
                // return printFile({ printer: "epson", filename: pdf.filename, ...options });

                console.log('data type is: '+typeof(buffer) + ', is buffer: ' + Buffer.isBuffer(buffer));
                return printDirect({
                    printer: data.printerName || "epson",
                    // filename: pdf.filename,
                    data: buffer,
                    type: "PDF",
                    success: function(id) {
                        console.log('printed with id ' + id);
                    },
                    error: function(err) {
                        console.error('error on printing: ' + err);
                    },
                });
            });
    }

    return true;
}

// 570px, 80mm
ipcMain.on("getPrinters", (event, args) => {
    event.sender.send("getPrintersResp", uiGetPrinters() || []);
});

ipcMain.on("printFile", (event, args) => {
    event.sender.send("printFileResp", uiPrintFile(args) || []);
});
