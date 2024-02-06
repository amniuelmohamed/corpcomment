import { createContext, useEffect, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import toast from "react-hot-toast";

type FeedbackItemsContextProviderProps = {
    children: React.ReactNode;
};

type FeedbackItemsContextType = {
    feedbackItems: TFeedbackItem[];
    setFeedbackItems: React.Dispatch<React.SetStateAction<TFeedbackItem[]>>;
    handleAddFeedback: (feedbackText: string, company: string) => void;
    loading: boolean;
    errorMessage: string;
};

export const FeedbackItemsContext =
    createContext<FeedbackItemsContextType | null>(null);

export default function FeedbackItemsContextProvider({
    children,
}: FeedbackItemsContextProviderProps) {
    const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchFeedbacks = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
            );
            if (!res.ok) {
                setErrorMessage("Failed to fetch feedbacks");
                return;
            }
            const data = await res.json();
            setFeedbackItems(data.feedbacks);
        } catch (e) {
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
        } catch (e) {
            setErrorMessage("Failed to add feedback");
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return (
        <FeedbackItemsContext.Provider
            value={{
                feedbackItems,
                setFeedbackItems,
                handleAddFeedback,
                loading,
                errorMessage,
            }}
        >
            {children}
        </FeedbackItemsContext.Provider>
    );
}
