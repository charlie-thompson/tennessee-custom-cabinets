import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import CraftStory from "@/components/CraftStory";
import Process from "@/components/Process";
import BuilderSection from "@/components/BuilderSection";
import LeadQuiz from "@/components/LeadQuiz";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Gallery />
        <CraftStory />
        <Process />
        <BuilderSection />
        <LeadQuiz />
      </main>
      <Footer />
    </>
  );
}
