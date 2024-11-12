import type { APIRoute } from "astro";
import { db, clients } from "astro:db";

export const prerender = false


export const GET: APIRoute = async ({ params, request }) => {

  try {

    const allClients = await db.select().from(clients)
    return new Response(JSON.stringify(allClients), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ e }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }


}

export const POST: APIRoute = async ({ params, request }) => {

  try {

    const { id, ...body } = await request.json()

    const { lastInsertRowid } = await db.insert(clients).values(body)


    return new Response(JSON.stringify({
      id: +lastInsertRowid!.toString(),
      name: body.name,
      lastName: body.lastName,
      age: body.age,
      isActive: body.isActive
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    })


  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify(e), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}