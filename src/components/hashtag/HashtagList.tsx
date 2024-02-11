import { useFeedbackItemsContext } from "../../lib/hooks";
import Hashtag from "./Hashtag";

export default function HashtagList() {
    const { companyList, handleResetSelectedCompany } =
        useFeedbackItemsContext();

    return (
        <ul className="md:basis-36 flex md:flex-col justify-center md:justify-start gap-2 flex-wrap">
            <li>
                <button
                    className="bg-black text-white font-semibold px-3 py-1 rounded-full border border-black hover:border-white/80 transition"
                    onClick={handleResetSelectedCompany}
                >
                    Reset
                </button>
            </li>
            {companyList.map((company) => (
                <Hashtag
                    key={`${company}.${new Date().toISOString()}`}
                    company={company}
                />
            ))}
        </ul>
    );
}
