import toast from "react-hot-toast";
import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type TFeedbackItemsStore = {
    feedbackItems: TFeedbackItem[];
    selectedCompany: string;
    isLoading: boolean;
    errorMessage: string;
    getCompanyList: () => string[];
    getFilteredFeedbackItems: () => TFeedbackItem[];
    fetchFeedbacks: () => Promise<void>;
    addFeedback: (feedbackText: string, company: string) => Promise<void>;
    selectCompany: (company: string) => void;
    resetSelectedCompany: () => void;
};

export const useFeedbackItemsStore = create<TFeedbackItemsStore>(
    (set, get) => ({
        feedbackItems: [],
        selectedCompany: "",
        isLoading: false,
        errorMessage: "",
        getCompanyList: () => {
            const upperCaseCompanyList = get().feedbackItems.map(
                (feedbackItem) => feedbackItem.company.toUpperCase()
            );
            return get()
                .feedbackItems.map((feedbackItem) => feedbackItem.company)
                .filter(
                    (value, index) =>
                        upperCaseCompanyList.indexOf(value.toUpperCase()) ===
                        index
                );
        },
        getFilteredFeedbackItems: () => {
            return get().selectedCompany
                ? get().feedbackItems.filter(
                      (feedbackItem) =>
                          feedbackItem.company.toUpperCase() ===
                          get().selectedCompany
                  )
                : get().feedbackItems;
        },
        fetchFeedbacks: async () => {
            set(() => ({ isLoading: true }));
            try {
                const res = await fetch(
                    "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
                );
                if (!res.ok) {
                    toast.error("Failed to fetch feedbacks");
                    throw new Error();
                }
                const data = await res.json();
                set(() => ({ feedbackItems: data.feedbacks }));
            } catch (e) {
                toast.error("Something went wrong!");
                set(() => ({ errorMessage: "Something went wrong!" }));
            } finally {
                set(() => ({ isLoading: false }));
            }
        },
        addFeedback: async (feedbackText: string, company: string) => {
            const feedbackItem: TFeedbackItem = {
                id: new Date().getTime(),
                text: feedbackText,
                company: company,
                badgeLetter: company[0].toUpperCase(),
                upvoteCount: 0,
                daysAgo: 0,
            };

            try {
                const res = await fetch(
                    "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(feedbackItem),
                    }
                );
                if (!res.ok) {
                    throw new Error();
                }

                toast.success("Feedback added successfully");
                get().fetchFeedbacks();
                set(() => ({ selectedCompany: "" }));
            } catch (e) {
                toast.error("Failed to add feedback");
            }
        },
        selectCompany: (company: string) => {
            set(() => ({ selectedCompany: company.toUpperCase() }));
        },
        resetSelectedCompany: () => {
            set(() => ({ selectedCompany: "" }));
        },
    })
);
