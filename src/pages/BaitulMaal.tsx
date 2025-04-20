import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import {
  Search, Plus, X, MapPin, Clock, Send, User, Image as ImageIcon, UploadCloud,
  Heart, CheckCircle, Loader2, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Colors (Adapted from rights.txt) ---
const primaryBaseColor = '#8B5CF6';         // humqadam.purple from rights.txt
const primaryLightColor = 'rgba(139, 92, 246, 0.1)'; // primaryBaseColor with 10% opacity
const primaryVeryLightColor = 'rgba(139, 92, 246, 0.05)'; // primaryBaseColor with 5% opacity
const primaryHoverColor = 'rgba(139, 92, 246, 0.9)'; // Adjusted hover from rights.txt
const pinkBaseColor = '#D946EF';           // humqadam.pink from rights.txt
const pinkLightColor = 'rgba(217, 70, 239, 0.1)';     // pinkBaseColor with 10% opacity
const pinkHoverColor = 'rgba(217, 70, 239, 0.9)';    // Adjusted hover from rights.txt
const lightBgColor = '#F1F0FB';             // humqadam.light from rights.txt (Use for section backgrounds)
const gray100 = '#F3F4F6';             // Corresponds to gray-100
const gray200 = '#E5E7EB';             // Corresponds to gray-200
const gray700 = '#374151';             // Corresponds to gray-700 (Used in rights.txt subtitle)
const gray800 = '#1F2937';             // Corresponds to gray-800
const cardBgColor = '#FFFFFF'; // White cards (Consistent with rights.txt active tabs/modals)
const textColorPrimary = gray800;         // Use gray-800 from rights.txt
const textColorSecondary = '#6B7280';       // Muted grey (Keep btm's secondary, common value)
const borderColor = gray200;             // Use gray-200 from rights.txt for borders
const inputBgColor = gray100;             // Use gray-100 from rights.txt for input backgrounds

// --- Colors kept specifically from btm.txt for UI states ---
const successColor = '#10B981';            // Green for success tick
const errorColor = '#EF4444';              // Red for heart/errors
const dangerColor = '#DC2626';               // Red for delete buttons (Matches rights.txt red600)

// --- Gradients (Adapted from rights.txt) ---
// Using the greenish gradient from rights.txt for the header
const headerGradientFrom = 'rgba(76, 133, 255, 0.32)';
const headerGradientTo = 'rgba(132, 159, 248, 0.42)';
// Deriving a light purple/pink gradient for the donation strip based on rights.txt colors
const donationGradientFrom = primaryLightColor; // 'rgba(139, 92, 246, 0.1)'
const donationGradientTo = pinkLightColor;     // 'rgba(217, 70, 239, 0.1)'

// --- Interfaces ---
interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; // Base64 or URL
  location: string;
  pickupTimes: string;
  giverName: string;
  giverProfilePicUrl?: string; // Base64 or URL
  giverContactInfo: string;
  price?: number; // Optional price in PKR
}

// --- Placeholder Data ---
const initialItems: Item[] = [
  {
    id: 'initial-1',
    name: 'Old Books Collection',
    description: 'A mix of novels, textbooks, and magazines. Around 50 books.',
    imageUrl: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    location: 'Sector G-9, Islamabad',
    pickupTimes: 'Weekends 11 AM - 4 PM',
    giverName: 'Ali Khan',
    giverProfilePicUrl: `https://ui-avatars.com/api/?name=Ali+Khan&background=c084fc&color=fff`,
    giverContactInfo: 'Message via App',
    price: 0
  },
  {
    id: 'initial-2',
    name: 'Comfy Armchair',
    description: 'Single seater armchair, good condition, minor wear.',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJmY2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    location: 'Sector F-11, Islamabad',
    pickupTimes: 'Weekdays after 6 PM',
    giverName: 'Fatima Ahmed',
    giverProfilePicUrl: `https://ui-avatars.com/api/?name=Fatima+Ahmed&background=f0abfc&color=fff`,
    giverContactInfo: 'Call 0312-3456789',
    price: 3500
  },
  {
    id: 'initial-3',
    name: 'Kids Bicycle',
    description: 'Small bicycle for ages 5-8. Needs minor tire repair.',
    imageUrl: 'https://cdn.pixabay.com/photo/2021/10/26/16/51/amsterdam-6744567_1280.jpg',
    location: 'Bahria Town, Phase 4',
    pickupTimes: 'Any day 2 PM - 5 PM',
    giverName: 'Usman Ali',
    giverProfilePicUrl: `https://ui-avatars.com/api/?name=Usman+Ali&background=c084fc&color=fff`,
    giverContactInfo: 'Message via App',
    price: 0
  },
  {
    id: 'initial-4',
    name: 'Assorted Kitchen Utensils',
    description: 'Spoons, forks, knives, spatulas. Used but functional.',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/09/05/01/27/kitchen-2716156_1280.png',
    location: 'Sector I-8, Islamabad',
    pickupTimes: 'Flexible, contact to arrange',
    giverName: 'Ayesha Khan',
    giverProfilePicUrl: `https://ui-avatars.com/api/?name=Ayesha+Khan&background=f0abfc&color=fff`,
    giverContactInfo: 'Message via App',
    price: 0
  },
  {
    id: 'initial-5',
    name: 'Box of Clothes',
    description: 'Mixed adult clothing, various sizes. Cleaned and folded.',
    imageUrl: 'https://cdn.pixabay.com/photo/2014/08/26/21/48/sweatshirts-428607_1280.jpg',
    location: 'Sector E-7, Islamabad',
    pickupTimes: 'Sunday mornings',
    giverName: 'Zainab Bilal',
    giverProfilePicUrl: `https://ui-avatars.com/api/?name=Zainab+Bilal&background=c084fc&color=fff`,
    giverContactInfo: 'Message via App',
    price: 0
  },
];
// --- Local Storage Key ---
const LOCAL_STORAGE_KEY = 'communityShareItems';

// --- Helper Functions for localStorage ---
const loadItemsFromStorage = (): Item[] | null => {
  try {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedItems) {
      const parsedItems: Item[] = JSON.parse(storedItems);
      const userAddedItems = parsedItems.filter(item =>
        !initialItems.some(initial => initial.id === item.id)
      );
      return userAddedItems;
    }
    return null;
  } catch (error) {
    console.error('Failed to load items from localStorage:', error);
    return null;
  }
};

const saveItemsToStorage = (items: Item[]) => {
  try {
    const userAddedItems = items.filter(item =>
      !initialItems.some(initial => initial.id === item.id)
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userAddedItems));
  } catch (error) {
    console.error('Failed to save items to localStorage:', error);
  }
};
// --- Heart Animation Component ---
const HeartRain: React.FC = () => {
  const hearts = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // vw
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 2,
    size: 15 + Math.random() * 15,
  })), []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]" aria-hidden="true">
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="absolute"
          initial={{ top: '-10%', opacity: 1 }}
          animate={{ top: '110%', opacity: 0 }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear"
          }}
          style={{ left: `${heart.x}vw` }}
        >
          <Heart size={heart.size} className="text-red-500 fill-current" fill={errorColor} />
        </motion.div>
      ))}
    </div>
  );
};
// --- Main Component ---
const CommunitySharePage: React.FC = () => {
  const [items, setItems] = useState<Item[]>(() => {
    const userItems = loadItemsFromStorage() || [];
    return [...initialItems, ...userItems];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    name: '', description: '', location: '', pickupTimes: '',
    giverName: '', giverContactInfo: '', price: ''
  });
  const [itemImageFile, setItemImageFile] = useState<File | null>(null);
  const [itemImagePreview, setItemImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessTick, setShowSuccessTick] = useState(false);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number | string>('');
  const [showHearts, setShowHearts] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [sentMessages, setSentMessages] = useState<string[]>([]);


  // --- Effects ---
  useEffect(() => {
    saveItemsToStorage(items);
  }, [items]);
  useEffect(() => {
    return () => {
      if (itemImagePreview) URL.revokeObjectURL(itemImagePreview);
    };
  }, [itemImagePreview]);


  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showHearts) {
      timer = setTimeout(() => setShowHearts(false), 4000);
    }
    return () => clearTimeout(timer);
  }, [showHearts]);


  // --- Helper to check if an item is one of the initial predefined ones ---
  const isInitialItem = useCallback((itemId: string): boolean => {
    return initialItems.some(item => item.id === itemId);
  }, []);
  // --- Filter Logic ---
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.location.toLowerCase().includes(term) ||
      item.giverName.toLowerCase().includes(term)
    );
  }, [items, searchTerm]);


  // --- General Handlers ---
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);


  const openViewItemModal = useCallback((item: Item) => {
    setSelectedItem(item);
    setIsViewItemModalOpen(true);
    setMessageInput('');
    setSentMessages([]);
  }, []);


  const closeViewItemModal = useCallback(() => {
    setIsViewItemModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  }, []);


  // --- Add Item Handlers ---
  const openAddItemModal = useCallback(() => {
    setNewItem({ name: '', description: '', location: '', pickupTimes: '', giverName: '', giverContactInfo: '', price: '' });
    setItemImageFile(null);
    setItemImagePreview(null);
    setShowSuccessTick(false);
    setIsSubmitting(false);
    setIsAddItemModalOpen(true);
  }, []);


  const closeAddItemModal = useCallback(() => {
    setIsAddItemModalOpen(false);
    if (itemImagePreview) URL.revokeObjectURL(itemImagePreview);
    setItemImagePreview(null);
    setItemImageFile(null);
  }, [itemImagePreview]);


  const handleNewItemInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'price' && value !== '' && !/^\d*\.?\d*$/.test(value)) {
      return;
    }
    setNewItem(prev => ({ ...prev, [name]: value }));
  }, []);


  const handleItemImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (itemImagePreview) URL.revokeObjectURL(itemImagePreview);
      const previewUrl = URL.createObjectURL(file);
      setItemImageFile(file);
      setItemImagePreview(previewUrl);
    } else {
      if (itemImagePreview) URL.revokeObjectURL(itemImagePreview);
      setItemImageFile(null);
      setItemImagePreview(null);
    }
  }, [itemImagePreview]);


  // Helper function to convert File to Data URL
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAddItemSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || showSuccessTick) return;

    setIsSubmitting(true);
    setShowSuccessTick(false);

    let imageBase64Url: string | undefined = undefined;
    if (itemImageFile) {
      try {
        imageBase64Url = await readFileAsDataURL(itemImageFile);
      } catch (error) {
        console.error("Error reading image file:", error);
        setIsSubmitting(false);
        return;
      }
    }

    const priceValue = newItem.price.trim();
     const priceNumber = priceValue !== '' ? parseFloat(priceValue) : undefined;
    const itemToAdd: Item = {
      id: crypto.randomUUID(),
      name: newItem.name,
      description: newItem.description,
      location: newItem.location,
      pickupTimes: newItem.pickupTimes,
      giverName: newItem.giverName,
      giverContactInfo: newItem.giverContactInfo,
      imageUrl: imageBase64Url,
      price: (priceNumber !== undefined && !isNaN(priceNumber) && priceNumber >= 0) ? priceNumber : undefined,
      giverProfilePicUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(newItem.giverName || '??')}&background=random&color=fff`,
    };
    setItems(prev => [itemToAdd, ...prev]);
    setIsSubmitting(false);
    setShowSuccessTick(true);

    setTimeout(() => {
      closeAddItemModal();
      setShowSuccessTick(false);
    }, 1500);

  }, [newItem, itemImageFile, closeAddItemModal, isSubmitting, showSuccessTick]);


  // --- Delete Item Handlers ---
  const openDeleteConfirmModal = useCallback((itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInitialItem(itemId)) {
      setItemToDelete(itemId);
      setIsDeleteModalOpen(true);
    } else {
      console.log("Cannot delete predefined items.");
    }
  }, [isInitialItem]);


  const closeDeleteConfirmModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setTimeout(() => setItemToDelete(null), 300);
  }, []);


  const confirmDelete = useCallback(() => {
    if (itemToDelete) {
      if (!isInitialItem(itemToDelete)) {
        setItems(prev => prev.filter(item => item.id !== itemToDelete));
        if (selectedItem && selectedItem.id === itemToDelete) {
          closeViewItemModal();
        }
      } else {
        console.log("Attempted to delete a predefined item via confirmDelete (safeguard).");
      }
      closeDeleteConfirmModal();
    }
  }, [itemToDelete, closeDeleteConfirmModal, selectedItem, closeViewItemModal, isInitialItem]);


  // --- Donation Handlers ---
  const handleDonateNowClick = useCallback(() => {
    setDonationAmount('');
    setIsDonationOpen(true);
  }, []);
  const handleDonationAmountSelect = useCallback((amount: number | string) => {
    setDonationAmount(amount);
  }, []);
  const handleConfirmDonation = useCallback(() => {
    const finalAmount = typeof donationAmount === 'number' ? donationAmount : parseFloat(donationAmount);
    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    console.log(`Donating PKR ${finalAmount}... (Simulation)`);
    setIsDonationOpen(false);
    setShowHearts(true);
  }, [donationAmount]);


  // --- Chat Simulation Handlers ---
  const handleMessageInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  }, []);
  const handleSendMessage = useCallback(() => {
    if (messageInput.trim()) {
      setSentMessages(prev => [...prev, messageInput]);
      setMessageInput('');
      setTimeout(() => {
        setSentMessages(prev => [...prev, `Thanks for your message! The owner will get back to you soon.`]);
      }, 1000);
    }
  }, [messageInput]);


  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);


  // --- Generic Image Error Handler ---
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>, defaultText: string = "No Image") => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = `https://via.placeholder.com/300x200/${borderColor.substring(1)}/${textColorSecondary.substring(1)}?text=${encodeURIComponent(defaultText)}`;
    img.className = img.className + ' object-contain';
  }, [borderColor, textColorSecondary]);


  return (
    <MainLayout>
        {/* Heart Rain Animation Overlay */}
        <AnimatePresence>
          {showHearts && <HeartRain />}
        </AnimatePresence>


          <section
            className=" mb-10 rounded-lg" // Keep mb-10 and rounded-lg from btm.txt
          >
            <div className="bg-gradient-to-r from-humqadam-purple/20 to-humqadam-purple/10 py-16">
              {/* Centered content wrapper from rights.txt */}
              <div className="max-w-3xl mx-auto text-center">
                {/* Title style from rights.txt (using font-bold as proxy for font-heading) */}
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: textColorPrimary }}>
                  Baitul Maal
                </h1>
                {/* Subtitle style from rights.txt (text-lg, mb-6, specific gray color) */}
                <p className="text-lg mb-6" style={{ color: gray700 }}>
                  Share items, find treasures, spread kindness.
                </p>
              </div>
              {/* Centered button container from rights.txt */}
              <div className="flex flex-wrap gap-3 justify-center">
                {/* Button uses primary color from rights.txt */}
                <button
                  onClick={openAddItemModal}
                  className="flex items-center px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
                  style={{ backgroundColor: primaryBaseColor, color: 'white' }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = primaryHoverColor}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = primaryBaseColor}
                >
                  <Plus size={20} className="mr-2" /> List New Item
                </button>
              </div>
            </div>
          </section>
          {/* ============================================== */}
          {/* End Header Section                             */}
          {/* ============================================== */}


          {/* Action Bar: Search */}
          <div className="relative max-w-3xl mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: textColorSecondary }} />
            <input
              type="text"
              placeholder="Search items, locations, givers..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties}
            />
          </div>

          {/* --- Donation Strip --- */}
          <div
            className="max-w-3xl mx-auto mb-10 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: `linear-gradient(to right, ${donationGradientFrom}, ${donationGradientTo})` }}>
            <div className="flex items-center gap-3">
              <Heart size={24} fill={errorColor} className="text-red-600 flex-shrink-0" />
              <span className="text-sm md:text-base font-medium text-center sm:text-left" style={{ color: textColorPrimary }}>
                Support Palestine Relief Efforts
              </span>
            </div>
            <button
              onClick={handleDonateNowClick}
              className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-all flex-shrink-0"
              style={{ '--tw-ring-offset-color': cardBgColor } as React.CSSProperties}
            >
              Donate Now
            </button>
          </div>


          {/* --- Item Listing Grid --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredItems.map(item => (
                <motion.div key={item.id}
                  className="rounded-lg overflow-hidden cursor-pointer border transition-all duration-300 ease-in-out flex flex-col"
                  style={{ backgroundColor: primaryVeryLightColor, borderColor: primaryLightColor }}
                  onClick={() => openViewItemModal(item)}
                  whileHover={{ y: -4, boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.1), 0 4px 6px -2px rgba(139, 92, 246, 0.05)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                >
                  <div className="relative">
                    <img
                      src={item.imageUrl || `https://via.placeholder.com/300x200/${borderColor.substring(1)}/${textColorSecondary.substring(1)}?text=No+Image`}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => handleImageError(e, "No Image")}
                    />
                    {item.price !== undefined && item.price > 0 && (
                      <div className="absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full shadow" style={{ backgroundColor: pinkBaseColor }}>
                        PKR {item.price.toLocaleString()}
                      </div>
                    )}
                    {(item.price === undefined || item.price === 0) && (
                      <div className="absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full shadow" style={{ backgroundColor: successColor }}>
                        FREE
                      </div>
                    )}
                    {!isInitialItem(item.id) && (
                      <button
                        onClick={(e) => openDeleteConfirmModal(item.id, e)}
                        className="absolute bottom-2 right-2 p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow transition-all"
                        style={{ color: dangerColor }}
                        title="Remove listing"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow" style={{ backgroundColor: cardBgColor }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: textColorPrimary }}>{item.name}</h3>
                    <p className="text-sm mb-3 line-clamp-2" style={{ color: textColorSecondary }}>{item.description}</p>
                    <div className="flex items-center text-xs mb-1" style={{ color: textColorSecondary }}>
                      <MapPin size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center text-xs mb-1" style={{ color: textColorSecondary }}>
                      <Clock size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{item.pickupTimes}</span>
                    </div>
                    <div className="flex items-center text-xs mt-1" style={{ color: textColorSecondary }}>
                      <User size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">Given by: {item.giverName}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {(filteredItems.length === 0) && (
              <div className="col-span-full text-center py-10">
                <p className="text-lg" style={{ color: textColorSecondary }}>No items found matching your search.</p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                    style={{ backgroundColor: primaryBaseColor, color: 'white' }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = primaryHoverColor}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = primaryBaseColor}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>


          {/* --- Modals --- */}

          {/* Add Item Modal */}
          <AnimatePresence>
            {isAddItemModalOpen && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeAddItemModal}
              >
                <motion.div
                  className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto relative"
                  style={{ backgroundColor: cardBgColor }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={closeAddItemModal}
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-2xl font-bold mb-6" style={{ color: textColorPrimary }}>List a New Item</h2>
                  <form onSubmit={handleAddItemSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: textColorPrimary }}>Item Image (Optional)</label>
                      <div
                        className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all hover:border-purple-400"
                        style={{ borderColor: itemImagePreview ? primaryBaseColor : borderColor }}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleItemImageChange} />
                        {itemImagePreview ? (
                          <img src={itemImagePreview} alt="Item Preview" className="h-40 mx-auto object-contain rounded" />
                        ) : (
                          <div className="py-6">
                            <UploadCloud size={40} className="mx-auto mb-2" style={{ color: textColorSecondary }} />
                            <p className="text-sm" style={{ color: textColorSecondary }}>Click or drag image here</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <div>
                        <label htmlFor="name" className="sr-only">Item Name</label>
                        <input id="name" name="name" type="text" value={newItem.name} onChange={handleNewItemInputChange} required placeholder="Item Name"
                          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties} />
                      </div>
                      <div>
                        <label htmlFor="description" className="sr-only">Description</label>
                        <textarea id="description" name="description" value={newItem.description} onChange={handleNewItemInputChange} required rows={3} placeholder="Description..."
                          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="price" className="sr-only">Price (PKR, optional)</label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-gray-500 sm:text-sm">PKR</span></div>
                        <input type="number" id="price" name="price" value={newItem.price} onChange={handleNewItemInputChange} min="0" step="1" placeholder="0 (Leave empty if free)"
                          className="w-full pl-12 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties} />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Enter price or leave empty/0 if the item is free.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="location" className="sr-only">Pickup Location</label>
                        <input id="location" name="location" type="text" value={newItem.location} onChange={handleNewItemInputChange} required placeholder="Pickup Location..."
                          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties} />
                      </div>
                      <div>
                        <label htmlFor="pickupTimes" className="sr-only">Pickup Times</label>
                        <input id="pickupTimes" name="pickupTimes" type="text" value={newItem.pickupTimes} onChange={handleNewItemInputChange} required placeholder="Preferred Pickup Times..."
                          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="giverName" className="sr-only">Your Name</label>
                        <input id="giverName" name="giverName" type="text" value={newItem.giverName} onChange={handleNewItemInputChange} required placeholder="Your Name"
                          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties} />
                      </div>
                      <div>
                        <label htmlFor="giverContactInfo" className="sr-only">Contact Method</label>
                        <input id="giverContactInfo" name="giverContactInfo" type="text" value={newItem.giverContactInfo} onChange={handleNewItemInputChange} required placeholder="Preferred Contact Method..."
                          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                          style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties} />
                      </div>
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting || showSuccessTick}
                        className={`w-full px-4 py-2.5 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all flex items-center justify-center ${isSubmitting || showSuccessTick ? 'cursor-not-allowed' : ''}`}
                        style={{ backgroundColor: showSuccessTick ? successColor : primaryBaseColor, opacity: isSubmitting ? 0.7 : 1, color: 'white', '--tw-ring-color': showSuccessTick ? successColor : primaryBaseColor, '--tw-ring-offset-color': cardBgColor } as React.CSSProperties}
                        onMouseOver={e => !isSubmitting && !showSuccessTick ? e.currentTarget.style.backgroundColor = primaryHoverColor : null}
                        onMouseOut={e => !isSubmitting && !showSuccessTick ? e.currentTarget.style.backgroundColor = primaryBaseColor : null} >
                        {showSuccessTick ? ( <> <CheckCircle size={20} className="mr-2" /> Listed Successfully! </> ) : isSubmitting ? ( <> <Loader2 size={20} className="mr-2 animate-spin" /> Listing... </> ) : ( <> <UploadCloud size={20} className="mr-2" /> List Item </> )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View Item Modal */}
          <AnimatePresence>
            {isViewItemModalOpen && selectedItem && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={closeViewItemModal} >
                <motion.div
                  className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto relative"
                  style={{ backgroundColor: cardBgColor }}
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                  onClick={e => e.stopPropagation()} >
                  <button className="absolute right-6 top-6 z-10 text-gray-400 hover:text-gray-600 transition-colors" onClick={closeViewItemModal} >
                    <X size={24} />
                  </button>
                  <div className="flex items-center mb-5 pb-4 border-b" style={{ borderColor: borderColor }}>
                    <img src={selectedItem.giverProfilePicUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedItem.giverName)}&background=random&color=fff`} alt={selectedItem.giverName} className="w-12 h-12 rounded-full mr-3 object-cover" onError={(e) => { const img = e.currentTarget; img.onerror = null; img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedItem.giverName.substring(0, 2) || "??")}&background=random&color=fff`; img.className = img.className + ' object-contain'; }} />
                    <div className="flex-grow">
                      <p className="text-xs" style={{ color: textColorSecondary }}>Listed by:</p>
                      <h3 className="text-md font-medium" style={{ color: textColorPrimary }}>{selectedItem.giverName}</h3>
                      <p className="text-sm" style={{ color: textColorSecondary }}>Contact: {selectedItem.giverContactInfo}</p>
                    </div>
                    {selectedItem.id && !isInitialItem(selectedItem.id) && (
                      <button onClick={(e) => { e.stopPropagation(); openDeleteConfirmModal(selectedItem.id, e); }} className="p-2 rounded-full hover:bg-red-50 transition-colors" style={{ color: dangerColor }} title="Remove listing" >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                  <div className="relative mb-4">
                    <img src={selectedItem.imageUrl || `https://via.placeholder.com/400x300/${borderColor.substring(1)}/${textColorSecondary.substring(1)}?text=No+Image`} alt={selectedItem.name} className="w-full h-48 object-cover rounded-lg" onError={(e) => handleImageError(e, "No Image")} />
                    {selectedItem.price !== undefined && selectedItem.price > 0 && ( <div className="absolute top-3 right-3 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg" style={{ backgroundColor: pinkBaseColor }}> PKR {selectedItem.price.toLocaleString()} </div> )}
                    {(selectedItem.price === undefined || selectedItem.price === 0) && ( <div className="absolute top-3 right-3 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg" style={{ backgroundColor: successColor }}> FREE </div> )}
                  </div>
                  <h2 className="text-xl font-bold mb-2" style={{ color: textColorPrimary }}>{selectedItem.name}</h2>
                  <p className="text-sm mb-4" style={{ color: textColorSecondary }}>{selectedItem.description}</p>
                  <div className="flex items-center mb-2" style={{ color: textColorSecondary }}> <MapPin size={16} className="mr-2 flex-shrink-0" /> <span>{selectedItem.location}</span> </div>
                  <div className="flex items-center mb-4" style={{ color: textColorSecondary }}> <Clock size={16} className="mr-2 flex-shrink-0" /> <span>{selectedItem.pickupTimes}</span> </div>
                  <div className="mt-6 border-t pt-4" style={{ borderColor: borderColor }}>
                    <h3 className="text-md font-medium mb-3" style={{ color: textColorPrimary }}>Message Giver (Simulation)</h3>
                    <div className="rounded-lg p-3 mb-3 max-h-40 overflow-y-auto" style={{ minHeight: '80px', backgroundColor: lightBgColor }}>
                      {sentMessages.length === 0 ? ( <p className="text-center text-sm italic" style={{ color: textColorSecondary }}>No messages yet</p> ) : ( sentMessages.map((msg, i) => ( <div key={i} className={`mb-2 text-sm p-2 rounded-lg ${i % 2 === 0 ? 'ml-auto max-w-[75%] text-right' : 'bg-gray-200 mr-auto max-w-[75%]'}`} style={i % 2 === 0 ? { backgroundColor: primaryLightColor, color: textColorPrimary } : { backgroundColor: gray200, color: textColorPrimary } } > {msg} </div> )) )}
                    </div>
                    <div className="flex mt-2">
                      <input type="text" value={messageInput} onChange={handleMessageInputChange} onKeyDown={handleKeyDown} placeholder="Type a message..." className="flex-grow px-3 py-2 rounded-l-lg border focus:outline-none focus:ring-2 focus:border-transparent" style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties} />
                      <button onClick={handleSendMessage} className="px-4 py-2 rounded-r-lg transition-colors duration-200" style={{ backgroundColor: primaryBaseColor, color: 'white' }} onMouseOver={e => e.currentTarget.style.backgroundColor = primaryHoverColor} onMouseOut={e => e.currentTarget.style.backgroundColor = primaryBaseColor} >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {isDeleteModalOpen && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={closeDeleteConfirmModal} >
                <motion.div
                  className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl"
                  style={{ backgroundColor: cardBgColor }}
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                  onClick={e => e.stopPropagation()} >
                  <h3 className="text-lg font-semibold mb-3" style={{ color: textColorPrimary }}>Remove Listing</h3>
                  <p style={{ color: textColorSecondary }}>Are you sure you want to remove this item listing? This action cannot be undone.</p>
                  <div className="flex justify-end gap-3 mt-6">
                    <button onClick={closeDeleteConfirmModal} className="px-4 py-2 rounded-md border font-medium hover:bg-gray-100 transition-colors" style={{ borderColor: borderColor, color: textColorSecondary }} > Cancel </button>
                    <button onClick={confirmDelete} className="px-4 py-2 rounded-md font-medium text-white transition-colors duration-200 hover:opacity-90" style={{ backgroundColor: dangerColor }} > Remove </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Donation Modal */}
          <AnimatePresence>
            {isDonationOpen && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsDonationOpen(false)} >
                <motion.div
                  className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl"
                   style={{ backgroundColor: cardBgColor }}
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                  onClick={e => e.stopPropagation()} >
                  <h3 className="text-xl font-semibold text-center mb-4" style={{ color: textColorPrimary }}>Donate to Palestine Relief</h3>
                  <p className="text-center text-sm mb-6" style={{ color: textColorSecondary }}>Your contribution makes a difference.</p>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[500, 1000, 5000].map(amount => (
                      <button key={amount} onClick={() => handleDonationAmountSelect(amount)} className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors ${donationAmount === amount ? 'ring-2' : 'hover:bg-gray-100'}`} style={{ color: textColorPrimary, borderColor: donationAmount === amount ? primaryBaseColor : borderColor, backgroundColor: donationAmount === amount ? primaryLightColor : 'transparent', '--tw-ring-color': primaryBaseColor } as React.CSSProperties} > PKR {amount} </button>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="customAmount" className="block text-sm font-medium mb-1" style={{ color: textColorSecondary }}>Or enter custom amount:</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-gray-500 sm:text-sm">PKR</span></div>
                      <input type="number" id="customAmount" name="customAmount" min="50" step="50" placeholder="Enter amount" value={typeof donationAmount === 'string' ? donationAmount : ''} onChange={e => handleDonationAmountSelect(e.target.value)} onFocus={() => setDonationAmount('')} className="w-full pl-12 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent shadow-sm" style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties} />
                    </div>
                  </div>
                  <button onClick={handleConfirmDonation} className="w-full mt-6 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-all flex items-center justify-center" style={{ '--tw-ring-offset-color': cardBgColor } as React.CSSProperties} >
                    <Heart size={18} className="mr-2" fill="white" /> Confirm Donation
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


    </MainLayout>
  );
};

export default CommunitySharePage;