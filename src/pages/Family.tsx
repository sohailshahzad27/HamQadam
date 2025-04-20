
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SectionHeading from "@/components/ui/section-heading";
import { Users, BookOpen, Heart, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Family = () => {
  const resources = [
    {
      title: "Parenting Guidance",
      description: "Practical tips and resources for effective parenting approaches.",
      icon: <Users className="h-6 w-6 text-humqadam-teal" />,
    },
    {
      title: "Children's Education",
      description: "Resources to support your child's learning journey at all ages.",
      icon: <BookOpen className="h-6 w-6 text-humqadam-teal" />,
    },
    {
      title: "Family Wellbeing",
      description: "Building strong family bonds and creating a nurturing home environment.",
      icon: <Heart className="h-6 w-6 text-humqadam-teal" />,
    },
    {
      title: "Child Development",
      description: "Understanding key milestones and supporting healthy development.",
      icon: <Sparkles className="h-6 w-6 text-humqadam-teal" />,
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionHeading 
          title="Family Support" 
          subtitle="Resources for family well-being, parenting, and child education"
          alignment="center"
        />
        
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md mb-12">
          <p className="text-lg text-gray-700 mb-6">
            This section provides resources and guidance for strengthening family bonds, 
            effective parenting techniques, and supporting children's education and growth.
            We believe that healthy families are the foundation of a strong society.
          </p>
          <p className="text-gray-600 mb-6">
            Our team is working with child development experts, educators, and family 
            counselors to create culturally relevant resources that address the specific 
            needs of Pakistani families.
          </p>
          <p className="text-gray-600">
            Content is being developed and will be available soon. Please check back or 
            subscribe to our newsletter for updates.
          </p>
        </div>

        <h3 className="text-2xl font-heading font-semibold text-center mb-8">Upcoming Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {resources.map((resource, index) => (
            <Card key={index} className="border-humqadam-teal/10 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-humqadam-teal/10 flex items-center justify-center">
                  {resource.icon}
                </div>
                <div>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Coming soon</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Family;
