const { after, beforeEach, test } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'javascript',
    url: 'www.example.com/async/await',
    likes: 15
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, testBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)


  assert(titles.includes('async/await simplifies making async calls'))

  const insertedBlog =  blogsAtEnd.find((b) => b.title === 'async/await simplifies making async calls')
  assert.strictEqual(insertedBlog.likes, 15)

})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'javascript',
    url: 'www.example.com/blog/without/title',
    likes: 20
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, testBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'blog without url',
    author: 'javascript',
    likes: 20
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, testBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(t => t.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, testBlogs.length - 1)
})

test('unique identifier property of blog posts is id', async () => {
  const blogsInDb = await helper.blogsInDb()

  const firstBlog = blogsInDb[0]

  assert(!( '_id'  in firstBlog))
  assert(( 'id'  in firstBlog))
})

test('if likes missing, it default to zero', async () => {
  const newBlog = {
    title: 'blog without likes',
    author: 'javascript',
    url: 'www.example.com/blog/without/likes',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const insertedBlog =  blogsAtEnd.find((b) => b.title === 'blog without likes')



  assert.strictEqual(blogsAtEnd.length, testBlogs.length + 1)

  assert.strictEqual(insertedBlog.likes, 0)

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