import Footer from "./components/Footer";
import HashtagList from "./components/HashtagList";
import MainContent from "./components/MainContent";

function App() {
    return (
        <div className="flex flex-col md:flex-row-reverse md:justify-center gap-5 my-10 md:my-20 h-[850px] md:h-[750px] md:max-w-screen-xl md:mx-auto md:px-3">
            <HashtagList />
            <MainContent />
            <Footer />
        </div>
    );
}

export default App;
