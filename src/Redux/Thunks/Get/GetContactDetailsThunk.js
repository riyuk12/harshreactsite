import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../Components/baseUrl";

// API call function using thunk and axios
export const GetContactDetailsThunk = createAsyncThunk(
	"type/GetContactDetailsThunk",
	async () => {
		const response = await axios(
			`${baseUrl()}/df/getContactSupport`
		);
		return response.data;
	}
);

// extra reducer to handle API response
export const extraReducersForContactDetails = (builder) => {
	builder
		.addCase(GetContactDetailsThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				contactDetailsLoading: true,
			};
		})
		.addCase(GetContactDetailsThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				ontactDetailsLoading: false,
			};
			state.contactDetails = action.payload.Data[0];
		})
		.addCase(GetContactDetailsThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				ontactDetailsLoading: false,
			};
			state.isError = true;
		});
};
