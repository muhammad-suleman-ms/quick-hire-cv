import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Resume, ResumeContent, InsertResume } from '@shared/schema';

interface ResumeState {
  userResumes: Resume[];
  currentResume: Resume | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ResumeState = {
  userResumes: [],
  currentResume: null,
  isLoading: false,
  error: null,
};

// Fetch all resumes for the user
export const fetchUserResumes = createAsyncThunk('resume/fetchUserResumes', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/resumes');
    if (!response.ok) {
      throw new Error('Failed to fetch resumes');
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Fetch a single resume by ID
export const fetchResumeById = createAsyncThunk('resume/fetchResumeById', 
  async (resumeId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch resume');
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a new resume
export const createResume = createAsyncThunk(
  'resume/createResume',
  async (resumeData: InsertResume, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create resume');
      }
      
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update an existing resume
export const updateResume = createAsyncThunk(
  'resume/updateResume',
  async ({ id, data }: { id: number; data: Partial<Resume> }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update resume');
      }
      
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete a resume
export const deleteResume = createAsyncThunk(
  'resume/deleteResume',
  async (resumeId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete resume');
      }
      
      return resumeId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    clearResumeError: (state) => {
      state.error = null;
    },
    setCurrentResume: (state, action: PayloadAction<Resume | null>) => {
      state.currentResume = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user resumes
      .addCase(fetchUserResumes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserResumes.fulfilled, (state, action: PayloadAction<Resume[]>) => {
        state.isLoading = false;
        state.userResumes = action.payload;
      })
      .addCase(fetchUserResumes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Fetch resume by ID
      .addCase(fetchResumeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchResumeById.fulfilled, (state, action: PayloadAction<Resume>) => {
        state.isLoading = false;
        state.currentResume = action.payload;
      })
      .addCase(fetchResumeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Create resume
      .addCase(createResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createResume.fulfilled, (state, action: PayloadAction<Resume>) => {
        state.isLoading = false;
        state.userResumes.push(action.payload);
        state.currentResume = action.payload;
      })
      .addCase(createResume.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Update resume
      .addCase(updateResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateResume.fulfilled, (state, action: PayloadAction<Resume>) => {
        state.isLoading = false;
        const updatedResume = action.payload;
        state.userResumes = state.userResumes.map(resume => 
          resume.id === updatedResume.id ? updatedResume : resume
        );
        state.currentResume = updatedResume;
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Delete resume
      .addCase(deleteResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteResume.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.userResumes = state.userResumes.filter(resume => resume.id !== action.payload);
        if (state.currentResume && state.currentResume.id === action.payload) {
          state.currentResume = null;
        }
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearResumeError, setCurrentResume } = resumeSlice.actions;

export default resumeSlice.reducer;