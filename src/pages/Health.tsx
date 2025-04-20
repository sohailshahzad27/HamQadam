import React from "react";
import { Link } from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, BrainCircuit, Users, Shield, ArrowRight, Leaf, Syringe, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define an object to hold external URLs for health topics articles
const healthResourceUrls = {
  physical: "https://www.heart.org/en/healthy-living/fitness/fitness-basics", // Updated URL for Physical Health
  mental: "https://www.medicalnewstoday.com/articles/154543#definition",   // Updated URL for Mental Health
  child: "https://www.medicinenet.com/childrens_health/article.htm",       // Updated URL for Child Health
  nutrition: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9785741/"   // Updated URL for Nutrition (academic resource)
};

// Define search terms for Google Maps healthcare access buttons
const healthcareSearchTerms = {
  centers: "clinics and hospitals", // Removed "Pakistan" to rely more on geolocation
  mental: "mental health services", // Removed "Pakistan" to rely more on geolocation
  child: "pediatric doctors"        // Removed "Pakistan" to rely more on geolocation
};


const Health = () => {
  // Function to handle health topic button click and open URL
  const handleVisitResourcesClick = (category) => {
    const url = healthResourceUrls[category];
    if (url) {
      window.open(url, "_blank"); // Open the URL in a new tab
    } else {
      console.error(`URL not found for category: ${category}`);
      // Optionally, show a message to the user that resources are not available yet
    }
  };

   // Function to handle healthcare access button click and open Google Maps search
   const handleFindHealthcareClick = (type) => {
       const searchTerm = healthcareSearchTerms[type];

       if (!searchTerm) {
           console.error(`Search term not found for healthcare type: ${type}`);
           return;
       }

       // Try to get user's current location
       if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(
               (position) => {
                   // Success callback: Location obtained
                   const latitude = position.coords.latitude;
                   const longitude = position.coords.longitude;
                   const zoomLevel = 13; // Adjust zoom level as needed (e.g., 10-15)

                   // Construct Google Maps URL with search term and location
                   const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}/@${latitude},${longitude},${zoomLevel}z`;

                   window.open(mapsUrl, "_blank"); // Open Google Maps in a new tab
               },
               (error) => {
                   // Error callback: Location access denied or failed
                   console.error("Error getting user location:", error);
                   // Fallback to opening Google Maps with just the search term
                   const fallbackMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}`;
                   window.open(fallbackMapsUrl, "_blank");

                   // Optionally, inform the user that location couldn't be fetched
                   alert("Could not get your precise location. Showing general results.");
               },
               { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Options for location request
           );
       } else {
           // Geolocation is not supported by the browser
           console.error("Geolocation is not supported by this browser.");
            // Fallback to opening Google Maps with just the search term
           const fallbackMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}`;
           window.open(fallbackMapsUrl, "_blank");
           // Optionally, inform the user
           alert("Your browser does not support Geolocation. Showing general results.");
       }
   };


  return (
    <MainLayout>
      {/* Hero Section */}
       {/* Hero Section */}
       <section className="bg-gradient-to-r from-humqadam-teal/20 to-humqadam-teal/10 py-16">
    <div className="container mx-auto px-4">
      {/* Added mx-auto and text-center for centering content */}
      {/* Changed max-w-l to max-w-full */}
      <div className="max-w-full mx-auto text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Health & Well-being Resources
        </h1>
        {/* Added whitespace-nowrap, overflow-hidden, and text-ellipsis for single line */}
        {/* Removed overflow-hidden and text-ellipsis */}
        <p className="text-gray-700 text-lg mb-6 whitespace-nowrap">
          Comprehensive information on general health, mental wellness, and healthcare access across Pakistan for everyone.
        </p>
        {/* Added justify-center to center buttons on the same line */}
        <div className="flex flex-wrap gap-3 justify-center">
          {/* Buttons already have hover effects, added subtle scale */}
          {/* Consider linking these hero buttons too if they represent specific sections or external resources */}
          {/* This button could also use the handleFindHealthcareClick function */}
          <Link to="/mentalgpt"> {/* Use the Link component to navigate */}
          <Button className="bg-humqadam-teal hover:bg-humqadam-teal/90 flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <Brain size={18} />
            <span>Hum Dard</span>
          </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
      {/* Health Topics */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Essential Health Topics"
            subtitle="Information on key aspects of personal health and well-being"
            alignment="center"
          />

          {/* Updated Tabs */}
          <Tabs defaultValue="physical" className="w-full mt-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="physical">Physical Health</TabsTrigger>
              <TabsTrigger value="mental">Mental Health</TabsTrigger>
              <TabsTrigger value="child">Child Health</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>

            {/* Physical Health Tab - Updated Content Alignment */}
            <TabsContent value="physical" className="bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 ease-in-out">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w">
                  {/* Placeholder for image or graphic */}
                </div>
                {/* Added pl-4 for left padding and text-left for alignment */}
                <div className="md:w-2/3 pl-4 text-left">
                  <h3 className="font-heading text-xl font-bold mb-4">Physical Health</h3>
                  <p className="text-gray-700 mb-4">
                    Explore resources on fitness basics to help you maintain good physical health. Find guidance on activity levels, exercise types, and practical tips for achieving your fitness goals.
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-bold">Key Resources:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Activity guidelines for all ages</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Various exercise types explained</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Practical tips for fitness success</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Infographics and helpful charts</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Information on specific activities</li>
                    </ul>
                  </div>
                  {/* Centered Button using mx-auto block */}
                  <div className="mt-8 text-center">
                  <Button
                    className="bg-humqadam-teal hover:bg-humqadam-teal/90 flex gap-2 transition-transform duration-200 hover:scale-105"
                    onClick={() => handleVisitResourcesClick('physical')}
                    >
                    Visit Resources
                  </Button>
                    </div>
                </div>
              </div>
            </TabsContent>

            {/* Mental Health Tab - Updated Content Alignment */}
            <TabsContent value="mental" className="bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 ease-in-out">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w">
                  {/* Placeholder for image or graphic */}
                </div>
                 {/* Added pl-4 for left padding and text-left for alignment */}
                <div className="md:w-2/3 pl-4 text-left">
                  <h3 className="font-heading text-xl font-bold mb-4">Mental Health & Well-being</h3>
                   <p className="text-gray-700 mb-4">
                    This resource provides a comprehensive overview of mental health, covering its definition, common conditions, symptoms, and approaches to treatment and prevention.
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-bold">Key Resources:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Definition and understanding of mental well-being</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Common mental health conditions explained</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Recognizing symptoms and signs</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Causes, diagnosis, and treatment approaches</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Strategies for prevention and support</li>
                    </ul>
                  </div>
                   {/* Centered Button using mx-auto block */}
                  <Button
                    className="mx-auto block mt-6 bg-humqadam-teal hover:bg-humqadam-teal/90 transition-transform duration-200 hover:scale-105"
                    onClick={() => handleVisitResourcesClick('mental')}
                  >
                    Visit Resources
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Child Health Tab - Updated Content Alignment based on MedicineNet link */}
            <TabsContent value="child" className="bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 ease-in-out">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w">
                  {/* Placeholder for image or graphic */}
                </div>
                 {/* Added pl-4 for left padding and text-left for alignment */}
                <div className="md:w-2/3 pl-4 text-left">
                  <h3 className="font-heading text-xl font-bold mb-4">Child Health</h3>
                  <p className="text-gray-700 mb-4">
                    This resource provides an introduction to children's health, covering key aspects of growth and development, common illnesses and injuries, behavioral considerations, and the importance of family and community health.
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-bold">Key Resources:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Understanding child growth and development</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Information on common childhood illnesses</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Guidance on preventing childhood injuries</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Addressing behavioral and mental health in children</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Exploring the role of family and community in child health</li>
                    </ul>
                  </div>
                   {/* Centered Button using mx-auto block */}
                  <Button
                    className="mx-auto block mt-6 bg-humqadam-teal hover:bg-humqadam-teal/90 transition-transform duration-200 hover:scale-105"
                    onClick={() => handleVisitResourcesClick('child')}
                  >
                    Visit Resources
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Nutrition Tab - Updated Content Alignment */}
            <TabsContent value="nutrition" className="bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 ease-in-out">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w">
                  {/* Placeholder for image or graphic */}
                </div>
                 {/* Added pl-4 for left padding and text-left for alignment */}
                <div className="md:w-2/3 pl-4 text-left">
                  <h3 className="font-heading text-xl font-bold mb-4">Nutrition & Healthy Eating</h3>
                  <p className="text-gray-700 mb-4">
                    Explore this academic perspective on nutrition, food, and diet, examining the biological importance of nutrients and reviewing principles of dietary patterns in the context of health and longevity. This resource offers insights from a research viewpoint.
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-bold">Key Resources:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Biological importance of macro and micronutrients</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Different types of food and their health claims</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Principles of healthy dietary patterns</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">The role of diet in health and longevity</li>
                      <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -ml-2">Integrating molecular, physiological, and cultural aspects of diet</li>
                    </ul>
                  </div>
                   {/* Centered Button using mx-auto block */}
                  <Button
                    className="mx-auto block mt-6 bg-humqadam-teal hover:bg-humqadam-teal/90 transition-transform duration-200 hover:scale-105"
                    onClick={() => handleVisitResourcesClick('nutrition')}
                  >
                    Visit Resources
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Healthcare Access - Generalized Cards - Updated with Maps Links */}
      <section className="py-12 bg-humqadam-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Healthcare Access"
            subtitle="Find healthcare providers and services in your area"
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* General Health Centers Card */}
            <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-humqadam-teal/10 text-humqadam-teal rounded-full flex items-center justify-center mb-4">
                  <Heart size={24} />
                </div>
                <CardTitle>Health Centers & Clinics</CardTitle>
                <CardDescription>Access general and specialized medical care</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Find clinics and hospitals providing a range of health services including general check-ups, specialist consultations, and diagnostic tests.
                </p>
              </CardContent>
              <CardFooter>
                {/* Updated Button with onClick handler for Maps search */}
                <Button
                    variant="outline"
                    className="w-full text-humqadam-teal border-humqadam-teal hover:bg-humqadam-teal hover:text-white transition-transform duration-200 hover:scale-105"
                    onClick={() => handleFindHealthcareClick('centers')}
                >
                  <span>Find Centers Near You</span>
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </CardFooter>
            </Card>

            {/* Mental Health Services Card - Updated with Maps Link */}
            <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-humqadam-teal/10 text-humqadam-teal rounded-full flex items-center justify-center mb-4">
                  <BrainCircuit size={24} />
                </div>
                <CardTitle>Mental Health Services</CardTitle>
                <CardDescription>Support for your emotional well-being</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Connect with therapists, counselors, and support groups for various mental health needs and challenges.
                </p>
              </CardContent>
              <CardFooter>
                 {/* Updated Button with onClick handler for Maps search */}
                <Button
                    variant="outline"
                    className="w-full text-humqadam-teal border-humqadam-teal hover:bg-humqadam-teal hover:text-white transition-transform duration-200 hover:scale-105"
                    onClick={() => handleFindHealthcareClick('mental')}
                >
                  <span>Find Mental Health Support</span>
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </CardFooter>
            </Card>

            {/* Child Healthcare Card - Updated with Maps Link */}
            <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-humqadam-teal/10 text-humqadam-teal rounded-full flex items-center justify-center mb-4">
                   <Syringe size={24} />
                </div>
                <CardTitle>Child Healthcare</CardTitle>
                <CardDescription>Care for children's health needs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Find pediatricians and resources specifically for child health, including vaccinations, developmental care, and common illness treatment.
                </p>
              </CardContent>
              <CardFooter>
                 {/* Updated Button with onClick handler for Maps search */}
                <Button
                    variant="outline"
                    className="w-full text-humqadam-teal border-humqadam-teal hover:bg-humqadam-teal hover:text-white transition-transform duration-200 hover:scale-105"
                    onClick={() => handleFindHealthcareClick('child')}
                >
                  <span>Find Child Healthcare</span>
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Healthcare Assistance - Content remains relevant */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Healthcare Assistance Programs"
            subtitle="Information on programs that can help with healthcare costs"
            alignment="center"
          />

          <div className="bg-white border rounded-lg p-6 shadow-sm mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-xl font-bold mb-4">Government Health Programs</h3>
                <ul className="space-y-4">
                  <li className="border-b pb-3 transition-colors duration-150 hover:bg-gray-100 rounded-md px-2 -mx-2">
                    <div className="flex items-center gap-2">
                      <Shield className="text-humqadam-teal" size={20} />
                      <span className="font-bold">Sehat Sahulat Program</span>
                    </div>
                    <p className="text-gray-600 mt-2">
                      Government health insurance program providing coverage to eligible families.
                    </p>
                  </li>
                  <li className="border-b pb-3 transition-colors duration-150 hover:bg-gray-100 rounded-md px-2 -mx-2">
                    <div className="flex items-center gap-2">
                      <Shield className="text-humqadam-teal" size={20} />
                      <span className="font-bold">BISP Health & Nutrition</span>
                    </div>
                    <p className="text-gray-600 mt-2">
                      Benazir Income Support Program includes healthcare support for eligible families.
                    </p>
                  </li>
                  <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -mx-2">
                    <div className="flex items-center gap-2">
                      <Shield className="text-humqadam-teal" size={20} />
                      <span className="font-bold">Zakat Health Assistance</span>
                    </div>
                    <p className="text-gray-600 mt-2">
                      Offers medical assistance to deserving individuals for various treatments.
                    </p>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl font-bold mb-4">Non-Governmental Support</h3>
                <ul className="space-y-4">
                  <li className="border-b pb-3 transition-colors duration-150 hover:bg-gray-100 rounded-md px-2 -mx-2">
                    <div className="flex items-center gap-2">
                      <Shield className="text-humqadam-teal" size={20} />
                      <span className="font-bold">Shaukat Khanum Hospital Programs</span>
                    </div>
                    <p className="text-gray-600 mt-2">
                      Financial assistance programs for cancer treatment and other services.
                    </p>
                  </li>
                  <li className="border-b pb-3 transition-colors duration-150 hover:bg-gray-100 rounded-md px-2 -mx-2">
                    <div className="flex items-center gap-2">
                      <Shield className="text-humqadam-teal" size={20} />
                      <span className="font-bold">Indus Hospital Network</span>
                    </div>
                    <p className="text-gray-600 mt-2">
                      Free quality healthcare services across multiple locations in Pakistan.
                    </p>
                  </li>
                  <li className="transition-colors duration-150 hover:bg-gray-100 rounded-sm px-2 -mx-2">
                    <div className="flex items-center gap-2">
                      <Shield className="text-humqadam-teal" size={20} />
                      <span className="font-bold">Pakistan Bait-ul-Mal</span>
                    </div>
                    <p className="text-gray-600 mt-2">
                      Offers medical assistance to deserving individuals for various treatments.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button className="bg-humqadam-teal hover:bg-humqadam-teal/90 transition-transform duration-200 hover:scale-105">
                Apply for Healthcare Assistance
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Health Education - Content remains relevant */}
      <section className="py-12 bg-humqadam-teal/10 rounded-lg mx-4 my-8">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Health Education Resources"
            subtitle="Educational materials to help you make informed health decisions"
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-left transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
              <h3 className="font-heading text-lg font-bold mb-3">Video Series</h3>
              <p className="text-gray-600 mb-4">
                Watch our educational video series covering various health topics in simple, easy-to-understand language.
              </p>
              <Button variant="outline" className="w-full text-humqadam-teal border-humqadam-teal hover:bg-humqadam-teal hover:text-white transition-transform duration-200 hover:scale-105">
                Watch Videos
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-left transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
              <h3 className="font-heading text-lg font-bold mb-3">Downloadable Guides</h3>
              <p className="text-gray-600 mb-4">
                Download comprehensive guides on health topics that you can read offline at your convenience.
              </p>
              <Button variant="outline" className="w-full text-humqadam-teal border-humqadam-teal hover:bg-humqadam-teal hover:text-white transition-transform duration-200 hover:scale-105">
                Download Guides
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-left transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
              <h3 className="font-heading text-lg font-bold mb-3">Audio Resources</h3>
              <p className="text-gray-600 mb-4">
                Listen to health information through our audio series, perfect for those who prefer listening over reading.
              </p>
              <Button variant="outline" className="w-full text-humqadam-teal border-humqadam-teal hover:bg-humqadam-teal hover:text-white transition-transform duration-200 hover:scale-105">
                Access Audio Resources
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Health;