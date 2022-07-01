const querySql = require("../helpers/querySql")
const removeVietnameseTones = require("../helpers/removeVietnameseTones")

class Category {
    constructor(category) {
        this.nameCategory = category.nameCategory
        this.idParent = category.idParent
    }

    // Save--------------------------
    async save() {
        let sql = `INSERT INTO category (idCategory, nameCategory, idParent) VALUES (NULL, '${this.nameCategory}', ${this.idParent ? `'${this.idParent}'`: 'NULL'});`;
        return await querySql(sql)
    }

    //find---------------------
    static async find(filter) {
        let idParentFilter =''
        if(!filter){
            filter = {nameCategory: ''}
        }
        if(filter.hasOwnProperty('idParent')){
            if(filter.idParent){
                idParentFilter = ` and c1.idParent=${filter.idParent} `
            }else{
                idParentFilter = ` and (c1.idParent is null) `
            }
        }
        console.log(idParentFilter)
        console.log(filter)
        let sql = `select DISTINCT c1.idCategory, c1.nameCategory, c1.idParent, c2.nameCategory as nameParent from category as c1, category as c2 
		where (c1.nameCategory Like '%${filter.nameCategory ? filter.nameCategory: ''}%') 
        ${idParentFilter} and ((c1.idParent=c2.idCategory) or (c1.idParent is null)) group by c1.idCategory`

        console.log(sql)
        const rows = await querySql(sql)
        return rows
    }

    //find all childrens  by Id parent
    static async findChildrenByIdParent(id) {
        let sql = `select * from category where category.idParent = ${id}`
        const rows = await querySql(sql)
        return rows
    }
    //find by name
    static async findByName(name) {
        let sql = `select * from category where category.nameCategory = '${name}'`
        const rows = await querySql(sql)
        return rows
    }
    //find by id
    static async findById(id) {
        let sql = `select * from category where category.idCategory = '${id}'`
        const rows = await querySql(sql)
        return rows
    }

    static async update(id, data) {
        let sql = `update category set ` + data + ` where category.idCategory = ${id}`
        console.log(sql)
        return await querySql(sql)
    }
    static async delete(id) {
        let sql = `delete from category where category.idCategory = ${id}`
        console.log(sql)
        return await querySql(sql)
    }
}
module.exports = Category