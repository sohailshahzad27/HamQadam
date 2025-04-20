import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Loader2, CheckCircle, AlertCircle, Home, Phone, Briefcase, MapPin, ChevronDown, Twitter, Linkedin, Github, Instagram, Sun, Moon, Award, Zap } from 'lucide-react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, StorageError } from "firebase/storage";

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            x: [null, Math.random() * 100 - 50],
            y: [null, Math.random() * 100 - 50],
            opacity: [0, 0.3, 0],
            scale: [0.5, 1.2]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          className="absolute rounded-full bg-gradient-to-r from-primary to-secondary"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Helper function for uploading files with progress tracking
const uploadFile = (
  storage: any,
  file: File,
  uploadPath: string,
  onProgress: (progress: number) => void,
  onError: (error: StorageError) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, uploadPath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        onError(error);
        console.error("Firebase Storage Error:", error.code, error.message);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

// Local storage helper functions
const getLocalProfileData = (userId: string) => {
  const data = localStorage.getItem(`profile_${userId}`);
  return data ? JSON.parse(data) : null;
};

const saveLocalProfileData = (userId: string, data: any) => {
  localStorage.setItem(`profile_${userId}`, JSON.stringify(data));
};

export default function Profile() {
  const { currentUser, logout, updateEmail, updatePassword, updateProfile } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    photoURL: '',
    houseNumber: '',
    street: '',
    city: '',
    postalCode: '',
    contactNumber: '',
    profession: '',
    bio: '',
    twitter: '',
    linkedin: '',
    github: '',
    instagram: '',
    skills: [] as string[],
    newSkill: '',
    achievements: [] as string[],
    newAchievement: ''
  });

  useEffect(() => {
    if (currentUser) {
      // Load from local storage if available
      const localData = getLocalProfileData(currentUser.uid);
      
      setFormData({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        photoURL: currentUser.photoURL || '',
        houseNumber: localData?.houseNumber || '',
        street: localData?.street || '',
        city: localData?.city || '',
        postalCode: localData?.postalCode || '',
        contactNumber: localData?.contactNumber || '',
        profession: localData?.profession || '',
        bio: localData?.bio || '',
        twitter: localData?.twitter || '',
        linkedin: localData?.linkedin || '',
        github: localData?.github || '',
        instagram: localData?.instagram || '',
        skills: localData?.skills || [],
        achievements: localData?.achievements || [],
        newSkill: '',
        newAchievement: ''
      });
      
      setImagePreview(currentUser.photoURL || '');
      setImageFile(null);
      setIsPasswordSectionOpen(false);
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setError('');

      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validImageTypes.includes(file.type)) {
        setError('Invalid file type. Please select an image (JPEG, PNG, GIF, WebP).');
        setImageFile(null);
        setImagePreview(formData.photoURL || '/default-avatar.png');
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit.');
        setImageFile(null);
        setImagePreview(formData.photoURL || '/default-avatar.png');
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview('');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const addSkill = () => {
    if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addAchievement = () => {
    if (formData.newAchievement.trim() && !formData.achievements.includes(formData.newAchievement.trim())) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, prev.newAchievement.trim()],
        newAchievement: ''
      }));
    }
  };

  const removeAchievement = (achievementToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(achievement => achievement !== achievementToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    if (!currentUser) {
      setError('No user logged in.');
      setLoading(false);
      return;
    }

    const promises = [];
    let newPhotoURL = formData.photoURL;
    let hasChanges = false;

    try {
      // 1. Upload Image if selected
      if (imageFile) {
        const storage = getStorage();
        const uploadPath = `profilePictures/${currentUser.uid}/${Date.now()}_${imageFile.name}`;

        newPhotoURL = await uploadFile(
          storage,
          imageFile,
          uploadPath,
          (progress) => setUploadProgress(progress),
          (error) => {
            console.error("Storage Error:", error);
            setError(`Failed to upload profile picture: ${error.message}`);
            throw error;
          }
        );
        hasChanges = true;
      }

      // 2. Update Profile (Display Name and Photo URL if changed)
      const profileUpdates: { displayName?: string; photoURL?: string } = {};
      if (formData.displayName !== currentUser.displayName) {
        profileUpdates.displayName = formData.displayName;
        hasChanges = true;
      }
      if (newPhotoURL !== currentUser.photoURL && newPhotoURL) {
        profileUpdates.photoURL = newPhotoURL;
        hasChanges = true;
      }
      if (Object.keys(profileUpdates).length > 0) {
        promises.push(updateProfile(profileUpdates.displayName, profileUpdates.photoURL));
      }

      // 3. Update Email if changed
      if (formData.email !== currentUser.email) {
        if (!formData.email) throw new Error('Email address cannot be empty.');
        if (!formData.currentPassword) {
          throw new Error("Current password is required to change email.");
        }
        promises.push(updateEmail(formData.email, formData.currentPassword));
        hasChanges = true;
      }

      // 4. Update Password if fields are filled
      if (formData.newPassword || formData.confirmPassword) {
        if (!formData.currentPassword) {
          throw new Error("Current password is required to change password.");
        }
        if (!formData.newPassword || !formData.confirmPassword) {
          throw new Error("New password and confirmation are required.");
        }
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("New passwords do not match.");
        }
        if (formData.newPassword.length < 6) {
          throw new Error("New password must be at least 6 characters long.");
        }
        promises.push(updatePassword(formData.currentPassword, formData.newPassword));
        hasChanges = true;
      }

      // 5. Save additional data to localStorage
      const additionalData = {
        houseNumber: formData.houseNumber,
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        contactNumber: formData.contactNumber,
        profession: formData.profession,
        bio: formData.bio,
        twitter: formData.twitter,
        linkedin: formData.linkedin,
        github: formData.github,
        instagram: formData.instagram,
        skills: formData.skills,
        achievements: formData.achievements
      };
      
      // Check if any additional data has changed
      const localData = getLocalProfileData(currentUser.uid);
      if (JSON.stringify(additionalData) !== JSON.stringify(localData)) {
        hasChanges = true;
      }
      
      saveLocalProfileData(currentUser.uid, additionalData);

      if (!hasChanges && !imageFile) {
        setSuccess('No changes detected to save.');
      } else {
        await Promise.all(promises);

        setFormData(prev => ({
          ...prev,
          photoURL: newPhotoURL,
          email: formData.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));

        let successMessage = 'Profile updated successfully!';
        const updatedFields = [];
        if (profileUpdates.photoURL) updatedFields.push('picture');
        if (profileUpdates.displayName) updatedFields.push('display name');
        if (formData.email !== currentUser.email) updatedFields.push('email');
        if (formData.newPassword) updatedFields.push('password');
        if (additionalData.houseNumber !== localData?.houseNumber) updatedFields.push('address');
        if (additionalData.profession !== localData?.profession) updatedFields.push('profession');
        if (additionalData.bio !== localData?.bio) updatedFields.push('bio');
        if (additionalData.skills !== localData?.skills) updatedFields.push('skills');
        if (additionalData.achievements !== localData?.achievements) updatedFields.push('achievements');

        if (updatedFields.length > 0) {
          successMessage = `Successfully updated: ${updatedFields.join(', ')}.`;
        }
        setSuccess(successMessage);

        setImageFile(null);
        setIsEditing(false);
        setIsPasswordSectionOpen(false);
      }

    } catch (err: any) {
      let errorMessage = 'Failed to update profile.';
      if (err.code) {
        switch (err.code) {
          case 'auth/requires-recent-login':
            errorMessage = 'This action requires recent login. Please sign out and sign in again.';
            break;
          case 'auth/email-already-in-use':
            errorMessage = 'The new email address is already in use by another account.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'The new email address format is invalid.';
            break;
          case 'auth/weak-password':
            errorMessage = 'The new password is too weak (must be at least 6 characters long).';
            break;
          case 'auth/wrong-password':
            errorMessage = 'The current password entered is incorrect.';
            break;
          case 'storage/unauthorized':
            errorMessage = 'Permission denied. You cannot upload this file.';
            break;
          default:
            errorMessage = err.message || 'An unexpected error occurred.';
        }
      } else {
        errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
      if (err.code === 'auth/wrong-password') {
        setFormData(prev => ({ ...prev, currentPassword: '' }));
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    if (currentUser) {
      const localData = getLocalProfileData(currentUser.uid);
      setFormData({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        photoURL: currentUser.photoURL || '',
        houseNumber: localData?.houseNumber || '',
        street: localData?.street || '',
        city: localData?.city || '',
        postalCode: localData?.postalCode || '',
        contactNumber: localData?.contactNumber || '',
        profession: localData?.profession || '',
        bio: localData?.bio || '',
        twitter: localData?.twitter || '',
        linkedin: localData?.linkedin || '',
        github: localData?.github || '',
        instagram: localData?.instagram || '',
        skills: localData?.skills || [],
        achievements: localData?.achievements || [],
        newSkill: '',
        newAchievement: ''
      });
    }
    setImageFile(null);
    setImagePreview(currentUser?.photoURL || '');
    setIsPasswordSectionOpen(false);
  };

  if (!currentUser) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Please Log In</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">You need to be logged in to view your profile.</p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition transform hover:scale-105"
            >
              Go to Login
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <FloatingParticles />
          
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative z-10 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 md:p-8 text-white relative">
                <div className="absolute top-4 right-4">
                  
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-playfair">Your Profile</h1>
                    <p className="text-white/90 mt-1 text-sm md:text-base">Manage your account settings and personal details</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Profile Sidebar (Left Column) */}
                <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-700 p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-600 flex flex-col items-center">
                  <div className="relative group mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg mx-auto"
                    >
                      <img
                        src={imagePreview || formData.photoURL || '/default-avatar.png'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/default-avatar.png';
                        }}
                      />
                    </motion.div>
                    {isEditing && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={triggerFileInput}
                        title="Change profile picture"
                        className="absolute bottom-1 right-1 transform translate-x-1/2 md:translate-x-0 md:bottom-2 md:right-2 bg-primary p-2 rounded-full text-white opacity-80 group-hover:opacity-100 transition-all shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        <Camera className="h-4 w-4 md:h-5 md:w-5" />
                      </motion.button>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/jpeg, image/png, image/gif, image/webp"
                      className="hidden"
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center mt-2">
                    {formData.displayName || 'Anonymous User'}
                  </h2>

                  {/* Action Buttons */}
                  <div className="w-full mt-4 space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsEditing(true);
                        setError('');
                        setSuccess('');
                      }}
                      disabled={isEditing}
                      className={`w-full py-2 px-4 rounded-lg transition text-sm font-medium ${isEditing ? 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'}`}
                    >
                      Edit Profile
                    </motion.button>
                    {isEditing && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCancelEdit}
                        className="w-full py-2 px-4 rounded-lg transition text-sm font-medium bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                      >
                        Cancel
                      </motion.button>
                    )}
                  </div>

                  {/* Additional Info Boxes */}
                  <div className="w-full space-y-3 mt-6 text-sm">
                    {formData.profession ? (
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-500 flex items-center"
                      >
                        <Briefcase className="h-4 w-4 text-primary dark:text-primary-300 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200 font-medium truncate">{formData.profession}</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-500 flex items-center"
                      >
                        <Briefcase className="h-4 w-4 text-gray-400 dark:text-gray-300 mr-2 flex-shrink-0" />
                        <span className="text-gray-400 dark:text-gray-300 italic">Add your profession</span>
                      </motion.div>
                    )}

                    {formData.contactNumber ? (
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-500 flex items-center"
                      >
                        <Phone className="h-4 w-4 text-primary dark:text-primary-300 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200 font-medium truncate">{formData.contactNumber}</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-500 flex items-center"
                      >
                        <Phone className="h-4 w-4 text-gray-400 dark:text-gray-300 mr-2 flex-shrink-0" />
                        <span className="text-gray-400 dark:text-gray-300 italic">Add contact number</span>
                      </motion.div>
                    )}

                    {(formData.houseNumber || formData.street || formData.city) ? (
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-500"
                      >
                        <div className="flex items-start">
                          <Home className="h-4 w-4 text-primary dark:text-primary-300 mr-2 mt-0.5 flex-shrink-0" />
                          <div className="text-gray-700 dark:text-gray-200">
                            <p>
                              {formData.houseNumber} {formData.street}
                            </p>
                            <p>{formData.city}{formData.postalCode ? `, ${formData.postalCode}` : ''}</p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-500"
                      >
                        <div className="flex items-start">
                          <Home className="h-4 w-4 text-gray-400 dark:text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
                          <div className="text-gray-400 dark:text-gray-300 italic">Add your address</div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Social Media Links */}
                  {(formData.twitter || formData.linkedin || formData.github || formData.instagram) && (
                    <div className="w-full mt-6">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">CONNECT WITH ME</h3>
                      <div className="flex space-x-3 justify-center">
                        {formData.twitter && (
                          <a href={formData.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 transition">
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                        {formData.linkedin && (
                          <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition">
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                        {formData.github && (
                          <a href={formData.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                        {formData.instagram && (
                          <a href={formData.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition">
                            <Instagram className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Content Area (Right Column) */}
                <div className="w-full md:w-2/3 p-6 md:p-8">
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6 flex items-start text-sm"
                        role="alert"
                      >
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span className="flex-1">{error}</span>
                        <button onClick={() => setError('')} className="ml-2 text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100">&times;</button>
                      </motion.div>
                    )}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-200 px-4 py-3 rounded-lg mb-6 flex items-start text-sm"
                        role="alert"
                      >
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span className="flex-1">{success}</span>
                        <button onClick={() => setSuccess('')} className="ml-2 text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100">&times;</button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isEditing ? (
                    /* --- EDITING FORM --- */
                    <motion.form
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Loading Indicator for Image Upload */}
                      {loading && uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Uploading picture...</p>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Personal Information Section */}
                      <fieldset className="space-y-4">
                        <legend className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Personal Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Display Name
                            </label>
                            <input
                              type="text"
                              id="displayName"
                              name="displayName"
                              value={formData.displayName}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                              placeholder="Your Name"
                            />
                          </div>
                          <div>
                            <label htmlFor="profession" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Profession (Optional)
                            </label>
                            <input
                              type="text"
                              id="profession"
                              name="profession"
                              value={formData.profession}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                              placeholder="e.g. Software Engineer"
                            />
                          </div>
                          <div>
                            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Contact Number (Optional)
                            </label>
                            <input
                              type="tel"
                              id="contactNumber"
                              name="contactNumber"
                              value={formData.contactNumber}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                              placeholder="e.g. +1 555-1234"
                            />
                          </div>
                        </div>
                      </fieldset>

                      {/* Social Media Section */}
                      <fieldset className="space-y-4">
                        <legend className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Social Media (Optional)</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                              <Twitter className="h-4 w-4 mr-2 text-blue-400" /> Twitter
                            </label>
                            <input
                              type="url"
                              id="twitter"
                              name="twitter"
                              value={formData.twitter}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                              placeholder="https://twitter.com/username"
                            />
                          </div>
                          <div>
                            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                              <Linkedin className="h-4 w-4 mr-2 text-blue-600" /> LinkedIn
                            </label>
                            <input
                              type="url"
                              id="linkedin"
                              name="linkedin"
                              value={formData.linkedin}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                              placeholder="https://linkedin.com/in/username"
                            />
                          </div>
                          <div>
                            <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                              <Github className="h-4 w-4 mr-2 text-gray-700 dark:text-gray-300" /> GitHub
                            </label>
                            <input
                              type="url"
                              id="github"
                              name="github"
                              value={formData.github}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                              placeholder="https://github.com/username"
                            />
                          </div>
                          <div>
                            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                            <Instagram className="h-4 w-4 mr-2 text-pink-600" /> Instagram
                        </label>
                        <input
                          type="url"
                          id="instagram"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                          placeholder="https://instagram.com/username"
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Address Section */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Address (Optional)</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          House/Unit Number
                        </label>
                        <input
                          type="text"
                          id="houseNumber"
                          name="houseNumber"
                          value={formData.houseNumber}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                          placeholder="e.g. 123"
                        />
                      </div>
                      <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Street
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                          placeholder="e.g. Main Street"
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                          placeholder="e.g. New York"
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                          placeholder="e.g. 10001"
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Skills Section */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Skills</legend>
                    <div>
                      <div className="flex">
                        <input
                          type="text"
                          id="newSkill"
                          name="newSkill"
                          value={formData.newSkill}
                          onChange={handleChange}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                          placeholder="Add a skill"
                        />
                        <button
                          type="button"
                          onClick={addSkill}
                          className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          Add
                        </button>
                      </div>
                      {formData.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {formData.skills.map((skill, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-200"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="ml-2 text-primary/70 hover:text-primary dark:text-primary-300/70 dark:hover:text-primary-300"
                              >
                                &times;
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </fieldset>

                  {/* Achievements Section */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Achievements</legend>
                    <div>
                      <div className="flex">
                        <input
                          type="text"
                          id="newAchievement"
                          name="newAchievement"
                          value={formData.newAchievement}
                          onChange={handleChange}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                          placeholder="Add an achievement"
                        />
                        <button
                          type="button"
                          onClick={addAchievement}
                          className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          Add
                        </button>
                      </div>
                      {formData.achievements.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {formData.achievements.map((achievement, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="flex items-start"
                            >
                              <Award className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-2">
                                <p className="text-sm text-gray-800 dark:text-gray-200">{achievement}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeAchievement(achievement)}
                                className="ml-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                              >
                                &times;
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </fieldset>

                  {/* Bio Section */}
                  <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Bio (Optional)</legend>
                    <div>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                        placeholder="Tell us a little about yourself..."
                      />
                    </div>
                  </fieldset>

                  {/* Account Security Section */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <button
                      type="button"
                      onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
                      className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-800 dark:text-white mb-3 focus:outline-none"
                    >
                      <span>Account Security</span>
                      <ChevronDown className={`h-5 w-5 transform transition ${isPasswordSectionOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isPasswordSectionOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email Address
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                                placeholder="your@email.com"
                              />
                            </div>

                            <div>
                              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Current Password (required for changes)
                              </label>
                              <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                                placeholder="••••••••"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  New Password
                                </label>
                                <input
                                  type="password"
                                  id="newPassword"
                                  name="newPassword"
                                  value={formData.newPassword}
                                  onChange={handleChange}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                                  placeholder="••••••••"
                                />
                              </div>
                              <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Confirm New Password
                                </label>
                                <input
                                  type="password"
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  value={formData.confirmPassword}
                                  onChange={handleChange}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                                  placeholder="••••••••"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-3 pt-6">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* --- VIEW MODE --- */
                <div className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Display Name</p>
                        <p className="text-gray-800 dark:text-white font-medium">{formData.displayName || 'Not set'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-gray-800 dark:text-white font-medium">{formData.email || 'Not set'}</p>
                      </div>
                      {formData.profession && (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Profession</p>
                          <p className="text-gray-800 dark:text-white font-medium">{formData.profession}</p>
                        </div>
                      )}
                      {formData.contactNumber && (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Contact Number</p>
                          <p className="text-gray-800 dark:text-white font-medium">{formData.contactNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  {(formData.houseNumber || formData.street || formData.city || formData.postalCode) && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.houseNumber && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">House/Unit Number</p>
                            <p className="text-gray-800 dark:text-white font-medium">{formData.houseNumber}</p>
                          </div>
                        )}
                        {formData.street && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Street</p>
                            <p className="text-gray-800 dark:text-white font-medium">{formData.street}</p>
                          </div>
                        )}
                        {formData.city && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">City</p>
                            <p className="text-gray-800 dark:text-white font-medium">{formData.city}</p>
                          </div>
                        )}
                        {formData.postalCode && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Postal Code</p>
                            <p className="text-gray-800 dark:text-white font-medium">{formData.postalCode}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bio */}
                  {formData.bio && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">About Me</h3>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{formData.bio}</p>
                    </div>
                  )}

                  {/* Skills */}
                  {formData.skills.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-200"
                          >
                            <Zap className="h-4 w-4 mr-1" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {formData.achievements.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Achievements</h3>
                      <div className="space-y-3">
                        {formData.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start">
                            <Award className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</MainLayout>
);
}