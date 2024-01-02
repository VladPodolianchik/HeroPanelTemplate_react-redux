import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',  // фильтр, к-ый на данный момент применяется, был введен дополнительно
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters")
    }
);

const filtersSlice = createSlice({
        name: 'filters',
        initialState,
        reducers: {
            // filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
            // filtersFetched: (state, action) => {
            //     state.filtersLoadingStatus = 'idle';
            //     state.filters = action.payload;
            // },
            // filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
            filtersChanged: (state, action) => {
                state.activeFilter = action.payload;
            } 
        },
    extraReducers: (builders) => {
        builders
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filtersChanged
} = actions;