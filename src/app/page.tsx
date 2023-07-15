import Navigation from "@/components/Navigation";
import Games from "@/components/Games";
import Footer from "@/components/Footer";

export default function Home() {
  
  return (
    <div>
      <Navigation />
      <div className="px-8">
        <Games />
      </div>
      <Footer />
    </div>
  );
}
