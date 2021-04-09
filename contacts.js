const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const findElement = contacts.find(
      (el) => el.id.toString() === contactId.toString()
    );
    console.table(findElement);
  });
}

function writeArrayToFile(filePath, newArray) {
  fs.writeFile(filePath, JSON.stringify(newArray), (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter(
      (el) => el.id.toString() !== contactId.toString()
    );
    console.table(newContacts);
    writeArrayToFile(contactsPath, newContacts);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const id = shortid.generate();
    contacts.push({ id, name, email, phone });
    console.table(contacts);
    writeArrayToFile(contactsPath, contacts);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
