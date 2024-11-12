import type { APIRoute } from "astro";
import { clients, db, eq } from "astro:db";

export const prerender = false

export const PATCH: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId ?? '';

  try {
    const { id, ...body } = await request.json();

    const results = await db
      .update(clients)
      .set(body)
      .where(eq(clients.id, +clientId));

    const updatedClient = await db
      .select()
      .from(clients)
      .where(eq(clients.id, +clientId));

    return new Response(JSON.stringify(updatedClient.at(0)), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ msg: 'No body found' }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
export const DELETE: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId ?? '';

  const { rowsAffected } = await db
    .delete(clients)
    .where(eq(clients.id, +clientId));

  if (rowsAffected > 0) {
    return new Response(JSON.stringify({ msg: 'Deleted' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(
    JSON.stringify({ msg: `Client with id ${clientId} not found` }),
    {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};