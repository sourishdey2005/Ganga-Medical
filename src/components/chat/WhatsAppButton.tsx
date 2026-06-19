"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const openWhatsApp = () => {
    window.open("https://wa.me/919531501959?text=Hi Ganga Medical, I need help with medicines.", "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="absolute -inset-2 bg-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <Button 
        onClick={openWhatsApp}
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-xl transition-transform hover:scale-110 active:scale-95 flex items-center justify-center p-0 border-none relative overflow-hidden"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="sr-only">Contact on WhatsApp</span>
      </Button>
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-lg border text-sm font-medium whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
        Need help? Chat with us
      </div>
    </div>
  )
}
