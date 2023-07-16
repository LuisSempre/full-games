import Navigation from "@/components/Navigation";
import Games from "@/components/Games";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Action from "@/components/Action";

export default function Home() {
  return (
    <div>
      <Navigation />
      <div className="px-8">
        <Hero />
        <Games />
        <Action />
      </div>
      <Footer />
    </div>
  );
}
