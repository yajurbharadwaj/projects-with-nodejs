const express = require("express");
const excelJs = require("exceljs")
const fs = require("fs");

//Create an instance of the Express application and set the port to 3000:
const app = express();
const port = 4000;

app.get("/export", async (req, res) => {
    try {
        let workbook = new excelJs.Workbook()

        const sheet = workbook.addWorksheet("books")
        sheet.columns = [
            { header: "ISBN", key: "isbn", width: "25" },
            { header: "Title", key: "title", width: "50" },
            { header: "Items", key: "items", width: "50" }
        ]

        let object = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
        await object.map((value, idx) => {
            sheet.addRow({
                isbn: value.isbn,
                title: value.title,
                items: value.items
            })
        });
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "books.xlsx"
        );

        workbook.xlsx.write(res)
    } catch (error) {
        console.log(error)
    }

})
//Start the Express server, and it listens on port 3000. When the server starts, it logs a message to the console.
app.listen(port, () => {
    console.log(`node.js app is listerning on the PORT ${port}`);
});
