
import Todo from '../page-components/todo';

export default function Home(todos: string[]) {
    return (
        <>
            <Todo/>
            {todos.map((todo: string) => (
                <>
                <form action="/deleteTodo" method='POST'>
                <p>{todo}</p>
                <input type="hidden" name="todoToDelete" value={todo}/>
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