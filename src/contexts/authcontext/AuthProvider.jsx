import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import { AuthContext } from './AuthContext';



const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// facebookProvider.addScope('email');
// facebookProvider.addScope('public_profile');

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const signInWithFacebook = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider)
            .then((result) => {
                console.log('Facebook sign-in successful:', result.user);
                return result;
            })
            .catch((error) => {
                console.error('Facebook sign-in error:', error);
                if (error.code === 'auth/account-exists-with-different-credential') {
                    throw new Error('An account already exists with the same email address. Please try signing in with Google or email.');
                } else if (error.code === 'auth/popup-closed-by-user') {
                    throw new Error('Sign-in was cancelled. Please try again.');
                } else if (error.code === 'auth/popup-blocked') {
                    throw new Error('Popup was blocked by browser. Please allow popups for this site.');
                } else {
                    throw error;
                }
            });
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('user in the auth state change', currentUser)
            setLoading(false);
        });

        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        signInWithFacebook,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;