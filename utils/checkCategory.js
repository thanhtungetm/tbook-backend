const handle = require("../helpers/handleExecute");
const Book = require("../models/book.model");
const Category = require("../models/category.model");

const fiels = ["nameCategory"];

exports.checkCreateData = async (data) => {
  for (let i = 0; i < fiels.length; i++) if (!(fiels[i] in data)) return "Fields is wrong!";

  const [err, document] = await handle(Category.findByName(data.nameCategory));
  if (err) return err.sqlMessage;

  if (document.length !== 0) return "Duplicate data!";
  return null;
};

exports.checkUpdateData = async (data) => {
  const [err, document] = await handle(Category.findByName(data.nameCategory));
  if (err) return err.sqlMessage;

  if (document.length !== 0) return "Duplicate data!";
  return null;
};

exports.checkDeleteData = async (id)=>{
  const errOnBook = await (async()=>{
    const [err , document] = await handle(Book.findByIdCategory(id))
    if(err) return err.sqlMessage

    if(document!==undefined){
      return "Can't delete this category Because some books associate with this category!"
    }
    return null
  })()
  
  if(errOnBook){
    return errOnBook
  }
  
  const errOnParent = await (async ()=>{
    const [err ,document] = await handle(Category.findChildrenByIdParent(id))
    if(err) return err.sqlMessage
  
    if(document.length!==0){
      return "Can't delete this category because it is a parent"
    }
    return null
  })()
  if(errOnParent)
    return errOnParent
  
  const errOnItSelf = await (async ()=>{
    const [err ,document] = await handle(Category.findById(id))
    if(err) return err.sqlMessage
  
    if(document.length===0){
      return "Don't find id !"
    }
    return null
  })()
  if(errOnItSelf)
    return errOnItSelf

  return null
}
