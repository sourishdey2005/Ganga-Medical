"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Send, Bot, User } from "lucide-react"
import { customerSupportChatbot } from "@/ai/flows/customer-support-chatbot"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  role: 'bot' | 'user'
  text: string
}

export function SupportBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hi! I am Ganga, your healthcare assistant. How can I help you today?' }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMsg = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setIsLoading(true)

    try {
      const response = await customerSupportChatbot(userMsg)
      setMessages(prev => [...prev, { role: 'bot', text: response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I encountered an error. Please try again later.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-24 z-50">
      {isOpen ? (
        <Card className="w-[350px] sm:w-[400px] h-[500px] shadow-2xl flex flex-col border-primary/20 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-primary text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">Ganga AI</p>
                <p className="text-[10px] text-white/70">Online Helpdesk</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4 bg-muted/30">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white border rounded-tl-none text-foreground shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border rounded-2xl rounded-tl-none p-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-background">
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              <Input 
                placeholder="Type your query..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button size="icon" className="shrink-0 bg-primary" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-xl transition-transform hover:scale-110 flex items-center justify-center p-0 border-none"
        >
          <MessageSquare className="w-7 h-7 text-white" />
        </Button>
      )}
    </div>
  )
}
