import { TriangleUpIcon } from "@radix-ui/react-icons";

export default function Feedback() {
    return (
        <div className="flex items-center gap-3 md:gap-4 px-2 md:px-8 py-4 bg-white border-b border-black/5 hover:-translate-x-1 transition-all">
            <div className="flex flex-col items-center md:flex-row md:gap-2">
                <button className="flex flex-col items-center px-2 py-1 rounded-lg hover:bg-black/5 transition group">
                    <TriangleUpIcon className="h-5 w-5 text-black/40 group-hover:text-[#5c458c]" />
                    <span className="text-sm -mt-1 text-black/80">591</span>
                </button>
                <div className="h-[3rem] w-[3rem] min-w-[3rem] md:h-[4rem] md:w-[4rem] md:min-w-[4rem] rounded-lg flex justify-center items-center font-bold text-3xl bg-[#5c458c] text-white">
                    B
                </div>
            </div>
            <div className="flex-grow">
                <h3 className="uppercase text-black/40 font-bold text-sm">
                    Mohamed
                </h3>
                <p className="leading-tight">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem distinctio hic quisquam dignissimos tempora
                    nulla.
                </p>
            </div>
            <span className="text-sm text-black/40 font-semibold">4d</span>
        </div>
    );
}
