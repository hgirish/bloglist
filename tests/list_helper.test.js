const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { testBlogs } = require('./blogs_for_test')
const exp = require('node:constants')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [{ likes: 10 }]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 10)
  })

  test('of bigger list is calculated right', () => {

    const result = listHelper.totalLikes(testBlogs)
    assert.strictEqual(result, 46)
  })
})

describe('favorite blog', () => {
  test('returns blog with most likes', () => {
    const expectedBlog = testBlogs.find(({ _id }) => _id === '5a422b3a1b54a676234d17f9')

    const result = listHelper.favoriteBlog(testBlogs)

    assert.deepStrictEqual(result, expectedBlog)

  })
})

