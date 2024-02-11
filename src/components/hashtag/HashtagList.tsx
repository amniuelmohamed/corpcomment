import { useFeedbackItemsContext } from "../../lib/hooks";
import Hashtag from "./Hashtag";

export default function HashtagList() {
    const { companyList, handleResetSelectedCompany } =
        useFeedbackItemsContext();

    return (
        <ul className="md:basis-36 flex md:flex-col justify-center md:justify-start gap-2 flex-wrap">
            <li>
                <button
                    className="bg-white text-black font-semibold px-3 py-1 rounded-full border border-black hover:bg-black hover:text-white  transition-all"
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
