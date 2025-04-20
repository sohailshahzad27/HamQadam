
import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
  withAccent?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  alignment = "left",
  withAccent = true,
}) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={`max-w-3xl mb-12 ${alignmentClasses[alignment]}`}>
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {withAccent && (
        <div
          className={`h-1 rounded bg-gradient-to-r from-humqadam-purple to-humqadam-teal w-24 mb-6 ${
            alignment === "center" ? "mx-auto" : alignment === "right" ? "ml-auto" : ""
          }`}
        />
      )}
      {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
