import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  async function updateTodo(id: string) {
    const todo = {
      id: id,
      content: window.prompt("Change content") ,
    };

   client.models.Todo.update(todo);
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((anywhat) => (
          <>
            <li key={anywhat.id}>{anywhat.content}</li>
            <button onClick={() => updateTodo(anywhat.id)}>change content </button>
          </>
        ))}
      </ul>
    </main>
  );
}

export default App;
