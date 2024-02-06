import { createContext, useEffect, useState } from "react";
import { TFeedbackItem } from "../lib/types";

type FeedbackItemsContextProviderProps = {
    children: React.ReactNode;
};

type FeedbackItemsContextType = {
    feedbackItems: TFeedbackItem[];
    setFeedbackItems: React.Dispatch<React.SetStateAction<TFeedbackItem[]>>;
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

    useEffect(() => {
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

        fetchFeedbacks();
    }, []);

    return (
        <FeedbackItemsContext.Provider
            value={{ feedbackItems, setFeedbackItems, loading, errorMessage }}
        >
            {children}
        </FeedbackItemsContext.Provider>
    );
}
