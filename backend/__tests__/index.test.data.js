const reqGoto = {
    status: 1
}

const reqGotoWrong = {
    status: 2
}

const reqPostTask = {
    title: 'Test',
    description: 'This is a test',
    status: 0
}

const reqUpdateTask = {
    title: 'Test2',
    description: 'This is a test2',
    status: 1
}

const reqUpdateTaskWrong = {
    title: 'Test2',
    description: 'This is a test2',
    status: 2
}

module.exports = {
    reqGoto,
    reqGotoWrong,
    reqPostTask,
    reqUpdateTask,
    reqUpdateTaskWrong
}
