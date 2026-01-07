import { useState } from "react";

export default function App() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [response, setResponse] = useState("");

  async function submit() {
    const res = await fetch(import.meta.env.VITE_API_URL + "/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, review })
    });
    const data = await res.json();
    setResponse(data.aiResponse);
  }

  return (
    <>
      <h2>User Review</h2>
      <select onChange={e => setRating(e.target.value)}>
        {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
      </select>
      <textarea onChange={e => setReview(e.target.value)} />
      <button onClick={submit}>Submit</button>
      <p>{response}</p>
    </>
  );
}
