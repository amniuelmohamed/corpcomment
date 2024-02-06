import { useFeedbackItemsContext } from "../lib/hooks";
import Feedback from "./Feedback";

export default function FeedbackList() {
    const { feedbackItems } = useFeedbackItemsContext();

    return (
        <ol className="feedback-list bg-[#f8f8fa] flex-grow overflow-auto ">
            {feedbackItems.map((feedbackItem) => (
                <Feedback key={feedbackItem.id} feedbackItem={feedbackItem} />
            ))}
        </ol>
    );
}
