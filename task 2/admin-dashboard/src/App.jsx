import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/reviews")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <>
      <h2>Admin Dashboard</h2>
      {data.map((r, i) => (
        <div key={i}>
          <b>{r.rating}★</b>
          <p>{r.review}</p>
          <p>Summary: {r.summary}</p>
          <p>Action: {r.action}</p>
          <hr/>
        </div>
      ))}
    </>
  );
}
