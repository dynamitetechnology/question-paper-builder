const Users =  require('../../modal/Users')

module.exports = {
    login: (req, res, next) => {
        console.log('REQ::::::::', JSON.stringify(req.body))
        Users.register(JSON.stringify(req.body)).then(result => {
            console.log('result:::::::::::::',result.rows[0].output_json)
        })
    },
}