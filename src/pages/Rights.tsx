import React from "react";
import { Link } from "react-router-dom"; // Import Link
import MainLayout from "@/components/layout/MainLayout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { BookOpen, Scale, Landmark, Building, HelpCircle, Bot, Globe, Gavel, ScrollText } from "lucide-react"; // Added more general icons
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Rights = () => {
  // --- Define colors using direct codes (based on humqadam colors from your tailwind.config.js) ---
  const primaryBaseColor = '#8B5CF6'; // Corresponds to humqadam.purple
  const primaryLightColor = 'rgba(139, 92, 246, 0.1)'; // primaryBaseColor with 10% opacity
  const primaryVeryLightColor = 'rgba(139, 92, 246, 0.05)'; // primaryBaseColor with 5% opacity
  const primaryHoverColor = 'rgba(139, 92, 246, 0.9)'; // primaryBaseColor with 90% opacity (for solid buttons)
  const primaryOutlineHoverColor = 'rgba(139, 92, 246, 0.1)'; // primaryBaseColor with 10% opacity (for outlined button hover background)
  const primaryGradientFrom = 'rgba(139, 92, 246, 0.2)'; // primaryBaseColor with 20% opacity
  const primaryGradientTo = 'rgba(139, 92, 246, 0.1)'; // primaryBaseColor with 10% opacity

  const pinkBaseColor = '#D946EF'; // Corresponds to humqadam.pink
  const pinkLightColor = 'rgba(217, 70, 239, 0.1)'; // pinkBaseColor with 10% opacity
  const pinkHoverColor = 'rgba(217, 70, 239, 0.9)'; // pinkBaseColor with 90% opacity

  const lightBgColor = '#F1F0FB'; // Corresponds to humqadam.light

  const gray100 = '#F3F4F6'; // Corresponds to gray-100
  const gray200 = '#E5E7EB'; // Corresponds to gray-200
  const gray800 = '#1F2937'; // Corresponds to gray-800

  const blue500 = '#3B82F6'; // Corresponds to blue-500
  const blue500Light = 'rgba(59, 130, 246, 0.1)'; // blue-500 with 10% opacity
  const blue600 = '#2563EB'; // Corresponds to blue-600

  const red600 = '#DC2626'; // Corresponds to red-600
  const red700 = '#B91C1C'; // Corresponds to red-700


  return (
    <MainLayout>
      {/* Hero Section */}
      {/* Changed background gradient color to direct rgba codes */}
      <section style={{ backgroundImage: `linear-gradient(to right, ${primaryGradientFrom}, ${primaryGradientTo})` }} className="py-12">
        <div className="container mx-auto px-4">
          {/* Added mx-auto text-center to center the content block */}
          <div className="max-w-3xl mx-auto text-center">
            {/* Updated Title */}
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 ">
              Human Rights in Pakistan
            </h1>
            {/* Updated Subtitle */}
            <p className="text-gray-700 text-lg mb-6">
              Understanding the fundamental rights of all citizens under Pakistani law, Islamic principles, and international standards
            </p>
             {/* Added justify-center to center the buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
               {/* Find Legal Aid Button - Removed hover:text-white, changed hover:bg for consistency */}
               <a
                href="https://ewakeel.com/"
                target="_blank" // Open in a new tab
                style={{backgroundColor: primaryBaseColor }}
                className={`inline-flex items-center justify-center rounded-md border text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[${primaryOutlineHoverColor}] flex items-center gap-2 transition-transform duration-200 hover:scale-105 text-white px-4 py-2`} // Added padding and other button-like classes
              >
                <Scale size={18} />
                <span>Find Legal Aid</span>
              </a>
              {/* Hamdard Waqeel Chatbot Button - Retained and using primary color, hover remains consistent */}
              {/* >>> Link to your chatbot route <<< */}
              <Link to="/ChatbotPage"> {/* Define your chatbot route here */}
                {/* Added text-gray-800 class for visible text, hover remains consistent */}
                 {/* Using style for background, text color is explicitly dark gray */}
                <Button style={{ backgroundColor: primaryBaseColor }} className={`hover:bg-[${primaryHoverColor}] flex items-center gap-2 transition-transform duration-200 hover:scale-105 text-white`}>
                  <Bot size={18} /> {/* Bot icon remains relevant */}
                  <span>HumQadam Waqeel (Chatbot)</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rights Overview */}
      {/* Section title updated */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Alignment remains left as per previous design */}
          <SectionHeading
            title="Foundational Rights"
            subtitle="Key sources of human rights and legal protections in Pakistan"
            alignment="center"
          />

          {/* Tabs remain, but content is reframed */}
          <Tabs defaultValue="constitutional" className="w-full">
            {/* TabsList styles handled by shadcn/ui, hover on triggers is often built-in */}
             {/* Using direct rgba for background */}
             <TabsList style={{ backgroundColor: 'rgba(229, 231, 235, 0.5)' }} className={`grid w-full grid-cols-2 md:grid-cols-3 mb-6`}> {/* Added subtle background */}
              {/* Using style for active text color (uses CSS variables provided by shadcn/ui) */}
              <TabsTrigger
      value="constitutional"
      className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
      style={{ color: 'rgba(0, 0, 0, 0.9)' }} // Fallback to black with opacity
    >
      Constitutional Rights
    </TabsTrigger>
    <TabsTrigger
      value="islamic"
      className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
      style={{ color: 'rgba(0, 0, 0, 0.9)' }}
    >
      Rights in Islam
    </TabsTrigger>
    <TabsTrigger
      value="international"
      className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
      style={{ color: 'rgba(0, 0, 0, 0.9)' }}
    >
      International Conventions
    </TabsTrigger>
            </TabsList>

            <TabsContent value="constitutional" className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                   {/* Placeholder image - replace with project image if needed */}
                   <img
                     src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb"
                     alt="Constitutional rights symbols" // Updated alt text
                     className="rounded-lg w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
                   />
                 </div>
                <div className="md:w-2/3">
                  <h3 className="font-heading text-xl font-bold mb-4">Constitutional Rights</h3>
                  {/* Content reframed to apply to all citizens */}
                  <p className="text-gray-700 mb-4">
                    The Constitution of Pakistan guarantees fundamental rights to all citizens regardless of gender, religion, race, or caste. Understanding these rights is essential to ensure equality and justice for everyone.
                  </p>
                  <div className="space-y-4">
                    {/* Highlighted articles - using direct color code for border */}
                    <div style={{ borderLeftColor: primaryBaseColor }} className={`border-l-4 pl-4 py-2 transition-colors duration-150 hover:bg-gray-100 rounded-r-md`}>
                      <h4 className="font-bold">Article 25:</h4>
                      <p className="text-gray-600">Guarantees equality before the law and prohibits discrimination on the basis of sex, etc.</p> {/* Added etc. */}
                    </div>
                    <div style={{ borderLeftColor: primaryBaseColor }} className={`border-l-4 pl-4 py-2 transition-colors duration-150 hover:bg-gray-100 rounded-r-md`}>
                      <h4 className="font-bold">Article 34:</h4>
                      <p className="text-gray-600">Ensures full participation of women in all spheres of national life (mentioning women specifically is still important in this context).</p>
                    </div>
                    <div style={{ borderLeftColor: primaryBaseColor }} className={`border-l-4 pl-4 py-2 transition-colors duration-150 hover:bg-gray-100 rounded-r-md`}>
                      <h4 className="font-bold">Article 35:</h4>
                      <p className="text-gray-600">Protects the marriage, family, mother, and child.</p>
                    </div>
                  </div>
                   {/* Explore Full Constitutional Rights Link - Changed from Button to <a> tag */}
                   {/* Using style for background, text color is explicitly white, hover remains consistent */}
                  <a
                    href="https://portal.mohr.gov.pk/national_framework/constitution-of-pakistan/"
                    target="_blank" // Open in a new tab
                    style={{ backgroundColor: primaryBaseColor }}
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-6 px-4 py-2 hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}
                  >
                    Explore Full Constitutional Rights
                  </a>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="islamic" className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                   {/* Placeholder image - replace with project image if needed */}
                   <img
                     src="https://media.istockphoto.com/id/1413624065/photo/gavel-hammer-and-holy-koran-against-white-background-sharia-law-concept.jpg?s=1024x1024&w=is&k=20&c=-LK7JsNIHLkRNPJInrySBmGu8AL35KqcwyI1L8-dgvM="
                     alt="Islamic rights symbols" // Updated alt text
                     className="rounded-lg w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
                   />
                 </div>
                <div className="md:w-2/3">
                  <h3 className="font-heading text-xl font-bold mb-4">Rights in Islam</h3>
                   {/* Content reframed */}
                  <p className="text-gray-700 mb-4">
                    Islam outlines fundamental rights applicable to all individuals. Historically, it granted significant rights to women and other groups that were revolutionary at the time. Understanding these principles is key to comprehending personal and family laws in Pakistan.
                  </p>
                  <div className="space-y-4">
                     {/* Specific examples for women - using direct color code for border */}
                    <div style={{ borderLeftColor: primaryBaseColor }} className={`border-l-4 pl-4 py-2 transition-colors duration-150 hover:bg-gray-100 rounded-r-md`}>
                      <h4 className="font-bold">Equality and Dignity:</h4>
                      <p className="text-gray-600">Islam emphasizes the inherent dignity and equality of all human beings before God, regardless of gender or social status.</p>
                    </div>
                    <div style={{ borderLeftColor: primaryBaseColor }} className={`border-l-4 pl-4 py-2 transition-colors duration-150 hover:bg-gray-100 rounded-r-md`}>
                      <h4 className="font-bold">Right to Education:</h4>
                      <p className="text-gray-600">Seeking knowledge is encouraged for all Muslims.</p> {/* Generalized */}
                    </div>
                    <div style={{ borderLeftColor: primaryBaseColor }} className={`border-l-4 pl-4 py-2 transition-colors duration-150 hover:bg-gray-100 rounded-r-md`}>
                      <h4 className="font-bold">Right to Property:</h4>
                      <p className="text-gray-600">Individuals, including women, have the right to own, buy, sell, and inherit property independently.</p> {/* Generalized */}
                    </div>
                    <div style={{ borderLeftColor: primaryBaseColor }} className={`border-l-4 pl-4 py-2 transition-colors duration-150 hover:bg-gray-100 rounded-r-md`}>
                      <h4 className="font-bold">Marriage and Family Rights:</h4> {/* Title generalized */}
                      <p className="text-gray-600">Includes rights related to choosing a spouse, spousal responsibilities, and processes for dissolution of marriage for both men and women.</p> {/* Generalized */}
                    </div>
                  </div>
                  <a
                    href="https://www.iium.edu.my/deed/articles/bpsc.html"
                    target="_blank" // Open in a new tab
                    style={{ backgroundColor: primaryBaseColor }}
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-6 px-4 py-2 hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}
                  >
                    Explore Full Constitutional Rights
                  </a>
                </div>
                </div>
            </TabsContent>

            <TabsContent value="international" className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                   {/* Placeholder image - replace with project image if needed */}
                   <img
                     src="https://plus.unsplash.com/premium_photo-1664301945106-bc750a273808?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                     alt="International symbols" // Updated alt text
                     className="rounded-lg w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
                   />
                 </div>
                <div className="md:w-2/3">
                  <h3 className="font-heading text-xl font-bold mb-4">International Conventions & Standards</h3>
                   {/* Content reframed */}
                  <p className="text-gray-700 mb-4">
                    Pakistan is a signatory to various international human rights treaties and conventions. These agreements set global standards for protecting fundamental rights for all individuals within the country.
                  </p>
                  <div className="space-y-4">
                    {/* Examples of relevant conventions - using direct color code for border */}
                    <div style={{ borderLeftColor: primaryBaseColor }} className={`border-l-4 pl-4 py-2 transition-colors duration-150 hover:bg-gray-100 rounded-r-md`}>
                      <h4 className="font-bold">UDHR:</h4>
                      <p className="text-gray-600">The Universal Declaration of Human Rights outlines universal human rights for all people.</p> {/* Generalized */}
                    </div>
                    <div style={{ borderLeftColor: primaryBaseColor }} className={`border-l-4 pl-4 py-2 transition-colors duration-150 hover:bg-gray-100 rounded-r-md`}>
                      <h4 className="font-bold">ICCPR:</h4>
                      <p className="text-gray-600">The International Covenant on Civil and Political Rights.</p> {/* Added example */}
                    </div>
                     <div style={{ borderLeftColor: primaryBaseColor }} className={`border-l-4 pl-4 py-2 transition-colors duration-150 hover:bg-gray-100 rounded-r-md`}>
                      <h4 className="font-bold">ICESCR:</h4>
                      <p className="text-gray-600">The International Covenant on Economic, Social and Cultural Rights.</p> {/* Added example */}
                    </div>
                  </div>
                   {/* Button using direct color codes */}
                   <a
                    href="https://www.ohchr.org/en/instruments-and-mechanisms/international-human-rights-law"
                    target="_blank" // Open in a new tab
                    style={{ backgroundColor: primaryBaseColor }}
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-6 px-4 py-2 hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}
                  >
                    Explore International Human Rights
                  </a>
                  </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Key Legislation */}
      {/* Section title updated */}
       {/* Using direct color code for background */}
      <section style={{ backgroundColor: lightBgColor }} className="py-12">
        <div className="container mx-auto px-4">
          {/* Alignment remains left as per previous design */}
          <SectionHeading
            title="Key Legal Protections"
            subtitle="Important laws addressing various human rights aspects in Pakistan"
            alignment="center"
          />

          {/* Cards remain, content reframed as examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Added subtle background color and border to the Cards using direct color codes */}
            <Card style={{ backgroundColor: primaryVeryLightColor, borderColor: primaryLightColor }} className={`h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border flex flex-col`}> {/* Added flex-col */}
              <CardHeader>
                 {/* Icon background and text using direct color codes */}
                <div style={{ backgroundColor: primaryLightColor, color: primaryBaseColor }} className={`w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <Landmark size={24} />
                </div>
                <CardTitle>Protection Against Harassment of Women at the Workplace Act, 2010</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow"> {/* Added flex-grow */}
                 {/* Content reframed */}
                <p className="text-gray-600">
                  This crucial law specifically addresses the protection of women from harassment in the workplace, contributing to a safe environment for all employees.
                </p>
                <div className="mt-4 space-y-2">
                  <h4 className="font-bold">Key Provisions:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Defines harassment in comprehensive terms</li>
                    <li>Mandates inquiry committees in every organization</li>
                    <li>Establishes the office of Ombudsperson</li>
                    <li>Provides penalties for harassers</li>
                  </ul>
                </div>
              </CardContent>
              {/* Added CardFooter with Learn More button linking to Chatbot */}
              <CardFooter>
                 <Link to="/ChatbotPage" className="w-full">
                  <Button style={{ backgroundColor: primaryBaseColor }} className={`w-full hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}>
                    Learn More
                  </Button>
                 </Link>
              </CardFooter>
            </Card>

             {/* Added subtle background color and border to the Cards using direct color codes */}
            <Card style={{ backgroundColor: primaryVeryLightColor, borderColor: primaryLightColor }} className={`h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border flex flex-col`}> {/* Added flex-col */}
              <CardHeader>
                 {/* Icon background and text using direct color codes */}
                <div style={{ backgroundColor: primaryLightColor, color: primaryBaseColor }} className={`w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <Landmark size={24} />
                </div>
                <CardTitle>Laws on Domestic Violence</CardTitle> {/* Title generalized */}
              </CardHeader>
              <CardContent className="flex-grow"> {/* Added flex-grow */}
                 {/* Content reframed */}
                <p className="text-gray-600">
                  Provincial laws provide mechanisms to report and seek protection from domestic violence, which affects individuals of all genders, though predominantly women and children.
                </p>
                <div className="mt-4 space-y-2">
                  <h4 className="font-bold">Key Provisions (Examples):</h4> {/* Title updated */}
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Comprehensive definition of domestic violence</li>
                    <li>Protection orders against abusers</li>
                    <li>Residence orders to secure housing</li>
                    <li>Monetary relief for victims</li>
                  </ul>
                </div>
              </CardContent>
               {/* Added CardFooter with Learn More button linking to Chatbot */}
              <CardFooter>
                 <Link to="/ChatbotPage" className="w-full">
                  <Button style={{ backgroundColor: primaryBaseColor }} className={`w-full hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}>
                    Learn More
                  </Button>
                 </Link>
              </CardFooter>
            </Card>

             {/* Added subtle background color and border to the Cards using direct color codes */}
            <Card style={{ backgroundColor: primaryVeryLightColor, borderColor: primaryLightColor }} className={`h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border flex flex-col`}> {/* Added flex-col */}
              <CardHeader>
                 {/* Icon background and text using direct color codes */}
                <div style={{ backgroundColor: primaryLightColor, color: primaryBaseColor }} className={`w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <Landmark size={24} />
                </div>
                <CardTitle>The Anti-Rape (Investigation and Trial) Act, 2021</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow"> {/* Added flex-grow */}
                 {/* Content reframed */}
                <p className="text-gray-600">
                  This significant law strengthens investigation and prosecution procedures in rape cases and introduces measures to protect victims' privacy and dignity, crucial for ensuring justice.
                </p>
                <div className="mt-4 space-y-2">
                  <h4 className="font-bold">Key Provisions:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Creation of Anti-Rape Crisis Cells</li>
                    <li>Confidentiality of victim's identity</li>
                    <li>In-camera trials for victim protection</li>
                    <li>Expedited investigation and trial procedures</li>
                  </ul>
                </div>
              </CardContent>
               {/* Added CardFooter with Learn More button linking to Chatbot */}
              <CardFooter>
                 <Link to="/ChatbotPage" className="w-full">
                  <Button style={{ backgroundColor: primaryBaseColor }} className={`w-full hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}>
                    Learn More
                  </Button>
                 </Link>
              </CardFooter>
            </Card>

             {/* Added subtle background color and border to the Cards using direct color codes */}
            <Card style={{ backgroundColor: primaryVeryLightColor, borderColor: primaryLightColor }} className={`h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border flex flex-col`}> {/* Added flex-col */}
              <CardHeader>
                 {/* Icon background and text using direct color codes */}
                <div style={{ backgroundColor: primaryLightColor, color: primaryBaseColor }} className={`w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <Landmark size={24} />
                </div>
                <CardTitle>Property Rights Legislation</CardTitle> {/* Title generalized */}
              </CardHeader>
              <CardContent className="flex-grow"> {/* Added flex-grow */}
                <p className="text-gray-600 mb-4">
                  Various laws protect the right to inherit and own property for all citizens, including specific provisions to address historical challenges faced by women in claiming their rightful inheritance.
                </p>
                <div className="mt-4 space-y-2">
                  <h4 className="font-bold">Key Provisions (Examples):</h4> {/* Title updated */}
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Enforcement of inheritance rights for all heirs</li> {/* Generalized */}
                    <li>Specific measures for women's inheritance rights</li> {/* Added specificity */}
                    <li>Protection against forced property transfers</li>
                    <li>Mechanisms to resolve property disputes</li>
                    <li>Penalties for denying property rights</li> {/* Generalized */}
                  </ul>
                </div>
              </CardContent>
               {/* Added CardFooter with Learn More button linking to Chatbot */}
              <CardFooter>
                 <Link to="/ChatbotPage" className="w-full">
                  <Button style={{ backgroundColor: primaryBaseColor }} className={`w-full hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}>
                    Learn More
                  </Button>
                 </Link>
              </CardFooter>
            </Card>

            {/* >>> Add more cards for other key legislation relevant to general human rights if needed <<< */}
             {/* Added subtle background color and border to the Cards using direct color codes */}
             <Card style={{ backgroundColor: primaryVeryLightColor, borderColor: primaryLightColor }} className={`h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border flex flex-col`}> {/* Added flex-col */}
              <CardHeader>
                 {/* Icon background and text using direct color codes */}
                <div style={{ backgroundColor: primaryLightColor, color: primaryBaseColor }} className={`w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <Gavel size={24} /> {/* Using a gavel icon */}
                </div>
                <CardTitle>Right to Fair Trial and Due Process</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow"> {/* Added flex-grow */}
                <p className="text-gray-600">
                 Laws and constitutional provisions guarantee the right to a fair trial, legal representation, and due process for anyone accused of a crime.
                </p>
                 <div className="mt-4 space-y-2">
                  <h4 className="font-bold">Key Aspects:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Presumption of innocence</li>
                    <li>Right to legal counsel</li>
                    <li>Protection against self-incrimination</li>
                    <li>Public and timely hearings</li>
                  </ul>
                </div>
              </CardContent>
               {/* Added CardFooter with Learn More button linking to Chatbot */}
              <CardFooter>
                 <Link to="/ChatbotPage" className="w-full">
                  <Button style={{ backgroundColor: primaryBaseColor }} className={`w-full hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}>
                    Learn More
                  </Button>
                 </Link>
              </CardFooter>
            </Card>
             {/* Added subtle background color and border to the Cards using direct color codes */}
             <Card style={{ backgroundColor: primaryVeryLightColor, borderColor: primaryLightColor }} className={`h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border flex flex-col`}> {/* Added flex-col */}
              <CardHeader>
                 {/* Icon background and text using direct color codes */}
                <div style={{ backgroundColor: primaryLightColor, color: primaryBaseColor }} className={`w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <ScrollText size={24} /> {/* Using a scroll icon */}
                </div>
                <CardTitle>Freedom of Expression and Association</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow"> {/* Added flex-grow */}
                <p className="text-gray-600">
                 The Constitution protects the rights to freedom of speech, expression, assembly, and association, subject to reasonable restrictions imposed by law.
                </p>
                 <div className="mt-4 space-y-2">
                  <h4 className="font-bold">Key Aspects:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Right to express opinions freely</li>
                    <li>Right to peaceful assembly</li>
                    <li>Right to form associations or unions</li>
                    <li>Limitations based on public order, morality, etc.</li>
                  </ul>
                </div>
              </CardContent>
               {/* Added CardFooter with Learn More button linking to Chatbot */}
              <CardFooter>
                 <Link to="/ChatbotPage" className="w-full">
                  <Button style={{ backgroundColor: primaryBaseColor }} className={`w-full hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}>
                    Learn More
                  </Button>
                 </Link>
              </CardFooter>
            </Card>

          </div>
        </div>
      </section>

      {/* Common Legal Questions */}
      {/* Section title updated */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Alignment remains left as per previous design */}
          <SectionHeading
            title="Answers to Common Questions"
            subtitle="Practical information about various legal rights in everyday situations"
            alignment="center"
          />

          {/* Accordion items remain, content reframed as examples */}
          <Accordion type="single" collapsible className="w-full">
            {/* Added hover effects to Accordion Items */}
            <AccordionItem value="marriage" className="transition-colors duration-150 hover:bg-gray-100 rounded-lg px-2 -mx-2">
              <AccordionTrigger className="text-lg font-heading">
                What are the legal rights related to marriage and divorce? {/* Generalized question */}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p className="mb-4">
                  Pakistani law and Islamic principles outline important rights related to marriage and its dissolution for both men and women. Key aspects include:
                </p>
                {/* Content generalized where applicable, specific women's rights retained as important examples */}
                <ul className="list-disc pl-5 space-y-2">
                  <li>Right to consent to marriage - forced marriages are illegal for everyone.</li> {/* Generalized */}
                  <li>The marriage contract (Nikah Nama) can specify conditions agreed upon by both parties.</li> {/* Generalized */}
                  <li>Rights related to Mahr (dower) which is the wife's exclusive property.</li> {/* Retained specific */}
                  <li>Procedures for divorce initiated by either husband (Talaq) or wife (Khula, Tafweez-e-Talaq).</li> {/* Generalized */}
                  <li>Rights and responsibilities regarding maintenance during the Iddah period and for children.</li> {/* Generalized */}
                  <li>Principles for child custody based on the best interest of the child.</li> {/* Generalized */}
                </ul>
                <div className="mt-4">
                   {/* Button using direct color codes */}
                   <a
                    href="https://portal.mohr.gov.pk/national_framework/constitution-of-pakistan/"
                    target="_blank" // Open in a new tab
                    style={{ backgroundColor: primaryBaseColor }}
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-6 px-4 py-2 hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}
                  >
                    Read Detailed guide on family law rights
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Added hover effects to Accordion Items */}
            <AccordionItem value="inheritance" className="transition-colors duration-150 hover:bg-gray-100 rounded-lg px-2 -mx-2">
              <AccordionTrigger className="text-lg font-heading">
                How does inheritance work in Pakistan? {/* Generalized question */}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p className="mb-4">
                  Inheritance in Pakistan is primarily governed by Islamic law for Muslims, with specific shares for various heirs, including both male and female relatives. State law also protects inheritance rights.
                </p>
                 {/* Content generalized, specific women's rights retained as important examples */}
                <ul className="list-disc pl-5 space-y-2">
                  <li>Defined shares for heirs like children, parents, and spouses according to Islamic law.</li> {/* Generalized */}
                  <li>Specific shares for female heirs (daughters, wives, mothers).</li> {/* Retained specific */}
                  <li>Denying anyone their rightful inheritance is illegal under Pakistani law.</li> {/* Generalized */}
                  <li>Legislation like the Prevention of Anti-Women Practices Act, 2011, criminalizes specifically depriving women of inheritance.</li> {/* Retained specific */}
                </ul>
                <div className="mt-4">
                   {/* Button using direct color codes */}
                   <a
                    href="https://portal.mohr.gov.pk/national_framework/constitution-of-pakistan/"
                    target="_blank" // Open in a new tab 
                    style={{ backgroundColor: primaryBaseColor }}
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-6 px-4 py-2 hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}
                  >
                    Explore Full Constitutional Rights
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Added hover effects to Accordion Items */}
            <AccordionItem value="workplace" className="transition-colors duration-150 hover:bg-gray-100 rounded-lg px-2 -mx-2">
              <AccordionTrigger className="text-lg font-heading">
                What rights do individuals have in the workplace? {/* Generalized question */}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p className="mb-4">
                  Pakistani law provides various protections and rights for employees, with specific measures to address vulnerabilities faced by women:
                </p>
                 {/* Content generalized, specific women's rights retained as important examples */}
                <ul className="list-disc pl-5 space-y-2">
                  <li>Right to a safe working environment, including protection against harassment (specifically for women under the 2010 Act).</li> {/* Generalized + retained specific */}
                  <li>Right to equal pay for equal work regardless of gender.</li> {/* Generalized */}
                  <li>Rights related to leave, working hours, and conditions as per labor laws.</li> {/* Generalized */}
                  <li>Specific rights for pregnant employees and new mothers, such as maternity leave and nursing breaks.</li> {/* Retained specific */}
                  <li>Protection against discrimination in hiring, promotion, and termination based on gender or other protected characteristics.</li> {/* Generalized + retained specific */}
                </ul>
                <div className="mt-4">
                   {/* Button using direct color codes */}
                   <a
                    href="https://portal.mohr.gov.pk/national_framework/constitution-of-pakistan/"
                    target="_blank" // Open in a new tab 
                    style={{ backgroundColor: primaryBaseColor }}
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-6 px-4 py-2 hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}
                  >
                    Read detailed guide on labor and workplace rights
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Added hover effects to Accordion Items */}
            <AccordionItem value="domestic-violence" className="transition-colors duration-150 hover:bg-gray-100 rounded-lg px-2 -mx-2">
              <AccordionTrigger className="text-lg font-heading">
                What support is available for victims of domestic violence? {/* Generalized question */}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p className="mb-4">
                  If you or someone you know is experiencing domestic violence, legal and support services are available:
                </p>
                 {/* Content focuses on available help */}
                <ul className="list-disc pl-5 space-y-2">
                  <li>Contact emergency services: Police - 15, Women's Helpline - 1099.</li>
                  <li>Seek protection orders under provincial Domestic Violence Acts.</li>
                  <li>File a First Information Report (FIR) at the police station.</li>
                  <li>Access temporary shelter at government-run Dar-ul-Aman or NGO shelters.</li>
                  <li>Connect with non-governmental organizations specializing in support for victims of violence.</li>
                   <li>Document incidents (photos, medical reports) safely.</li>
                </ul>
                   {/* Red button using direct color codes */}
                   <div className="mt-4">
                   {/* Red button linking to Safety page */}
                   <Link to="/safety"> {/* Wrap the Button with Link */}
                      <Button style={{ backgroundColor: red600 }} className={`hover:bg-[${red700}] transition-transform duration-200 hover:scale-105 text-white`}> {/* Added text-white explicitly */}
                        Get Immediate Help
                      </Button>
                   </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Added hover effects to Accordion Items */}
            <AccordionItem value="custody" className="transition-colors duration-150 hover:bg-gray-100 rounded-lg px-2 -mx-2">
              <AccordionTrigger className="text-lg font-heading">
                How does child custody work after separation or divorce? {/* Generalized question */}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p className="mb-4">
                  Child custody decisions in Pakistan are guided by the principle of the child's best interest, considering factors under Islamic law and civil law.
                </p>
                 {/* Content generalized, traditional principles for mother's custody mentioned */}
                <ul className="list-disc pl-5 space-y-2">
                  <li>Courts prioritize the welfare and best interest of the child.</li>
                  <li>Mothers typically have the right to custody (Hizanat) of young children up to certain ages (e.g., 7 for boys, puberty for girls) unless deemed unfit.</li>
                  <li>Fathers are generally responsible for the financial maintenance and education of children.</li>
                  <li>Non-custodial parents have visitation rights.</li>
                  <li>Custody arrangements can be agreed upon or determined by the court.</li>
                </ul>
                <div className="mt-4">
                   {/* Button using direct color codes */}
                  <Button style={{ color: primaryBaseColor }} className={`hover:text-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105`} variant="link">
                    Read detailed guide on child custody laws
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

             {/* >>> Add more Accordion items for other common legal questions applicable to all if needed <<< */}
             <AccordionItem value="police-interaction" className="transition-colors duration-150 hover:bg-gray-100 rounded-lg px-2 -mx-2">
              <AccordionTrigger className="text-lg font-heading">
                What are my rights if I interact with the police?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p className="mb-4">
                  Citizens have specific rights when interacting with law enforcement:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Right to know the reason for arrest.</li>
                  <li>Right to remain silent and not incriminate yourself.</li>
                  <li>Right to legal representation.</li>
                  <li>Right to be produced before a magistrate within 24 hours of arrest.</li>
                   <li>Protection against torture or inhuman treatment.</li>
                </ul>
                 <div className="mt-4">
                   {/* Button using direct color codes */}
                  <Button style={{ color: primaryBaseColor }} className={`hover:text-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105`} variant="link">
                    Read detailed guide on rights during police interaction
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </section>

      {/* Legal Aid */}
      {/* Section title updated */}
       {/* Using direct color code for background */}
      <section style={{ backgroundColor: primaryLightColor }} className={`rounded-lg mx-4 my-8 py-12`}>
        <div className="container mx-auto px-4">
          {/* Alignment remains center as per previous design */}
          <SectionHeading
            title="Legal Aid & Support Services" /* Updated title */
            subtitle="Where to find legal assistance and support when you need it" /* Updated subtitle */
            alignment="center"
          />

          {/* Cards remain, content updated/generalized */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
             {/* Added subtle background color and border to the Cards using direct color codes */}
            <Card style={{ backgroundColor: primaryVeryLightColor, borderColor: primaryLightColor }} className={`h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border flex flex-col`}> {/* Added flex-col */}
              <CardHeader>
                 {/* Icon background and text using direct color codes */}
                <div style={{ backgroundColor: primaryLightColor, color: primaryBaseColor }} className={`w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <Building size={24} />
                </div>
                <CardTitle>Government Legal Aid</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow"> {/* Added flex-grow */}
                <p className="text-gray-600 mb-4">
                  Access free or subsidized legal services provided by government institutions and initiatives for eligible individuals.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                   {/* Added subtle hover to list items */}
                  <li className="transition-colors duration-150 hover:text-gray-800">District Legal Empowerment Committees</li>
                  <li className="transition-colors duration-150 hover:text-gray-800">Legal Aid Society of Pakistan</li>
                  <li className="transition-colors duration-150 hover:text-gray-800">Provincial Bar Council Legal Aid Committees</li>
                   {/* Add other government services if applicable */}
                </ul>
                </CardContent>
              {/* Added CardFooter with button linking to Safety page */}
              <CardFooter>
                 <Link to="/safety" className="w-full"> {/* Link to /safety page */}
                 {/* Button using direct color codes */}
                 <Button style={{ backgroundColor: primaryBaseColor }} className={`w-full hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}> {/* Added text-white explicitly */}
                  Find Government Legal Aid
                </Button>
                 </Link>
              </CardFooter>
            </Card>

             {/* Added subtle background color and border to the Cards using direct color codes */}
            <Card style={{ backgroundColor: primaryVeryLightColor, borderColor: primaryLightColor }} className={`h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border flex flex-col`}> {/* Added flex-col */}
              <CardHeader>
                 {/* Icon background and text using direct color codes */}
                <div style={{ backgroundColor: primaryLightColor, color: primaryBaseColor }} className={`w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <Building size={24} />
                </div>
                <CardTitle>NGO Legal Support</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow"> {/* Added flex-grow */}
                <p className="text-gray-600 mb-4">
                  Get help from non-governmental organizations that provide legal assistance, counseling, and support, including those specializing in women's rights and other human rights issues.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                   {/* Added subtle hover to list items */}
                  <li className="transition-colors duration-150 hover:text-gray-800">AGHS Legal Aid Cell</li>
                  <li className="transition-colors duration-150 hover:text-gray-800">Aurat Foundation</li>
                  <li className="transition-colors duration-150 hover:text-gray-800">Shirkat Gah Women's Resource Centre</li>
                   {/* Add other relevant NGOs if applicable */}
                </ul>
             </CardContent>
              {/* Added CardFooter with button linking to Safety page */}
              <CardFooter>
                 <Link to="/safety" className="w-full"> {/* Link to /safety page */}
                 {/* Button using direct color codes */}
                 <Button style={{ backgroundColor: primaryBaseColor }} className={`w-full hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}> {/* Added text-white explicitly */}
                  Contact NGO
                </Button>
                 </Link>
              </CardFooter>
            </Card>

             {/* Added subtle background color and border to the Cards using direct color codes */}
            <Card style={{ backgroundColor: primaryVeryLightColor, borderColor: primaryLightColor }} className={`h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border flex flex-col`}> {/* Added flex-col */}
              <CardHeader>
                 {/* Icon background and text using direct color codes */}
                <div style={{ backgroundColor: primaryLightColor, color: primaryBaseColor }} className={`w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <HelpCircle size={24} />
                </div>
                <CardTitle>Helplines & Emergency Contacts</CardTitle> {/* Updated title */}
              </CardHeader>
              <CardContent className="flex-grow"> {/* Added flex-grow */}
                <p className="text-gray-600 mb-4">
                  Call these helplines for immediate assistance, legal advice, or reporting human rights violations.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                   {/* Added subtle hover to list items */}
                  <li className="transition-colors duration-150 hover:text-gray-800">Police Emergency: 15</li> {/* Added Police */}
                  <li className="transition-colors duration-150 hover:text-gray-800">Women's Rights Helpline: 1099</li>
                  <li className="transition-colors duration-150 hover:text-gray-800">Child Protection Helpline: 1121</li> {/* Added Child Protection */}
                   {/* Add other relevant helplines */}
                </ul>
                </CardContent>
              {/* Added CardFooter with button linking to Safety page */}
              <CardFooter>
                 <Link to="/safety" className="w-full"> {/* Link to /safety page */}
                 {/* Button using direct color codes */}
                 <Button style={{ backgroundColor: primaryBaseColor }} className={`w-full hover:bg-[${primaryHoverColor}] transition-transform duration-200 hover:scale-105 text-white`}> {/* Added text-white explicitly */}
                  View all Helpline numbers
                </Button>
                 </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Rights;