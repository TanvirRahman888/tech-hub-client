'use client';

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useContext, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { app } from '../firebase/config';
import { AuthContext } from '../provider/AuthProvider';
import { Suspense } from 'react';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth(app);
    const { loginUser } = useContext(AuthContext);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const googleProvider = new GoogleAuthProvider();

    const handleLogIn = (e) => {
        e.preventDefault();
        loginUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                router.push(callbackUrl); // ⬅️ Navigate to the previous page
            })
            .catch((error) => {
                console.error(error.message);
                alert(error.message)
            });
    };

    const handleGoogleLogin = () => {
        console.log("Google Login Clicked");
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log("Google sign-in successful", user);
                router.push(callbackUrl);
                //add user to database
                const saveUser = {
                    name: user.displayName,
                    email: user.email,
                    profileImage: user?.photoURL,
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
                    .catch(err => {
                        console.error("DB Save Error:", err)

                    });
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    };

    return (
        

            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to TechHub</h2>

                    <form className="space-y-5">
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
                            onClick={handleLogIn}
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
                        >
                            Login
                        </button>
                    </form>

                    <div className="flex items-center justify-center text-sm text-gray-500 my-5">
                        <span className="w-full border-t border-gray-300 mr-2"></span>
                        OR
                        <span className="w-full border-t border-gray-300 ml-2"></span>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center w-full border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition"
                    >
                        <FcGoogle className="text-xl mr-2" />
                        Continue with Google
                    </button>

                    <p className="text-sm text-center text-gray-600 mt-6">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-600 hover:underline">Register</a>
                    </p>
                </div>
            </div>
        

    );
}
