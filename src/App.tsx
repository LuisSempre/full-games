import AuthDetails from "./components/AuthDetails";
import Footer from "./components/Footer";
import Games from "./components/Games";
import Header from "./components/Header";


const App: React.FC = () => {

  return (
    <>
      <Header />
      <AuthDetails />
      <Games />
      <Footer />
    </>
  );
};

export default App;
