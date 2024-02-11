import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItem } from "../../lib/types";
import { useState } from "react";

type FeedbackProps = {
    feedbackItem: TFeedbackItem;
};

export default function Feedback({ feedbackItem }: FeedbackProps) {
    const [isOpened, setIsOpened] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);

    const handleUpvote = (e: React.MouseEvent<HTMLButtonElement>) => {
        /*
         * This function should send a POST request to the server to update the upvote count for the feedback item.
         * But for now, we'll just update the upvote count locally.
         */
        setUpvoteCount(upvoteCount + 1);
        e.currentTarget.disabled = true;
        e.stopPropagation();
    };

    return (
        <li className="group/feedback" onClick={() => setIsOpened(!isOpened)}>
            <div className="flex items-center gap-3 md:gap-4 px-2 md:px-8 py-4 bg-white border-b border-black/5 hover:-translate-x-1 transition-all cursor-pointer">
                <div className="flex flex-col items-center md:flex-row md:gap-2">
                    <button
                        className="flex flex-col items-center px-2 py-1 rounded-lg hover:bg-black/5 transition group/btn disabled:hover:bg-inherit"
                        onClick={handleUpvote}
                    >
                        <TriangleUpIcon className="h-5 w-5 text-black/40 group-hover/btn:text-[#5c458c] group-disabled/btn:hidden" />
                        <span className="text-sm -mt-1 text-black/80">
                            {upvoteCount}
                        </span>
                    </button>
                    <div
                        className="uppercase h-[3rem] w-[3rem] min-w-[3rem] md:h-[4rem] md:w-[4rem] md:min-w-[4rem] rounded-lg flex justify-center items-center font-bold text-3xl 
                            text-white group-[:nth-child(6n-5)]/feedback:bg-[#564989] group-[:nth-child(6n-4)]/feedback:bg-[#6d4989] group-[:nth-child(6n-3)]/feedback:bg-[#3c7789]
                            group-[:nth-child(6n-2)]/feedback:bg-[#897749] group-[:nth-child(6n-1)]/feedback:bg-[#4a8b6b] group-[:nth-child(6n)]/feedback:bg-[#495789]"
                    >
                        {feedbackItem.badgeLetter}
                    </div>
                </div>
                <div className="flex-grow">
                    <h3 className="uppercase text-black/40 font-bold text-sm">
                        {feedbackItem.company}
                    </h3>
                    <p
                        className={`leading-tight ${
                            !isOpened && "line-clamp-2"
                        }`}
                    >
                        {feedbackItem.text}
                    </p>
                </div>
                <span className="text-sm text-black/40 font-semibold">
                    {feedbackItem.daysAgo === 0
                        ? "Today"
                        : `${feedbackItem.daysAgo}d`}
                </span>
            </div>
        </li>
    );
}
