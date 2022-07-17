import React, { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    try {
      const body = { description };
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmit}>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="form-control"
        />
        <button className="btn btn-success" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default InputTodo;
