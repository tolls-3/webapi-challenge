import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const initialForm = {
  name: "",
  description: ""
};

function App() {
  const [project, setProject] = useState([]);
  const [form, setForm] = useState(initialForm);
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

  function addProject(e, form) {
    debugger;
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/projects", form)
      .then(res => {
        debugger;
        setProject([...project, res.data]);
      })
      .catch(err => {
        debugger;
        console.log(err);
      });
    return setForm(initialForm);
  }

  function inputChange(e) {
    return setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function removeProject(id) {
    axios
      .delete(`http://localhost:8000/api/projects/${id}`)
      .then(res => {
        setProject(
          project.filter(remainingProject => remainingProject.id !== id)
        );
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <div>
        {project
          ? project.map(char => (
              <div key={char.id}>
                <h4>{char.name}</h4>
                <p>{char.description}</p>
                <button onClick={e => removeProject(char.id)}>X</button>
              </div>
            ))
          : null}
      </div>
      <div>
        <form onSubmit={addProject}>
          <div>
            <label>
              Name
              <br />
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={inputChange}
              />
            </label>
            <br />
            <label>
              Description
              <br />
              <input
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={inputChange}
              />
            </label>
          </div>
          <button className="button" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
