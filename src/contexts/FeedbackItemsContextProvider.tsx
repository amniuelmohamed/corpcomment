import { createContext, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import toast from "react-hot-toast";

type FeedbackItemsContextProviderProps = {
    children: React.ReactNode;
};

type FeedbackItemsContextType = {
    filteredFeedbackItems: TFeedbackItem[];
    handleAddFeedback: (feedbackText: string, company: string) => void;
    loading: boolean;
    errorMessage: string;
    companyList: string[];
    handleSelectedCompany: (company: string) => void;
    handleResetSelectedCompany: () => void;
};

export const FeedbackItemsContext =
    createContext<FeedbackItemsContextType | null>(null);

export default function FeedbackItemsContextProvider({
    children,
}: FeedbackItemsContextProviderProps) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string>("");

    const filteredFeedbackItems = useMemo(
        () =>
            selectedCompany
                ? feedbackItems.filter(
                      (feedbackItem) =>
                          feedbackItem.company.toUpperCase() === selectedCompany
                  )
                : feedbackItems,
        [feedbackItems, selectedCompany]
    );

    const companyList = useMemo(() => {
        const upperCaseCompanyList = feedbackItems.map((feedbackItem) =>
            feedbackItem.company.toUpperCase()
        );
        return feedbackItems
            .map((feedbackItem) => feedbackItem.company)
            .filter(
                (value, index) =>
                    upperCaseCompanyList.indexOf(value.toUpperCase()) === index
            );
    }, [feedbackItems]);

    const fetchFeedbacks = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
            );
            if (!res.ok) {
                toast.error("Failed to fetch feedbacks");
                throw new Error();
            }
            const data = await res.json();
            toast.success("Feedbacks fetched successfully");
            setFeedbackItems(data.feedbacks);
        } catch (e) {
            toast.error("Something went wrong!");
            setErrorMessage("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleAddFeedback = async (feedbackText: string, company: string) => {
        const feedbackItem = {
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
            fetchFeedbacks();
            setSelectedCompany("");
        } catch (e) {
            toast.error("Failed to add feedback");
        }
    };

    const handleSelectedCompany = (company: string) => {
        setSelectedCompany(company.toUpperCase());
    };

    const handleResetSelectedCompany = () => {
        setSelectedCompany("");
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return (
        <FeedbackItemsContext.Provider
            value={{
                filteredFeedbackItems,
                handleAddFeedback,
                loading,
                errorMessage,
                companyList,
                handleSelectedCompany,
                handleResetSelectedCompany,
            }}
        >
            {children}
        </FeedbackItemsContext.Provider>
    );
}
