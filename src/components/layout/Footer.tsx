export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="md:self-end md:[writing-mode:vertical-lr] md:rotate-180 md:basis-36 text-white flex justify-center">
            <small>
                &copy; {year}{" "}
                <a
                    href="https://portfolio-swart-nine-10.vercel.app/"
                    target="_blank"
                    className="font-bold"
                >
                    Mohamed
                </a>
                . All rights reserved.
            </small>
        </footer>
    );
}
