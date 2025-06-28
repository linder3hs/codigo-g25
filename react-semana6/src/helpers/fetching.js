export async function makePost(url, body) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw "Hubo un error";

    const data = await response.json();

    return { isSuccess: true, data };
  } catch (error) {
    return { isSuccess: false, error };
  }
}
