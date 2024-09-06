import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';
import axios from 'axios';
import { PostInterface } from '../types/Post.interface.ts';

interface PostsStateInterface {
  posts: PostInterface[];
  error: string | null;
  isLoading: boolean;
  totalCount: number;
  currentPage: number;
}

const initialState: PostsStateInterface = {
  posts: [],
  error: null,
  isLoading: false,
  totalCount: 0,
  currentPage: 1
};


export const fetchAllPosts = createAsyncThunk<{ posts: PostInterface[], totalCount: number }, number>(
  'posts/fetchAllPosts',
  async (page) => {
    try {
      const response = await axios.get(`https://66d6c219006bfbe2e64e791a.mockapi.io/posts?page=${page}&limit=5`);
      return { posts: response.data, totalCount: parseInt(response.headers['x-total-count'], 10) };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }
);



export const removePost = createAsyncThunk<void, number>(
  'posts/removePost',
  async (postId: number) => {
    await axios.delete(`https://66d6c219006bfbe2e64e791a.mockapi.io/posts/${postId}`);
  }
);

export const editPost = createAsyncThunk<void, PostInterface>(
  'posts/editPost',
  async (post: PostInterface) => {
    await axios.put(`https://66d6c219006bfbe2e64e791a.mockapi.io/posts/${post.id}`, post);
  }
);

export const addPost = createAsyncThunk<void, PostInterface>(
  'posts/addPost',
  async (post: PostInterface) => {
    await axios.post(`https://66d6c219006bfbe2e64e791a.mockapi.io/posts/`, post);
  }
);

export const clearPosts = createAsyncThunk<void>(
  'posts/clearPosts',
  async () => {
    const response = await axios.get('https://66d6c219006bfbe2e64e791a.mockapi.io/posts');
    const posts = response.data;

    await Promise.all(
      posts.map((post: PostInterface) =>
        axios.delete(`https://66d6c219006bfbe2e64e791a.mockapi.io/posts/${post.id}`)
      )
    );
  }
);

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsLoading = (state: RootState) => state.posts.isLoading;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectTotalCount = (state: RootState) => state.posts.totalCount;

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action: PayloadAction<{ posts: PostInterface[], totalCount: number }>) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(removePost.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to remove post';
      })
      .addCase(editPost.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to edit post';
      })
      .addCase(addPost.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add post';
      })
      .addCase(clearPosts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to clear posts';
      });
  },
});

export const { setPage } = postsSlice.actions;

export default postsSlice.reducer;
