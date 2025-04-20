import React, { useState, useEffect, useRef, useCallback } from "react";
import MainLayout from "@/components/layout/MainLayout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { PhoneCall, MapPin, AlertCircle, Bookmark, Share2, ChevronDown, ChevronUp, AlertTriangle, HeartPulse, Shield, Smartphone, Home, Users, Bandage, Search, X, MessageSquare } from "lucide-react"; // Added Search, X, MessageSquare
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion"; // Added for animations
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Safety = () => {
  const [activeTab, setActiveTab] = useState("emergency");
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [emergencyType, setEmergencyType] = useState("");
  const [safetyScore, setSafetyScore] = useState(0);
  const [showCityTip, setShowCityTip] = useState(false);
  const [showHelplines, setShowHelplines] = useState(false); // State for helpline expansion
  const [showLocalSearch, setShowLocalSearch] = useState(false); // State for local search expansion/animation
  const { toast } = useToast();
  const navigate = useNavigate(); // Initialize navigate hook

  // List of major cities in Pakistan for the dropdown
  const pakistanCities = [
    "Select your city...",
    "Islamabad",
    "Lahore",
    "Karachi",
    "Peshawar",
    "Quetta",
    "Faisalabad",
    "Rawalpindi",
    "Multan",
    "Hyderabad",
    "Gujranwala",
    "Sialkot",
  ];

  // Calculate safety score based on user inputs (simplified for threshold testing)
  // Score will be between 0 and 70 based on selections, plus a small random factor
  useEffect(() => {
    const cityScore = (selectedCity && selectedCity !== "Select your city...") ? 30 : 0;
    const typeScore = emergencyType ? 30 : 0;
    // Add a small random factor to make it less predictable but still within a range
    const randomFactor = Math.floor(Math.random() * 10); // Adds 0-9
    setSafetyScore(Math.min(cityScore + typeScore + randomFactor, 100)); // Ensure score doesn't exceed 100
  }, [selectedCity, emergencyType]);


  const handleCardExpand = (id) => {
    // Only allow one card to be expanded at a time
    setExpandedCard(prevExpandedCard => (prevExpandedCard === id ? null : id));
  };

  const handleEmergencyClick = (number, name) => {
    toast({
      title: `Calling ${name || 'Emergency'}...`,
      description: `Dialing ${number}`,
      action: (
        <Button variant="outline" size="sm" onClick={() => window.location.href = `tel:${number}`}>
          Call Now
        </Button>
      ),
    });
    console.log(`Calling ${number}`);
  };

  // Function to handle chatbot button click and navigation
  const handleChatbotClick = () => {
      // Navigate only if the safety score is 70% or below
      if (safetyScore <= 70) {
          console.log("Navigating to Muhafiz Chatbot...");
          navigate('/Muhafiz'); // Navigate to the Muhafiz chatbot page
      } else {
          console.log("Safety score is above 70%. Chatbot button is disabled.");
          // Optionally show a toast or message indicating why it's disabled
          toast({
              title: "Chatbot Disabled",
              description: "The Muhafiz chatbot is available when your safety score is 70% or below.",
              variant: "default" // Or "warning"
          });
      }
  };

  // Toggle helpline visibility
  const toggleHelplines = () => {
    setShowHelplines(!showHelplines);
    if (showLocalSearch) setShowLocalSearch(false); // Close local search if opening helplines
  };

  // Toggle local search visibility
  const toggleLocalSearch = () => {
    setShowLocalSearch(!showLocalSearch);
    if (showHelplines) setShowHelplines(false); // Close helplines if opening local search
  };

  // Define Pakistan Helplines
   const pakistanHelplines = [
        { name: "Police", number: "15", icon: <Shield size={18} className="text-blue-600" /> },
        { name: "Rescue (Ambulance, Fire)", number: "1122", icon: <HeartPulse size={18} className="text-red-600" /> },
        { name: "Emergency Helpline", number: "911", icon: <AlertTriangle size={18} className="text-orange-500" /> }, // Example, might vary
        { name: "Counter Terrorism Dept.", number: "1133", icon: <Shield size={18} className="text-black" /> }, // Example
        { name: "Women's Helpline", number: "1099", icon: <Users size={18} className="text-pink-600" /> },
        { name: "Child Protection", number: "1121", icon: <Users size={18} className="text-green-600" /> }, // Assuming 1121 covers child protection
    ];

  // Emergency Contacts (used in the card section)
  const emergencyContacts = [
    { id: 1, name: "Police Emergency", number: "15", description: "Available 24/7 nationwide", icon: <Shield className="text-red-600" /> },
    { id: 2, name: "Women's Helpline", number: "1099", description: "National Commission Status of Women", icon: <Users className="text-red-600" /> },
    { id: 3, name: "Rescue Service (Ambulance/Fire)", number: "1122", description: "Emergency medical & rescue services", icon: <HeartPulse className="text-red-600" /> },
    { id: 4, name: "Child Protection", number: "1121", description: "Report child abuse or concerns", icon: <AlertTriangle className="text-red-600" /> },
    { id: 5, name: "Crisis Text Line", number: "Text HELP to 9090", description: "When you can't make a call", icon: <Smartphone className="text-red-600" /> },
    { id: 6, name: "Domestic Violence Support", number: "0800-13518", description: "Confidential support for victims", icon: <Home className="text-red-600" /> },
  ];

  const safetyTips = [
    {
      category: "At Home",
      description: "Safety measures for your residence",
      icon: <Home className="text-humqadam-purple" />,
      tips: [
        "Install strong locks on doors and windows",
        "Keep emergency contacts easily accessible",
        "Have a safety plan for emergencies",
        "Ensure children know emergency procedures",
        "Consider a security system if possible",
        "Inform trusted neighbors if you feel unsafe"
      ]
    },
    {
      category: "In Public",
      description: "Staying safe in public spaces",
      icon: <MapPin className="text-humqadam-purple" />,
      tips: [
        "Stay aware of your surroundings at all times",
        "Avoid isolated or poorly lit areas at night",
        "Keep family informed about your whereabouts",
        "Use well-populated transport options",
        "Keep your phone charged and accessible",
        "Consider traveling in groups when possible"
      ]
    },
    {
      category: "Online Safety",
      description: "Protecting yourself in digital spaces",
      icon: <Smartphone className="text-humqadam-purple" />,
      tips: [
        "Use strong, unique passwords for accounts",
        "Be cautious about sharing personal information",
        "Check privacy settings on social media",
        "Be wary of unknown contacts or messages",
        "Learn to recognize online harassment",
        "Set boundaries for children's online activities"
      ]
    },
    {
      category: "Emergency Prep",
      description: "Being ready for unexpected situations",
      icon: <Bandage className="text-humqadam-purple" />,
      tips: [
        "Create an emergency kit with essentials",
        "Establish family meeting points",
        "Keep copies of important documents",
        "Learn basic first aid skills",
        "Practice emergency evacuation plans",
        "Maintain an emergency fund if possible"
      ]
    }
  ];

  // Basic function to get city-specific info (can be expanded)
  const getCitySpecificInfo = (city) => {
    switch (city) {
      case "Islamabad":
        return "Check the 'Islamabad Support Services' tab below for local resources.";
      case "Lahore":
        return "Check the 'Lahore Support Services' tab below for local resources.";
      case "Karachi":
        return "Check the 'Karachi Support Services' tab below for local resources.";
      case "Peshawar":
          return "Check the 'Peshawar Support Services' tab below for local resources.";
      case "Quetta":
          return "Check the 'Quetta Support Services' tab below for local resources.";
      default:
        return "Select a city for specific local information.";
    }
  };


  return (
    <MainLayout>
      {/* Interactive Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-200 to-purple-300 py-16 text-humqadam-purple-dark">
        <div className="absolute inset-0 opacity-20">
          {/* Optional background pattern */}
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight text-humqadam-purple-dark">
              Safety & Emergency Resources
            </h1>
            <p className="text-humqadam-purple-dark/90 text-lg mb-6">
              Critical information, helplines, and support services for emergency situations across Pakistan.
              <span className="block mt-2 font-medium">Your safety matters to us.</span>
            </p>

            {/* --- Interactive Buttons --- */}
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              {/* Emergency Helplines Button */}
              <Button
                className="bg-red-600 hover:bg-red-700 flex items-center gap-2 shadow-lg hover:shadow-red-500/30 transition-all text-white"
                onClick={toggleHelplines}
              >
                <PhoneCall size={18} />
                <span>Emergency Helplines</span>
                 {showHelplines ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>

              {/* Find Local Support Button */}
              <Button
                variant="outline"
                className="border-humqadam-purple-dark text-humqadam-purple-dark hover:bg-humqadam-purple hover:text-white flex items-center gap-2"
                onClick={toggleLocalSearch}
              >
                <MapPin size={18} />
                <span>Find Local Support</span>
                {showLocalSearch ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>

             {/* --- Expanded Sections --- */}
              <AnimatePresence>
                {/* Expanded Helplines Section */}
                {showHelplines && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-red-200 text-left max-w-2xl mx-auto"
                    >
                        <h3 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2"><PhoneCall size={20}/> Pakistan Emergency Helplines</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {pakistanHelplines.map((helpline, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-md border border-red-100">
                                    <div className="flex items-center gap-3">
                                        {helpline.icon}
                                        <div>
                                            <span className="font-medium text-humqadam-purple-dark">{helpline.name}</span>
                                            <p className="text-lg font-bold text-red-600">{helpline.number}</p>
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-600 hover:bg-red-100"
                                        onClick={() => handleEmergencyClick(helpline.number, helpline.name)}
                                     >
                                        Call
                                     </Button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Expanded Local Search Section - Enhanced Animation */}
                {showLocalSearch && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-humqadam-purple-dark/30 text-left max-w-2xl mx-auto"
                  >
                    <div className="flex justify-between items-center mb-4">
                       <h3 className="text-xl font-semibold text-humqadam-purple-dark flex items-center gap-2"><Search size={20}/> Finding Local Support...</h3>
                       <Button variant="ghost" size="icon" onClick={toggleLocalSearch} className="text-gray-500 hover:text-gray-800">
                           <X size={20} />
                       </Button>
                    </div>
                    <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-humqadam-purple/30 rounded-md p-4 relative"> {/* Added relative positioning */}
                      {/* Radar Dish Animation */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        // Updated border colors for green radar sweep
                        className="w-16 h-16 border-4 border-t-green-500 border-r-transparent border-b-transparent border-l-transparent rounded-full mb-4"
                      ></motion.div>

                      {/* Expanding Signal Rings */}
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="absolute w-20 h-20 border-2 border-green-500 rounded-full"
                          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} // Center the rings
                          animate={{ scale: [0.5, 2], opacity: [1, 0] }} // Scale up and fade out
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear",
                            delay: i * 0.5 // Stagger the animations
                          }}
                        />
                      ))}

                      {/* Removed placeholder text */}
                    </div>
                    <Button variant="outline" className="w-full mt-4" onClick={toggleLocalSearch}>
                      Cancel Search
                    </Button>
                  </motion.div>
                )}
            </AnimatePresence>
            {/* --- End Expanded Sections --- */}

          </div>
        </div>
      </section>

      {/* Safety Assessment Tool */}
      <section className="py-12 bg-humqadam-light">
        <div className="container mx-auto px-4">
          <Card className="border-humqadam-purple shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="p-6 md:p-8 bg-gradient-to-br from-humqadam-purple to-humqadam-purple-dark text-white md:w-1/3">
                <h2 className="font-heading text-2xl font-bold mb-2">Safety Checkup</h2>
                <p className="opacity-90 mb-6">Take a moment to assess your safety preparedness</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium">Your Safety Score</span>
                  <span className="text-xl font-bold">{safetyScore}%</span>
                </div>
                <Progress value={safetyScore} className="h-2 bg-white/20 [&>div]:bg-yellow-300" />
                <p className="text-xs mt-3 opacity-80">
                  {safetyScore < 40 ? "Let's focus on improving your safety measures." :
                   safetyScore <= 70 ? "Your safety score is 70% or below. The chatbot is available to help!" : // Message for score <= 70
                   "Excellent! Your safety score is above 70%. Review tips to enhance safety."} {/* Message for score > 70 */}
                </p>
              </div>
              <div className="p-6 md:p-8 md:w-2/3">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="city-select" className="block text-sm font-medium mb-1">Your City</label>
                    <select
                       id="city-select"
                       className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                       value={selectedCity}
                       onChange={(e) => {
                          setSelectedCity(e.target.value);
                          setShowCityTip(false); // Hide tip when inputs change
                       }}
                    >
                      {pakistanCities.map((city, index) => (
                         <option key={index} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="concern-select" className="block text-sm font-medium mb-1">Primary Safety Concern</label>
                    <select
                      id="concern-select"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                       value={emergencyType}
                      onChange={(e) => {
                          setEmergencyType(e.target.value);
                          setShowCityTip(false); // Hide tip when inputs change
                      }}
                    >
                      <option value="">Select concern...</option>
                      <option value="personal">Personal Safety</option>
                      <option value="family">Family Safety</option>
                      <option value="cyber">Cyber Security</option>
                      <option value="health">Health Emergency</option>
                      <option value="natural">Natural Disasters</option>
                      <option value="harassment">Harassment/Violence</option>
                      <option value="theft">Theft/Burglary</option>
                    </select>
                  </div>
                  {/* --- Muhaafiz Chatbot Button --- */}
                  {/* Removed Link component */}
                  <Button
                     className="w-full bg-humqadam-purple hover:bg-humqadam-purple-dark flex items-center gap-2" // Added flex properties
                     onClick={handleChatbotClick} // Call the new handler
                     // Button is disabled if inputs are not selected OR safety score is ABOVE 70
                     disabled={!selectedCity || selectedCity === "Select your city..." || !emergencyType || safetyScore > 70}
                  >
                    <MessageSquare size={18} /> {/* Added Chatbot Icon */}
                    Muhaafiz (Chatbot)
                  </Button>
                  {/* Optional: Show a message if the button is disabled due to score */}
                   {(!selectedCity || selectedCity === "Select your city..." || !emergencyType) && (
                       <p className="text-sm text-gray-500 mt-2">Select your city and primary safety concern to enable the chatbot.</p>
                   )}
                   {(selectedCity && selectedCity !== "Select your city..." && emergencyType && safetyScore > 70) && (
                        <p className="text-sm text-gray-500 mt-2">Your safety score is above 70%. The chatbot is disabled.</p>
                   )}


                  {/* City tip section - Keep separate from chatbot button logic */}
                  {showCityTip && selectedCity && selectedCity !== "Select your city..." && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-800">
                          <p className="font-medium">Based on your city ({selectedCity}):</p>
                          <p>{getCitySpecificInfo(selectedCity)}</p>
                      </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Emergency Contacts - Individual Card Expansion */}
      <section className="py-12" id="emergency-cards"> {/* Changed id to avoid conflict */}
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Emergency Contacts"
            subtitle="Save these numbers for immediate assistance during emergencies"
            alignment="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact) => (
              <Card
                key={contact.id}
                className={`border-red-100 bg-gradient-to-b from-red-50 to-white hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden ${expandedCard === contact.id ? 'ring-2 ring-red-300 shadow-lg' : 'shadow-sm'}`}
                onClick={() => handleCardExpand(contact.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        {contact.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{contact.name}</CardTitle>
                        <CardDescription className="text-sm">{contact.description}</CardDescription>
                      </div>
                    </div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        {expandedCard === contact.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                     </Button>
                  </div>
                </CardHeader>

                {/* Conditionally rendered content with animation */}
                <AnimatePresence>
                  {expandedCard === contact.id && (
                    <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       transition={{ duration: 0.3 }}
                       style={{ overflow: 'hidden' }} // Important for smooth animation
                     >
                      <CardContent className="pt-0">
                        <div className="bg-white p-4 rounded-lg border border-red-100 mt-2">
                          <p className="text-3xl font-bold text-red-600 font-heading text-center">{contact.number}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-3 text-center">
                          {contact.description}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between gap-2 pt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card collapse when clicking button
                            handleEmergencyClick(contact.number.replace(/[^0-9]/g, ''), contact.name);
                          }}
                        >
                          <PhoneCall size={16} className="mr-2" /> Call Now
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={(e) => e.stopPropagation()}>
                          <Share2 size={16} className="mr-2" /> Share
                        </Button>
                      </CardFooter>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Support - Updated for General Audience */}
      <section className="py-12 bg-humqadam-light/50" id="regional">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Regional Support Services" // Title is already general
            subtitle="Find local resources and support for everyone in your area" // Updated subtitle
            alignment="left"
          />

          <Tabs defaultValue="islamabad" className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
            <ScrollArea className="w-full whitespace-nowrap border-b">
              <TabsList className="grid w-full grid-cols-5 mb-0 bg-gray-50"> {/* Adjust grid-cols if adding more cities */}
                <TabsTrigger value="islamabad" className="py-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <span className="block font-medium">Islamabad</span>
                  <span className="block text-xs text-gray-500 mt-1">Capital</span>
                </TabsTrigger>
                 <TabsTrigger value="lahore" className="py-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <span className="block font-medium">Lahore</span>
                  <span className="block text-xs text-gray-500 mt-1">Punjab</span>
                </TabsTrigger>
                <TabsTrigger value="karachi" className="py-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <span className="block font-medium">Karachi</span>
                  <span className="block text-xs text-gray-500 mt-1">Sindh</span>
                </TabsTrigger>
                <TabsTrigger value="peshawar" className="py-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <span className="block font-medium">Peshawar</span>
                  <span className="block text-xs text-gray-500 mt-1">KP</span>
                </TabsTrigger>
                <TabsTrigger value="quetta" className="py-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <span className="block font-medium">Quetta</span>
                  <span className="block text-xs text-gray-500 mt-1">Balochistan</span>
                </TabsTrigger>
              </TabsList>
            </ScrollArea>

            {/* Tab Content for Cities - Generalized */}
            <TabsContent value="islamabad" className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-humqadam-purple" size={20} />
                <span>Islamabad Support Services</span>
              </h3>
              <div className="space-y-4">
                 <div className="border-b pb-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <Shield size={16} className="text-humqadam-purple" />
                    General Crisis Center {/* Generalized Name */}
                  </h4>
                  <p className="text-gray-600 mt-1 ml-6">Address: H-8/2, Near PIMS Hospital, Islamabad</p>
                  <p className="text-gray-600 mt-1 ml-6">Phone: 051-9260636 (Verify service scope)</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <Users size={16} className="text-humqadam-purple" />
                    Community Police Station {/* Generalized Name */}
                  </h4>
                  <p className="text-gray-600 mt-1 ml-6">Address: F-8 Markaz, Islamabad</p>
                  <p className="text-gray-600 mt-1 ml-6">Phone: 051-9261692</p>
                </div>
                 <div className="border-b pb-4">
                   <h4 className="font-bold flex items-center gap-2">
                     <AlertTriangle size={16} className="text-humqadam-purple" />
                     Child Protection Bureau {/* Added Example */}
                   </h4>
                   <p className="text-gray-600 mt-1 ml-6">Address: (Example Address), Islamabad</p>
                   <p className="text-gray-600 mt-1 ml-6">Phone: 1121 (National Helpline)</p>
                 </div>
                <div>
                  <h4 className="font-bold flex items-center gap-2">
                    <Home size={16} className="text-humqadam-purple" />
                     Shelter Home (Dar-ul-Aman) {/* Keeping as is, often general */}
                  </h4>
                  <p className="text-gray-600 mt-1 ml-6">Address: Sector G-7, Islamabad</p>
                  <p className="text-gray-600 mt-1 ml-6">Phone: 051-2212211</p>
                </div>
               </div>
            </TabsContent>

            {/* Placeholder Content for other cities - Needs specific, generalized info */}
            <TabsContent value="lahore" className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-humqadam-purple" size={20} />
                <span>Lahore Support Services</span>
              </h3>
              <div className="space-y-4">
                {/* Add generalized resources for Lahore here */}
                <p className="text-gray-500">Placeholder: Add general support services, child protection centers, and community resources for Lahore.</p>
              </div>
            </TabsContent>

            <TabsContent value="karachi" className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-humqadam-purple" size={20} />
                <span>Karachi Support Services</span>
              </h3>
              <div className="space-y-4">
                {/* Add generalized resources for Karachi here */}
                 <p className="text-gray-500">Placeholder: Add general support services, child protection centers, and community resources for Karachi.</p>
              </div>
            </TabsContent>

            <TabsContent value="peshawar" className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-humqadam-purple" size={20} />
                <span>Peshawar Support Services</span>
              </h3>
              <div className="space-y-4">
                {/* Add generalized resources for Peshawar here */}
                 <p className="text-gray-500">Placeholder: Add general support services, child protection centers, and community resources for Peshawar.</p>
              </div>
            </TabsContent>

            <TabsContent value="quetta" className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-humqadam-purple" size={20} />
                <span>Quetta Support Services</span>
              </h3>
              <div className="space-y-4">
                {/* Add generalized resources for Quetta here */}
                <p className="text-gray-500">Placeholder: Add general support services, child protection centers, and community resources for Quetta.</p>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </section>

      {/* Interactive Safety Tips */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Personal Safety Tips"
            subtitle="Practical advice to help keep you and your loved ones safe"
            alignment="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyTips.map((tip, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-humqadam-purple/10 rounded-full">
                      {tip.icon}
                    </div>
                    <div>
                      <CardTitle>{tip.category}</CardTitle>
                      <CardDescription>{tip.description}</CardDescription>
                    </div>
                  </div>
                 </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tip.tips.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                         <span className="inline-block mt-1 h-2 w-2 rounded-full bg-humqadam-purple flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                   </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Preparedness Checklist */}
      <section className="py-12 bg-humqadam-light">
        <div className="container mx-auto px-4">
          <Card className="border-humqadam-purple overflow-hidden">
            <div className="md:flex">
              <div className="p-6 md:p-8 bg-humqadam-purple text-white md:w-1/3">
                <h2 className="font-heading text-2xl font-bold mb-2">Emergency Preparedness Checklist</h2>
                <p className="opacity-90 mb-6">Essential items every Pakistani household should have</p>
                 <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                  <span className="text-sm">Start with the basics</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                   <div className="w-3 h-3 rounded-full bg-green-300"></div>
                  <span className="text-sm">Advanced preparedness</span>
                </div>
              </div>
              <div className="p-6 md:p-8 md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="water" className="mt-1" />
                    <label htmlFor="water" className="flex-1">
                      <span className="font-medium">Drinking water</span>
                      <span className="block text-sm text-gray-600">3-day supply (3 liters per person per day)</span>
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                     <input type="checkbox" id="food" className="mt-1" />
                    <label htmlFor="food" className="flex-1">
                      <span className="font-medium">Non-perishable food</span>
                      <span className="block text-sm text-gray-600">3-day supply (ready-to-eat)</span>
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="meds" className="mt-1" />
                    <label htmlFor="meds" className="flex-1">
                       <span className="font-medium">Essential medications</span>
                      <span className="block text-sm text-gray-600">7-day supply</span>
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                     <input type="checkbox" id="firstaid" className="mt-1" />
                    <label htmlFor="firstaid" className="flex-1">
                      <span className="font-medium">First aid kit</span>
                      <span className="block text-sm text-gray-600">With basic supplies</span>
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="documents" className="mt-1" />
                    <label htmlFor="documents" className="flex-1">
                       <span className="font-medium">Important documents</span>
                      <span className="block text-sm text-gray-600">Copies in waterproof bag</span>
                    </label>
                  </div>
                   <div className="flex items-start gap-3">
                    <input type="checkbox" id="light" className="mt-1" />
                    <label htmlFor="light" className="flex-1">
                      <span className="font-medium">Flashlight & batteries</span>
                      <span className="block text-sm text-gray-600">Or solar-powered light</span>
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="radio" className="mt-1" />
                     <label htmlFor="radio" className="flex-1">
                      <span className="font-medium">Battery-powered radio</span>
                      <span className="block text-sm text-gray-600">For emergency updates</span>
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="cash" className="mt-1" />
                    <label htmlFor="cash" className="flex-1">
                      <span className="font-medium">Emergency cash</span>
                       <span className="block text-sm text-gray-600">Small denominations</span>
                    </label>
                  </div>
                </div>
                <Button className="mt-6 w-full bg-humqadam-purple hover:bg-humqadam-purple-dark">
                   Download Complete Checklist
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Download Resources */}
      <section className="py-12 bg-gradient-to-br from-humqadam-purple/5 to-humqadam-purple/20 rounded-xl mx-4 my-8">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
             title="Downloadable Resources"
            subtitle="Access these materials offline for when you need them most"
            alignment="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
             <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto p-3 bg-red-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <AlertTriangle className="text-red-600" size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-2">Emergency Contact Card</CardTitle>
                <CardDescription>All critical numbers in one printable card</CardDescription>
              </CardContent>
              <CardFooter>
                 <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                 <div className="mx-auto p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <Shield className="text-blue-600" size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-2">Safety Planning Guide</CardTitle>
                <CardDescription>Step-by-step safety planning for families</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download PDF
                 </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto p-3 bg-green-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <Users className="text-green-600" size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-2">Children's Safety Toolkit</CardTitle>
                <CardDescription>Age-appropriate safety lessons for kids</CardDescription>
              </CardContent>
               <CardFooter>
                <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
              </CardFooter>
            </Card>
           </div>
        </div>
      </section>

      {/* Emergency Quick Action Panel (Fixed at bottom on mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t md:hidden z-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-around"> {/* Changed to justify-around for better spacing */}
             <Button
              variant="ghost"
              size="sm"
              className="text-red-600 flex flex-col items-center h-auto p-1" // Adjusted padding/height
              onClick={() => handleEmergencyClick("15", "Police")}
            >
              <PhoneCall size={18} />
               <span className="text-xs mt-1">Police</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 flex flex-col items-center h-auto p-1"
              onClick={() => handleEmergencyClick("1122", "Rescue")}
             >
              <HeartPulse size={18} />
              <span className="text-xs mt-1">Rescue</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 flex flex-col items-center h-auto p-1"
              onClick={() => handleEmergencyClick("1099", "Women Helpline")} // Specify name
            >
              <Users size={18} />
              <span className="text-xs mt-1">Women</span>
            </Button>
             <Button
                variant="ghost"
                size="sm"
                className="text-red-600 flex flex-col items-center h-auto p-1"
                onClick={() => handleEmergencyClick("1121", "Child Protection")} // Specify name
             >
                <AlertTriangle size={18} /> {/* Changed icon */}
                <span className="text-xs mt-1">Child</span>
             </Button>
            <Button
               variant="ghost"
              size="sm"
              className="text-humqadam-purple flex flex-col items-center h-auto p-1" // Changed color
              onClick={() => {
                  const regionalSection = document.getElementById('regional');
                  if (regionalSection) {
                      regionalSection.scrollIntoView({ behavior: 'smooth' });
                  }
                  setActiveTab("regional"); // Also set tab if needed
              }}
            >
              <MapPin size={18} />
              <span className="text-xs mt-1">Local Help</span>
             </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Safety;
