import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {


  return new Response(JSON.stringify({ name: 'John Doe', age: '30' }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

