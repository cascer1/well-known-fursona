async function fetcher(url: string) {
  console.log(`https://${url}/.well-known/fursona`);
  let res = await fetch(`https://${url}/.well-known/fursona`, {
    headers: {
      "User-Agent": "Fursona Viewer (fursona.gmem.ca)"
    }
  });
  // If 404, return null
  if (res.status != 200) {
    res = await fetch(`https://${url}/.well-known/fursona.json`, {
      headers: {
        "User-Agent": "Fursona Viewer (fursona.gmem.ca)"
      }
    });
    if (res.status != 200) {
      return null;
    }
  }
  // Try to parse json, if not return null
  try {
    const json = await res.json();
    return json;
  } catch (e) {
    res = await fetch(`https://${url}/.well-known/fursona.json`, {
      headers: {
        "User-Agent": "Fursona Viewer (fursona.gmem.ca)"
      }
    });
    if (res.status != 200) {
      return null;
    }
    try {
      const json = await res.json();
      return json;
    } catch (e) {
      return null;
    }
  }
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, params }) {
  const domain = params.domain as string;
  const data = await fetcher(domain);
  if (data === null) {
    return new Response("Not Found", { status: 404 });
  }
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=300, must-revalidate",
    },
  });
}
