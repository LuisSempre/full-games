import Logo from "./Logo";

const Header: React.FC = () => {
    return (
        <header className="flex justify-center items-center w-full bg-gray-950 p-8">
            <Logo />
            <h1 className="text-gray-400 text-4xl font-modern">Lista de Jogos</h1>
        </header>
    );
};

export default Header;
