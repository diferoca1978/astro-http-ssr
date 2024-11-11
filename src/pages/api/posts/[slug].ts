import type { APIRoute } from "astro";
import { getEntry } from "astro:content";


export const prerender = false

/**
 * Handles GET requests to retrieve a specific blog post by its slug.
 *
 * @param {object} context - The request context containing parameters and request object.
 * @returns {Response} - JSON response containing the blog post or an error message.
 */
export const GET: APIRoute = async ({ params, request }) => {

  const { slug } = params

  const post = await getEntry("blog", slug as any)

  if (!post) {

    return new Response(JSON.stringify({ message: `post ${slug} not found` }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const POST: APIRoute = async ({ params, request }) => {

  const body = await request.json()

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
export const PUT: APIRoute = async ({ params, request }) => {

  const body = await request.json()

  return new Response(JSON.stringify({
    method: 'PUT',
    msg: `post ${body.name} updated`,
    ...body
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
export const DELETE: APIRoute = async ({ params, request }) => {

  const { slug } = params

  const body = await request.json()

  return new Response(JSON.stringify({
    method: 'DELETE',
    msg: `post ${slug} deleted`,
    slug: slug
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}