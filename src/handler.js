const { nanoid } = require('nanoid');
const buku = require('./bookshelf');

const addNewBook = (request, h) =>{
const  {name,year, author, summary, publisher, pageCount, readPage, reading } = request.payload
const id = nanoid(16);
const insertedAt = new Date();
const updatedAt = insertedAt;
const finished = pageCount === readPage ? true:false;

const newBook = {
     name,
     id, 
     year, 
     author, 
     summary, 
     publisher, 
     pageCount, 
     readPage, 
     finished, 
     reading, 
     insertedAt,
     updatedAt  
    
    };

    if(!name){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }
    
    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response
    }

buku.push(newBook);

const isSuccess = buku.filter((book) => book.id === id).length > 0;



if(isSuccess){
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data:{
            bookId: id ,
            name: name,
            year: year,
            author: author,
            summary: summary,
            publisher: publisher,
            pageCount: pageCount,
            readPage: readPage,
            finished: finished,
            reading: reading,
            insertedAt: insertedAt,
            updatedAt: updatedAt

        }

    })

    response.code(201);
    return response;
}


}


/////////////////////GET ALL BOOK/////////////////////////

const gettAllBook = (request, h) =>{

    const { reading, finished, name } = request.query;
            ////////////////////////READING = 1////////////
    
    // const { finished } = request.query;
    if(reading === '1'){
        const readingbook = buku.filter((book) => book.reading === true)
        const books = []
        
        readingbook.map((book) =>{
            books.push({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            });
        });

        const response = h.response({
            status:'success',
            data:{
                books
            }
        });

        response.code(200)
        return response
    }

        ////////////////READING = 0////////////////
        if(reading === '0'){
            const readingbook = buku.filter((book) => book.reading === false)
            const books = []
            
            readingbook.map((book) =>{
                books.push({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                });
            });
    
            const response = h.response({
                status:'success',
                data:{
                    books,
                }
            });
    
            response.code(200)
            return response
        }

        ////////FINISHED = 1 ///////////////////
        if(finished === '1'){
            const finishedbook = buku.filter((book) => book.finished === true);
            const books = []

            finishedbook.map((book)=>{
                books.push({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                });
            });

            const response = h.response({
                status: 'success',
                data:{
                    books,
                }
            });
            response.code(200)
            return response;
        }


        ////////// FINISHED = 0 ////////////
        if(finished === '0'){
            const finishedbook = buku.filter((book) => book.finished === false);
            const books = []

            finishedbook.map((book)=>{
                books.push({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                });
            });

            const response = h.response({
                status: 'success',
                data:{
                    books,
                }
            });
            response.code(200)
            return response;
        }
        
        ////////////// CONTAIN 'DICODING' WORD///////////
        
        if(name != undefined && name != null){
            const containdicoding = buku.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
            const books = []

            containdicoding.map((book) =>{
                books.push({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                });
            });

            const response = h.response({
                status: 'success',
                data:{
                    books
                }
            });
            response.code(200)
            return response
        }

        ////////////ALL BOOK/////////////
    const books = []
    buku.map((book) =>{
        books.push({
            id: book.id,
            name: book.name,
            publisher: book.publisher
        })
    })
    
    const response = h.response({
        status: 'success',
        data:{
            books
        }
    });

    response.code(200);
    return response;
}

///////////////////GET BOOK BY ID///////////////////

const getBookById = (request, h) =>{
    const { bookId } = request.params;

    const book = buku.filter((buk) => buk.id === bookId)[0];
    
    if(book !== undefined){
        const response = h.response({
            status: 'success',
            data:{
                book,
            }
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status:'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
}

////////////////EDIT NOTE BY ID /////////////////////

const editBookById = (request, h) =>{
    const { bookId } = request.params;
    const  {name,year, author, summary, publisher, pageCount, readPage, reading } = request.payload
    const updatedAt = new Date()

    const index = buku.findIndex((book) => book.id === bookId);

    if(!name){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }
    
    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response
    }

    if(index != -1){
        buku[index] = {
            ...buku[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            
            reading,
            updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        });

        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    return response
}


const deleteBookById = (request, h) =>{

const {bookId} = request.params;
const index = buku.findIndex((book) => book.id === bookId);

if(index != -1){
    buku.splice(index, 1);
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
        
    });
    response.code(200);
    return response;
}

const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
});
response.code(404);
return response
}





module.exports = {addNewBook, gettAllBook, getBookById, editBookById, deleteBookById};