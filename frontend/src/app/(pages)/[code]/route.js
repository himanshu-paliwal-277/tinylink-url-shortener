export async function GET(request, { params }) {
  try {
    // In Next.js 15+, params is a promise and must be awaited
    const { code } = await params;

    // Redirect request to backend route
    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${code}`;

    // Perform backend redirect
    const response = await fetch(backendUrl, {
      redirect: 'manual',
    });

    // If backend returns 302, forward it to the client
    if (response.status === 302) {
      const location = response.headers.get('location');
      return Response.redirect(location, 302);
    }

    // Handle other status codes (404, 500, etc.)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return new Response(errorData.error || 'Short link not found', {
        status: response.status,
      });
    }

    // Fallback
    return new Response('Short link not found', { status: 404 });
  } catch (error) {
    console.error('Error in redirect route:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
