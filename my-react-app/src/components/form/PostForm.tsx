import {FormEvent, useState} from 'react'
import InputField from './InputField.tsx'


interface PostFormPropsInterface {
  onSubmit: (post: Partial<ProstInterface>) => void
  post: Partial<postInterface>
}

const PostForm = ({onSubmit, post}: PostFormPropsInterface) => {
  const [id, setId] = useState(post.id as number)
  const [description, setDescription] = useState(post.description as string)
  const [title, setTitle] = useState(post.title as string)
  const [image, setImage] = useState(post.image as string)


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const returnedPost: Partial<PostInterface> = {id, title, description, image}

    if (post.id) {
      returnedPost.id = post.id
    }
    onSubmit(returnedPost)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Post Id..."/>
      <InputField
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title..."/>
      <InputField
        id="description"
        textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Post description..."
      />
      <InputField
        id="image"
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL..."
      />
      <div className="form-group">
        <button className="form-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}

export default PostForm