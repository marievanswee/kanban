const express = require('express')
const cors = require('cors')
const app = express()
const port = 3030
const statusArray = ['To Do', 'Doing', 'Done'];
const tasks = [
    {
        id: 0,
        title: 'Courses',
        description: 'Learn new skills to be a better developer',
        status: 0
    },
    {
        id: 1,
        title: 'Shopping',
        description: 'Buying new clothes just because you deserve it',
        status: 0
    },
    {
        id: 2,
        title: 'Read',
        description: 'Read Narnia book, just because it\'s a good movie',
        status: 0
    },
    {
        id: 3,
        title: 'Music',
        description: 'Listen to rock music to be in productive mood',
        status: 0
    },
    {
        id: 4,
        title: 'Cleaning',
        description: 'Clean the house, it\'s time, even if you don\'t have motivation',
        status: 0
    }
]
app.use(cors());
app.use(express.json());

app.get('/tasks', (req, res) => {
    res.json({message: tasks});
})

app.get('/:id', (req, res) => {
    let id = req.params.id;
    let index = tasks.findIndex((task) => task.id === Number(id));
    if(tasks[index]) {
        res.json({message: tasks[index]});
    } else {
        res.status(404).json({error : 'Not found'});
    }

})

app.put('/goto/:id', (req, res) => {
    let newStatus = req.body.status;
    let id = req.params.id;
    let index = tasks.findIndex((task) => task.id === Number(id));
    if(tasks[index]) {
        if(tasks[index].status + 1 === newStatus || tasks[index].status - 1 === newStatus || tasks[index].status === newStatus) {
            tasks[index].status = newStatus;
            res.json({message: tasks});
        } else {
            res.status(400).json({error : `you can not put ${tasks[index].title} from ${statusArray[tasks[index].status]} to ${statusArray[newStatus]}`});
        }

    } else {
        res.status(404).json({error : 'Not found'});
    }

})

app.post('/', (req, res) => {
    let task = req.body.task;
    tasks.push({
        id: tasks.length,
        title: task.title,
        description: task.description,
        status: task.status
    });
    res.json({message: tasks});
})

app.delete('/:id', (req, res) => {
    let id = req.params.id;
    let index = tasks.findIndex((task) => task.id === Number(id));
    if(tasks[index]) {
        tasks.splice(index,1);
        res.json({message: tasks});
    } else {
        res.status(404);
    }
})

app.put('/:id', (req, res) => {
    let id = req.params.id;
    let task = req.body.task;
    let index = tasks.findIndex((task) => task.id === Number(id));
    if(tasks[index]) {
        tasks[index].title = task.title;
        tasks[index].description = task.description;
        if(tasks[index].status + 1 === task.status || tasks[index].status - 1 === task.status || tasks[index].status === task.status) {
            tasks[index].status = task.status;
            res.json({message: tasks[index]});
        } else {
            res.status(400).json({error : `you can not put ${task.title} from ${statusArray[tasks[index].status]} to ${statusArray[task.status]}`});
        }
    } else {
        res.status(404).json({error : 'Not found'});
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;
