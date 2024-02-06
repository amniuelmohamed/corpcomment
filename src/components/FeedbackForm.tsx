import { Pencil1Icon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { TEXTAREA_MAX_LENGTH } from "../lib/constants";
import Warning from "./Warning";
import { useFeedbackItemsContext } from "../lib/hooks";

export default function FeedbackForm() {
    const [feedback, setFeedback] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const remainingCharacters = TEXTAREA_MAX_LENGTH - feedback.length;

    const [warningMessage, setWarningMessage] = useState("");

    const { setFeedbackItems } = useFeedbackItemsContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!feedback.trim()) {
            setWarningMessage("Please enter some feedback");
            inputRef.current?.focus();
            return;
        }

        if (!feedback.includes("#")) {
            setWarningMessage("Please hashtag a company name");
            inputRef.current?.focus();
            return;
        }

        const company = feedback.match(/#\w{2,}/)?.[0];

        if (!company) {
            setWarningMessage("Company name must be at least 2 chars");
            inputRef.current?.focus();
            return;
        }

        const companyName = company.slice(1);

        const feedbackData = {
            id: new Date().toISOString(),
            text: feedback,
            company: companyName,
            upvotes: 0,
            createdAt: new Date().toISOString(),
        };

        setFeedbackItems((prevFeedbackItems) => [
            feedbackData,
            ...prevFeedbackItems,
        ]);

        setFeedback("");
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > TEXTAREA_MAX_LENGTH) return;
        setWarningMessage("");
        setFeedback(e.target.value);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <form
            className="relative w-[500px] max-w-full mt-8 h-[160px] rounded-md bg-white/5 flex flex-col"
            onSubmit={handleSubmit}
        >
            <textarea
                ref={inputRef}
                value={feedback}
                onChange={handleInput}
                id="feedback"
                className="resize-none p-3 outline-none peer bg-transparent text-white/80 flex-grow"
                placeholder=""
            />
            <label
                htmlFor="feedback"
                className="absolute left-0 top-3 px-3 text-white/50 italic peer-placeholder-shown:block hidden transition-all cursor-text"
            >
                Enter you feedback here, remember to #hashtag your company name{" "}
                <Pencil1Icon className="inline" />
            </label>
            <div className="flex justify-between items-end p-3">
                {warningMessage.length > 0 ? (
                    <Warning message={warningMessage} />
                ) : (
                    <span className="italic text-sm text-white/30">
                        {remainingCharacters}
                    </span>
                )}
                <button
                    type="submit"
                    className="rounded-full px-4 py-2 bg-white text-black uppercase font-bold text-sm"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
