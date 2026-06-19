
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileUp, Search, Stethoscope, FlaskConical } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Hero() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-medical')

  return (
    <div className="relative overflow-hidden bg-background pt-8 pb-16 lg:pt-16 lg:pb-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Verified Licensed Pharmacy
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Professional Healthcare <br />
              <span className="text-primary">At Your Doorstep</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Get genuine medicines, expert doctor consultations, and diagnostic tests from the comfort of your home. Trusted by thousands.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/prescription/upload">
                <Button size="lg" className="h-14 px-8 text-md font-semibold gap-2 shadow-lg hover:shadow-primary/20 bg-secondary hover:bg-secondary/90">
                  <FileUp className="w-5 h-5" />
                  Upload Prescription
                </Button>
              </Link>
              <Link href="/catalog">
                <Button variant="outline" size="lg" className="h-14 px-8 text-md font-semibold border-2 border-primary text-primary hover:bg-primary/5">
                  Order Medicines
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">15 min</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Fast Delivery</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Genuine Medicines</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">500+</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Partner Doctors</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">Secure</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Payments</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
            <Card className="overflow-hidden border-none shadow-2xl relative bg-card">
              <Image 
                src={heroImg?.imageUrl || ""} 
                alt="Medical Care" 
                width={600} 
                height={600} 
                className="w-full h-auto object-cover"
                data-ai-hint="medical pharmacy"
              />
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                <Card className="p-4 bg-white/90 backdrop-blur-sm border-none shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Stethoscope className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Consultation</p>
                      <p className="text-[10px] text-muted-foreground">Expert Doctors</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-white/90 backdrop-blur-sm border-none shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <FlaskConical className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Blood Tests</p>
                      <p className="text-[10px] text-muted-foreground">Home Sample</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
