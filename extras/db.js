const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('.secret/db.json');
const db = low(adapter);

// 1. Allgemeine Sachen
exports.getDB = () => {
    return db;
};

// 1.1 Standarts Setzten
db.defaults({
    servers: [],
    users: []
}).write();

// 2. Server Sachen

// 2.1 Server in der DB erstellen
exports.createServer = (id) => {
    db.get('servers').push({ serverID: id}).write();
};
// 2.2 Server aus der DB löschen
exports.deleteServer = (id) => {
    db.get('server').remove({ id: id}).write();
};
// 2.3 Existiert der Server in der DB?
exports.doesServerExist = (id) => {
    return db.get('servers').find({serverID: id}).value() !== undefined;

};
// 2.4 Nicht existierenden Server in der DB
exports.noServerCreate = (id) => {
    if (!this.doesServerExist(id)) this.createServer(id);
};
// 2.5 Server in der DB setzen
exports.setServer = (id, entry, value) => {
    return db.get('servers').find( {serverID: id}).set(entry, value).write();
};
// 2.6 Server aus der DB entfernen
exports.unsetServer = (id, entry) => {
    return db.get('servers').find({serverID: id}).get(entry).value();
};
// 2.7 Server nehmen
exports.getServer = (id, entry) => {
    return db.get('servers').find({serverID: id}).get(entry).value();
};

// 3. User Sachen

// 3.1 Existiert der user in der DB?
exports.doesUserExist = (id) => {
    if (db.get('user').find({ id: id}).value() === undefined) return false;
    return;
};
// 3.2 Nicht existirender User in der DB
exports.noUserCreate = (id) => {
    if(!this.doesUserExist(id)) this.createUser(id);
};
// 3.3 User in der DB erstellen
exports.createUser = (id) => {
    db.get('user').push({ id: id}).write();
};
// 3.4 User Aus der DB löschen
exports.deleteUser = (id) => {
    db.get('user').remove({ id: id }).write();
};
// 3.5 User in der DB setzen
exports.setUSer = (id, entry, value) => {
    this.noUserCreate(id);
    db.get('user')
        .find({ id: id })
        .set(entry, value)
        .write();
};
// 3.6 User aus der DB entfernen
exports.unsetUser = (id, entry) => {
    this.noUserCreate(id);
    db.get('user')
        .find({ id: id })
        .unset(entry)
        .write();
};
// 3.7 User aus der DB nehmen
exports.getUser = (id, entry) => {
    return db.get('user')
        .find({id: id})
        .get(entry)
        .value();
};
