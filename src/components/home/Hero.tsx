"use client"

import { Button } from "@/components/ui/button"
import { FileUp, Video } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Verified Licensed Pharmacy: #259S/260SB
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Professional Healthcare <br />
            <span className="text-primary">At Your Doorstep</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get genuine medicines, expert doctor consultations, and blood tests from the comfort of your home. Trusted healthcare services in Balichowk.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/prescription/upload">
              <Button size="lg" className="h-16 px-10 text-lg font-semibold gap-2 shadow-lg hover:shadow-primary/20 bg-secondary hover:bg-secondary/90 rounded-2xl">
                <FileUp className="w-6 h-6" />
                Upload Prescription
              </Button>
            </Link>
            <Link href="/consultation/video">
              <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary/5 rounded-2xl gap-2">
                <Video className="w-6 h-6" />
                Consult Pharmacist
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 border-t max-w-3xl mx-auto">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">15 min</p>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Fast Delivery</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">100%</p>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Genuine Meds</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">500+</p>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Doctors</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">Secure</p>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
