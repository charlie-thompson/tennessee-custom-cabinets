import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import CraftStory from "@/components/CraftStory";
import Process from "@/components/Process";
import BuilderSection from "@/components/BuilderSection";
import LeadQuiz from "@/components/LeadQuiz";

export default function Home() {
  return (
    <main>
      <Hero />
      <Gallery />
      <CraftStory />
      <Process />
      <BuilderSection />
      <LeadQuiz />
    </main>
  );
}
