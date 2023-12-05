import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
export function baseUrl() {
	const url = "http://68.178.172.171:8282/besstMainApi";
	return url;
}
export const GetStatisticsThunk = createAsyncThunk(
  "type/GetStatisticsThunk",
  async () => {
    const response = await axios.post(
      `${baseUrl()}/df/statistics`,
      {},
      { headers: { Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==" } }
    );
    return response.data;
  }
);

// extra reducer to handle API response
export const extraReducersForStatistics = (builder) => {
  builder
    .addCase(GetStatisticsThunk.pending, (state) => {
      state.isLoading = { ...state.isLoading, statisticsLoading: true };
    })
    .addCase(GetStatisticsThunk.fulfilled, (state, action) => {
      state.isLoading = { ...state.isLoading, statisticsLoading: false };
      state.statisticsData = action.payload.Data;
    })
    .addCase(GetStatisticsThunk.rejected, (state) => {
      state.isLoading = { ...state.isLoading, statisticsLoading: false };
      state.isError = true;
    });
};
