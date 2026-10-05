const CHAT_ENDPOINTS = [
  "https://ren0.codetlab.com/v1/chat",
  "https://ren.codetlab.com/v1/chat",
];

export async function chat(message: string) {
  let lastError: unknown;

  for (const endpoint of CHAT_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        return await res.json();
      }

      lastError = new Error(`Chat API ${endpoint}: ${res.status}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    `No chat server available: ${
      lastError instanceof Error ? lastError.message : "unknown error"
    }`,
  );
}