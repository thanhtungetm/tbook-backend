const querySql = require("../helpers/querySql")
const removeVietnameseTones = require("../helpers/removeVietnameseTones")

class Book {
    constructor(book) {
        this.name = book.name
        this.asciiName = removeVietnameseTones(book.name)
        this.price = book.price
        this.discount = book.discount
        this.author = book.author
        this.publisher = book.publisher
        this.year = book.year
        this.weight = book.weight
        this.pages = book.pages
        this.form = book.form
        this.numberRemaining = book.numberRemaining
        this.description = book.description
        this.status = book.status
        this.idCategory = book.idCategory
    }

    //Save--------------------------
    async save() {
        let sql = `INSERT INTO book 
        (idBook, name, price, discount, author, publisher, year, weight, pages, form, numberRemaining, description, status, idCategory, asciiName) 
        VALUES 
        (NULL, '${this.name}', '${this.price}', '${this.discount}', '${this.author}', '${this.publisher}', '${this.year}', NULL, '${this.pages}', '${this.form}', '${this.numberRemaining}', '${this.description}', '${this.status}', '${this.idCategory}', '${this.asciiName}');`;

        return await querySql(sql)
    }

    //find---------------------
    static async find() {
        let sql = `select * from book, category where book.idCategory = category.idCategory`
        const rows = await querySql(sql)
        return rows
    }

    //find by Id
    static async findById(id) {
        let sql = `select * from book, category where book.idCategory = category.idCategory and book.idBook = ${id}`
        const rows = await querySql(sql)
        return rows[0]
    }

    static async update(id, data) {
        let sql = `update book set ` + data + ` where book.idBook = ${id}`
        console.log(sql)
        return await querySql(sql)
    }
}
module.exports = Book