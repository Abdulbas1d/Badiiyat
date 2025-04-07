import { Navigate } from "react-router-dom";

export async function login(data) {
  const res = await fetch("https://library-project-6agw.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("reqdanman", res);
  return <Navigate to={"/"} />;
}
