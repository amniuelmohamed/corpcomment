import { HashLoader } from "react-spinners";
import { useFeedbackItemsContext } from "../lib/hooks";
import Feedback from "./Feedback";
import Warning from "./Warning";

export default function FeedbackList() {
    const { feedbackItems, loading, errorMessage } = useFeedbackItemsContext();

    return (
        <ol className="feedback-list bg-[#f8f8fa] flex-grow overflow-auto ">
            {loading && (
                <li className="flex items-center justify-center h-full">
                    <HashLoader color="#6d4989" />
                </li>
            )}
            {errorMessage && (
                <li className="flex items-center justify-center h-full">
                    <Warning message={errorMessage} />
                </li>
            )}
            {feedbackItems.map((feedbackItem) => (
                <Feedback key={feedbackItem.id} feedbackItem={feedbackItem} />
            ))}
        </ol>
    );
}
