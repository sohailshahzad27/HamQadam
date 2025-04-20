import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import SectionHeading from "@/components/ui/section-heading";
import ResourceCard from "@/components/ui/card-resource";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Briefcase, Users, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCommunityStore } from "@/stores/communityStore";

const diagonalStripes = {
  backgroundImage: `repeating-linear-gradient(
    45deg,
    transparent,
    transparent 25px,
    rgba(124, 58, 237, 0.08) 25px,
    rgba(124, 58, 237, 0.08) 50px
  )`,
  backgroundBlendMode: 'soft-light',
};

const Index = () => {
  const { announcements = {} } = useCommunityStore();
  const [recentAnnouncements, setRecentAnnouncements] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    try {
      if (!announcements || typeof announcements !== 'object') {
        setRecentAnnouncements([]);
        return;
      }

      const allAnnouncements = Object.values(announcements).flat();
      
      const sortedAnnouncements = allAnnouncements.sort((a, b) => {
        try {
          const dateA = a.date || '1970-01-01';
          const timeA = a.time || '00:00';
          const dateB = b.date || '1970-01-01';
          const timeB = b.time || '00:00';
          
          const dateTimeA = new Date(`${dateA} ${timeA}`);
          const dateTimeB = new Date(`${dateB} ${timeB}`);
          
          return dateTimeB.getTime() - dateTimeA.getTime();
        } catch (e) {
          return 0;
        }
      });

      setRecentAnnouncements(sortedAnnouncements.slice(0, 5));
    } catch (error) {
      console.error("Error processing announcements:", error);
      setRecentAnnouncements([]);
    }
  }, [announcements]);

  if (hasError) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      >
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h1>
          <p className="mb-6">We're having trouble loading the community page. Please try refreshing.</p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => window.location.reload()}
              className="bg-humqadam-purple hover:bg-humqadam-purple/90 text-white"
            >
              Refresh Page
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const cardVariants = {
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    initial: {
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="relative py-16 md:py-24 overflow-hidden"
        style={diagonalStripes}
      >
        {/* Animated background elements */}
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            transition: {
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
          className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-humqadam-purple/5 filter blur-3xl"
        />
        <motion.div 
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            transition: {
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              delay: 5
            }
          }}
          className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-humqadam-teal/5 filter blur-3xl"
        />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left content column */}
            <div>
              <motion.h1 
                variants={fadeIn}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                Building Stronger <span className="text-humqadam-purple">Communities</span> Together
              </motion.h1>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-700 text-xl mb-8"
              >
                Connect, share resources, and support your neighbors for a better community life
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                className="flex flex-wrap gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-humqadam-purple hover:bg-humqadam-purple/90 text-white"
                    asChild
                  >
                    <Link to="/communities">Explore Communities</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-humqadam-teal text-humqadam-teal hover:bg-hamqadam-purple hover:text-hamqadam-teal/90"
                    asChild
                  >
                    <Link to="/safety">Emergency Contacts</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Right image column */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl relative z-20 border-4 border-white"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <img
                  src="https://plus.unsplash.com/premium_vector-1727274000289-99ec6fa1f744?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Diverse community members together"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ed?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </motion.div>
              
              <motion.div 
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="absolute -bottom-10 -right-10 w-64 h-64 bg-humqadam-purple/10 rounded-full filter blur-3xl z-10"
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block z-30 border-l-4 border-humqadam-purple"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                }}
              >
                <p className="font-heading text-humqadam-purple font-bold">
                  "Our community platform has brought neighbors closer than ever before."
                </p>
                <p className="text-gray-600 text-sm mt-2">- Fatima, Lahore</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Resource Categories */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Community Resources"
            subtitle="Everything you need to connect and thrive in your neighborhood"
            alignment="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Safety & Security",
                description: "Neighborhood watch programs and emergency resources",
                icon: <Shield size={24} />,
                link: "/safety",
                color: "purple" as "purple"
              },
              {
                title: "Health & Wellness",
                description: "Local health services and wellness initiatives",
                icon: <Heart size={24} />,
                link: "/health",
                color: "teal" as "teal"
              },
              {
                title: "Local Businesses",
                description: "Support neighborhood entrepreneurs and services",
                icon: <Briefcase size={24} />,
                link: "/communities/businesses",
                color: "teal" as "teal"
              },
              {
                title: "Announcements",
                description: "Stay updated on important community news and updates",
                icon: <Bell size={24} />,
                link: "/communities/announcements",
                color: "pink" as "pink"
              }
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial="initial"
                whileHover="hover"
                variants={cardVariants}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <ResourceCard
                  title={resource.title}
                  description={resource.description}
                  icon={resource.icon}
                  link={resource.link}
                  color={resource.color}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-humqadam-light"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            title="How Our Community Platform Works"
            subtitle="Connecting neighbors and strengthening communities"
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                step: "1",
                title: "Discover",
                description: "Explore local resources, services, and community information",
                color: "purple"
              },
              {
                step: "2",
                title: "Connect",
                description: "Engage with neighbors and local organizations",
                color: "teal"
              },
              {
                step: "3",
                title: "Collaborate",
                description: "Work together to improve your neighborhood",
                color: "purple"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 bg-humqadam-${item.color}/10 text-humqadam-${item.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-humqadam-${item.color}/20`}>
                  <span className="font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gradient-to-r from-humqadam-purple/5 to-humqadam-teal/5"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            title="What Our Community Says"
            subtitle="Hear from your neighbors"
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                quote: "This platform helped me find local services I didn't know existed in our area.",
                author: "Ahmed, Karachi",
                delay: 0.1
              },
              {
                quote: "The safety features gave me peace of mind for my family. Highly recommend!",
                author: "Sana, Islamabad",
                delay: 0.3
              },
              {
                quote: "I've met so many wonderful neighbors through this community platform.",
                author: "Bilal, Lahore",
                delay: 0.5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: testimonial.delay }}
                className="bg-white p-6 rounded-lg shadow-md relative"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-humqadam-purple to-humqadam-teal"></div>
                <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                <p className="text-right font-medium text-humqadam-purple">— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </MainLayout>
  );
};

export default Index;