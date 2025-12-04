import React, { useState, useEffect, useContext, createContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setLogLevel } from 'firebase/firestore';

// ************************************************************
// FIREBASE & CONTEXT SETUP
// ************************************************************

// Inisialisasi variabel global dari lingkungan Canvas
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

setLogLevel('Debug'); // Debug log untuk melihat aktivitas Firebase

// Buat konteks
const FirebaseContext = createContext();

// Export hook untuk digunakan di pages dan router
export const useFirebase = () => useContext(FirebaseContext); 

export const FirestoreProvider = ({ children }) => {
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        // 1. Inisialisasi Firebase
        if (Object.keys(firebaseConfig).length === 0) {
            console.error("Firebase config tidak tersedia.");
            setIsAuthReady(true);
            return;
        }

        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        const userAuth = getAuth(app);
        
        setDb(firestore);
        setAuth(userAuth);

        // 2. Listener Perubahan Otentikasi
        const unsubscribe = onAuthStateChanged(userAuth, async (user) => {
            if (user) {
                const currentUserId = user.uid;
                setUserId(currentUserId);
                
                // Ambil peran dari Firestore (penting untuk ProtectedRoute)
                const userDocRef = doc(firestore, 'artifacts', appId, 'users', currentUserId, 'profile', 'data');
                const userDocSnap = await getDoc(userDocRef);
                
                let role = 'Mahasiswa'; 
                if (userDocSnap.exists()) {
                    // Gunakan role dari data Firestore, jika ada
                    role = userDocSnap.data().role || 'Mahasiswa';
                } else {
                    // Fallback: Jika dokumen tidak ada, gunakan role dari localStorage yang di-set saat login
                    role = localStorage.getItem('role') || 'Mahasiswa';
                }
                
                setUserRole(role.trim());
            } else {
                setUserId(null);
                setUserRole(null);
            }
            setIsAuthReady(true);
        });

        // 3. Otentikasi Awal
        const performAuth = async () => {
            try {
                if (initialAuthToken) {
                    await signInWithCustomToken(userAuth, initialAuthToken);
                    console.log("Authentication successful with custom token.");
                } else {
                    await signInAnonymously(userAuth);
                    console.log("Authentication successful anonymously.");
                }
            } catch (error) {
                console.error("Firebase Auth Error:", error);
            }
        };

        performAuth();

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        if (auth) {
            await signOut(auth);
        }
        localStorage.removeItem('role'); 
        localStorage.removeItem('token'); 
        console.log("Logout berhasil.");
    };

    // Fungsi path untuk koleksi private (sesuai security rules)
    const getUserPath = (collectionName) => {
        if (!userId) return null;
        return `artifacts/${appId}/users/${userId}/${collectionName}`;
    };
    
    // Fungsi path untuk koleksi public
    const getPublicPath = (collectionName) => {
        return `artifacts/${appId}/public/data/${collectionName}`;
    };

    const value = { db, auth, userId, userRole, isAuthReady, logout, getUserPath, getPublicPath, appId };

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    );
};