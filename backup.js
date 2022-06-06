const fs = require('fs')
const readLine = require('readline')
const {google} = require('googleapis')
require('dotenv').config()

// const KEYFILEPATH = './credentials.json'

const SCOPES = ['https://www.googleapis.com/auth/drive']
let time = new Date()
console.log(time)
time = time.toString().split(" ")
console.log(time)
time =`${time[2]} ${time[1]} ${time[3]} ${time[4]}`
const name = `DOM Permisos - ${time}.xlsx`
// console.log(name)
const auth = new google.auth.GoogleAuth({
    // keyFile: KEYFILEPATH,
    credentials: JSON.parse(process.env.MY_GOOGLE_JSON_KEY),
    scopes: SCOPES
})

async function createAndUploadFile(auth) {
    const driveService = google.drive({ version: 'v3', auth })

    let fileMetaData = {
        'name': name,
        'parents': ['1XRpLOt333RErwZXauUlLt-cqnKC9yV7L']
        // 'parents': ['1z_dSx7xzahY585xwDw1F7ANUGI-N-3Xt']
    }

    let media = {
        mimType: 'application/vnd.google-apps.spreadsheet',
        body: fs.createReadStream('test2.xlsx')
    }

    let response = await driveService.files.create({
        resource: fileMetaData,
        media: media,
        fields: 'id'
    })

    switch(response.status) {
        case 200:
            console.log('File Created id: ', response.data.id)
            break
        default:
            console.error('Error creating file, ' + response.error)
            break
    }
}
createAndUploadFile(auth).catch(console.error)