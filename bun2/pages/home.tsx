
import type { Todos } from '@prisma/client';
import Todo from '../page-components/todo';

export default function Home(todos: any) {
    return (
        <>
            <Todo/>
            {todos.map((todo: any) => (
                <>
                <form action="/deleteTodo" method='POST'>
                <p>{todo.todo}</p>
                <input type="hidden" name="todoToDelete" value={todo.todo}/>
                <button>X</button>
                </form>
                </>
            ))}
            <form action="/logout" method='POST'>
                <button>Sair</button>
            </form>
        </>
    )
}