const querySql = require("../helpers/querySql")
const removeVietnameseTones = require("../helpers/removeVietnameseTones")

class Category {
    constructor(category) {
        this.nameCategory = category.nameCategory
        this.idParent = category.idParent
    }

    //Save--------------------------
    // async save() {
    //     let sql = `INSERT INTO book 
    //     (idBook, name, price, discount, author, publisher, year, weight, pages, form, numberRemaining, description, status, idCategory, asciiName) 
    //     VALUES 
    //     (NULL, '${this.name}', '${this.price}', '${this.discount}', '${this.author}', '${this.publisher}', '${this.year}', NULL, '${this.pages}', '${this.form}', '${this.numberRemaining}', '${this.description}', '${this.status}', '${this.idCategory}', '${this.asciiName}');`;

    //     return await querySql(sql)
    // }

    //find---------------------
    static async find() {
        let sql = `select * from category where category.idParent is null`
        const rows = await querySql(sql)
        return rows
    }

    //find by Id
    static async findById(id) {
        let sql = `select * from category where category.idParent = ${id}`
        const rows = await querySql(sql)
        return rows
    }

    static async update(id, data) {
        let sql = `update book set ` + data + ` where book.idBook = ${id}`
        console.log(sql)
        return await querySql(sql)
    }
}
module.exports = Category