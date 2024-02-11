import { HashLoader } from "react-spinners";
import Feedback from "./Feedback";
import Warning from "../Warning";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export default function FeedbackList() {
    const filteredFeedbackItems = useFeedbackItemsStore((state) =>
        state.getFilteredFeedbackItems()
    );
    const isLoading = useFeedbackItemsStore((state) => state.isLoading);
    const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);

    return (
        <ol className="feedback-list bg-[#f8f8fa] flex-grow overflow-auto ">
            {isLoading && (
                <li className="flex items-center justify-center h-full">
                    <HashLoader color="#6d4989" />
                </li>
            )}
            {errorMessage && (
                <li className="flex items-center justify-center h-full">
                    <Warning message={errorMessage} />
                </li>
            )}
            {filteredFeedbackItems.map((feedbackItem) => (
                <Feedback key={feedbackItem.id} feedbackItem={feedbackItem} />
            ))}
        </ol>
    );
}
