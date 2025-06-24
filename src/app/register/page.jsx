'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase/config";


import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../provider/AuthProvider';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth(app);
    const { createUser, updateUserProfile } = useContext(AuthContext)

    const router = useRouter();

    const handleRegister = (e) => {
        e.preventDefault();

        createUser(email, password)
            .then(result => {
                const firebaseUser = result.user;
                const saveUser = {
                    name: name,
                    email: firebaseUser.email,
                    profileImage: profileImage,
                    createdAt: new Date(),
                    role: 'buyer',
                };
                updateUserProfile({ displayName: name, photoURL: profileImage })
                    .then(() => {
                        alert("Profile Updated")
                    }).catch((error) => {
                        alert(error.message);
                        alert("Profile is not Updated")
                    });
                //add user to database
                fetch('http://localhost:5000/user', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(saveUser),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        alert("User added successfully!");
                        router.push('/');
                    });
            })
            .catch((error) => {
                console.error(error);
                alert(error.message)
            });
    };

    const googleProvider = new GoogleAuthProvider();
    const handleGoogleLogIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log("Google sign-in successful", user);
                const saveUser = {
                    name: user.displayName,
                    email: user.email,
                    profileImage: user.photoURL,
                    createdAt: new Date(),
                    role: 'buyer',
                };

                fetch('http://localhost:5000/user', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("User saved to DB:", data);
                        router.push('/');
                    })
                    .catch(err => console.error("DB Save Error:", err));
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

                {/* Form */}
                <form className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm text-gray-700">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-700">Photo URL</label>
                        <input
                            type="url"
                            value={profileImage}
                            onChange={(e) => setProfileImage(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center justify-center text-sm text-gray-500 my-5">
                    <span className="w-full border-t border-gray-300 mr-2"></span>
                    OR
                    <span className="w-full border-t border-gray-300 ml-2"></span>
                </div>

                {/* Google Register Button */}
                <button
                    onClick={handleGoogleLogIn}
                    className="flex items-center justify-center w-full border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition"
                >
                    <FcGoogle className="text-xl mr-2" />
                    Sign up with Google
                </button>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}
