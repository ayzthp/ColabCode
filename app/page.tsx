import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Code, Users, PenTool, Zap, Play, Share2, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">CodeHub</span>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-white text-indigo-900 hover:bg-gray-100">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Code Together.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Create Together.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Real-time collaborative coding and whiteboard. Build, debug, and brainstorm with your team in one seamless workspace.
          </p>
          <div className="space-x-4">
            <Link href="/signup">
              <Button size="lg" className="px-8 py-6 text-lg bg-white text-indigo-900 hover:bg-gray-100">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 border-white text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 max-w-6xl mx-auto">
          {/* Collaborative Coding */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-cyan-500 rounded-xl flex items-center justify-center">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Real-Time Coding</h2>
            </div>
            <p className="text-gray-200 text-lg mb-6">
              Write code together with your team in real-time. See changes instantly, collaborate seamlessly, and build faster.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-cyan-400" />
                <span>Multi-language support (C++, Java, Python, JavaScript, C, C#)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Play className="h-5 w-5 text-cyan-400" />
                <span>Run code directly in the browser</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-cyan-400" />
                <span>Multiple users can code simultaneously</span>
              </li>
              <li className="flex items-center space-x-2">
                <Share2 className="h-5 w-5 text-cyan-400" />
                <span>Share rooms with a simple link</span>
              </li>
            </ul>
          </div>

          {/* Whiteboard */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-pink-500 rounded-xl flex items-center justify-center">
                <PenTool className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Interactive Whiteboard</h2>
            </div>
            <p className="text-gray-200 text-lg mb-6">
              Sketch ideas, draw diagrams, and visualize concepts together. Perfect for brainstorming and explaining complex problems.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <PenTool className="h-5 w-5 text-pink-400" />
                <span>Draw and sketch in real-time</span>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-pink-400" />
                <span>See everyone's cursor and presence</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-pink-400" />
                <span>Customizable colors and stroke width</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-pink-400" />
                <span>Collaborative drawing sessions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Create a Room</h3>
              <p className="text-gray-300">
                Start a new collaboration room and invite your team members with a simple link.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Code & Draw</h3>
              <p className="text-gray-300">
                Switch between code editor and whiteboard. Everything syncs in real-time.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Execute & Share</h3>
              <p className="text-gray-300">
                Run your code, see results instantly, and share your work with others.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Collaborate?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of developers coding and creating together.
          </p>
          <Link href="/signup">
            <Button size="lg" className="px-10 py-6 text-lg bg-white text-indigo-900 hover:bg-gray-100">
              Start Coding Together
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
