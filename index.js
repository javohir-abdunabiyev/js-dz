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
    todos.push(task)
    reload(todos, cont)
    console.log(task);
    form.reset()
    
}

function reload(arr, place) {
    place.innerHTML = ""
    
    for(let item of arr) {
        const items = document.createElement("div")
        items.classList.add("item")
        
        const top_side = document.createElement("div")
        top_side.classList.add("top-side")
        const span = document.createElement("span")
        span.textContent = item.title

        if(item.isDone === true) {
            span.classList.add("line")
        }
        span.onclick = () => {
            span.classList.add("line")
            item.isDone = true
        }

        const btn = document.createElement("button")
        btn.innerHTML = "x"
        
        const time_span = document.createElement("span")
        time_span.innerHTML = item.time
        time_span.classList.add("time")
        


        btn.onclick = () => {
            let close = Boolean(todos.find(el => el.id === item.id))

            if(close !== -1) {
                let idx = todos.indexOf(item)
                todos.splice(idx, 1)
                reload(todos, cont)
            }
        }
        
        top_side.append(span, btn)
        
        items.append(top_side, time_span)
        
        cont.append(items)
    }

}

console.log(todos);