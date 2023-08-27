import { pgTable, varchar, serial, integer, date } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

// create table cart (
//   id serial,
//   user_id varchar(255) not null,
//   product_id varchar(255) not null,
//   quantity int not null,
//   size varchar(10),
//   primary key (user_id, product_id, size)
// )

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
});

export const orderTable = pgTable("orders", {
  order_id: serial("order_id").primaryKey(),
  user_id: varchar("user_id", {
    length: 255,
  }).notNull(),
  order_date: date("order_date").notNull(),
  order_amount: integer("order_amount").notNull(),
  delivery_charges: integer("delivery_charges").notNull(),
});

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

