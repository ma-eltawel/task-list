let tasks = [];

if(localStorage.tasks != null){
    tasks = JSON.parse(localStorage.tasks);
}
function show() {
    localStorage.tasks = JSON.stringify(tasks);
    let table = document.querySelector('.content'), index = 0;
    table.innerHTML = '';
    for(el of tasks){
        table.innerHTML += `
            <div class="task ${el.isDone ? 'task-done' : ''}">
                <div class="info">
                    <h2>${el.title}</h2>
                    <div class="date">
                        <i class="far fa-calendar-days"></i> 
                        <span>${el.date} |</span>
                        <i class="far fa-clock"></i> 
                        <span>${el.time}</span>
                    </div>
                </div>
                <div class="action">
                    ${el.isDone ? `
                        <button class="cancel" onclick="done(${index})"><i class="fas fa-xmark"></i></button>
                        ` : `
                        <button class="done" onclick="done(${index})"><i class="fas fa-thumbs-up"></i></button>
                    `}
                    <button class="edit" onclick="edit(${index})"><i class="fas fa-pencil"></i></button>
                    <button class="del" onclick="deleteTask(${index})"><i class="fas fa-trash-can"></i></button>
                </div>
            </div>
        `
        index++;
    }
}
show();

document.querySelector('#add').onclick = () => {
    let now = new Date();
    let task = {
        title : prompt('Enter Task Title : ', `Task ${tasks.length + 1}`),
        date : now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear(),
        time : tasktime = now.getHours() + ':' + now.getMinutes(),
        isDone : false
    };
    tasks.push(task);
    show();
}

function deleteTask(index) {
    if(confirm(`Are you sure of delete "${tasks[index].title}" ?`)){
        tasks.splice(index, 1);
        show();
    }
}

function edit(index) {
    tasks[index].title = prompt('The new task title is : ', tasks[index].title);
    show();
}

function done(index) {
    tasks[index].isDone = !tasks[index].isDone;
    show();
}