import {PostInterface} from "../types/Post.interface.ts";
import {useFetch} from "../hooks/useFetch.ts";

const Posts = () => {
  const {data: posts, error, isLoading} = useFetch<PostInterface>('https://jsonplaceholder.typicode.com/posts', 20)

  return (
    <div>
      <h1>Posts page</h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2 className="error">{error}</h2>}
      {!isLoading && !error && (
        <ul>{!!posts.length && posts.map((post: PostInterface) => <li key={post.id}>{post.title}</li>)}</ul>
      )}
    </div>
  )
}

export default Posts