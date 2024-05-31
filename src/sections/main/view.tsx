import { FC } from "react";
import useFetch from "../../hooks/useFetch";
import { Todo } from "../../types/todos.type";

// run => * npx json-server --watch data/db.json --port 8000 *
const MainView: FC = () => {
  const {
    data: todos,
    error,
    isPending,
  } = useFetch<Todo[]>("http://localhost:8000/todos");

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{ display: "flex", gap: 16, flexWrap: "wrap", maxWidth: "1440px" }}
    >
      {todos ? (
        todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              backgroundColor: "gray",
              padding: "10px",
              marginTop: 10,
            }}
          >
            <h2>Todo: {todo["title"]}</h2>
            <p>In Progress: {todo["inProgress"] ? "Yes" : "No"}</p>
            <p>Done: {todo["isDone"] ? "Yes" : "No"}</p>
          </div>
        ))
      ) : (
        <div>!data</div>
      )}
    </div>
  );
};

export default MainView;
