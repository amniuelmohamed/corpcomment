import { createContext, useEffect, useState } from "react";
import { TFeedbackItem } from "../lib/types";

type FeedbackItemsContextProviderProps = {
    children: React.ReactNode;
};

type FeedbackItemsContextType = {
    feedbackItems: TFeedbackItem[];
    setFeedbackItems: React.Dispatch<React.SetStateAction<TFeedbackItem[]>>;
    loading: boolean;
};

export const FeedbackItemsContext =
    createContext<FeedbackItemsContextType | null>(null);

export default function FeedbackItemsContextProvider({
    children,
}: FeedbackItemsContextProviderProps) {
    const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(
            "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        )
            .then((res) => res.json())
            .then((data) => {
                setFeedbackItems(data.feedbacks);
                setLoading(false);
            });
    }, []);

    return (
        <FeedbackItemsContext.Provider
            value={{ feedbackItems, setFeedbackItems, loading }}
        >
            {children}
        </FeedbackItemsContext.Provider>
    );
}
