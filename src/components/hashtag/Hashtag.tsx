import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

type HashtagProps = {
    company: string;
};

export default function Hashtag({ company }: HashtagProps) {
    const handleSelectedCompany = useFeedbackItemsStore(
        (state) => state.selectCompany
    );

    console.log("Hashtag rendered");

    return (
        <li>
            <button
                className="bg-white/20 text-white px-3 py-1 rounded-full hover:scale-105 transition-all"
                onClick={() => handleSelectedCompany(company)}
            >
                #{company}
            </button>
        </li>
    );
}
