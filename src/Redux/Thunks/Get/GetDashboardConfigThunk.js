import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetDashboardConfigThunk = createAsyncThunk(
	"type/GetDashboardConfigThunk",
	async ({ id }) => {
		const response = await axios.get(
			`${baseUrl()}/df/findDashboardConfig/${id}`
		);
		return response.data;
	}
);

// extra reducer to handle API response
export const extraReducersForDashboradConfig = (builder) => {
	builder
		.addCase(GetDashboardConfigThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				dashboardConfigLoading: true,
			};
		})
		.addCase(GetDashboardConfigThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				dashboardConfigLoading: false,
			};
			state.dashboradConfiguration = action.payload.Data;
		})
		.addCase(GetDashboardConfigThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				dashboardConfigLoading: false,
			};
			state.isError = true;
		});
};
