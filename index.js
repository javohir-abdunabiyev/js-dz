fetch('http://localhost:8080/')
    .then(res => res.json())
    .then(data => {
        todos.push(...data.todos);
        reload(todos, cont);
    });
const form = document.forms.namedItem("todo")

const todos = []
const cont = document.querySelector(".container")

form.onsubmit = (event) => {
    event.preventDefault()
    const fm = new FormData(form)

    const task = {
        id: crypto.randomUUID(),
        title: fm.get('title'),
        time: new Date(Date.now()).toISOString(),
        isDone: false
    }



    fetch('http://localhost:8080/todos', {
        method: 'post',
        body: JSON.stringify(task)
    })
    .then(res => res.json())
    .then(Task => {
        todos.push(Task);
        reload(todos, cont);
    });

    form.reset()

}

function reload(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        const items = document.createElement("div")
        items.classList.add("item")

        const top_side = document.createElement("div")
        top_side.classList.add("top-side")
        const span = document.createElement("span")
        span.textContent = item.title



        if (item.isDone === true) {
            span.classList.add("line")
        }
        span.onclick = () => {
            span.classList.add("line")
            item.isDone = true
        }


        items.ondblclick = () => {
            let edit = prompt("Write")
            if (edit) {
                item.title = edit;
                span.innerHTML = edit
            }

            fetch(`http://localhost:8080/todos/${item.id}`, {
                method: 'put',
                body: JSON.stringify({ title: edit })
            })
            .then(res => res.json())

        }


        const btn = document.createElement("button")
        btn.innerHTML = "x"

        const time_span = document.createElement("span")
        time_span.innerHTML = item.time
        time_span.classList.add("time")




        btn.onclick = () => {

            fetch(`http://localhost:8080/todos/${item.id}`, {
                method: 'delete'
            })
            .then((todos) => {
                todos.filter(todo => todo.id !== item.id);
                reload(todos, cont);
            })
            
        }

        top_side.append(span, btn)

        items.append(top_side, time_span)

        cont.append(items)
    }

}

