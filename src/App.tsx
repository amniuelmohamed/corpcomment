import Footer from "./components/Footer";
import HashtagList from "./components/HashtagList";
import MainContent from "./components/MainContent";

function App() {
    return (
        <div className="flex flex-col md:flex-row-reverse justify-center gap-5 mt-10 md:mt-20">
            <HashtagList />
            <MainContent />
            <Footer />
        </div>
    );
}

export default App;
