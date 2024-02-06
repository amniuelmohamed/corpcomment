import Hashtag from "./Hashtag";

export default function HashtagList() {
    return (
        <ul className="md:basis-36 flex md:flex-col justify-center md:justify-start gap-2">
            <li>
                <Hashtag />
            </li>
            <li>
                <Hashtag />
            </li>
        </ul>
    );
}
