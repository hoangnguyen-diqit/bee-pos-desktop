import path from "path";
import fs from "fs";
import pdf from "html-pdf";
import { ipcMain } from "electron";
import { getPrinters, printFile, printDirect } from "@thiagoelg/node-printer";

export function listPrinters() {
    return getPrinters();
}

export function uiPrintFile(data) {
    var template = path.join(__dirname, "..", "..", "..", "data", "tmpl", 'bill.html')
    var filename = template.replace('.html', '.pdf')
    var templateHtml = fs.readFileSync(template, 'utf8')

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
ipcMain.on("listPrinters", (event, args) => {
    event.sender.send("listPrintersRes", listPrinters() || []);
});

ipcMain.on("printFile", (event, args) => {
    event.sender.send("printFileRes", uiPrintFile(args) || []);
});
