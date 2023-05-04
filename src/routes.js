const {addNewBook, gettAllBook, getBookById, editBookById, deleteBookById} = require('./handler')


const routes = [
{
    method: 'POST',
    path: '/books',
    handler: addNewBook,
},

{
    method: 'GET',
    path: '/books',
    handler: gettAllBook
},

{
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById
},

{
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookById
},

{
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookById
}

]


module.exports = routes;