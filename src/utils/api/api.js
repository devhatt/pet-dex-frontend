export async function api(url, method, body = null) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  return response.json();
}
