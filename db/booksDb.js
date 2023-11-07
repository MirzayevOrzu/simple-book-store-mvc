const { randomUUID } = require("crypto");
const fsp = require("fs/promises");
const path = require("path");

async function findAll() {
    const data = await fsp.readFile(path.join(__dirname, "books.json"), "utf8");

    return JSON.parse(data).filter((book) => !book.is_deleted);
}

async function findById(bookId) {
    const data = await fsp.readFile(path.join(__dirname, "books.json"), "utf8");

    const books = JSON.parse(data);
    const book = books.find((book) => book.id === bookId);

    if (!book) {
        return null;
    }

    return book;
}

async function findAllByAuthor(authorId) {
    const data = await fsp.readFile(path.join(__dirname, "books.json"), "utf8");
    const books = JSON.parse(data);

    return books.filter((book) => book.authorId === authorId);
}

async function findAllByCategory(categoryId) {
    const data = await fsp.readFile(path.join(__dirname, "books.json"), "utf8");
    const books = JSON.parse(data);

    return books.filter((book) => book.categoryId === categoryId);
}

async function insert({
    title,
    description,
    copies,
    cover,
    price,
    authorId,
    categoryId,
    image,
}) {
    const books = await findAll();

    const book = {
        id: randomUUID(),
        title,
        description,
        copies,
        cover,
        price,
        authorId,
        categoryId,
        image,
        is_deleted: false,
    };

    books.unshift(book);

    await fsp.writeFile(
        path.join(__dirname, "books.json"),
        JSON.stringify(books)
    );

    return true;
}

async function update(id, changes) {
    let books = await findAll();

    books = books.map((book) => {
        if (book.id == id) {
            return { ...book, ...changes };
        }

        return book;
    });

    await fsp.writeFile(
        path.join(__dirname, "books.json"),
        JSON.stringify(books)
    );

    return true;
}

async function remove(id) {
    let books = await findAll();

    books = books.map((book) => {
        if (book.id == id) {
            return { ...book, is_deleted: true };
        }

        return book;
    });

    await fsp.writeFile(
        path.join(__dirname, "books.json"),
        JSON.stringify(books)
    );

    return true;
}

module.exports = {
    findAll,
    findById,
    findAllByAuthor,
    findAllByCategory,
    insert,
    update,
    remove,
};
