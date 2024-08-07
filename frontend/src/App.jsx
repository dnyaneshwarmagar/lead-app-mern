import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://lead-app-mern.vercel.app")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <>

  <h1>{data?.status}</h1>
  <h1>{data?.message}</h1>

  </>;
}

export default App;
