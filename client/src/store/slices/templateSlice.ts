import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Template } from '@shared/schema';

interface TemplateState {
  templates: Template[];
  filteredTemplates: Template[];
  currentTemplate: Template | null;
  currentFilter: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: TemplateState = {
  templates: [],
  filteredTemplates: [],
  currentTemplate: null,
  currentFilter: 'all',
  isLoading: false,
  error: null,
};

// Fetch all templates
export const fetchTemplates = createAsyncThunk(
  'template/fetchTemplates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/templates');
      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Add template feedback/rating
export const addTemplateFeedback = createAsyncThunk(
  'template/addTemplateFeedback',
  async (
    {
      templateId,
      rating,
      feedback,
    }: {
      templateId: string;
      rating: number;
      feedback?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch('/api/templates/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ templateId, rating, feedback }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit template feedback');
      }

      return { templateId, rating, feedback };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setCurrentTemplate: (state, action: PayloadAction<Template | null>) => {
      state.currentTemplate = action.payload;
    },
    filterTemplates: (state, action: PayloadAction<string>) => {
      state.currentFilter = action.payload;
      
      if (action.payload === 'all') {
        state.filteredTemplates = state.templates;
      } else {
        state.filteredTemplates = state.templates.filter(template => 
          template.category.includes(action.payload)
        );
      }
    },
    clearTemplateError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch templates
      .addCase(fetchTemplates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTemplates.fulfilled, (state, action: PayloadAction<Template[]>) => {
        state.isLoading = false;
        state.templates = action.payload;
        state.filteredTemplates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Add template feedback
      .addCase(addTemplateFeedback.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTemplateFeedback.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addTemplateFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentTemplate, filterTemplates, clearTemplateError } = templateSlice.actions;

export default templateSlice.reducer;