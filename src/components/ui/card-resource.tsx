
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color?: "purple" | "teal" | "pink";
}

const ResourceCard = ({ 
  title, 
  description, 
  icon, 
  link, 
  color = "purple" 
}: ResourceCardProps) => {
  const colorVariants = {
    purple: "bg-gradient-to-tr from-humqadam-purple/10 to-humqadam-purple/5 hover:from-humqadam-purple/20 hover:to-humqadam-purple/10 border-humqadam-purple/20",
    teal: "bg-gradient-to-tr from-humqadam-teal/10 to-humqadam-teal/5 hover:from-humqadam-teal/20 hover:to-humqadam-teal/10 border-humqadam-teal/20",
    pink: "bg-gradient-to-tr from-humqadam-pink/10 to-humqadam-pink/5 hover:from-humqadam-pink/20 hover:to-humqadam-pink/10 border-humqadam-pink/20"
  };

  const iconColorVariants = {
    purple: "text-humqadam-purple bg-humqadam-purple/10",
    teal: "text-humqadam-teal bg-humqadam-teal/10",
    pink: "text-humqadam-pink bg-humqadam-pink/10"
  };

  const buttonColorVariants = {
    purple: "text-humqadam-purple hover:bg-humqadam-purple hover:text-white",
    teal: "text-humqadam-teal hover:bg-humqadam-teal hover:text-white",
    pink: "text-humqadam-pink hover:bg-humqadam-pink hover:text-white"
  };

  return (
    <Card className={`border h-full transition-all duration-300 ${colorVariants[color]}`}>
      <CardHeader>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${iconColorVariants[color]}`}>
          {icon}
        </div>
        <CardTitle className="font-heading">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Card content can be added here */}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className={`w-full ${buttonColorVariants[color]} border-current`}
          asChild
        >
          <Link to={link} className="flex justify-between items-center">
            <span>Learn More</span>
            <ArrowRight size={16} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
