const fiels = ['name', 'asciiName', 'price', 'discount', 'author', 'publisher', 'year', 'pages', 'form', 'numberRemaining', 'description', 'status', 'idCategory']

const checkBookData = (data) => {
    for (let i = 0; i < fiels.length; i++)
        if (!(fiels[i] in data))
            return false
    return true
}
module.exports = checkBookData