import { pgTable, varchar, serial, integer, date, boolean } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

// CREATE TABLE users (
//   user_id SERIAL,
//   first_name VARCHAR(255),
//   last_name VARCHAR(255) NOT NULL,
//   date_of_birth DATE NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   PRIMARY KEY (email)
// );
export const userTable = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  first_name: varchar("first_name", {
    length: 255,
  }).notNull(),
  last_name: varchar("last_name", {
    length: 255,
  }),
  date_of_birth: date("date_of_birth"),
  email: varchar("email").primaryKey(),
  password: varchar("password").notNull(),
});

// CREATE TABLE cart (
//   id SERIAL,
//   user_id VARCHAR(255) NOT NULL,
//   product_id VARCHAR(255) NOT NULL,
//   quantity INTEGER NOT NULL,
//   size VARCHAR(10) NOT NULL,
//   email VARCHAR(255),
//   is_deleted BOOLEAN DEFAULT FALSE,
//   PRIMARY KEY (user_id, product_id, size),
//   FOREIGN KEY (email) REFERENCES users(email)
//       ON DELETE CASCADE
//       ON UPDATE CASCADE
// );
export const cartTable = pgTable("cart", {
  id: serial("id"),
  user_id: varchar("user_id", {
    length: 255,
  }).primaryKey(),
  product_id: varchar("product_id", {
    length: 255,
  }).primaryKey(),
  quantity: integer("quantity").notNull(),
  size: varchar("size", {
    length: 10,
  }).primaryKey(),
  email: varchar("email", {
    length: 255
  }).references(() => userTable.email),
  is_deleted: boolean("is_deleted").default(false),
});

// CREATE TABLE orders (
//   order_id SERIAL,
//   user_id VARCHAR(255) NOT NULL,
//   order_date DATE NOT NULL,
//   order_amount INT NOT NULL,
//   delivery_charges INT NOT NULL,
//   PRIMARY KEY (order_id)
// );
export const orderTable = pgTable("orders", {
  order_id: serial("order_id").primaryKey(),
  user_id: varchar("user_id", {
    length: 255,
  }).notNull(),
  order_date: date("order_date").notNull(),
  order_amount: integer("order_amount").notNull(),
  delivery_charges: integer("delivery_charges").notNull(),
});

// CREATE TABLE order_details (
//   order_detail_id SERIAL,
//   product_id VARCHAR(255) NOT NULL,
//   quantity INT NOT NULL,
//   size VARCHAR(10) NOT NULL,
//   order_id INT NOT NULL,
//   PRIMARY KEY (order_detail_id),
//   FOREIGN KEY (order_id) REFERENCES orders(order_id)
//       ON DELETE CASCADE
//       ON UPDATE CASCADE
// );
export const orderDetailsTable = pgTable("order_details", {
  order_detail_id: serial("order_detail_id").primaryKey(),
  product_id: varchar("product_id", {
    length: 255,
  }).notNull(),
  quantity: integer("quantity").notNull(),
  size: varchar("size", {
    length: 10,
  }).notNull(),
  order_id: integer("order_id")
    .references(() => orderTable.order_id)
    .notNull(),
});

export const db = drizzle(sql);


// Query to describe table
// SELECT 
//    c.table_name,
//    c.column_name,
//    c.data_type,
//    coalesce(constraint_type, 'No Constraint') as constraint_type
// FROM 
//    information_schema.columns c
// LEFT JOIN 
//    information_schema.constraint_column_usage ccu 
// ON 
//    c.column_name = ccu.column_name AND c.table_name = ccu.table_name
// LEFT JOIN 
//    information_schema.table_constraints tc 
// ON 
//    tc.constraint_name = ccu.constraint_name
// WHERE 
//    c.table_name = 'cart';
