"use client";

import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, PlusCircle, MapPin, Clock, ThumbsUp, Users, Search, Trash2, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface Reaction {
  userId: string;
  type: 'like' | 'love' | 'support';
}

interface Story {
  id: number;
  name: string;
  location: string;
  content: string;
  imageUrl: string;
  category: string;
  date: string;
  isUserStory: boolean;
  reactions: Reaction[];
  comments: Comment[];
}

const Stories = () => {
  const currentUserId = "user_" + Math.random().toString(36).substr(2, 9);
  const [expandedStory, setExpandedStory] = useState<Story | null>(null);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [showAddStoryForm, setShowAddStoryForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [newComment, setNewComment] = useState("");
  const [viewComments, setViewComments] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newStoryText, setNewStoryText] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newCategory, setNewCategory] = useState("Personal Growth");

  // Generate random number between min and max
  const getRandomNumber = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Generate 50 unique users for comments and reactions
  const generateUsers = (count: number) => {
    const users = [];
    const maleNames = [
      "Ahmed", "Ali", "Usman", "Bilal", "Omar", "Haris", "Saad", "Zubair", 
      "Faisal", "Kashif", "Nabeel", "Tariq", "Waqar", "Yasir", "Zahid"
    ];
    const femaleNames = [
      "Fatima", "Ayesha", "Hina", "Khadija", "Nadia", "Rabia", "Uzma", 
      "Yasmin", "Amina", "Gulnaz", "Lubna", "Parveen", "Rukhsana", "Sara", "Zainab"
    ];
    const lastNames = [
      "Khan", "Ali", "Malik", "Ahmed", "Shah", "Hassan", "Iqbal", 
      "Akhtar", "Farooq", "Javed", "Asif", "Chaudhry", "Mohammad", "Siddiqui"
    ];

    for (let i = 0; i < count; i++) {
      const isMale = i % 2 === 0;
      const firstName = isMale 
        ? maleNames[Math.floor(Math.random() * maleNames.length)]
        : femaleNames[Math.floor(Math.random() * femaleNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      users.push({
        name: `${firstName} ${lastName}`,
        avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
      });
    }
    return users;
  };

  const users = generateUsers(50);

  // Generate random comments
  const generateRandomComments = (count: number): Comment[] => {
    const comments: Comment[] = [];
    const messages = [
      "This is so inspiring! Mashallah!",
      "Keep up the good work! Allah bless you.",
      "I went through something similar in Pakistan.",
      "Thank you for sharing your experience.",
      "This gives me hope for our country!",
      "Amazing journey! Pakistan Zindabad!",
      "You're an inspiration to us all.",
      "SubhanAllah, what a story!",
      "May Allah reward you for your efforts.",
      "This is the Pakistan we need to see!",
      "Your story touched my heart.",
      "JazakAllah for sharing this.",
      "We need more people like you in Pakistan.",
      "This is the true spirit of Pakistan!",
      "Allah has blessed you indeed."
    ];

    for (let i = 0; i < count; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      comments.push({
        id: i + 1,
        user: user.name,
        avatar: user.avatar,
        text: messages[Math.floor(Math.random() * messages.length)],
        timestamp: `${getRandomNumber(1, 24)} ${getRandomNumber(1, 2) === 1 ? 'hours' : 'days'} ago`
      });
    }

    return comments;
  };

  // Generate random reactions
  const generateRandomReactions = (count: number): Reaction[] => {
    const reactions: Reaction[] = [];
    const types: ('like' | 'love' | 'support')[] = ['like', 'love', 'support'];
    
    for (let i = 0; i < count; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      reactions.push({
        userId: `user_${user.name.replace(/\s+/g, '_').toLowerCase()}_${i}`,
        type: types[Math.floor(Math.random() * types.length)]
      });
    }

    return reactions;
  };

  // 5 predefined stories (3 boys, 2 girls)
  const initialStories: Story[] = [
    {
      id: 1,
      name: "Ahmed Khan",
      location: "Karachi",
      content: "Overcame financial hardships to build a successful small business that now employs 15 people in Karachi. The journey wasn't easy but with determination and community support, I was able to turn my small idea into a thriving business.",
      imageUrl: "https://images.pexels.com/photos/25365249/pexels-photo-25365249/free-photo-of-bearded-brunette-sitting-on-chair.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Entrepreneurship",
      date: "March 15, 2025",
      isUserStory: false,
      reactions: generateRandomReactions(getRandomNumber(200, 350)),
      comments: generateRandomComments(getRandomNumber(6, 15))
    },
    {
      id: 2,
      name: "Usman Malik",
      location: "Lahore",
      content: "After completing my education against all odds, I started a free tutoring center in my neighborhood. Today we help over 50 students daily with their studies, and many have gone on to excel in their exams.",
      imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
      category: "Education",
      date: "February 28, 2025",
      isUserStory: false,
      reactions: generateRandomReactions(getRandomNumber(200, 350)),
      comments: generateRandomComments(getRandomNumber(6, 15))
    },
    {
      id: 3,
      name: "Bilal Hassan",
      location: "Islamabad",
      content: "Recovered from a serious accident that left me bedridden for months. Through rehabilitation and community support, I not only recovered but also completed a marathon last year to raise funds for others in similar situations.",
      imageUrl: "https://images.pexels.com/photos/20317983/pexels-photo-20317983/free-photo-of-a-man-standing-by-the-railing-in-a-shopping-mall.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Health",
      date: "January 10, 2025",
      isUserStory: false,
      reactions: generateRandomReactions(getRandomNumber(200, 350)),
      comments: generateRandomComments(getRandomNumber(6, 15))
    },
    {
      id: 4,
      name: "Fatima Ali",
      location: "Peshawar",
      content: "As one of the first female tech entrepreneurs from Peshawar, I faced many challenges. But today my software company employs 25 people, half of them women, and we're working on projects that help local businesses go digital.",
      imageUrl: "https://images.pexels.com/photos/19248047/pexels-photo-19248047/free-photo-of-pink-western-dress-style-shoot-by-dhanno.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Career Development",
      date: "December 5, 2024",
      isUserStory: false,
      reactions: generateRandomReactions(getRandomNumber(200, 350)),
      comments: generateRandomComments(getRandomNumber(6, 15))
    },
    {
      id: 5,
      name: "Ayesha Khan",
      location: "Quetta",
      content: "Started a community kitchen during the pandemic that has now evolved into a full-fledged food distribution network, serving over 200 meals daily to those in need across Quetta. Our volunteers come from all walks of life.",
      imageUrl: "https://images.pexels.com/photos/19389296/pexels-photo-19389296/free-photo-of-eastern-dresses-2024-shoot-by-dhanno.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Community Service",
      date: "November 20, 2024",
      isUserStory: false,
      reactions: generateRandomReactions(getRandomNumber(200, 350)),
      comments: generateRandomComments(getRandomNumber(6, 15))
    }
  ];

  useEffect(() => {
    const savedStories = localStorage.getItem('communityStories');
    if (savedStories) {
      try {
        const parsed = JSON.parse(savedStories);
        if (Array.isArray(parsed)) {
          setStories(parsed);
        }
      } catch (e) {
        console.error("Failed to parse stories", e);
        setStories(initialStories);
      }
    } else {
      setStories(initialStories);
    }
  }, []);

  useEffect(() => {
    if (stories.length > 0) {
      localStorage.setItem('communityStories', JSON.stringify(stories));
    }
  }, [stories]);

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    const newStory: Story = {
      id: Date.now(),
      name: newName,
      location: newLocation,
      content: newStoryText,
      imageUrl: newImageFile ? URL.createObjectURL(newImageFile) : "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      category: newCategory,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      isUserStory: true,
      reactions: [],
      comments: []
    };
    setStories(prev => [...prev, newStory]);
    resetForm();
    setShowAddStoryForm(false);
  };

  const resetForm = () => {
    setNewName("");
    setNewLocation("");
    setNewStoryText("");
    setNewImageFile(null);
    setNewCategory("Personal Growth");
  };

  const handleDeleteStory = (storyId: number) => {
    setStories(prev => prev.filter(story => story.id !== storyId));
  };

  // Instagram-style reaction handler
  const handleReaction = (storyId: number, reactionType: 'like') => {
    setStories(prevStories => 
      prevStories.map(story => {
        if (story.id !== storyId) return story;
        
        // Check if user already reacted
        const existingReactionIndex = story.reactions.findIndex(
          r => r.userId === currentUserId
        );

        // If clicking same reaction, remove it (toggle)
        if (existingReactionIndex >= 0) {
          return {
            ...story,
            reactions: story.reactions.filter(
              (_, index) => index !== existingReactionIndex
            )
          };
        }

        // If no existing reaction, add new like
        return {
          ...story,
          reactions: [
            ...story.reactions,
            { userId: currentUserId, type: reactionType }
          ]
        };
      })
    );
  };

  const addComment = (storyId: number) => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      user: "You",
      avatar: "",
      text: newComment,
      timestamp: "Just now"
    };

    setStories(prev => 
      prev.map(story => 
        story.id === storyId
          ? { ...story, comments: [comment, ...story.comments] }
          : story
      )
    );
    setNewComment("");
  };

  const getReactionCount = (story: Story) => {
    return story?.reactions?.length || 0;
  };

  const hasUserLiked = (story: Story) => {
    if (!story?.reactions) return false;
    return story.reactions.some(r => r.userId === currentUserId);
  };

  const myStories = stories.filter(story => 
    story.isUserStory &&
    (story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     story.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const communityStories = stories.filter(story => 
    (story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     story.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = [
    "Personal Growth",
    "Entrepreneurship",
    "Health",
    "Education",
    "Parenting",
    "Community Service",
    "Career Development"
  ];

  return (
    <MainLayout>
      <section className="bg-gradient-to-r from-humqadam-pink/20 to-humqadam-pink/10 py-16 ">
        <div className="container mx-auto px-4">
          <div className="max-w-full mx-auto text-center">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Community Stories
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Inspiring journeys of resilience and achievement
            </p>
            <Button 
              className="bg-humqadam-pink hover:bg-humqadam-pink/90 justify gap-2"
              onClick={() => setShowAddStoryForm(true)}
            >
              <PlusCircle size={18} />
              <span>Share Your Story</span>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Browse Stories"
            subtitle="Find inspiration from community members"
            alignment="center"
          />

          <div className="relative mb-12 max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              type="search"
              className="pl-10"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="community" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="community" className="text-base">
                Community Stories
              </TabsTrigger>
              <TabsTrigger value="my-stories" className="text-base">
                My Stories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="community" className="mt-8">
              {communityStories.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-600 mb-6">No stories found</p>
                  <Button 
                    variant="outline"
                    className="border-humqadam-pink text-humqadam-pink"
                    onClick={() => setSearchTerm("")}
                  >
                    View All Stories
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {communityStories.map(story => {
                    const userLiked = hasUserLiked(story);
                    return (
                      <Card key={story.id} className="hover:shadow-lg transition-shadow">
                        {story.imageUrl && (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={story.imageUrl}
                              alt={story.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{story.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {story.location} • <Clock className="h-4 w-4" /> {story.date}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 mb-2 line-clamp-3">
                            {story.content}
                          </p>
                          <Button 
                            variant="link" 
                            className="text-humqadam-pink p-0 h-auto"
                            onClick={() => {
                              setExpandedStory(story);
                              setShowStoryModal(true);
                            }}
                          >
                            Read more
                          </Button>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                          <div className="flex items-center gap-4 w-full">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleReaction(story.id, 'like')}
                            >
                              <Heart className={`h-4 w-4 ${userLiked ? 'text-red-500 fill-red-500' : ''}`} />
                              <span>{getReactionCount(story)}</span>
                            </Button>

                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => {
                                setActiveStory(story);
                                setViewComments(true);
                              }}
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>{story.comments.length}</span>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="my-stories" className="mt-8">
              {myStories.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-600 mb-6">You haven't shared any stories yet</p>
                  <Button 
                    className="bg-humqadam-pink hover:bg-humqadam-pink/90"
                    onClick={() => setShowAddStoryForm(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Share Your First Story
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myStories.map(story => {
                    const userLiked = hasUserLiked(story);
                    return (
                      <Card key={story.id} className="hover:shadow-lg transition-shadow">
                        {story.imageUrl && (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={story.imageUrl}
                              alt={story.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{story.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {story.location} • <Clock className="h-4 w-4" /> {story.date}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 mb-2 line-clamp-3">
                            {story.content}
                          </p>
                          <Button 
                            variant="link" 
                            className="text-humqadam-pink p-0 h-auto"
                            onClick={() => {
                              setExpandedStory(story);
                              setShowStoryModal(true);
                            }}
                          >
                            Read more
                          </Button>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                          <div className="flex items-center gap-4 w-full">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleReaction(story.id, 'like')}
                            >
                              <Heart className={`h-4 w-4 ${userLiked ? 'text-red-500 fill-red-500' : ''}`} />
                              <span>{getReactionCount(story)}</span>
                            </Button>

                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => {
                                setActiveStory(story);
                                setViewComments(true);
                              }}
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>{story.comments.length}</span>
                            </Button>
                          </div>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteStory(story.id)}
                            className="w-full"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <AnimatePresence>
        {showStoryModal && expandedStory && (
          <Dialog open={showStoryModal} onOpenChange={setShowStoryModal}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <button 
                  onClick={() => setShowStoryModal(false)}
                  className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {expandedStory.imageUrl && (
                    <div className="relative h-96 md:h-full">
                      <img
                        src={expandedStory.imageUrl}
                        alt={expandedStory.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={expandedStory.imageUrl} />
                        <AvatarFallback>{expandedStory.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{expandedStory.name}</h3>
                        <p className="text-sm text-gray-500">{expandedStory.location}</p>
                      </div>
                    </div>

                    <div className="prose max-w-none mb-6">
                      <p className="whitespace-pre-line">{expandedStory.content}</p>
                    </div>

                    <div className="flex items-center gap-4 border-t pt-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleReaction(expandedStory.id, 'like')}
                      >
                        <Heart className={`h-5 w-5 ${hasUserLiked(expandedStory) ? 'text-red-500 fill-red-500' : ''}`} />
                        <span>{getReactionCount(expandedStory)}</span>
                      </Button>

                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => {
                          setViewComments(true);
                          setActiveStory(expandedStory);
                        }}
                      >
                        <MessageSquare className="h-5 w-5" />
                        <span>{expandedStory.comments.length}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <Dialog open={viewComments} onOpenChange={setViewComments}>
        {activeStory && (
          <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Comments</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto space-y-4">
              {activeStory.comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{comment.user}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-700 mt-1">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      addComment(activeStory.id);
                    }
                  }}
                />
                <Button 
                  onClick={() => addComment(activeStory.id)}
                  disabled={!newComment.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <section className="py-12 bg-humqadam-pink/10 rounded-lg mx-4 my-8">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Share Your Journey"
            subtitle="Your experience could inspire others"
            alignment="center"
          />
          <div className="max-w-2xl mx-auto mt-8">
            <p className="text-gray-700 mb-8">
              Every story helps strengthen our community. Share your challenges and achievements.
            </p>
          </div>
        </div>
      </section>

      <Dialog open={showAddStoryForm} onOpenChange={setShowAddStoryForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Share Your Story</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitStory} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Your Name
              </Label>
              <Input
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <select
                id="category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="col-span-3 border rounded-md p-2"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="story" className="text-right">
                Your Story
              </Label>
              <Textarea
                id="story"
                value={newStoryText}
                onChange={(e) => setNewStoryText(e.target.value)}
                className="col-span-3"
                rows={8}
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Photo (Optional)
              </Label>
              <Input
                id="image"
                type="file"
                onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
                className="col-span-3"
                accept="image/*"
              />
            </div>
            
            <DialogFooter>
              <Button type="submit" className="bg-humqadam-pink hover:bg-humqadam-pink/90">
                Share Story
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Stories;