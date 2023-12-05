import { createSlice } from "@reduxjs/toolkit";
import { extraReducersForNews } from "../Thunks/Get/GetNewsThunk";
import { extraReducersForCurrentAffairs } from "../Thunks/Get/GetCurrentAffairsThunk";
import { extraReducersForCourseDetails } from "../Thunks/Get/GetCourseDetailsThunk";
import { extraReducersForStatistics } from "../Thunks/Get/GetStatisticsThunk";
import { extraReducersForContactDetails } from "../Thunks/Get/GetContactDetailsThunk";
import { extraReducersForReviews } from "../Thunks/Get/GetReviewsThunk";
import { extraReducersForSubscriptionPacks } from "../Thunks/Get/GetSubscriptionPacks";
import { extraReducersForCourses } from "../Thunks/Get/GetCoursesThunk";
import { extraReducersForTip } from "../Thunks/Get/GetTipOfTheDay";
import { extraReducersForVideoClasses } from "../Thunks/Get/GetVideoClassesThunk";
import { extraReducersForNewsMessage } from "../Thunks/Get/GetNewsMessageThunk";
import { extraReducersForExamPattern } from "../Thunks/Get/GetExamPatternThunk";
import { extraReducersForLiveRecClasses } from "../Thunks/Get/GetLiveRecClassesThunk";
import { extraReducersForIsEnrolledForVideo } from "../Thunks/Get/GetIsEnrolledForVideoThunk";
import { extraReducersForDashboradConfig } from "../Thunks/Get/GetDashboardConfigThunk";
import { extraReducersForTopicList } from "../Thunks/Get/GetTopicListThunk";
import { extraReducersForChapters } from "../Thunks/Get/GetChaptersThunk";
import { extraReducersForSubjectiveQuestionAns } from "../Thunks/Get/GetSubjectiveQuestionAnsThunk";
import { extraReducersForPerformanceRanking } from "../Thunks/Get/GetPerformanceRankingThunk";
import { extraReducersForPerformanceByPercentile } from "../Thunks/Get/GetPerformanceByPercentileThunk";
import { extraReducersForPerformanceRankingByTopic } from "../Thunks/Get/GetPerformanceRankingByTopicThunk";
import { extraReducersForPerformanceHistoryByQuizCount } from "../Thunks/Get/GetPerformanceHistoryByQuizCountThunk";

const initialState = {
	isLoading: {
		chaptersLoading: true,
		contactDetailsLoading: true,
		courseDetailsLoading: true,
		coursesLoading: true,
		currentAffairsLoading: true,
		dashboardConfigLoading: true,
		examPatternLoading: true,
		isEnrolledForVideoLoading: true,
		liveRecClassesLoading: true,
		newsMessageLoading: true,
		newsLoading: true,
		reviewsLoading: true,
		statisticsLoading: true,
		subjectiveQuestionAnswersLoading: true,
		subscriptionPacksLoading: true,
		tipOfTheDayLoading: true,
		topicListLoading: true,
		videoClassesLoading: true,
		performanceRankingLoading: true,
		performanceByPercentileLoading: true,
		performanceRankingByTopicLoading: true,
		performanceHistoryByQuizCountLoading: true,
	},
	isError: false,
	isNewsBlinking: false,
	isCurrentAffairBlinking: false,
	newsData: [],
	currentAffairsData: [],
	courseDetailsData: [],
	reviewsData: [],
	contactDetails: {},
	statisticsData: {},
	subscriptionPacks: [],
	recClasses: [],
	courses: [],
	videoData: [],
	message: [],
	examPattern: [],
	isEnrolledForVideo: "",
	dashboradConfiguration: "",
	topicList: [],
	chapters: [],
	subjectiveQuestionAns: [],
	performanceRanking: [],
	performanceByPercentile: [],
	performanceRankingByTopic: [],
	performanceHistoryByQuizCount: [],
	tip: "",
	tipDate: "",
	errorStatusCode: "",
};

const responseDataSlice = createSlice({
	name: "responseData",
	initialState,
	reducers: {
		clearChapters: (state) => {
			state.chapters = [];
		},
		clearQuestAnswers: (state) => {
			state.subjectiveQuestionAns = [];
		},
	},
	extraReducers(builder) {
		extraReducersForContactDetails(builder);
		extraReducersForCourseDetails(builder);
		extraReducersForCurrentAffairs(builder);
		extraReducersForNews(builder);
		extraReducersForReviews(builder);
		extraReducersForStatistics(builder);
		extraReducersForSubscriptionPacks(builder);
		extraReducersForVideoClasses(builder);
		extraReducersForCourses(builder);
		extraReducersForTip(builder);
		extraReducersForNewsMessage(builder);
		extraReducersForExamPattern(builder);
		extraReducersForIsEnrolledForVideo(builder);
		extraReducersForDashboradConfig(builder);
		extraReducersForLiveRecClasses(builder);
		extraReducersForTopicList(builder);
		extraReducersForChapters(builder);
		extraReducersForSubjectiveQuestionAns(builder);
		extraReducersForPerformanceRanking(builder);
		extraReducersForPerformanceByPercentile(builder);
		extraReducersForPerformanceRankingByTopic(builder);
		extraReducersForPerformanceHistoryByQuizCount(builder);
	},
});

export const responseDataReducers = responseDataSlice.reducer;
export const responseDataActions = responseDataSlice.actions;
