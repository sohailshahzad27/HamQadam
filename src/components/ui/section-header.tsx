
interface SectionHeaderProps {
  title: string;
  description?: string;
}


export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    // Main container: relative for absolute children, overflow-hidden for rounded corners, spacing, and border
    <div className="mb-8 text-center py-16 rounded-lg relative overflow-hidden border border-border"> {/* Added border-border for definition */}
      {/* Blurred Gradient Background Layer */}
      {/* Absolute positioned, covers the parent, behind content (z-0) */}
      {/* Added gradient from a teal-like color to a cyan-like color, applied blur */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#d8d5f5] to-gray-50">
          {/* You could adjust from/to colors and blur amount (e.g., blur-xl, blur-3xl) */}
          {/* Added opacity-50 to make it less intense */}
      </div>

      {/* Content Layer */}
      {/* Relative positioned and higher z-index to appear above the blurred layer */}
      <div className="relative z-10">
        {/* Text colors might need adjustment depending on the final gradient colors */}
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">{title}</h2>
        {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
      </div>
    </div>
  );
}