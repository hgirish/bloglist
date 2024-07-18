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
//   const mostLikes  = Math.max(...blogs.map(blog => blog.likes))

  //   const favorite = blogs.filter(blog => blog.likes === mostLikes)[0]

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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}