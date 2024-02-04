import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";

export default function Header() {
    return (
        <header className="bg-[#101516] text-white relative flex flex-col items-center p-3 pb-8 shadow-lg">
            <Pattern />
            <Logo />
            <PageHeading />
            <FeedbackForm />
        </header>
    );
}
