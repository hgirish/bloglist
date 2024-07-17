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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}