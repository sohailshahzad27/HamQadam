import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { v4 as uuidv4 } from 'uuid'; // Using Date.now() for IDs as in your original code

type Community = {
  id: string;
  name: string;
  area: string;
  members: number;
  description: string;
  image: string;
  joined: boolean;
};

type Message = {
  id: string;
  user: string;
  avatar: string;
  message: string;
  time: string;
  replies: number; // This might need logic to manage
};

type Announcement = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
};

type Professional = {
  id: string;
  name: string;
  profession: string;
  specialty: string;
  contact: string; // e.g., email, phone
  phone?: string; // Optional phone, or just use contact
};

type Business = {
  id: string;
  name: string;
  type: string; // e.g., Restaurant, Shop, Service
  description: string;
  address: string;
  hours: string; // e.g., "9:00 AM - 6:00 PM"
};

type LostFoundItem = {
  id: string;
  type: 'lost' | 'found';
  title: string; // e.g., "Lost Cat", "Found Keys"
  description: string;
  date: string; // Date when lost/found
  contact: string; // How to contact the owner/finder
  isFound: boolean;
};

type Campaign = {
  id: string;
  title: string;
  description: string;
  goal: string; // e.g., "$1000"
  progress: number; // e.g., 500 (current amount raised)
  endDate: string;
};

type CommunityStore = {
  communities: Community[];
  // Nested data structure where keys are community IDs
  messages: Record<string, Message[]>;
  announcements: Record<string, Announcement[]>;
  professionals: Record<string, Professional[]>;
  businesses: Record<string, Business[]>;
  lostFoundItems: Record<string, LostFoundItem[]>;
  campaigns: Record<string, Campaign[]>;

  // Actions for Communities
  addCommunity: (community: Omit<Community, 'id' | 'joined' | 'members'>) => string;
  updateCommunity: (id: string, updates: Partial<Community>) => void;
  deleteCommunity: (id: string) => void;
  joinCommunity: (id: string) => void;
  leaveCommunity: (id: string) => void;

  // Actions for Nested Data (requires communityId)
  addMessage: (communityId: string, message: Omit<Message, 'id'>) => string;
  addAnnouncement: (communityId: string, announcement: Omit<Announcement, 'id'>) => string;
  addProfessional: (communityId: string, professional: Omit<Professional, 'id'>) => string;
  addBusiness: (communityId: string, business: Omit<Business, 'id'>) => string;
  addLostFoundItem: (communityId: string, item: Omit<LostFoundItem, 'id'>) => string;
  addCampaign: (communityId: string, campaign: Omit<Campaign, 'id'>) => string;

  deleteMessage: (communityId: string, messageId: string) => void;
  deleteAnnouncement: (communityId: string, announcementId: string) => void;
  deleteProfessional: (communityId: string, professionalId: string) => void;
  deleteBusiness: (communityId: string, businessId: string) => void;
  deleteLostFoundItem: (communityId: string, itemId: string) => void;
  deleteCampaign: (communityId: string, campaignId: string) => void;
};

// --- Updated DEFAULT_COMMUNITIES with your requested list and images ---
const DEFAULT_COMMUNITIES: Community[] = [
  // --- My Communities (joined: true) ---
  {
    id: 'comm-football', // Using descriptive IDs
    name: 'Footballers Club',
    area: 'Local Grounds',
    members: 125, // Sample member count
    description: 'Connect with local footballers, find matches, and organize practice sessions in your area.',
    image: 'https://wallpapers.com/images/hd/messi-pictures-9qppxor06pzudlr1.jpg', // Example Football Field Image
    joined: true,
  },
  {
    id: 'comm-islamabad',
    name: 'Islamabad Residents',
    area: 'Islamabad Capital Territory',
    members: 5300, // Sample member count
    description: 'A community for residents of Islamabad to share news, events, and local information.',
    image: 'https://islamabad.comsats.edu.pk/assets/img/islamabad.jpeg', // Example Islamabad Cityscape Image
    joined: true,
  },
  {
    id: 'comm-gikians',
    name: 'GIKians Connect',
    area: 'GIK Institute, Topi',
    members: 3800, // Sample member count
    description: 'Connect with students, alumni, and faculty of GIK Institute for networking and discussions.',
    image: 'https://giki.edu.pk/wp-content/uploads/2019/09/10649697_710129879074987_5414857352736262169_n.jpg', // Example University/Campus Image
    joined: true,
  },

  // --- Discover Communities (joined: false) ---
  {
    id: 'comm-cricket',
    name: 'Cricket Fanatics Pakistan',
    area: 'Nationwide',
    members: 950, // Sample member count
    description: 'Discuss your favorite matches, players, and everything about cricket with fans across Pakistan.',
    image: 'https://media.istockphoto.com/id/641189676/photo/cricket-stadium.jpg?s=612x612&w=0&k=20&c=6aUm1D7NiTTR6ZC4MCcLW2zBnMbIwfqDqc8NBIDATn4=', // Example Cricket Match Image
    joined: false,
  },
  {
    id: 'comm-lahore',
    name: 'Lahore Community Hub',
    area: 'Lahore, Punjab',
    members: 7100, // Sample member count
    description: 'Stay updated on local happenings, share recommendations, and connect with people in Lahore.',
    image: 'https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/07/11/9ec44383d7297a03634bcd559ddd216a_400x400.jpeg', // Example Lahore Landmark Image
    joined: false,
  },
  {
    id: 'comm-gym',
    name: 'GYM Motivation',
    area: 'Fitness Centers',
    members: 450, // Sample member count
    description: 'Find workout partners, share fitness tips, and stay motivated on your health journey.',
    image: 'https://i.ytimg.com/vi/gey73xiS8F4/hq720.jpg?sqp=-oaymwEnCK4FEIIDSFryq4qpAxkIARUAAAAAGAElAADIQj0AgKJDuAK33r8Y&rs=AOn4CLBNjAOJ8v5wma7dfeeKfVqLY82xXA', // Example Gym Image
    joined: false,
  },
  {
    id: 'comm-northern-trips',
    name: 'Northern Area Trips',
    area: 'Gilgit-Baltistan & KPK',
    members: 1600, // Sample member count
    description: 'Plan and discuss trips, share breathtaking photos, and find travel companions for Northern Pakistan adventures.',
    image: 'https://pyaraskardu.com/wp-content/uploads/2023/04/fairy-meadows.jpg', // Example Northern Areas Image
    joined: false,
  },
  {
    id: 'comm-quran-study',
    name: 'Quran Study Circle',
    area: 'Online/Local',
    members: 220, // Sample member count
    description: 'Join discussions, share insights, and deepen your understanding through collective Quran study.',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/051/533/891/small_2x/open-holy-quran-book-with-light-rays-falling-on-it-photo.jpeg', // Example Open Book/Quran Image
    joined: false,
  },
];
// --- End of Updated DEFAULT_COMMUNITIES ---


export const useCommunityStore = create<CommunityStore>()(
  persist(
    (set) => ({
      communities: DEFAULT_COMMUNITIES,
      messages: {},
      announcements: {},
      professionals: {},
      businesses: {},
      lostFoundItems: {},
      campaigns: {},

      addCommunity: (community) => {
        const newCommunity = {
          ...community,
          // Using Date.now().toString() for ID as in your original code
          id: Date.now().toString(),
          joined: true, // New communities start as joined by creator
          members: 1 // New communities start with 1 member (the creator)
        };
        set((state) => ({
          communities: [...state.communities, newCommunity],
          // Initialize nested data for the new community ID
          messages: { ...state.messages, [newCommunity.id]: [] },
          announcements: { ...state.announcements, [newCommunity.id]: [] },
          professionals: { ...state.professionals, [newCommunity.id]: [] },
          businesses: { ...state.businesses, [newCommunity.id]: [] },
          lostFoundItems: { ...state.lostFoundItems, [newCommunity.id]: [] },
          campaigns: { ...state.campaigns, [newCommunity.id]: [] },
        }));
        return newCommunity.id;
      },

      updateCommunity: (id, updates) => set((state) => ({
        communities: state.communities.map(c =>
          c.id === id ? { ...c, ...updates } : c
        )
      })),

      deleteCommunity: (id) => set((state) => ({
        communities: state.communities.filter(c => c.id !== id),
        // Also remove associated data for this community
        messages: Object.fromEntries(Object.entries(state.messages).filter(([key]) => key !== id)),
        announcements: Object.fromEntries(Object.entries(state.announcements).filter(([key]) => key !== id)),
        professionals: Object.fromEntries(Object.entries(state.professionals).filter(([key]) => key !== id)),
        businesses: Object.fromEntries(Object.entries(state.businesses).filter(([key]) => key !== id)),
        lostFoundItems: Object.fromEntries(Object.entries(state.lostFoundItems).filter(([key]) => key !== id)),
        campaigns: Object.fromEntries(Object.entries(state.campaigns).filter(([key]) => key !== id)),
      })),

      joinCommunity: (id) => set((state) => ({
        communities: state.communities.map(c =>
          c.id === id ? { ...c, joined: true, members: c.members + 1 } : c
        )
      })),

      leaveCommunity: (id) => set((state) => ({
        communities: state.communities.map(c =>
          c.id === id ? { ...c, joined: false, members: Math.max(0, c.members - 1) } : c // Ensure members don't go below 0
        )
      })),

      // Actions for nested data (Messages, Announcements, etc.)
      addMessage: (communityId, message) => {
        const newMessage = {
          ...message,
          id: Date.now().toString() // Simple ID generation
        };
        set((state) => ({
          messages: {
            ...state.messages,
            [communityId]: [...(state.messages[communityId] || []), newMessage]
          }
        }));
        return newMessage.id;
      },

      addAnnouncement: (communityId, announcement) => {
        const newAnnouncement = {
          ...announcement,
          id: Date.now().toString()
        };
        set((state) => ({
          announcements: {
            ...state.announcements,
            [communityId]: [...(state.announcements[communityId] || []), newAnnouncement]
          }
        }));
        return newAnnouncement.id;
      },

      addProfessional: (communityId, professional) => {
        const newProfessional = {
          ...professional,
          id: Date.now().toString()
        };
        set((state) => ({
          professionals: {
            ...state.professionals,
            [communityId]: [...(state.professionals[communityId] || []), newProfessional]
          }
        }));
        return newProfessional.id;
      },

      addBusiness: (communityId, business) => {
        const newBusiness = {
          ...business,
          id: Date.now().toString()
        };
        set((state) => ({
          businesses: {
            ...state.businesses,
            [communityId]: [...(state.businesses[communityId] || []), newBusiness]
          }
        }));
        return newBusiness.id;
      },

      addLostFoundItem: (communityId, item) => {
        const newItem = {
          ...item,
          id: Date.now().toString()
        };
        set((state) => ({
          lostFoundItems: {
            ...state.lostFoundItems,
            [communityId]: [...(state.lostFoundItems[communityId] || []), newItem]
          }
        }));
        return newItem.id;
      },

      addCampaign: (communityId, campaign) => {
        const newCampaign = {
          ...campaign,
          id: Date.now().toString()
        };
        set((state) => ({
          campaigns: {
            ...state.campaigns,
            [communityId]: [...(state.campaigns[communityId] || []), newCampaign]
          }
        }));
        return newCampaign.id;
      },


      // Delete actions for nested data
      deleteMessage: (communityId, messageId) => set((state) => ({
        messages: {
          ...state.messages,
          [communityId]: (state.messages[communityId] || []).filter(msg => msg.id !== messageId)
        }
      })),

      deleteAnnouncement: (communityId, announcementId) => set((state) => ({
        announcements: {
          ...state.announcements,
          [communityId]: (state.announcements[communityId] || []).filter(ann => ann.id !== announcementId)
        }
      })),

      deleteProfessional: (communityId, professionalId) => set((state) => ({
        professionals: {
          ...state.professionals,
          [communityId]: (state.professionals[communityId] || []).filter(prof => prof.id !== professionalId)
        }
      })),

      deleteBusiness: (communityId, businessId) => set((state) => ({
        businesses: {
          ...state.businesses,
          [communityId]: (state.businesses[communityId] || []).filter(bus => bus.id !== businessId)
        }
      })),

      deleteLostFoundItem: (communityId, itemId) => set((state) => ({
        lostFoundItems: {
          ...state.lostFoundItems,
          [communityId]: (state.lostFoundItems[communityId] || []).filter(item => item.id !== itemId)
        }
      })),

      deleteCampaign: (communityId, campaignId) => set((state) => ({
        campaigns: {
          ...state.campaigns,
          [communityId]: (state.campaigns[communityId] || []).filter(camp => camp.id !== campaignId)
        }
      })),
    }),
    {
      name: 'community-store',
      // Only persist communities and associated data
      partialize: (state) => ({
         communities: state.communities,
         messages: state.messages,
         announcements: state.announcements,
         professionals: state.professionals,
         businesses: state.businesses,
         lostFoundItems: state.lostFoundItems,
         campaigns: state.campaigns,
      })
    }
  )
);