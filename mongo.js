const { testBlogs } = require('./tests/blogs_for_test')
const config = require('./utils/config')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URL)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
const totalBlogs = testBlogs.length

const deleteBlogs = () => {
  Blog.deleteMany().then(() =>  true)
}
const insertBlogs = () => {
  for (let blog of testBlogs) {
    let blogObject = new Blog(blog)
    blogObject.save()
      .then(`blog saved: ${blog.title}`)
  }
}

// if (deleteBlogs()) {
//   console.log('blogs deleted')
// }

insertBlogs()


const interval = setInterval(() => {
  Blog.find({}).then(result => {
    console.log(result.length)

    if (result.length === totalBlogs) {
      mongoose.connection.close()
      clearInterval(interval)
    }
  })
}, 1000)






