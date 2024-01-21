const request = require('supertest');
const app = require('../index');
const {reqGoto, reqGotoWrong, reqPostTask, reqUpdateTask, reqUpdateTaskWrong} = require("./index.test.data");

describe("Checking get tasks endpoint", () => {
    test('returns a list of tasks', async () => {
        const response = await request(app).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: [
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
            }]
        });
    });
});

describe("Checking get task by id endpoint", () => {
    test('returns specific task', async () => {
        const response = await request(app).get('/0');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message:
                {
                    id: 0,
                    title: 'Courses',
                    description: 'Learn new skills to be a better developer',
                    status: 0
                }
        });
    });
    test('returns not found error', async () => {
        const response = await request(app).get('/11');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({error: 'Not found'});
    });
});

describe("Checking update status task by id endpoint", () => {
    test('returns new tasks list', async () => {
        const response = await request(app).put('/goto/0').send(reqGoto);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: [
                {
                    id: 0,
                    title: 'Courses',
                    description: 'Learn new skills to be a better developer',
                    status: 1
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
                }]
        });
    });
    test('returns not found error', async () => {
        const response = await request(app).put('/goto/11').send(reqGoto);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({error: 'Not found'});
    });

    test('returns error message for wrong change status', async () => {
        const response = await request(app).put('/goto/1').send(reqGotoWrong);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({error : `you can not put Shopping from To Do to Done`});
    });
});

describe("Checking post task endpoint", () => {
    test('returns new tasks list', async () => {
        const response = await request(app).post('/').send({task: reqPostTask});
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: [
                {
                    id: 0,
                    title: 'Courses',
                    description: 'Learn new skills to be a better developer',
                    status: 1
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
                },
                {
                    id: 5,
                    title: 'Test',
                    description: 'This is a test',
                    status: 0
                }
            ]
        });
    });
});

describe("Checking delete task by id endpoint", () => {
    test('returns new tasks list', async () => {
        const response = await request(app).delete('/0');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: [
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
                },
                {
                    id: 5,
                    title: 'Test',
                    description: 'This is a test',
                    status: 0
                }
            ]
        });
    });
    test('returns not found error', async () => {
        const response = await request(app).delete('/goto/11');
        expect(response.status).toBe(404);
    });
});

describe("Checking update task by id endpoint", () => {
    test('returns updated task', async () => {
        const response = await request(app).put('/2').send({task: reqUpdateTask});
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: {
                id: 2,
                title: 'Test2',
                description: 'This is a test2',
                status: 1
            }
        });
    });
    test('returns not found error', async () => {
        const response = await request(app).put('/11').send({task: reqUpdateTask});
        expect(response.status).toBe(404);
        expect(response.body).toEqual({error: 'Not found'});
    });
    test('returns error message for wrong change status', async () => {
        const response = await request(app).put('/1').send({task: reqUpdateTaskWrong});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({error : `you can not put Test2 from To Do to Done`});
    });
});
