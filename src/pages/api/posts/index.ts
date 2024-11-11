import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

/** 
  *Here we set the prerender option to false, so that SSR is set to hybrid only this page will be created on the server side 
*/
export const prerender = false


/**
 * Handles GET requests to retrieve blog posts.
 * 
 * If a "slug" query parameter is provided, it attempts to fetch a specific
 * blog post by its slug. If the post is found, it returns the post data
 * as a JSON response with a 200 status. If not found, it returns a 404
 * status with an error message.
 * 
 * If no "slug" is provided, it returns a list of all blog posts as a JSON
 * response with a 200 status.
 * 
 * @param {object} context - The request context containing parameters and request object.
 * @returns {Response} - JSON response containing the blog post(s) or an error message.
 */
export const GET: APIRoute = async ({ params, request }) => {

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (slug) {
    const post = await getEntry("blog", slug);

    if (post) {
      return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    return new Response(JSON.stringify({ message: `post ${slug} not found` }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const blogPosts = await getCollection("blog");
  return new Response(JSON.stringify(blogPosts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

