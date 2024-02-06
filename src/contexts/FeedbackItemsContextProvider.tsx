import { createContext, useState } from "react";
import { initialFeedbackItems } from "../lib/constants";

type FeedbackItemsContextProviderProps = {
    children: React.ReactNode;
};

type FeedbackItemsContextType = {
    feedbackItems: typeof initialFeedbackItems;
    setFeedbackItems: React.Dispatch<
        React.SetStateAction<
            {
                id: string;
                text: string;
                company: string;
                upvotes: number;
                createdAt: string;
            }[]
        >
    >;
};

export const FeedbackItemsContext =
    createContext<FeedbackItemsContextType | null>(null);

export default function FeedbackItemsContextProvider({
    children,
}: FeedbackItemsContextProviderProps) {
    const [feedbackItems, setFeedbackItems] = useState(initialFeedbackItems);

    return (
        <FeedbackItemsContext.Provider
            value={{ feedbackItems, setFeedbackItems }}
        >
            {children}
        </FeedbackItemsContext.Provider>
    );
}
