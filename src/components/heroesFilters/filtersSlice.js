import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',  // фильтр, к-ый на данный момент применяется, был введен дополнительно
}

const filtersSlice = createSlice({
        name: 'filters',
        initialState,
        reducers: {
            filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
            filtersFetched: (state, action) => {
                state.filtersLoadingStatus = 'idle';
                state.filters = action.payload;
            },
            filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
            filtersChanged: (state, action) => {
                state.activeFilter = action.payload;
            } 
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