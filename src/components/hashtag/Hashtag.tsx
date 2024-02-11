import { useFeedbackItemsContext } from "../../lib/hooks";

type HashtagProps = {
    company: string;
};

export default function Hashtag({ company }: HashtagProps) {
    const { handleSelectedCompany } = useFeedbackItemsContext();

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
