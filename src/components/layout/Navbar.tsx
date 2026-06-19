"use client"

import Link from "next/link"
import { Search, ShoppingCart, User, Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-md transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-xl tracking-tight">G</span>
            </div>
            <span className="font-bold text-xl text-primary hidden md:block">GangaRx</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/catalog" className="hover:text-primary transition-colors">Medicines</Link>
            <Link href="/consultation" className="hover:text-primary transition-colors">Doctors</Link>
            <Link href="/lab-tests" className="hover:text-primary transition-colors">Lab Tests</Link>
          </div>
        </div>

        <div className="flex-1 max-w-md hidden md:block relative">
          <div className={`relative flex items-center transition-all ${isSearchFocused ? 'ring-2 ring-primary rounded-md' : ''}`}>
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search medicines, wellness..." 
              className="pl-9 h-10 bg-muted/50 border-none focus-visible:ring-0"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="w-5 h-5" />
          </Button>
          
          <Link href="/cart" className="relative p-2 hover:bg-muted rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            <span className="absolute -top-0.5 -right-0.5 bg-secondary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">2</span>
          </Link>

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="w-5 h-5 text-foreground" />
          </Button>

          <div className="h-6 w-px bg-border mx-2 hidden md:block" />

          <Link href="tel:+911234567890" className="hidden lg:flex flex-col items-end gap-0">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Help?</span>
            <div className="flex items-center gap-1 text-primary font-bold">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 12345 67890</span>
            </div>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/catalog" className="text-lg font-medium">Browse Medicines</Link>
                <Link href="/consultation" className="text-lg font-medium">Talk to Doctor</Link>
                <Link href="/lab-tests" className="text-lg font-medium">Book Lab Test</Link>
                <Link href="/dashboard" className="text-lg font-medium">My Orders</Link>
                <Link href="/dashboard/health-vault" className="text-lg font-medium">Health Records</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
