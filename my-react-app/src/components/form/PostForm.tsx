import {FormEvent, useState} from 'react';
import InputField from './InputField.tsx';
import styles from "./Form.module.scss";


interface PostFormPropsInterface {
  onSubmit: (post: PostInterface) => void;
  post: PostInterface;
}

const PostForm = ({onSubmit, post}: PostFormPropsInterface) => {
  const [id, setId] = useState(post.id);
  const [description, setDescription] = useState(post.description);
  const [title, setTitle] = useState(post.title);
  const [image, setImage] = useState(post.image);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedPost: PostInterface = {id, title, description, image};

    onSubmit(updatedPost);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form__container}>

      <InputField
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title..."
        className={`${styles.form__control} ${styles.white}`}
      />
      <InputField
        id="description"
        textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Post description..."
        className={`${styles.form__control} ${styles.white} ${styles.textarea}`}
      />
      <InputField
        id="image"
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL..."
        className={`${styles.form__control} ${styles.white}`}
      />

      <div className={styles.form__items}>
        <button className={styles.form_button} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default PostForm;
