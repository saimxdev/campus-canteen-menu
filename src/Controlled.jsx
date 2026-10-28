import React, { useState } from "react";
function Controlled() {
  const [query, setQuery] = useState("");
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." />
      <p>You typed: {query}</p>
    </>
  );
}
export default Controlled;