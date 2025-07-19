const HEADERS = {
  "Content-Type": "application/json",
};

export async function makeGet(url) {
  try {
    console.log({ url });
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw "Hubo un error";

    const data = await response.json();

    return { isSuccess: true, data };
  } catch (error) {
    console.log("error en get");
    console.log(error);
    return { isSuccess: false, error };
  }
}

export async function makePost(url, body) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: HEADERS,
    });

    if (!response.ok) throw "Hubo un error";

    const data = await response.json();

    return { isSuccess: true, data };
  } catch (error) {
    return { isSuccess: false, error };
  }
}
