export default function Todo() {
    return (
        <>
        <h1>Write a Todo!</h1>
            <form action="/getTodo" method="post">
            <input type="text" name="todo" placeholder="Write a todo!"/>
            <input type="submit" value="Enviar" />
            </form>
        </>
    )
}