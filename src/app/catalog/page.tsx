"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ShoppingCart, Heart, Info, Star } from "lucide-react"
import Image from "next/image"

const MOCK_MEDICINES = [
  { id: 1, name: "Paracetamol 500mg", manufacturer: "GSK Pharmaceuticals", price: 25, rating: 4.8, reviews: 120, category: "OTC", tag: "Best Seller", image: "https://picsum.photos/seed/p1/400/400" },
  { id: 2, name: "Amoxicillin 250mg", manufacturer: "Cipla Health", price: 145, rating: 4.5, reviews: 85, category: "Prescription", tag: "Prescription Req", image: "https://picsum.photos/seed/p2/400/400" },
  { id: 3, name: "Multivitamin Gold", manufacturer: "Revital", price: 320, rating: 4.9, reviews: 340, category: "Vitamins", tag: "Top Rated", image: "https://picsum.photos/seed/p3/400/400" },
  { id: 4, name: "Sugar Free Gold", manufacturer: "Zydus", price: 150, rating: 4.2, reviews: 92, category: "Diabetes", tag: "Sugar Free", image: "https://picsum.photos/seed/p4/400/400" },
  { id: 5, name: "Dolo 650", manufacturer: "Micro Labs", price: 30, rating: 4.9, reviews: 1200, category: "OTC", tag: "Fast Acting", image: "https://picsum.photos/seed/p5/400/400" },
  { id: 6, name: "Himalaya Liv 52", manufacturer: "Himalaya Wellness", price: 180, rating: 4.7, reviews: 450, category: "Personal Care", tag: "Herbal", image: "https://picsum.photos/seed/p6/400/400" },
]

const CATEGORIES = ["All", "Prescription", "OTC", "Vitamins", "Diabetes", "Personal Care", "Baby Care"]

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMedicines = MOCK_MEDICINES.filter(med => 
    (activeCategory === "All" || med.category === activeCategory) &&
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h1 className="text-3xl font-bold text-foreground">Pharmacy Catalog</h1>
            <div className="flex gap-3">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search medicines..." 
                  className="pl-9 h-11"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-11 gap-2">
                <Filter className="w-4 h-4" /> Filters
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <Button 
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                className={`rounded-full px-6 whitespace-nowrap ${activeCategory === cat ? 'bg-primary' : 'bg-white hover:bg-primary/5 hover:text-primary'}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedicines.map((med) => (
              <Card key={med.id} className="group border-none shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white rounded-2xl">
                <div className="relative aspect-square overflow-hidden bg-muted/30">
                  <Image 
                    src={med.image} 
                    alt={med.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className="bg-white/90 text-primary border-none backdrop-blur-sm shadow-sm">{med.tag}</Badge>
                    {med.category === 'Prescription' && (
                      <Badge variant="destructive" className="border-none shadow-sm flex items-center gap-1">Rx Required</Badge>
                    )}
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-muted-foreground hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <CardContent className="p-5 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-foreground line-clamp-1">{med.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{med.manufacturer}</p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold ml-1">{med.rating}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">({med.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-primary">₹{med.price}</span>
                      <span className="text-[10px] text-muted-foreground">MRP incl. all taxes</span>
                    </div>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90 shadow-md gap-2 rounded-xl h-10 px-4">
                      <ShoppingCart className="w-4 h-4" /> Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMedicines.length === 0 && (
            <div className="text-center py-20 space-y-4">
              <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">No medicines found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
              <Button onClick={() => {setActiveCategory("All"); setSearchQuery("");}} variant="link" className="text-primary font-bold">Clear all filters</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
