import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  Heart,
  HandCoins,
  Shield,
  BookOpen,
  Globe,
  Award,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

// Import framer-motion
import { motion } from "framer-motion";

// Assuming these Dialog components exist from your UI library (like Shadcn UI)
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; // Adjust path if needed

const AboutUs = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Community Building",
      description: "Connecting people all around to foster unity and brotherhood.",
    },
    {
      icon: <HandCoins className="h-8 w-8 text-green-600" />,
      title: "BaitulMaal",
      description: "Transparent charity system to support those in need.",
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Safety Network",
      description: "Ensuring the security and well-being of our community members.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Islamic Resources",
      description: "Access to authentic Islamic knowledge and learning materials.",
    },
    {
      icon: <Globe className="h-8 w-8 text-teal-600" />,
      title: "Global Reach",
      description: "Serving People across different Areas and cultures.",
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: "Excellence",
      description: "Committed to providing the highest quality services.",
    },
  ];

  const teamMembers = [
    {
      name: "Sohail Shahzad",
      role: "Founder & CEO",
      bio: "Visionary leader passionate about leveraging technology for social good.",
      // Placeholder for image/avatar - add if you have them
      // avatar: "/images/sohail.jpg"
    },
    {
      name: "Qasim Asghar",
      role: "Head of Charity & Co-Founder",
      bio: "Dedicated to humanitarian efforts and ensuring aid reaches those who need it most.",
      // avatar: "/images/qasim.jpg"
    },
    {
      name: "Hasnat Nawaz",
      role: "Tech Lead & Finance Manager",
      bio: "Building robust platforms and managing resources efficiently for maximum impact.",
      // avatar: "/images/hasnat.jpg"
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Add a slight delay between children animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideInFromTop = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const slideInFromBottom = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };


  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {" "}
        {/* Add overflow-hidden to prevent scrollbar during animations */}
        <div className="max-w-7xl mx-auto">
          {/* Hero Section - Animated */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-500 mb-4"
              variants={slideInFromTop}
            >
              About HumQadam
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              variants={slideInFromBottom}
            >
              Empowering the community through technology, charity, and unity.
            </motion.p>
          </motion.div>

          {/* Our Story Section - New & Animated */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Our Story</h2>
            <motion.p className="text-gray-600" variants={itemVariants}>
              HumQadam was founded on the principle of leveraging modern technology to serve the timeless values of community, compassion, and mutual support within the Muslim Ummah and beyond. What started as a simple idea among a few like-minded individuals has grown into a dedicated effort to build a comprehensive digital platform. We saw a need for a centralized space where members of the community could connect, contribute to meaningful causes, access reliable knowledge, and feel secure. Our journey is one of continuous development, driven by our commitment to transparency, efficiency, and the betterment of society.
            </motion.p>
             {/* Optional: Add an image here */}
             {/* <motion.img src="/images/our-story.jpg" alt="Our Story" className="mt-6 rounded-md shadow-sm" variants={itemVariants} /> */}
          </motion.div>

          {/* Mission Section - Animated */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 mb-16 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleUp} // Example of a different animation
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full opacity-20"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-100 rounded-full opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <motion.p className="text-gray-600 mb-6" variants={fadeIn}>
                At HumQadam, we strive to create a platform that serves as a comprehensive hub for people all around.
                Our mission is to facilitate community building, charitable giving, knowledge sharing, and safety
                through innovative technology solutions.
              </motion.p>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={containerVariants} // Apply container variants for staggered children
              >
                <motion.div className="bg-purple-50 p-6 rounded-lg" variants={itemVariants}>
                  <h3 className="font-semibold text-purple-700 mb-3">Vision</h3>
                  <p className="text-gray-600">
                    To be the leading digital platform that unites and empowers the global community.
                  </p>
                </motion.div>
                <motion.div className="bg-teal-50 p-6 rounded-lg" variants={itemVariants}>
                  <h3 className="font-semibold text-teal-700 mb-3">Values</h3>
                  <p className="text-gray-600">
                    Integrity, Compassion, Unity, Innovation, and Service to humanity.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

           {/* Impact/Stats Section - New & Animated */}
           <motion.div
            className="mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInFromBottom}
           >
             <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Impact</h2>
             <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants}>
                <motion.div className="bg-white p-6 rounded-xl shadow-md" variants={itemVariants}>
                   <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
                   <p className="text-gray-600">Community Members</p>
                </motion.div>
                <motion.div className="bg-white p-6 rounded-xl shadow-md" variants={itemVariants}>
                   <div className="text-4xl font-bold text-green-600 mb-2">$50K+</div>
                   <p className="text-gray-600">Donations Facilitated</p>
                </motion.div>
                <motion.div className="bg-white p-6 rounded-xl shadow-md" variants={itemVariants}>
                   <div className="text-4xl font-bold text-teal-600 mb-2">500+</div>
                   <p className="text-gray-600">Resources Shared</p>
                </motion.div>
             </motion.div>
           </motion.div>


          {/* Features Section - Animated */}
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
            variants={containerVariants} // Apply container variants for staggered children
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">Our Features</h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                  variants={itemVariants} // Apply item variants to each feature card
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Team Section - Animated */}
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
            variants={containerVariants} // Apply container variants for staggered children
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">Our Team</h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants}>
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                  variants={itemVariants} // Apply item variants to each team card
                >
                  {/* Replace with actual image if available */}
                  {/* {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  ) : ( */}
                    <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center text-purple-600 text-2xl font-bold">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  {/* )} */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-purple-600 mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm italic">{member.bio}</p> {/* Made bio slightly smaller and italic */}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Section - Animated & Contact Button Modified */}
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-teal-500 rounded-xl p-8 text-center text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={scaleUp}
          >
            <motion.h2 className="text-2xl font-bold mb-4" variants={fadeIn}>
              Join Our Community Today
            </motion.h2>
            <motion.p className="mb-6 max-w-2xl mx-auto" variants={fadeIn}>
              Be part of a growing network of Muslims working together to make a difference.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row justify-center gap-4" variants={containerVariants}>
              <motion.div variants={itemVariants}> {/* Wrap buttons for individual animation */}
                 <Button asChild variant="secondary" size="lg">
                   <Link to="/register">Sign Up Now</Link>
                 </Button>
              </motion.div>
              <motion.div variants={itemVariants}> {/* Wrap buttons for individual animation */}
                {/* Wrap the Dialog and its contents here */}
                <Dialog> {/* <-- Dialog wrapping the trigger and content */}
                    {/* Dialog Trigger Button */}
                    <DialogTrigger asChild>
                      <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white/20 hover:text-white">
                        Contact Us
                      </Button>
                    </DialogTrigger>

                    {/* Dialog Content goes here, still inside Dialog */}
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Get in Touch</DialogTitle>
                        <DialogDescription>
                          Here's how you can reach us.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-purple-600" />
                          <span>info@humqadam.example.com</span> {/* Dummy Email */}
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-teal-600" />
                          <span>+1 (123) 456-7890</span> {/* Dummy Phone */}
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-red-600" />
                          <span>123 Community Way, Empowerment City, Global 12345</span> {/* Dummy Address */}
                        </div>
                        <div className="flex items-center gap-3 mt-2"> {/* Added margin-top */}
                            {/* Dummy Social Links */}
                            <a href="#" className="text-blue-600 hover:opacity-80"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="text-blue-400 hover:opacity-80"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-pink-600 hover:opacity-80"><Instagram className="h-5 w-5" /></a>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                </Dialog> {/* <-- Dialog ends here */}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Removed the extra Dialog component that was outside the CTA */}
          {/* <Dialog> ... </Dialog>  <-- DELETE THIS */}

        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;