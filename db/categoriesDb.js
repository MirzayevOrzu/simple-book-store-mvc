const { randomUUID } = require("crypto");
const fsp = require("fs/promises");
const path = require("path");

async function findAll() {
    const data = await fsp.readFile(
        path.join(__dirname, "categories.json"),
        "utf8"
    );

    return JSON.parse(data).filter((c) => !c.is_deleted);
}

async function insert({ name }) {
    const categories = await findAll();

    const category = {
        id: randomUUID(),
        name,
        is_deleted: false,
    };

    categories.unshift(category);

    await fsp.writeFile(
        path.join(__dirname, "categories.json"),
        JSON.stringify(categories)
    );

    return true;
}

async function findById(id) {
    const data = await fsp.readFile(
        path.join(__dirname, "categories.json"),
        "utf8"
    );

    const categories = JSON.parse(data);
    const category = categories.find((category) => category.id === id);

    if (!category) {
        return null;
    }

    return category;
}

async function update(id, changes) {
    let categories = await findAll();

    categories = categories.map((category) => {
        if (category.id == id) {
            return { ...category, ...changes };
        }

        return category;
    });

    await fsp.writeFile(
        path.join(__dirname, "categories.json"),
        JSON.stringify(categories)
    );

    return true;
}

async function remove(id) {
    let categories = await findAll();

    categories = categories.map((category) => {
        if (category.id == id) {
            return { ...category, is_deleted: true };
        }

        return category;
    });

    await fsp.writeFile(
        path.join(__dirname, "categories.json"),
        JSON.stringify(categories)
    );

    return true;
}

module.exports = {
    findAll,
    insert,
    findById,
    update,
    remove,
};
