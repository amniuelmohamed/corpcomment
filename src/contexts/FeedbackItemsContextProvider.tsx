import { createContext, useEffect, useState } from "react";
import { TFeedbackItem } from "../lib/types";

type FeedbackItemsContextProviderProps = {
    children: React.ReactNode;
};

type FeedbackItemsContextType = {
    feedbackItems: TFeedbackItem[];
    setFeedbackItems: React.Dispatch<React.SetStateAction<TFeedbackItem[]>>;
};

export const FeedbackItemsContext =
    createContext<FeedbackItemsContextType | null>(null);

export default function FeedbackItemsContextProvider({
    children,
}: FeedbackItemsContextProviderProps) {
    const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);

    useEffect(() => {
        fetch(
            "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        )
            .then((res) => res.json())
            .then((data) => setFeedbackItems(data.feedbacks));
    }, []);

    return (
        <FeedbackItemsContext.Provider
            value={{ feedbackItems, setFeedbackItems }}
        >
            {children}
        </FeedbackItemsContext.Provider>
    );
}
