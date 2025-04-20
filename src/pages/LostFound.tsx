import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  MapPin, 
  Calendar, 
  User,
  Eye,
  MessageSquare,
  PlusCircle,
  HelpCircle,
  X,
  Check,
  AlertCircle,
  Lock
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define types for Lost & Found items
type LostFoundItem = {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  location?: string;
  date: string;
  category?: string;
  contact: string;
  reward?: boolean;
  isFound?: boolean;
  image?: string;
  createdBy: 'system' | 'user'; // Track who created the item
};

const LostFound = () => {
  const { toast } = useToast();
  
  // Sample data for the lost and found items (would come from API in real app)
  const [lostItems, setLostItems] = useState<LostFoundItem[]>([
    {
      id: '1',
      type: 'lost',
      title: "Gold Wedding Ring",
      description: "Lost in Central Park area near the fountain. Has initials 'J&M' engraved inside.",
      location: "Central Park",
      date: "April 12, 2025",
      category: "Jewelry",
      contact: "John D.",
      reward: true,
      createdBy: 'system'
    },
    {
      id: '2',
      type: 'lost',
      title: "Black Leather Wallet",
      description: "Contains ID, credit cards, and family photos. Lost near Main Street Coffee Shop.",
      location: "Main Street",
      date: "April 15, 2025",
      category: "Personal Items",
      contact: "Sarah M.",
      reward: true,
      createdBy: 'system'
    }
  ]);
  
  const [foundItems, setFoundItems] = useState<LostFoundItem[]>([
    {
      id: '3',
      type: 'found',
      title: "Blue Bicycle Helmet",
      description: "Found on Oak Street near the elementary school. Child size with dinosaur stickers.",
      location: "Oak Street",
      date: "April 14, 2025",
      category: "Sports Equipment",
      contact: "Emma L.",
      image: "/placeholder.svg",
      createdBy: 'system'
    }
  ]);

  // Form state for new item
  const [newLostFoundItem, setNewLostFoundItem] = useState<Omit<LostFoundItem, 'id'>>({ 
    type: 'lost',
    title: "",
    description: "",
    date: new Date().toLocaleDateString(),
    contact: "",
    isFound: false,
    createdBy: 'user' // All new items will be user-created
  });

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Add new Lost & Found item
  const handleAddLostFoundItem = () => {
    if (!newLostFoundItem.title || !newLostFoundItem.description || !newLostFoundItem.contact) {
      toast({
        title: "Validation Error",
        description: "Please fill all required Lost & Found fields (Title, Description, Contact).",
        variant: "destructive",
      });
      return;
    }

    const newItem = {
      ...newLostFoundItem,
      id: Date.now().toString(),
      date: newLostFoundItem.date || new Date().toLocaleDateString(),
      createdBy: 'user' // Ensure new items are marked as user-created
    };

    if (newItem.type === 'lost') {
      setLostItems([...lostItems, newItem as LostFoundItem]);
    } else {
      setFoundItems([...foundItems, newItem as LostFoundItem]);
    }

    toast({ 
      title: "Success", 
      description: `Item reported as ${newLostFoundItem.type}.` 
    });

    // Reset form
    setNewLostFoundItem({ 
      type: 'lost',
      title: "",
      description: "",
      date: new Date().toLocaleDateString(),
      contact: "",
      isFound: false,
      createdBy: 'user'
    });
    setIsModalOpen(false);
  };

  // Delete Lost & Found item (only user-created items)
  const handleDeleteLostFoundItem = (itemId: string, type: 'lost' | 'found') => {
    const itemToDelete = [...lostItems, ...foundItems].find(item => item.id === itemId);
    
    if (itemToDelete?.createdBy === 'system') {
      toast({
        title: "Cannot delete",
        description: "This is a sample item and cannot be deleted.",
        variant: "destructive",
      });
      return;
    }

    if (type === 'lost') {
      setLostItems(lostItems.filter(item => item.id !== itemId));
    } else {
      setFoundItems(foundItems.filter(item => item.id !== itemId));
    }
    
    toast({ 
      title: "Success", 
      description: "Item deleted." 
    });
    
    if (selectedItem?.id === itemId) {
      setSelectedItem(null);
    }
  };

  // Toggle found status (only for user-created items)
  const handleToggleFoundStatus = (itemId: string) => {
    const itemToUpdate = [...lostItems, ...foundItems].find(item => item.id === itemId);
    if (!itemToUpdate) return;

    if (itemToUpdate.createdBy === 'system') {
      toast({
        title: "Cannot modify",
        description: "This is a sample item and cannot be modified.",
        variant: "destructive",
      });
      return;
    }

    if (itemToUpdate.type === 'lost') {
      setLostItems(lostItems.filter(item => item.id !== itemId));
      setFoundItems([...foundItems, { ...itemToUpdate, type: 'found' }]);
    } else {
      setFoundItems(foundItems.filter(item => item.id !== itemId));
      setLostItems([...lostItems, { ...itemToUpdate, type: 'lost' }]);
    }

    toast({
      title: "Status Updated",
      description: `Item moved to ${itemToUpdate.type === 'lost' ? 'Found' : 'Lost'} section.`,
    });
  };

  // Filter items based on search term
  const filteredLostItems = lostItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredFoundItems = foundItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Define colors
  const primaryBaseColor = '#8B5CF6';
  const primaryLightColor = 'rgba(139, 92, 246, 0.1)';
  const primaryVeryLightColor = 'rgba(139, 92, 246, 0.05)';
  const red600 = '#DC2626';
  const green600 = '#16A34A';

  return (
    <MainLayout>
      {/* Hero Section */}
      <section style={{ backgroundImage: `linear-gradient(to right, rgba(104, 255, 192, 0.32), rgba(111, 253, 218, 0.42)` }} className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Community Lost & Found
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Report lost items or found belongings to help reunite them with their owners
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                onClick={() => {
                  setNewLostFoundItem(prev => ({ ...prev, type: 'lost' }));
                  setIsModalOpen(true);
                }}
                style={{ backgroundColor: primaryBaseColor }}
                className="text-white hover:bg-purple-700 flex items-center gap-2 transition-transform duration-200 hover:scale-105"
              >
                <PlusCircle size={18} />
                <span>Report Lost Item</span>
              </Button>
              
              <Button 
                onClick={() => {
                  setNewLostFoundItem(prev => ({ ...prev, type: 'found' }));
                  setIsModalOpen(true);
                }}
                style={{ backgroundColor: green600 }}
                className="text-white hover:bg-green-700 flex items-center gap-2 transition-transform duration-200 hover:scale-105"
              >
                <PlusCircle size={18} />
                <span>Report Found Item</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              type="search"
              className="block w-full p-4 pl-10 text-sm border rounded-lg bg-white focus:ring-primary focus:border-primary"
              placeholder="Search by description, location, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Lost & Found Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Recent Listings"
            subtitle="Browse lost and found items in your community"
            alignment="center"
          />

          <Tabs defaultValue="lost" className="w-full">
            <TabsList style={{ backgroundColor: 'rgba(229, 231, 235, 0.5)' }} className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="lost"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                style={{ color: 'rgba(0, 0, 0, 0.9)' }}
              >
                Lost Items ({filteredLostItems.length})
              </TabsTrigger>
              <TabsTrigger
                value="found"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                style={{ color: 'rgba(0, 0, 0, 0.9)' }}
              >
                Found Items ({filteredFoundItems.length})
              </TabsTrigger>
            </TabsList>

            {/* Lost Items Tab */}
            <TabsContent value="lost" className="bg-white rounded-lg p-6 shadow-sm border">
              {filteredLostItems.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No lost items found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ? 'Try a different search term' : 'Be the first to report a lost item'}
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={() => {
                        setNewLostFoundItem(prev => ({ ...prev, type: 'lost' }));
                        setIsModalOpen(true);
                      }}
                      style={{ backgroundColor: primaryBaseColor }}
                      className="text-white hover:bg-purple-700"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Report Lost Item
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredLostItems.map(item => (
                    <Card 
                      key={item.id} 
                      style={{ backgroundColor: primaryVeryLightColor, borderColor: primaryLightColor }}
                      className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border flex flex-col"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="destructive" className="mb-2">
                              Lost
                            </Badge>
                            <CardTitle>{item.title}</CardTitle>
                            {item.category && (
                              <CardDescription className="mt-1">{item.category}</CardDescription>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {item.reward && (
                              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                                Reward
                              </Badge>
                            )}
                            {item.createdBy === 'system' && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Lock className="h-4 w-4 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Sample item (cannot be modified)</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm mb-4">{item.description}</p>
                        <div className="space-y-2 text-sm">
                          {item.location && (
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="mr-2 h-4 w-4" />
                              <span>{item.location}</span>
                            </div>
                          )}
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <User className="mr-2 h-4 w-4" />
                            <span>Posted by: {item.contact}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedItem(item)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </Button>
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => handleToggleFoundStatus(item.id)}
                            disabled={item.createdBy === 'system'}
                          >
                            <Check className="mr-2 h-4 w-4" /> Mark Found
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteLostFoundItem(item.id, 'lost')}
                            disabled={item.createdBy === 'system'}
                          >
                            <X className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Found Items Tab */}
            <TabsContent value="found" className="bg-white rounded-lg p-6 shadow-sm border">
              {filteredFoundItems.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No found items found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ? 'Try a different search term' : 'Be the first to report a found item'}
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={() => {
                        setNewLostFoundItem(prev => ({ ...prev, type: 'found' }));
                        setIsModalOpen(true);
                      }}
                      style={{ backgroundColor: green600 }}
                      className="text-white hover:bg-green-700"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Report Found Item
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredFoundItems.map(item => (
                    <Card 
                      key={item.id} 
                      style={{ backgroundColor: primaryVeryLightColor, borderColor: primaryLightColor }}
                      className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border flex flex-col"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge className="mb-2 bg-green-100 text-green-800">
                              Found
                            </Badge>
                            <CardTitle>{item.title}</CardTitle>
                            {item.category && (
                              <CardDescription className="mt-1">{item.category}</CardDescription>
                            )}
                          </div>
                          {item.createdBy === 'system' && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Lock className="h-4 w-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Sample item (cannot be modified)</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                            {item.image ? (
                              <img src={item.image} alt={item.title} className="max-h-full" />
                            ) : (
                              <div className="text-gray-400">No image</div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm mb-4">{item.description}</p>
                            <div className="space-y-2 text-sm">
                              {item.location && (
                                <div className="flex items-center text-muted-foreground">
                                  <MapPin className="mr-2 h-4 w-4" />
                                  <span>{item.location}</span>
                                </div>
                              )}
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>{item.date}</span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <User className="mr-2 h-4 w-4" />
                                <span>Posted by: {item.contact}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedItem(item)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </Button>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleFoundStatus(item.id)}
                            disabled={item.createdBy === 'system'}
                          >
                            <X className="mr-2 h-4 w-4" /> Not Found
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteLostFoundItem(item.id, 'found')}
                            disabled={item.createdBy === 'system'}
                          >
                            <X className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Add/Edit Item Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {newLostFoundItem.type === 'lost' ? 'Report Lost Item' : 'Report Found Item'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to {newLostFoundItem.type === 'lost' ? 'report your lost item' : 'report a found item'}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title*
              </label>
              <Input
                id="title"
                value={newLostFoundItem.title}
                onChange={(e) => setNewLostFoundItem({...newLostFoundItem, title: e.target.value})}
                className="col-span-3"
                placeholder="Brief description of the item"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description*
              </label>
              <Textarea
                id="description"
                value={newLostFoundItem.description}
                onChange={(e) => setNewLostFoundItem({...newLostFoundItem, description: e.target.value})}
                className="col-span-3"
                placeholder="Detailed description including any identifying features"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="location" className="text-right">
                Location
              </label>
              <Input
                id="location"
                value={newLostFoundItem.location || ''}
                onChange={(e) => setNewLostFoundItem({...newLostFoundItem, location: e.target.value})}
                className="col-span-3"
                placeholder="Where was it lost/found?"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right">
                Date
              </label>
              <Input
                id="date"
                type="date"
                value={newLostFoundItem.date}
                onChange={(e) => setNewLostFoundItem({...newLostFoundItem, date: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="contact" className="text-right">
                Contact Info*
              </label>
              <Input
                id="contact"
                value={newLostFoundItem.contact}
                onChange={(e) => setNewLostFoundItem({...newLostFoundItem, contact: e.target.value})}
                className="col-span-3"
                placeholder="How can people reach you?"
              />
            </div>
            {newLostFoundItem.type === 'lost' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="reward" className="text-right">
                  Offering Reward
                </label>
                <div className="col-span-3 flex items-center">
                  <input
                    id="reward"
                    type="checkbox"
                    checked={!!newLostFoundItem.reward}
                    onChange={(e) => setNewLostFoundItem({...newLostFoundItem, reward: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="reward" className="ml-2 block text-sm text-gray-700">
                    Check if you're offering a reward
                  </label>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddLostFoundItem}
              style={{ backgroundColor: newLostFoundItem.type === 'lost' ? primaryBaseColor : green600 }}
              className="text-white hover:bg-purple-700"
            >
              {newLostFoundItem.type === 'lost' ? 'Report Lost Item' : 'Report Found Item'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Item Modal */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
            <DialogDescription>
              {selectedItem?.type === 'lost' ? 'Lost Item Details' : 'Found Item Details'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem?.category && (
              <div>
                <h4 className="font-medium">Category</h4>
                <p>{selectedItem.category}</p>
              </div>
            )}
            <div>
              <h4 className="font-medium">Description</h4>
              <p>{selectedItem?.description}</p>
            </div>
            {selectedItem?.location && (
              <div>
                <h4 className="font-medium">Location</h4>
                <p>{selectedItem.location}</p>
              </div>
            )}
            <div>
              <h4 className="font-medium">Date</h4>
              <p>{selectedItem?.date}</p>
            </div>
            <div>
              <h4 className="font-medium">Contact Information</h4>
              <p>{selectedItem?.contact}</p>
            </div>
            {selectedItem?.reward && (
              <div>
                <h4 className="font-medium">Reward Offered</h4>
                <p>Yes</p>
              </div>
            )}
            {selectedItem?.createdBy === 'system' && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Lock className="h-4 w-4" />
                <span>This is a sample item and cannot be modified</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSelectedItem(null)}
            >
              Close
            </Button>
            {selectedItem && selectedItem.createdBy !== 'system' && (
              <Button 
                onClick={() => {
                  if (selectedItem.type === 'lost') {
                    handleToggleFoundStatus(selectedItem.id);
                  } else {
                    handleToggleFoundStatus(selectedItem.id);
                  }
                  setSelectedItem(null);
                }}
                style={{ backgroundColor: selectedItem.type === 'lost' ? green600 : red600 }}
                className="text-white hover:bg-green-700"
              >
                {selectedItem.type === 'lost' ? 'Mark as Found' : 'Mark as Not Found'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default LostFound;