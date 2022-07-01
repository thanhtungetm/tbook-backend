const checkBookData = require("../helpers/checkBookData")
const { BadRequestError } = require("../helpers/errors")
const handle = require("../helpers/handleExecute")
const removeVietnameseTones = require("../helpers/removeVietnameseTones")
const Category = require("../models/category.model")
const CategoryHepler = require("../utils/checkCategory")


//Find-------------------------------------
exports.get = async (req, res, next) => {
    const filter = {}
    if(req.query){
        if(req.query.hasOwnProperty('nameCategory'))
            filter.nameCategory = req.query.nameCategory
        if(req.query.hasOwnProperty('idParent'))
            filter.idParent = req.query.idParent
    }
    const [err, rows] = await handle(Category.find(filter))
    console.log("filter get Category:",filter)
    

    if (err) {
        next(new BadRequestError(501, "Can't retrive data"))
        console.log(err)
        return
    }
    res.status(200).send({ data: rows })
}

//Find by Id-------------------------------------
exports.getById = async (req, res, next) => {
    const id = req.params.id
    const [err, rows] = await handle(Category.findById(id))

    if (err) {
        console.log(err)
        next(new BadRequestError(501, "Can't retrive data"))
        return
    }

    if (rows.length == 0) {
        next(new BadRequestError(501, "Can't retrive data with id = " + id))
        return
    }
    // console.log(row)
    res.status(200).send({ data: rows, })
}

//Create------------------------------------
exports.create = async (req, res, next) => {

    const categoryData = req.body

    const dataError = await CategoryHepler.checkCreateData(categoryData)

    if (dataError) {
        next(new BadRequestError(501, dataError))
        return
    }

    const category = new Category(categoryData)

    const [err, data] = await handle(category.save())
    if (err) {
        next(new BadRequestError(501, "Can't create a category"))
        return
    }

    // console.log(data)
    res.status(200).send({ data: true })
}

//Update------------------------------------
exports.update = async (req, res, next) => {
    const id = req.params.id
    const data = req.body

    const dataError = await CategoryHepler.checkUpdateData(data)
    if (dataError) {
        next(new BadRequestError(501, dataError))
        return
    }

    let updateData = ''
    for (var key in data) {
        updateData += ` category.${key} = ${data[key] ? `'${data[key]}'` : 'null'}, `
    }
    updateData = updateData.slice(0, -2)

    const [err, result] = await handle(Category.update(id, updateData))

    if (err) {
        console.log("Error on update category", err)
        next(new BadRequestError(501, `Can't update a category with id = ${id}`))
        return
    }

    res.status(200).send({ data: true })
}

//Delete------------------------------------
exports.delete = async (req, res, next) => {
    const id = req.params.id
    
    const idErr = await CategoryHepler.checkDeleteData(id)

    if(idErr){
        next(new BadRequestError(501, idErr))
        return
    }   
    const [err, document] = await handle(Category.delete(id))
    if(err){
        next(new BadRequestError(501, `Can't delete with id = ${id}`))
        return
    }

    res.status(200).send({ data: true })
}