const fs = require('fs');
const csv = require('fast-csv');
module.exports = {
    dashboard: (req, res, next) => {
        res.render('dashboard/dashboard')
    },

    getMenuPage: (req, res, next) => {
        //  console.log('REQ:::::::', res.locals)
        res.render('dashboard/upload-menu')
    },

    uploadMenu: (req, res, next) => {
        console.log(req.files.file)
        let filepath = process.env.TEMP_FOLDER + req.files.file.name;
        console.log('filepath', filepath)
        return new Promise(function (resolve, reject) {
            fs.writeFile(filepath, req.files.file.data, err => {
                if (err) {
                    console.error(err);
                } else {
                    return resolve(filepath)
                }
            });
        }).then(result => {
            console.log('result.filepath::::::::::::', result)
            const data = []
            fs.createReadStream(result)
                .pipe(csv.parse({
                    headers: true
                }))
                .on('error', error => console.error(error))
                .on('data', row => data.push(row))
                .on('end', () => {
                    console.log((data))
                    res.status(200).json({
                        status: 200,
                        data: data
                    })
                });
        })
    },

    createHeader:(req, res, next)=>{
        res.render('dashboard/create-header')
    }
}