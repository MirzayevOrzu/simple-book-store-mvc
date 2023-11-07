const { randomUUID } = require("crypto");
const fsp = require("fs/promises");
const path = require("path");

async function findAll() {
    const data = await fsp.readFile(
        path.join(__dirname, "orders.json"),
        "utf8"
    );

    return JSON.parse(data);
}

async function insert({
    bookId,
    client_name,
    client_phone,
    quantity,
    address,
    totalPrice,
}) {
    const orders = await findAll();

    const order = {
        id: randomUUID(),
        bookId,
        client_name,
        client_phone,
        quantity,
        address,
        totalPrice,
        status: "new",
    };

    orders.unshift(order);

    await fsp.writeFile(
        path.join(__dirname, "orders.json"),
        JSON.stringify(orders)
    );

    return true;
}

async function findById(id) {
    const data = await fsp.readFile(
        path.join(__dirname, "orders.json"),
        "utf8"
    );

    const orders = JSON.parse(data);
    const order = orders.find((order) => order.id === id);

    if (!order) {
        return null;
    }

    return order;
}

async function update(id, changes) {
    let orders = await findAll();

    orders = orders.map((order) => {
        if (order.id == id) {
            return { ...order, ...changes };
        }

        return order;
    });

    await fsp.writeFile(
        path.join(__dirname, "orders.json"),
        JSON.stringify(orders)
    );

    return true;
}

module.exports = {
    findAll,
    insert,
    findById,
    update,
};
