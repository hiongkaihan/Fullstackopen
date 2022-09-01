const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return sum
}

const favouriteBlog = (blogs) => {
    const blogWithMostLikes = blogs.reduce((favBlog, blog) => {
        return blog.likes > favBlog.likes ? blog : favBlog
    }, {likes: -1})

    return blogWithMostLikes
}

const mostBlogs = (blogs) => {
    let authorBlogs = {}

    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].author in authorBlogs) {
            authorBlogs[blogs[i].author] += 1
        } else {
            authorBlogs[blogs[i].author] = 1
        }
    }

    if (Object.keys(authorBlogs).length === 0) {
        return {}
    }

    const blogCount = Object.values(authorBlogs)
    const highestBlogCount = Math.max(...blogCount)
    const author = Object.keys(authorBlogs).find(key => authorBlogs[key] === highestBlogCount)

    return {"author": author, "blogs": highestBlogCount}
}

const mostLikes = (blogs) => {
    let authorLikes = {}

    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].author in authorLikes) {
            authorLikes[blogs[i].author] += blogs[i].likes
        } else {
            authorLikes[blogs[i].author] = blogs[i].likes
        }
    }

    if (Object.keys(authorLikes).length === 0) {
        return {}
    }

    const likeCount = Object.values(authorLikes)
    const highestLikeCount = Math.max(...likeCount)
    const author = Object.keys(authorLikes).find(key => authorLikes[key] === highestLikeCount)

    return {"author": author, "likes": highestLikeCount}
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}