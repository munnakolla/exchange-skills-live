import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Platform Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover all the powerful features that make SkillSwap the best platform for peer-to-peer learning
            </p>
          </div>
        </div>
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
