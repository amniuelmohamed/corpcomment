import { Pencil1Icon } from "@radix-ui/react-icons";

export default function FeedbackForm() {
    return (
        <form className="relative w-[500px] max-w-full mt-8 h-[140px] rounded-md bg-white/5 flex flex-col">
            <textarea
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
                <span className="italic text-sm text-white/30">150</span>
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
