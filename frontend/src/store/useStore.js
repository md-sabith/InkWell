import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Set up axios interceptor for auth
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  works: [],
  userWorks: [],
  pendingWorks: [],
  leaderboard: { topWorks: [], topAuthors: [] },
  loading: false,
  isSidebarOpen: true,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  fetchPendingWorks: async () => {
    try {
      const { data } = await axios.get(`${API_URL}/admin/pending`);
      set({ pendingWorks: data });
    } catch (error) {
      console.error(error);
    }
  },

  approveWork: async (workId, status) => {
    try {
      await axios.put(`${API_URL}/admin/${workId}/approve`, { status });
      set((state) => ({
        pendingWorks: state.pendingWorks.filter(w => w._id !== workId)
      }));
      // If approved, refresh the main feed
      if (status === 'approved') {
        get().fetchWorks();
        get().fetchLeaderboard();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating status');
    }
  },

  rejectWork: async (workId, status) => {
    try {
      await axios.put(`${API_URL}/admin/${workId}/reject`, { status });
      set((state) => ({
        pendingWorks: state.pendingWorks.filter(w => w._id !== workId)
      }));
      
      
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating status');
    }
  },

  setUser: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  fetchWorks: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${API_URL}/works`);
      set({ works: data, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  fetchUserWorks: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${API_URL}/works/my-works`);
      set({ userWorks: data, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  fetchLeaderboard: async () => {
    try {
      const { data } = await axios.get(`${API_URL}/leaderboard`);
      set({ leaderboard: data });
    } catch (error) {
      console.error(error);
    }
  },

  rateWork: async (workId, marks) => {
  try {
    const { data } = await axios.post(`${API_URL}/works/${workId}/rate`, { marks });
    // 'data' is the full updated work object from your backend
    set((state) => ({
      works: state.works.map(w => w._id === workId ? data : w)
    }));
    get().fetchLeaderboard();
  } catch (error) {
    alert(error.response?.data?.message || 'Error rating work');
  }
},


  likeWork: async (workId) => {
    try {
      const { data } = await axios.post(`${API_URL}/works/${workId}/like`);
      set((state) => ({
        works: state.works.map(w => w._id === workId ? { ...w, likes: data.likes } : w)
      }));
    } catch (error) {
      alert(error.response?.data?.message || 'Error liking work');
    }
  },

  uploadWork: async (workData) => {
    try {
      const { data } = await axios.post(`${API_URL}/works`, workData);
      set((state) => ({ works: [data, ...state.works] }));
      return true;
    } catch (error) {
      alert(error.response?.data?.message || 'Error uploading work');
      return false;
    }
  },

  deleteWork: async (workId) => {
    if (!window.confirm('Are you sure you want to delete this masterpiece? This action cannot be undone.')) return;
    try {
      await axios.delete(`${API_URL}/works/${workId}`);
      set((state) => ({
        works: state.works.filter(w => w._id !== workId),
        userWorks: state.userWorks.filter(w => w._id !== workId)
      }));
      get().fetchLeaderboard();
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting work');
    }
  }
}));
