import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";

export default function Header() {
    return (
        <header className="bg-[#101516] text-white relative px-3 py-8 shadow-lg">
            <Pattern />
            <div className="relative flex flex-col items-center">
                <Logo />
                <PageHeading />
                <FeedbackForm />
            </div>
        </header>
    );
}
