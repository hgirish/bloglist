// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog  = (blogs) => {
  const blogWithMostLikes = blogs.reduce(
    (prev, current) => {
      if (prev.likes === current.likes) return prev
      return prev.likes > current.likes ? prev : current
    }
  )
  return blogWithMostLikes
}

const mostBlogs = (blogs) => {
  // Reduce the blogs array to an object where keys are authors and values are entry counts
  const authorCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  // Find the author with the highest entry count
  let mostProlificAuthor
  let maxEntries = 0
  for (const author in authorCounts) {
    if (authorCounts[author] > maxEntries) {
      mostProlificAuthor = author
      maxEntries = authorCounts[author]
    }
  }

  // Return the author with the most entries (or undefined if there are no entries)
  return { author:mostProlificAuthor, count:maxEntries }

}

const mostLikes = (blogs) => {
  const authorCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0 ) + blog.likes
    return acc
  }, {})
  const testlikes = getMax(authorCounts)
  console.log(testlikes)
  let authorWithMostLikes
  let maxLikes = 0
  for (const author in authorCounts) {
    if (authorCounts[author] > maxLikes ) {
      authorWithMostLikes = author
      maxLikes = authorCounts[author]
    }
  }

  return { author: authorWithMostLikes, likes: maxLikes }
}
const mostLikesAlternative = (blogs) => {
  const authorCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0 ) + blog.likes
    return acc
  }, {})
  const testlikes = getMax(authorCounts)

  return({ author: testlikes[0].x, likes: testlikes[0].max })
}

const getMax = object => {
  let max = Math.max(...Object.values(object))
  return Object.keys(object).filter(key => object[key]===max).map((x) => ({ x, max }))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  mostLikesAlternative
}