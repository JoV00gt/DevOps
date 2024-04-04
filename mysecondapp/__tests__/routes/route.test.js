const request = require('supertest')
const app = require('../../app')

describe('index route works', () => {
  it('should give 200 statuscode', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
  });

});