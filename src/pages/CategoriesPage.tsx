import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoriesSection from "@/components/CategoriesSection";

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Skill Categories
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the wide range of skills you can learn and teach on our platform
            </p>
          </div>
        </div>
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
