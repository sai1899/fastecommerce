import { drizzle } from 'drizzle-orm/connect';
import { datetime } from 'drizzle-orm/mysql-core';
import { sql } from "drizzle-orm";

import { pgTable, integer, varchar,serial, text, timestamp } from "drizzle-orm/pg-core"

export const Users = pgTable("Users",{
    id: serial("id").primaryKey(),
    fname: varchar("fname",{length:255}).notNull(),
    email: varchar("email",{length:255}).notNull().unique(),
    provider: varchar('provider',{length:20}).notNull(),
    external_id: varchar('external_id',{length:100}),
    image:text('image'),
    role:varchar('role',{length:12}).notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const product = pgTable('product',{
    id: serial("id").primaryKey(),
    name:varchar('name',{length:100}).notNull(),
    image:text("image").notNull(),
    description:varchar("description",{length:225}).notNull(),
    price:integer().notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`)
})


export const warehouse = pgTable('warehouse',{
    id:serial("id").primaryKey(),
    name:varchar('name',{length:100}).notNull(),
    pincode: varchar('pincode',{length:6}).notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`)
})

export const order = pgTable('order',{
    id:serial('id').primaryKey()
})

export const delivary_person = pgTable('delivary_person',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:100}).notNull(),
    phone:varchar('phone'),
    warehouse_id: integer('warehouse_id').references(()=> warehouse.id,{onDelete:'cascade'}),
    order_id :integer('order_id').references(()=>order.id),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`)
})

export const inventory = pgTable('inventory',{
    id:serial('id').primaryKey(),
    sku:varchar('sku',{length:8}).notNull(),
    product_id:integer('product_id').references(()=>product.id,{onDelete:'cascade'}).notNull(),
    warehouse_id:integer('warehouse_id').references(()=>warehouse.id).notNull(),
    order_id:integer('order_id').references(()=>order.id)
})


