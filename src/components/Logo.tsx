import logoImg from "../assets/images/logo.svg";

export default function Logo() {
    return (
        <a href="/">
            <img src={logoImg} alt="logo" />
        </a>
    );
}
