const db = require("../data/dbConfig");

function get() {
  return db("accounts")
}

function getById(id) {
  return db("accounts").where({ id });
}

function insert(account) {
  return db("accounts").insert(account);//there is a question to ask here, do not forget to compare against previous helper function
}

function update(id, changes) {
  return db("accounts")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("accounts")
    .where("id", id)
    .del();
}

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
};
