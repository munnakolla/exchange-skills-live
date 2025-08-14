import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    title: "Technology",
    skills: ["Web Development", "Mobile Apps", "Data Science", "AI/ML", "Cybersecurity"],
    icon: "💻",
    color: "from-blue-500 to-purple-600",
    count: "120+ skills"
  },
  {
    title: "Creative Arts",
    skills: ["Digital Art", "Photography", "Music Production", "Writing", "Video Editing"],
    icon: "🎨",
    color: "from-pink-500 to-orange-500",
    count: "85+ skills"
  },
  {
    title: "Languages",
    skills: ["English", "Spanish", "French", "Japanese", "Sign Language"],
    icon: "🌍",
    color: "from-green-500 to-teal-500",
    count: "50+ languages"
  },
  {
    title: "Business",
    skills: ["Marketing", "Finance", "Leadership", "Project Management", "Sales"],
    icon: "💼",
    color: "from-yellow-500 to-red-500",
    count: "75+ skills"
  },
  {
    title: "Life Skills",
    skills: ["Cooking", "Fitness", "Meditation", "Gardening", "Home Repair"],
    icon: "🏠",
    color: "from-indigo-500 to-purple-500",
    count: "90+ skills"
  },
  {
    title: "Academic",
    skills: ["Mathematics", "Science", "History", "Literature", "Tutoring"],
    icon: "📚",
    color: "from-emerald-500 to-blue-500",
    count: "60+ subjects"
  }
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Explore <span className="gradient-text">Skill Categories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover a diverse range of skills across multiple categories. 
            From technical expertise to creative pursuits, find your perfect learning match.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="p-8 border-card-border hover:shadow-strong transition-all duration-300 skill-card-hover group relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-2xl shadow-medium group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    {category.count}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex}
                        className="inline-block bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground mr-2 mb-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:border-primary group-hover:text-primary"
                >
                  Explore {category.title}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Don't see your skill? No problem! Our platform supports any skill you can imagine.
          </p>
          <Button variant="hero" size="lg">
            Suggest a New Category
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;