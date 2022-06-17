const checkBookData = require("../helpers/checkBookData")
const { BadRequestError } = require("../helpers/errors")
const handle = require("../helpers/handleExecute")
const querySql = require("../helpers/querySql")
const removeVietnameseTones = require("../helpers/removeVietnameseTones")
const Book = require("../models/book.model")


//Find-------------------------------------
exports.get = async (req, res, next) => {
    const [err, rows] = await handle(Book.find())

    if (err) {
        next(new BadRequestError(501, "Can't retrive data"))
        return
    }
    res.send({ data: rows, name: removeVietnameseTones("Đà Lạt Một Thời Hương Xa (Du Khảo Văn Hóa Đà Lạt 1954 - 1975)") })
}

//Find by Id-------------------------------------
exports.getById = async (req, res, next) => {
    const id = req.params.id
    const [err, row] = await handle(Book.findById(id))

    if (err) {
        next(new BadRequestError(501, "Can't retrive data"))
        return
    }

    if (!row) {
        next(new BadRequestError(501, "Can't retrive data with id = " + id))
        return
    }
    // console.log(row)
    res.send({ data: row, })
}

//Create------------------------------------
exports.create = async (req, res, next) => {

    const bookData = req.body

    if (!checkBookData(bookData)) {
        next(new BadRequestError(501, "Can't create a book"))
        return
    }

    const book = new Book(bookData)

    const [err, data] = await handle(book.save())
    if (err) {
        next(new BadRequestError(501, "Can't create a book"))
        return
    }

    // console.log(data)
    res.send({ data: true })
}

//Update------------------------------------
exports.update = async (req, res, next) => {
    const id = req.params.id
    const data = req.body

    let updateData = ''
    for (var key in data) {
        updateData += ` book.${key} = '${data[key]}', `
    }
    updateData = updateData.slice(0, -2)

    const [err, result] = await handle(Book.update(id, updateData))

    if (err) {
        console.log("Error on update book", err)
        next(new BadRequestError(501, `Can't update a book with id = ${id}`))
        return
    }

    res.send({ data: true })
}

//Delete------------------------------------
exports.delete = async (req, res, next) => {
    const id = req.params.id
    res.send({ data: 'Delete a book with id = ' + id })
}