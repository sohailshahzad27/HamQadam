import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../config/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateEmail as firebaseUpdateEmail,
    updatePassword as firebaseUpdatePassword,
    updateProfile as firebaseUpdateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider,
    User,
    UserCredential,
} from 'firebase/auth';

interface AuthContextType {
    currentUser: User | null;
    signup: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    updateEmail: (email: string, password: string) => Promise<void>;
    updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    updateProfile: (displayName: string | null, photoURL: string | null) => Promise<void>;
    reauthenticate: (password: string) => Promise<void>;
    authLoading: boolean;
    error: string | null;
    clearError: () => void;
    observerError: string | null; // New state for observer errors
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface FirebaseAuthError extends Error {
    code?: string;
}

const isFirebaseAuthError = (err: unknown): err is FirebaseAuthError => {
    return err instanceof Error && typeof (err as any).code === 'string';
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [observerError, setObserverError] = useState<string | null>(null); // New state

    const clearError = () => {
        setError(null);
        setObserverError(null); // Clear observer error too
    };

    const handleAuthError = (err: unknown): never => {
        console.error("Auth Error:", err);

        let errorMessage: string;
        if (isFirebaseAuthError(err)) {
            switch (err.code) {
                case 'auth/user-not-found':
                    errorMessage = 'No user found with this email.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password.';
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = 'Email address is already in use.';
                    break;
                case 'auth/requires-recent-login':
                    errorMessage = 'This operation requires a recent login. Please re-authenticate.';
                    break;
                default:
                    errorMessage = err.message || 'An unknown authentication error occurred.';
            }
        } else if (err instanceof Error) {
            errorMessage = err.message;
        } else {
            errorMessage = 'An unknown authentication error occurred';
        }

        setError(errorMessage);
        setAuthLoading(false);
        throw new Error(errorMessage);
    };

    const reauthenticate = async (password: string): Promise<void> => {
        if (!currentUser?.email) {
            handleAuthError(new Error('Re-authentication failed: No user logged in or email missing'));
            return;
        }
        const credential = EmailAuthProvider.credential(currentUser.email, password);
        try {
            await reauthenticateWithCredential(currentUser, credential);
        } catch (err) {
            handleAuthError(err);
        }
    };

    const signup = async (email: string, password: string): Promise<UserCredential> => {
        setAuthLoading(true);
        clearError();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (err) {
            return handleAuthError(err);
        }
    };

    const login = async (email: string, password: string): Promise<UserCredential> => {
        setAuthLoading(true);
        clearError();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (err) {
            return handleAuthError(err);
        }
    };

    const logout = async (): Promise<void> => {
        setAuthLoading(true);
        clearError();
        try {
            await signOut(auth);
        } catch (err) {
            handleAuthError(err);
        }
    };

    const updateEmail = async (email: string, password: string): Promise<void> => {
        if (!currentUser) {
            handleAuthError(new Error('Update Email failed: No user logged in'));
            return;
        }
        setAuthLoading(true);
        clearError();
        try {
            await reauthenticate(password);
            await firebaseUpdateEmail(currentUser, email);
        } catch (err) {
            handleAuthError(err);
        } finally {
            setAuthLoading(false);
        }
    };

    const updatePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
        if (!currentUser?.email) {
            handleAuthError(new Error('Update Password failed: No user logged in or email missing'));
            return;
        }
        setAuthLoading(true);
        clearError();
        try {
            await reauthenticate(currentPassword);
            await firebaseUpdatePassword(currentUser, newPassword);
        } catch (err) {
            handleAuthError(err);
        } finally {
            setAuthLoading(false);
        }
    };

    const updateProfile = async (displayName: string | null, photoURL: string | null): Promise<void> => {
        if (!currentUser) {
            handleAuthError(new Error('Update Profile failed: No user logged in'));
            return;
        }
        setAuthLoading(true);
        clearError();
        try {
            await firebaseUpdateProfile(currentUser, { displayName, photoURL });
        } catch (err) {
            handleAuthError(err);
        } finally {
            setAuthLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setAuthLoading(false);
            clearError();
        }, (err) => {
            console.error("Auth State Observer Error:", err);
            setObserverError("Failed to connect to authentication service."); // Set observer error
            setAuthLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: AuthContextType = {
        currentUser,
        signup,
        login,
        logout,
        updateEmail,
        updatePassword,
        updateProfile,
        reauthenticate,
        authLoading,
        error,
        clearError,
        observerError, // Include observerError in the context
    };

    return (
        <AuthContext.Provider value={value}>
            {!authLoading && children}
        </AuthContext.Provider>
    );
}