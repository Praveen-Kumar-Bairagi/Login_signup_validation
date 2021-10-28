require("dotenv").config();
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
  },
});

knex.schema
  .createTable("userinformation", (table) => {
    table.increments("id");
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("userImage").notNullable();
    table.string("fullName").notNullable();
  })
  .then(() => {
    console.log("table created");
  })
  .catch((a) => {
    console.log("table already ctreated");
  });

knex.schema
  .createTable("userProduct", (table) => {
    table.increments("id");
    table.string("productName").notNullable();
    table.string("productType").notNullable();
    table.string("size").notNullable();
    table.string("quantity").notNullable();
    table.string("productColour").notNullable();
    table.string("productImage").notNullable();
  })
  .then(() => {
    console.log("table created");
  })
  .catch((a) => {
    console.log("table already ctreated");
  });

module.exports = knex;
