import React, { useState } from "react"
function StudentList() {
  const [students] = useState([
    { id: 1, name: "Ali",   passed: true  },
    { id: 2, name: "Sara",  passed: false },
    { id: 3, name: "Hamza", passed: true  },
  ]);
 
  return (
    <ul>
      {students.map(s => (
        <li key={s.id}>                                  {/* unique key is required */}
          {s.name} {s.passed ? "✅ Passed" : "❌ Failed"}   {/* conditional */}
        </li>
      ))}
    </ul>
  );
}
  export default StudentList;