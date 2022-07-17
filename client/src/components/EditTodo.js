import React, { useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const updateDescription = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          body: JSON.stringify({ description }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Todo</h4>
              <button
                type="button"
                class="close"
                onClick={() => setDescription(todo.description)}
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="form-control"
                type="text"
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                onClick={() => setDescription(todo.description)}
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
