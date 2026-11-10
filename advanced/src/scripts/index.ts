import '../styles/base.css';
import '../styles/layout.less';
import '../styles/todo.scss';

interface Task {
    id: number
    text: string
    done: boolean
}

let tasks: Task[] = [];
let nextId = 1;

const form = document.getElementById('todo-form') as HTMLFormElement;
const input = document.getElementById('todo-input') as HTMLInputElement;
const list = document.getElementById('todo-list') as HTMLUListElement;
const counter = document.getElementById('todo-counter') as HTMLParagraphElement;

const addTask = (text: string): void => {
    tasks.push({ id: nextId, text, done: false });
    nextId += 1
}

const toggleTask = (id: number): void => {
    const task = tasks.find((item) => item.id === id);

    if (task) task.done = !task.done;
}

const deleteTask = (id: number): void => {
    tasks = tasks.filter((item) => item.id !== id);
}

const render = (): void => {
    const taskBlockName = 'task';
    list.replaceChildren();

    tasks.forEach((task) => {
        const item = document.createElement('li');
        item.className = task.done ? `${taskBlockName} ${taskBlockName}--done` : taskBlockName;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = `${taskBlockName}__checkbox`;
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => {
            toggleTask(task.id);
            render();
        });

        const text = document.createElement('span');
        text.className = `${taskBlockName}__text`;
        text.textContent = task.text;

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = `${taskBlockName}__delete`;
        remove.textContent = '✕';
        remove.setAttribute('aria-label', 'Видалити задачу');
        remove.addEventListener('click', () => {
            deleteTask(task.id);
            render();
        });

        item.append(checkbox, text, remove);
        list.append(item);
    });

    const doneCount = tasks.filter((task) => task.done).length;

    counter.textContent =
        tasks.length === 0 ? 'Поки що задач немає' : `Виконано ${doneCount} з ${tasks.length}`;
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = input.value.trim();

    if (text === '') return;

    addTask(text);
    input.value = '';
    render();
})

render();