const { google } = require("googleapis");

const writeGoogle = async () => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });


    const authClientObject = await auth.getClient();


    const spreadsheetId = " ";


    //append()
    //update()

    const googleSheetInstance = google.sheets({
        version: "v4",
        auth: authClientObject,
    });

    const data = [
        ['yajur', 'yajur@gmail.com', '6363881155'],
        [']sannu', 'sannu@gmail.com', '6363881155'],
        ['nambru', 'nambru@gmail.com', '6363881155'],
    ]


    await googleSheetInstance.spreadsheets.values.append({
        auth,   //auth object
        spreadsheetId,  //spreadsheet id
        range: "Sheet1!A:C",    //sheet name and range of cells
        valueInputOption: "USER_ENTERED",    //the information of user will be passed
        resource: {
            values: data,
        },
    })

}
writeGoogle();