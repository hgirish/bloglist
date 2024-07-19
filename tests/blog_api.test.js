const { after, beforeEach, test } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const { testBlogs } = require('./blogs_for_test')



test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 6 blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, testBlogs.length)
})

test('the first blog title is React Patterns', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)

  assert(titles.includes('React patterns'))
})

beforeEach(async () => {
  await Blog.deleteMany()
  for (let blog of testBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})
after(async () => {
  await mongoose.connection.close()
})