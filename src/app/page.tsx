
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { CategoryList } from "@/components/medicine/CategoryList";
import { WhatsAppButton } from "@/components/chat/WhatsAppButton";
import { SupportBot } from "@/components/chat/SupportBot";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Truck, Clock, Headphones } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <div className="container mx-auto px-4">
          <CategoryList />

          <section className="py-20 bg-primary/5 rounded-[3rem] px-8 my-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg text-primary">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">100% Genuine</h3>
                  <p className="text-sm text-muted-foreground">Direct from manufacturers</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg text-primary">
                  <Truck className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Super Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">Within 15-30 minutes</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg text-primary">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Licensed Pharmacists</h3>
                  <p className="text-sm text-muted-foreground">Every order verified</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg text-primary">
                  <Headphones className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Expert help anytime</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-none bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden group">
                <div className="relative z-10 space-y-4 max-w-sm">
                  <h2 className="text-3xl font-bold">Online Doctor Consultation</h2>
                  <p className="text-blue-100 text-sm">Consult with India's top doctors across 20+ specialties from home.</p>
                  <button className="bg-white text-blue-700 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors">Book Now</button>
                </div>
                <div className="absolute right-0 bottom-0 opacity-20 group-hover:scale-110 transition-transform duration-500">
                  <Image src="https://picsum.photos/seed/doc2/400/400" alt="Doctor" width={250} height={250} className="object-contain" />
                </div>
              </Card>

              <Card className="p-8 border-none bg-gradient-to-br from-teal-600 to-teal-800 text-white relative overflow-hidden group">
                <div className="relative z-10 space-y-4 max-w-sm">
                  <h2 className="text-3xl font-bold">Full Body Blood Test</h2>
                  <p className="text-teal-100 text-sm">Safe home sample collection for 500+ blood tests and profiles.</p>
                  <button className="bg-white text-teal-700 px-6 py-2 rounded-full font-bold hover:bg-teal-50 transition-colors">View Tests</button>
                </div>
                <div className="absolute right-0 bottom-0 opacity-20 group-hover:scale-110 transition-transform duration-500">
                  <Image src="https://picsum.photos/seed/blood-test-2/400/400" alt="Blood Test" width={250} height={250} className="object-contain" data-ai-hint="blood test" />
                </div>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <SupportBot />
    </div>
  );
}
