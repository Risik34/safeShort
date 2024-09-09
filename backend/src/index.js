export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }

    if (url.pathname === "/shorten" && request.method === "POST") {
      return withCORS(await shortenUrl(request, env));
    }

    const path = url.pathname.substring(1); // Remove the leading "/"
    if (path) {
      return withCORS(await handleRedirect(path, env));
    }

    return withCORS(new Response("Welcome to URL shortener API!", { status: 200 }));
  }
};

// Handle CORS preflight requests (OPTIONS method)
function handleOptions(request) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  return new Response(null, { status: 204, headers });
}

// Add CORS headers to responses
function withCORS(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}

// Shorten URL
async function shortenUrl(request, env) {
  try {
    const body = await request.json();
    const originalUrl = body.url.includes("https://")||body.url.includes("http")?body.url:`https://${body.url}`

    if (!originalUrl) {
      return new Response("Missing URL in request body", { status: 400 });
    }

    const shortId = Math.random().toString(36).substring(2, 8);
    await env.URLS.put(shortId, originalUrl);

    const shortenedUrl = `${request.headers.get("origin") || "https://yourdomain.com"}/${shortId}`;
    return new Response(JSON.stringify({ shortenedUrl }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Invalid request", { status: 400 });
  }
}

// Handle redirects
async function handleRedirect(path, env) {
  const url = await env.URLS.get(path);
  if (url) {
    return new Response(JSON.stringify({url}))
  }

  return new Response("URL not found", { status: 404 });
}

