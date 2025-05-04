import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: 'default' | 'success' | 'error' | 'info' | 'warning';
}

interface UiState {
  isMenuOpen: boolean;
  isModalOpen: {
    [key: string]: boolean;
  };
  toasts: Toast[];
  activeTab: string;
  isLoading: {
    [key: string]: boolean;
  };
}

const initialState: UiState = {
  isMenuOpen: false,
  isModalOpen: {},
  toasts: [],
  activeTab: 'overview',
  isLoading: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.isModalOpen[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.isModalOpen[action.payload] = false;
    },
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const id = Math.random().toString(36).substr(2, 9);
      state.toasts.push({ ...action.payload, id });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setLoading: (state, action: PayloadAction<{ key: string; isLoading: boolean }>) => {
      state.isLoading[action.payload.key] = action.payload.isLoading;
    },
    clearAllToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const {
  toggleMenu,
  closeMenu,
  openModal,
  closeModal,
  addToast,
  removeToast,
  setActiveTab,
  setLoading,
  clearAllToasts,
} = uiSlice.actions;

export default uiSlice.reducer;