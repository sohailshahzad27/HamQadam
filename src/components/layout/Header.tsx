import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, X, UserCircle, Box, Bell, BellDot, MapPin, HandCoins, Search, Megaphone } from "lucide-react";
import { Users, Heart, Scale, Award, ShieldAlert, Briefcase, Home } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinksPrimary = [
    { to: "/Communities", text: "Communities", icon: Users },
  ];

  const navLinksSecondary = [
    { to: "/BaitulMaal", text: "BaitulMaal", icon: Box },
    { to: "/LostFound", text: "Lost & Found", icon: Home },
    { to: "/health", text: "Health", icon: Heart },
    { to: "/rights", text: "Rights", icon: Scale },
    { to: "/stories", text: "Stories", icon: Award },
    { to: "/safety", text: "Safety", icon: ShieldAlert },
  ];

  // Enhanced mock data for notifications with links to relevant sections
  const mockNotifications = [
    // Lost & Found notifications
    {
      id: 1,
      section: "lost-found",
      type: "found",
      title: "Found: Prayer Mat",
      message: "A blue prayer mat was found near the mosque entrance",
      time: "2 hours ago",
      read: false,
      location: "Main Mosque - Prayer Area",
      icon: Search,
      link: "/LostFound"
    },
    {
      id: 2,
      section: "lost-found",
      type: "lost",
      title: "Lost: Wallet",
      message: "Black leather wallet lost near parking lot",
      time: "1 day ago",
      read: true,
      location: "East Parking Lot",
      icon: Search,
      link: "/LostFound"
    },

    // BaitulMaal notifications
    {
      id: 3,
      section: "baitulmaal",
      type: "donation",
      title: "Donation Received",
      message: "Your donation of $50 has been received for the food drive",
      time: "1 day ago",
      read: true,
      campaign: "Ramadan Food Drive",
      icon: HandCoins,
      link: "/BaitulMaal"
    },
    {
      id: 4,
      section: "baitulmaal",
      type: "campaign",
      title: "New Campaign",
      message: "Park Bench Restoration campaign has reached 65% of its goal",
      time: "3 days ago",
      read: false,
      campaign: "Park Bench Restoration",
      icon: HandCoins,
      link: "/BaitulMaal"
    },

    // Community notifications
    {
      id: 5,
      section: "community",
      type: "member",
      title: "New Member Joined",
      message: "Sarah Ahmed joined your 'Quran Study' community",
      time: "3 days ago",
      read: true,
      community: "Quran Study Group",
      icon: Users,
      link: "/Communities"
    },
    {
      id: 6,
      section: "community",
      type: "announcement",
      title: "New Announcement",
      message: "Community Garden Cleanup Day this Saturday",
      time: "5 days ago",
      read: false,
      community: "Neighborhood Group",
      icon: Megaphone,
      link: "/Communities"
    },

    // Safety notifications
    {
      id: 7,
      section: "safety",
      type: "alert",
      title: "Safety Alert",
      message: "Reported suspicious activity near parking lot",
      time: "1 week ago",
      read: true,
      location: "East Parking Lot",
      icon: ShieldAlert,
      link: "/safety"
    }
  ];

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const handleNotificationClick = (link: string) => {
    navigate(link);
    setNotificationsOpen(false);
  };

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  // Helper function to render notification items consistently
  const renderNotificationItem = (notification: typeof mockNotifications[0]) => {
    const Icon = notification.icon;
    return (
      <div
        key={notification.id}
        onClick={() => handleNotificationClick(notification.link)}
        className={`border-b px-4 py-3 hover:bg-purple-50 cursor-pointer transition-colors ${!notification.read ? 'bg-purple-50' : ''
          }`}
      >
        <div className="flex gap-3">
          <div className="mt-1">
            <Icon className={`h-5 w-5 ${notification.section === 'safety' ? 'text-red-500' :
                notification.section === 'baitulmaal' ? 'text-green-500' :
                  notification.section === 'lost-found' ? 'text-blue-500' :
                    'text-purple-500'
              }`} />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{notification.title}</p>
            <p className="text-sm text-gray-600">{notification.message}</p>
            <div className="flex items-center mt-1 gap-2">
              {notification.location && (
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  {notification.location}
                </div>
              )}
              {notification.community && (
                <Badge variant="outline" className="text-xs">
                  {notification.community}
                </Badge>
              )}
              {notification.campaign && (
                <Badge variant="outline" className="text-xs">
                  {notification.campaign}
                </Badge>
              )}
              <span className="text-xs text-gray-500 ml-auto">{notification.time}</span>
            </div>
          </div>
          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-purple-600 mt-2"></span>
          )}
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
                HQ
              </span>
              <h1 className="ml-3 font-heading text-xl font-bold bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
                HumQadam
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 mx-8 flex-1 justify-center">
            {navLinksPrimary.concat(navLinksSecondary).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  relative px-1 py-2 text-sm font-medium transition-colors
                  hover:shadow-[0_4px_12px_rgba(168,85,247,0.1)]
                  ${isActive(link.to)
                    ? 'text-purple-600'
                    : 'text-gray-500 hover:text-gray-900'
                  }
                `}
              >
                <div className="flex items-center">
                  {link.icon && React.createElement(link.icon, { className: "mr-2 h-4 w-4" })}
                  {link.text}
                </div>
                {isActive(link.to) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side elements */}
          <div className="flex items-center justify-end space-x-4">
            {/* Notifications and Profile */}
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full relative hover:bg-purple-50 transition-colors"
                      onClick={toggleNotifications}
                    >
                      {unreadCount > 0 ? (
                        <>
                          <BellDot className="h-5 w-5 text-purple-600" />
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-purple-600 hover:bg-purple-700">
                            {unreadCount}
                          </Badge>
                        </>
                      ) : (
                        <Bell className="h-5 w-5 text-gray-500 hover:text-purple-600 transition-colors" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-0 mr-2 mt-2 shadow-xl border border-gray-200 rounded-lg">
                    <div className="border-b px-4 py-3 bg-purple-50 rounded-t-lg">
                      <h3 className="font-semibold text-lg text-purple-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.length > 0 ? (
                        <>
                          {/* Lost & Found Section */}
                          <div className="px-4 py-2 bg-gray-50 border-b">
                            <h4 className="font-medium text-sm text-gray-700 flex items-center">
                              <Search className="h-4 w-4 mr-2 text-blue-500" />
                              Lost & Found
                            </h4>
                          </div>
                          {mockNotifications
                            .filter(n => n.section === "lost-found")
                            .map(renderNotificationItem)}

                          {/* BaitulMaal Section */}
                          <div className="px-4 py-2 bg-gray-50 border-b">
                            <h4 className="font-medium text-sm text-gray-700 flex items-center">
                              <HandCoins className="h-4 w-4 mr-2 text-green-500" />
                              BaitulMaal
                            </h4>
                          </div>
                          {mockNotifications
                            .filter(n => n.section === "baitulmaal")
                            .map(renderNotificationItem)}

                          {/* Community Section */}
                          <div className="px-4 py-2 bg-gray-50 border-b">
                            <h4 className="font-medium text-sm text-gray-700 flex items-center">
                              <Users className="h-4 w-4 mr-2 text-purple-500" />
                              Community
                            </h4>
                          </div>
                          {mockNotifications
                            .filter(n => n.section === "community")
                            .map(renderNotificationItem)}

                          {/* Safety Section */}
                          <div className="px-4 py-2 bg-gray-50 border-b">
                            <h4 className="font-medium text-sm text-gray-700 flex items-center">
                              <ShieldAlert className="h-4 w-4 mr-2 text-red-500" />
                              Safety
                            </h4>
                          </div>
                          {mockNotifications
                            .filter(n => n.section === "safety")
                            .map(renderNotificationItem)}
                        </>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No notifications yet
                        </div>
                      )}
                    </div>
                    <div className="border-t px-4 py-2 text-center bg-gray-50 rounded-b-lg">
                      <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-100">
                        Mark all as read
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full relative hover:bg-purple-50 transition-colors group"
                    >
                      {currentUser?.photoURL ? (
                        <>
                          <img
                            src={currentUser.photoURL}
                            alt="Profile"
                            className="h-8 w-8 rounded-full object-cover group-hover:ring-2 group-hover:ring-purple-300 transition-all"
                          />
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white group-hover:border-purple-50"></span>
                        </>
                      ) : (
                        <div className="relative group">
                          <UserCircle className="h-8 w-8 text-purple-600 group-hover:text-purple-700 transition-colors" />
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white group-hover:border-purple-50"></span>
                        </div>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-1 mr-2 mt-2 shadow-xl border border-gray-200 rounded-lg">
                    <Link to="/profile">
                      <Button variant="ghost" className="w-full justify-start hover:bg-purple-50">
                        Profile
                      </Button>
                    </Link>
                    <Link to="/about">
                      <Button variant="ghost" className="w-full justify-start hover:bg-purple-50">
                        About Us
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:bg-red-400 text-red-600"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="ml-4 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-colors">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden hover:bg-purple-50 hover:text-purple-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            {navLinksPrimary.concat(navLinksSecondary).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  group flex items-center px-3 py-2 rounded-md text-base font-medium
                  ${isActive(link.to)
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                onClick={toggleMenu}
              >
                {link.icon && React.createElement(link.icon, { className: "mr-3 h-5 w-5" })}
                {link.text}
              </Link>
            ))}
            {/* Profile link in mobile menu */}
            {currentUser && (
              <>
                <Link
                  to="/profile"
                  className={`
                    group flex items-center px-3 py-2 rounded-md text-base font-medium
                    ${isActive('/profile')
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  onClick={toggleMenu}
                >
                  <UserCircle className="mr-3 h-5 w-5" />
                  Profile
                </Link>
                <Link
                  to="/about"
                  className={`
                    group flex items-center px-3 py-2 rounded-md text-base font-medium
                    ${isActive('/about')
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  onClick={toggleMenu}
                >
                  <Briefcase className="mr-3 h-5 w-5" />
                  About Us
                </Link>
                <div
                  className={`
                    group flex items-center px-3 py-2 rounded-md text-base font-medium cursor-pointer
                    ${isActive('/notifications')
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  onClick={() => {
                    toggleNotifications();
                    toggleMenu();
                  }}
                >
                  <Bell className="mr-3 h-5 w-5" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-auto bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div
                  className={`
                    group flex items-center px-3 py-2 rounded-md text-base font-medium cursor-pointer
                    text-gray-600 hover:bg-gray-50 hover:text-gray-900
                  `}
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                >
                  <X className="mr-3 h-5 w-5 text-red-1600" />
                  Sign Out
                </div>
              </>
            )}
            {!currentUser && (
              <Link
                to="/login"
                className={`
                  group flex items-center px-3 py-2 rounded-md text-base font-medium
                  ${isActive('/login')
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                onClick={toggleMenu}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;