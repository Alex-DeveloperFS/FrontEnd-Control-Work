import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import {
  clearPosts,
  fetchAllPosts,
  selectPosts,
  selectPostsError,
  selectPostsLoading,
  removePost,
  editPost,
  addPost,
  setPage,
} from '../redux/postsSlice.ts';
import { useEffect, useRef, useState } from 'react';
import { PostInterface } from '../types/Post.interface.ts';
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Modal from "../modals/Modal.tsx";
import PostForm from "../components/form/PostForm.tsx";
import { INITIAL_POST } from "../data/mockData.ts";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectPosts) || [];
  const isLoading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);
  const { isLogged } = useSelector((state: RootState) => state.auth);
  const currentPage = useSelector((state: RootState) => state.posts.currentPage);

  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState<PostInterface | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const postRefs = useRef<{ [key: number]: HTMLLIElement | null }>({});

  useEffect(() => {
    dispatch(fetchAllPosts(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToPost = (id: number) => {
    const element = postRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpen = (post?: PostInterface) => {
    setCurrentPost(post || INITIAL_POST);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentPost(null);
  };

  const refreshPosts = async () => {
    dispatch(setPage(1));
    await dispatch(fetchAllPosts(1));
    await fetchPostCount();
  };

  const handleRemovePost = (postId: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      dispatch(removePost(postId))
        .unwrap()
        .then(async () => {
          await refreshPosts();
          toast.success('Пост успешно удален!');
        })
        .catch((error) => {
          console.error('Не удалось удалить пост:', error);
        });
    }
  };

  const handleEditPost = (post: PostInterface) => {
    if (post) {
      dispatch(editPost(post))
        .unwrap()
        .then(async () => {
          await refreshPosts();
          toast.success('Пост успешно отредактирован!');
        })
        .catch((error) => {
          console.error('Не удалось отредактировать пост:', error);
        });
      handleClose();
    }
  };

  const handleAddPost = (post: PostInterface) => {
    if (post) {
      dispatch(addPost(post))
        .unwrap()
        .then(async () => {
          await refreshPosts();
          toast.success('Новый пост успешно создан!');
        })
        .catch((error) => {
          console.error('Не удалось создать пост:', error);
        });
      handleClose();
    }
  };

  const handleClearPosts = () => {
    if (window.confirm('Вы уверены, что хотите удалить все посты?')) {
      dispatch(clearPosts())
        .unwrap()
        .then(async () => {
          await refreshPosts();
          toast.success('Все посты успешно удалены!');
        })
        .catch((error) => {
          console.error('Не удалось удалить все посты:', error);
        });
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setPage(newPage));
      dispatch(fetchAllPosts(newPage));
    }
  };

  const count = async () => {
    try {
      const response = await axios.get(`https://66d6c219006bfbe2e64e791a.mockapi.io/posts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

  const fetchPostCount = async () => {
    try {
      const posts = await count();
      const postCount = posts.length;
      const pages = Math.ceil(postCount / 5);
      setTotalPages(pages);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchPostCount();
  }, []);

  return (
    <div className="posts-container">
      <h1 className="posts-title">Страница постов</h1>

      {isLoading && <h2 className="loading">Загрузка...</h2>}
      {error && <h2 className="error">{error}</h2>}

      {isLogged && (
        <div className="post-item__actions-admin">
          <button className="post-item__delete" onClick={handleClearPosts}>
            Удалить все посты
          </button>

          <button className="post-item__edit" onClick={() => handleOpen()}>
            Создать пост
          </button>

          {showModal && (
            <Modal onClose={handleClose}>
              <h2 className="modal__title">
                {currentPost?.id ? 'Редактировать пост' : 'Создать новый пост'}
              </h2>

              {error && <p className="error">{error}</p>}

              <PostForm onSubmit={currentPost?.id ? handleEditPost : handleAddPost} post={currentPost || INITIAL_POST} />
            </Modal>
          )}
        </div>
      )}

      {!isLoading && !error && (
        <div className="posts-box">
          <ul className="posts-menu">
            {posts.length > 0 ? (
              posts.map((post: PostInterface) => (
                <li key={post.id} className="posts-menu-item">
                  <button className="new-post-link" onClick={() => scrollToPost(post.id)}>
                    {post.title}
                  </button>
                </li>
              ))
            ) : (
              <li className="posts-menu-item">Посты не найдены</li>
            )}
          </ul>
<div>
          <div className="pagination">
            <button
              className="pagination__btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Назад
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`pagination__btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="pagination__btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Вперед
            </button>
          </div>

          <ul className="posts-list">
            {posts.length > 0 ? (
              posts.map((post: PostInterface) => (
                <li key={post.id} className="post-item" ref={(el) => (postRefs.current[post.id] = el)}>
                  <a href={`/posts/${post.id}`} className="post-link">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-description">{post.description}</p>
                    <img className="post-image" src={post.image} alt="Изображение поста" />
                  </a>

                  {isLogged && (
                    <div className="post-item__actions">
                      <button className="post-item__delete" onClick={() => handleRemovePost(post.id)}>
                        <FaTrash />
                      </button>

                      <button className="post-item__edit" onClick={() => handleOpen(post)}>
                        <FaEdit />
                      </button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className="post-item">Посты не найдены</li>
            )}
          </ul>
        </div>
        </div>
      )}

      {showButton && (
        <button className="button-prev show" onClick={scrollToTop}>
          ↑ Вернуться к началу
        </button>
      )}

      <ToastContainer />
    </div>
  );
}

export default Posts;
