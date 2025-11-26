'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Plus, Search, Users, Code, ArrowRight, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

interface Room {
  id: string;
  title: string;
  description: string;
  hostName: string;
  createdAt: any;
  participants: Record<string, any>;
  isPublic: boolean;
}

export default function RoomsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) return;

    // Fetch public rooms and user's rooms
    const roomsRef = collection(db, 'rooms');
    const q = query(
      roomsRef,
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedRooms: Room[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedRooms.push({
          id: doc.id,
          ...data,
        } as Room);
      });
      setRooms(fetchedRooms);
      setIsLoading(false);
    }, (error) => {
      console.error('Error fetching rooms:', error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      router.push('/');
    } catch {
      toast.error('Failed to logout');
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Code className="h-8 w-8 text-indigo-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">CodeHub</h1>
                  <p className="text-sm text-gray-500">Collaborative Coding & Whiteboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button asChild>
                  <Link href="/room/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Room
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'User'}!
            </h2>
            <p className="text-gray-600">
              Create a new room or join an existing one to start collaborating.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Create Room CTA */}
          <Card className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Start a New Collaboration</h3>
                  <p className="text-indigo-100">
                    Create a room to code and draw with your team in real-time.
                  </p>
                </div>
                <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                  <Link href="/room/new">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Room
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rooms List */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Available Rooms ({filteredRooms.length})
            </h3>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading rooms...</p>
              </div>
            ) : filteredRooms.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Code className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery ? 'Try a different search term.' : 'Be the first to create a room!'}
                  </p>
                  <Button asChild>
                    <Link href="/room/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Room
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room) => (
                  <Card key={room.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span className="flex-1">{room.title}</span>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {room.description || 'No description'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>
                            {Object.keys(room.participants || {}).length} participant
                            {Object.keys(room.participants || {}).length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <span className="text-xs">
                          {room.createdAt?.toDate
                            ? new Date(room.createdAt.toDate()).toLocaleDateString()
                            : 'Recently'}
                        </span>
                      </div>
                      <Button asChild className="w-full">
                        <Link href={`/room/${room.id}`}>
                          Join Room
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}



