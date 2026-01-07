import fetch from "node-fetch";

export async function callLLM(prompt) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 100
    })
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("OpenRouter error:", text);
    throw new Error("OpenRouter failed");
  }

  const data = await res.json();
  return data.choices[0].message.content;
}
