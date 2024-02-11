import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

export default function MainContent() {
    return (
        <main className="md:rounded-lg overflow-hidden w-[1000px] max-w-full flex flex-col flex-grow">
            <Header />
            <FeedbackList />
        </main>
    );
}
