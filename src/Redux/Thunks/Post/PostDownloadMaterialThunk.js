import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const PostDownloadMaterialThunk = createAsyncThunk(
	"type/PostDownloadMaterialThunk",
	async ({ data, token }) => {
		const response = await axios.post(
			`${baseUrl()}/df/downloadCourseMaterial`,
			data,
			{
				headers: {
					"Acces-Control-Allow-Origin": "*",
					Client_ID: process.env.REACT_APP_API_CLIENT_ID,
					Authorization: token,
				},
			}
		);
		return response.data;
	}
);

// extra reducer to handle API response
export const extraReducersForDownloadMaterialThunk = (builder) => {
	builder
		.addCase(PostDownloadMaterialThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				downloadMaterialLoading: true,
			};
		})
		.addCase(PostDownloadMaterialThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				downloadMaterialLoading: false,
			};
			state.downloadMaterial = action.payload.Data;
		})
		.addCase(PostDownloadMaterialThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				downloadMaterialLoading: false,
			};
			state.isError = true;
		});
};
