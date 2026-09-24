export async function chat(message: string) {
  const res = await fetch("https://llama.codetlab.com/v1/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error(`Chat API: ${res.status}`);
  return res.json();
}
