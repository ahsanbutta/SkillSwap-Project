import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

const initialState = {
    swaps: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new swap request
export const createSwap = createAsyncThunk(
    'swaps/create',
    async (swapData, thunkAPI) => {
        try {
            const response = await api.post('/swaps', swapData);
            return response.data;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user swaps
export const getMySwaps = createAsyncThunk(
    'swaps/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/swaps');
            return response.data;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const swapSlice = createSlice({
    name: 'swap',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSwap.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createSwap.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.swaps.push(action.payload);
            })
            .addCase(createSwap.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMySwaps.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMySwaps.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.swaps = action.payload;
            })
            .addCase(getMySwaps.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = swapSlice.actions;
export default swapSlice.reducer;
