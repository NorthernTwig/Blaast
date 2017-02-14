export default post => {
        let sanetizedPost = post.toObject()
        sanetizedPost['self'] = `http://localhost:3000/posts/${post._id}`
        sanetizedPost['__v'] = undefined
        return sanetizedPost
}