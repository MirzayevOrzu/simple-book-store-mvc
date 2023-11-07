const { randomUUID } = require("crypto");
const fsp = require("fs/promises");
const path = require("path");

async function findAll() {
    const data = await fsp.readFile(
        path.join(__dirname, "authors.json"),
        "utf8"
    );

    return JSON.parse(data).filter((author) => !author.is_deleted);
}

async function findById(authorId) {
    const data = await fsp.readFile(
        path.join(__dirname, "authors.json"),
        "utf8"
    );

    const authors = JSON.parse(data);
    const author = authors.find((author) => author.id === authorId);

    if (!author) {
        return null;
    }

    return author;
}

async function insert({ name }) {
    const authors = await findAll();

    const author = {
        id: randomUUID(),
        name,
        is_deleted: false,
    };

    authors.unshift(author);

    await fsp.writeFile(
        path.join(__dirname, "authors.json"),
        JSON.stringify(authors)
    );

    return true;
}

async function update(id, changes) {
    let authors = await findAll();

    authors = authors.map((author) => {
        if (author.id == id) {
            return { ...author, ...changes };
        }

        return author;
    });

    await fsp.writeFile(
        path.join(__dirname, "authors.json"),
        JSON.stringify(authors)
    );

    return true;
}

async function remove(id) {
    let authors = await findAll();

    authors = authors.map((author) => {
        if (author.id == id) {
            return { ...author, is_deleted: true };
        }

        return author;
    });

    await fsp.writeFile(
        path.join(__dirname, "authors.json"),
        JSON.stringify(authors)
    );

    return true;
}

module.exports = {
    findAll,
    findById,
    insert,
    update,
    remove,
};
