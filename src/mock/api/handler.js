import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:8000/api/v1/members', (req, res, ctx) => {

    // successful response
    return res(ctx.status(200), ctx.json({
      payload: [
        { userId: 1, name: 'Mike', id: 1 },
        { userId: 2, name: 'Lionel Messi', id: 2 },
        { userId: 3, name: 'Lionel Love', id: 3 },
        { userId: 4, name: 'Lionel Poe', id: 4 },
        { userId: 5, name: 'Lionel Gink',  id: 5 },
    ]}), ctx.delay(10))
  }),
  rest.get('http://localhost:8000/api/v1/absences', (req, res, ctx) => {

    // successful response
    return res(ctx.status(200), ctx.json(
      {payload:
      [
        { id: 1, userId: 1, type: 'sickness', confirmedAt: '2021-10-01', startDate: '2021-10-02', endDate: '2021-10-03'},
        { id: 2, userId: 2, type: 'sickness', memberNote: 'I am sick', startDate: '2021-10-02', endDate: '2021-10-03' },
        { id: 3, userId: 3, type: 'vacation', confirmedAt: '2021-01-01', admitterNote: 'OK', startDate: '2021-10-02', endDate: '2021-10-03' },
        { id: 4, userId: 4, type: 'vacation', startDate: '2021-10-02', endDate: '2021-10-03' },
        { id: 5, userId: 5, type: 'sickness', startDate: '2021-10-02', endDate: '2021-10-03' },
      ]
    }), ctx.delay(10))
  })
]