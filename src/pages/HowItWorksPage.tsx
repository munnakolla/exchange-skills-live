import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              How SkillSwap Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn how to start exchanging skills and connect with learners and teachers worldwide
            </p>
          </div>
        </div>
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
