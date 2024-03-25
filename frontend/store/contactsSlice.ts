/*
    Reducers used only in contacts service
*/

import { createSlice } from "@reduxjs/toolkit";

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        allContacts: [],
        sortedContacts: [],
        filteredContacts: [],
        allCompanies: [],
        markedCompanies: [],
        allDepartments: [],
        markedDepartments: [],
    },
    reducers: {
        // reducer used for saving contacts in store
        storeContacts: (state, action) => {
            state.allContacts = action.payload;
        },
        // reducer used for saving companies in store
        storeCompanies: (state, action) => {
            state.allCompanies = action.payload;
        },
        // reducer used for 
        storeDepartments: (state, action) => {
            state.allDepartments = action.payload;
        },
        // reducer used for saving marked companies in store
        storeMarkedCompanies: (state, action) => {
            state.markedCompanies = action.payload;
        },
        // reducer used for saving marked departments in store
        storeMarkedDeparments: (state, action) => {
            state.markedDepartments = action.payload;
        },
        // reducer used for sorting contacts
        sortContacts: (state, action) => {
            state.sortedContacts = action.payload;
        },
        // reducer used for filtering companies
        filterCompanies: (state) => {
            state.filteredContacts = state.allContacts.filter((item) =>
                state.markedCompanies.includes(item.company_id));
        },
        // reducer used for filtering departments
        filterDepartments: (state) => {
            state.filteredContacts = state.allContacts.filter((item) =>
                state.markedDepartments.includes(item.department_id));
        },
        // reducer used for clearing all the sorted and marked data
        clearFilter: (state) => {
            state.filteredContacts = [];
            // state.allCompanies = [];
            state.markedDepartments = [];
            state.markedCompanies = [];
        },
    }
})

export const {
    storeContacts,
    storeCompanies,
    storeDepartments,
    storeMarkedCompanies,
    storeMarkedDeparments,
    sortContacts,
    filterCompanies,
    filterDepartments,
    clearFilter,
} = contactsSlice.actions;

export default contactsSlice.reducer;