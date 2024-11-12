import { column, defineDb, defineTable } from 'astro:db';



const clients = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    lastName: column.text(),
    age: column.number(),
    isActive: column.boolean()
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    clients
  }
});
