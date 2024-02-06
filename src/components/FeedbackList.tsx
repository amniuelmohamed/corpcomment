import { HashLoader } from "react-spinners";
import { useFeedbackItemsContext } from "../lib/hooks";
import Feedback from "./Feedback";

export default function FeedbackList() {
    const { feedbackItems, loading } = useFeedbackItemsContext();

    return (
        <ol className="feedback-list bg-[#f8f8fa] flex-grow overflow-auto ">
            {loading && (
                <div className="flex items-center justify-center h-full">
                    <HashLoader color="#6d4989" />
                </div>
            )}
            {feedbackItems.map((feedbackItem) => (
                <Feedback key={feedbackItem.id} feedbackItem={feedbackItem} />
            ))}
        </ol>
    );
}
