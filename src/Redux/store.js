import { configureStore } from "@reduxjs/toolkit";
import { utilitySliceReducers } from "./Slice/UtilitySlice";
import { responseDataReducers } from "./Slice/ResponseDataSlice";
import { postResponseDataReducers } from "./Slice/PostResponseDataSlice";

const store = configureStore({
	reducer: {
		utils: utilitySliceReducers,
		response: responseDataReducers,
		postResp: postResponseDataReducers,
	},
});

export default store;
