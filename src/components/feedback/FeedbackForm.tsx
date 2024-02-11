import { Pencil1Icon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { TEXTAREA_MAX_LENGTH } from "../../lib/constants";
import Warning from "../Warning";
import { useFeedbackItemsContext } from "../../lib/hooks";

export default function FeedbackForm() {
    const [feedback, setFeedback] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const remainingCharacters = TEXTAREA_MAX_LENGTH - feedback.length;

    const [warningMessage, setWarningMessage] = useState("");

    const { handleAddFeedback, errorMessage } = useFeedbackItemsContext();

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

        handleAddFeedback(feedback, company.slice(1));
        setFeedback("");
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > TEXTAREA_MAX_LENGTH) return;
        setWarningMessage("");
        setFeedback(e.target.value);
    };

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
                className="resize-none p-3 outline-none bg-transparent text-white/80 flex-grow disabled:opacity-50 peer"
                placeholder=""
                disabled={errorMessage.length > 0}
            />
            <label
                htmlFor="feedback"
                className="absolute left-0 top-3 px-3 text-white/50 italic transition-all cursor-text hidden peer-placeholder-shown:block peer-focus:hidden"
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
                    className="rounded-full px-4 py-2 bg-white text-black uppercase font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={errorMessage.length > 0}
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
