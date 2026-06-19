"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  User, 
  MessageSquare, 
  Settings,
  ShieldCheck,
  Clock
} from "lucide-react"
import Image from "next/image"

export default function VideoConsultationPage() {
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [status, setStatus] = useState("connecting") // connecting, active, ended
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("active")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleEndCall = () => {
    setStatus("ended")
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm">Ganga Medical Video Consult</h1>
            <div className="flex items-center gap-2 text-[10px] text-green-400">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Secure End-to-End Encrypted
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs">
            <Clock className="w-3 h-3" />
            <span>04:52</span>
          </div>
          <Button variant="ghost" size="icon" className="text-white/70">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Video Area */}
      <main className="flex-1 relative flex items-center justify-center p-4">
        {status === "connecting" ? (
          <div className="text-center space-y-4 animate-in fade-in duration-500">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto border-4 border-primary/30">
                <User className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Connecting to Pharmacist...</h2>
              <p className="text-white/50 text-sm">Please wait while we establish a secure link</p>
            </div>
          </div>
        ) : status === "active" ? (
          <div className="w-full max-w-5xl aspect-video relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl">
            {/* Pharmacist Video (Mock) */}
            <div className="absolute inset-0 bg-zinc-800">
              <Image 
                src="https://picsum.photos/seed/pharmacist1/1280/720" 
                alt="Pharmacist" 
                fill 
                className="object-cover opacity-80"
                data-ai-hint="pharmacist medical"
              />
              <div className="absolute bottom-6 left-6 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="font-bold">Dr. Rajesh Kumar (Senior Pharmacist)</p>
                <p className="text-xs text-white/70">Reg No: 259S/260SB</p>
              </div>
            </div>

            {/* Self View */}
            <div className="absolute top-6 right-6 w-48 aspect-video rounded-2xl overflow-hidden bg-zinc-900 border-2 border-primary/50 shadow-xl z-10">
              {isCameraOn ? (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                  <User className="w-12 h-12 text-white/20" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <VideoOff className="w-8 h-8 text-white/30" />
                </div>
              )}
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-[10px] font-medium">You</div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto text-red-500">
              <PhoneOff className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Call Ended</h2>
              <p className="text-white/50">Returning to home page...</p>
            </div>
          </div>
        )}
      </main>

      {/* Controls */}
      <footer className="p-8 flex items-center justify-center gap-6">
        <div className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-xl px-8 py-4 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-14 w-14 rounded-full transition-all ${!isMicOn ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/5 text-white hover:bg-white/10'}`}
            onClick={() => setIsMicOn(!isMicOn)}
          >
            {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-14 w-14 rounded-full transition-all ${!isCameraOn ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/5 text-white hover:bg-white/10'}`}
            onClick={() => setIsCameraOn(!isCameraOn)}
          >
            {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="h-14 w-14 rounded-full bg-white/5 text-white hover:bg-white/10"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>

          <Button 
            variant="destructive" 
            size="icon" 
            className="h-16 w-16 rounded-full shadow-lg shadow-red-500/20 hover:scale-105 active:scale-95 transition-transform"
            onClick={handleEndCall}
          >
            <PhoneOff className="w-8 h-8" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
