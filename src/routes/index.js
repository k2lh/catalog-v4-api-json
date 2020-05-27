const fs = require('fs')
const path = require('path')
import Router from 'express'
let routes = Router()

routes.get("/:filename", function (req, res, next) {
  fs.readFile(path.join(__dirname, '../static/' + req.params.filename + '.json'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      res.status(200).send({
        success: 'true',
        message: 'file retrieved successfully',
        data: JSON.parse(data)
      })
    }
  })
})

routes.post('/:filename', function (req, res) {
  // For Filter API only
  let fields = req.body.fields
  fs.readFile(path.join(__dirname, '../static/' + req.params.filename + '.json'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      let tmpArray = []
      let result = JSON.parse(data)
      fields.forEach((element, index) => {
        let tmpObj = new Object()
        // Set id for each select field
        result[element].id = element
        // Add (All) option
        result[element].options.unshift({label: '(All)', value: null })
        // If no label, set label = value
        result[element].options.forEach(option => {
          if (!option.label) {
            option.label = option.value
          }
        })
        tmpObj = result[element]
        tmpArray.push(tmpObj || {})
      })
      res.status(200).send(tmpArray)
    }
  })
})
export default routes