import { Toaster } from "react-hot-toast";
import Footer from "./components/layout/Footer";
import HashtagList from "./components/hashtag/HashtagList";
import MainContent from "./components/layout/MainContent";
import { useFeedbackItemsStore } from "./stores/feedbackItemsStore";
import { useEffect } from "react";

function App() {
    const fetchFeedbacks = useFeedbackItemsStore(
        (state) => state.fetchFeedbacks
    );
    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex flex-col md:flex-row-reverse md:justify-center gap-5 my-10 md:my-20 h-[870px] md:h-[750px] md:max-w-screen-xl md:mx-auto md:px-3">
                <HashtagList />
                <MainContent />
                <Footer />
            </div>
        </>
    );
}

export default App;
