import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [project, setProject] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/projects")
      .then(res => {
        //console.log(res);
        setProject(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      {project
        ? project.map(char => (
            <div key={char.id}>
              <h4>{char.name}</h4>
              <p>{char.description}</p>
              {/* <button onClick={e => removeUser(char.id)}>X</button> */}
            </div>
          ))
        : null}
    </div>
  );
}

export default App;
