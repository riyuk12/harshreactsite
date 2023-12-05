import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetSubscriptionPacksThunk = createAsyncThunk(
	"type/GetSubscriptionPacksThunk",
	async ({ id }) => {
		const response = await axios.get(
			`${baseUrl()}/df/getAllSubscriptionPacks/${id}`,
			{
				headers: {
					"Acces-Control-Allow-Origin": "*",
					Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					Authorization: `${Cookies.get("token")}`,
				},
			}
		);
		return response.data;
	}
);

// extra reducer to handle API response
export const extraReducersForSubscriptionPacks = (builder) => {
	builder
		.addCase(GetSubscriptionPacksThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				subscriptionPacksLoading: true,
			};
		})
		.addCase(GetSubscriptionPacksThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				subscriptionPacksLoading: false,
			};
			state.subscriptionPacks = action.payload.Data;
		})
		.addCase(GetSubscriptionPacksThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				subscriptionPacksLoading: false,
			};
			state.isError = true;
		});
};
