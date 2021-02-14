import { configureStore } from '@reduxjs/toolkit';
import partsReducer from './partsSlice';

export default configureStore({
  reducer: {
    parts: partsReducer,
  },
});
