import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Trophy, CheckCircle } from 'lucide-react';

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://34.226.245.51:5000';
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success && data.user) {
          setUserData(data.user);
        } else {
          setError('Failed to fetch user profile');
        }
      } catch (err) {
        setError('Error fetching user profile');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);



  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-black to-black p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-300 mb-2">Profile Dashboard</h1>
          <p className="text-emerald-100">Manage your account and track your progress</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-black rounded-2xl shadow-xl overflow-hidden mb-8 border border-emerald-900">
          <div className="bg-gradient-to-r from-emerald-800 via-black to-slate-900 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-black rounded-full border-4 border-emerald-800 shadow-lg flex items-center justify-center">
                <User className="w-16 h-16 text-emerald-400" />
              </div>
            </div>
            {userData?.isAdmin && (
              <div className="absolute top-4 right-4 bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow">
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </div>
            )}
          </div>

          <div className="pt-20 pb-8 px-8">
            <div className="mb-6">
              <div>
                <h2 className="text-3xl font-bold text-emerald-100 mb-2">{userData?.name}</h2>
                <p className="text-emerald-400">@{userData?.username}</p>
              </div>
            </div>

            {/* Profile Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-300 mb-1">Full Name</label>
                  <div className="flex items-center p-3 bg-black rounded-lg">
                    <User className="w-5 h-5 text-emerald-400 mr-3" />
                    <span className="text-emerald-100">{userData?.name}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-300 mb-1">Username</label>
                  <div className="flex items-center p-3 bg-black rounded-lg">
                    <span className="text-emerald-400 mr-3">@</span>
                    <span className="text-emerald-100">{userData?.username}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-300 mb-1">Email</label>
                  <div className="flex items-center p-3 bg-black rounded-lg">
                    <Mail className="w-5 h-5 text-emerald-400 mr-3" />
                    <span className="text-emerald-100">{userData?.email}</span>
                  </div>
                </div>


              </div>

              {/* Stats Section */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-emerald-800 via-black to-slate-900 p-6 rounded-xl text-emerald-100 border border-emerald-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-300 text-sm">Problems Solved</p>
                      <p className="text-3xl font-bold text-emerald-100">{userData?.problemSolved}</p>
                    </div>
                    <Trophy className="w-12 h-12 text-emerald-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-900 via-black to-emerald-800 p-6 rounded-xl text-emerald-100 border border-emerald-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-300 text-sm">Account Status</p>
                      <p className="text-xl font-semibold text-emerald-100">
                        {userData?.isAdmin ? 'Administrator' : 'Standard User'}
                      </p>
                    </div>
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solved Problems Section */}
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-black rounded-2xl shadow-xl p-8 border border-emerald-900">
          <h3 className="text-2xl font-bold text-emerald-200 mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 text-emerald-400 mr-2" />
            Solved Problems
          </h3>

          <div className="grid gap-4">
            {userData?.solved.map((problem, index) => (
              <div key={problem._id} className="flex items-center justify-between p-4 bg-black rounded-lg hover:bg-slate-900 transition-colors">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-700 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-100">{problem.titletag}</h4>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;