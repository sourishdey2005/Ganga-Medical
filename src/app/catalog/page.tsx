
"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Heart, 
  Star, 
  Plus, 
  Pencil, 
  Trash2,
  CheckCircle2
} from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const INITIAL_MEDICINES = [
  { id: 1, name: "Paracetamol 500mg", manufacturer: "GSK Pharmaceuticals", rating: 4.8, reviews: 120, category: "OTC", tag: "Best Seller" },
  { id: 2, name: "Amoxicillin 250mg", manufacturer: "Cipla Health", rating: 4.5, reviews: 85, category: "Prescription", tag: "Prescription Req" },
  { id: 3, name: "Multivitamin Gold", manufacturer: "Revital", rating: 4.9, reviews: 340, category: "Vitamins", tag: "Top Rated" },
  { id: 4, name: "Sugar Free Gold", manufacturer: "Zydus", rating: 4.2, reviews: 92, category: "Diabetes", tag: "Sugar Free" },
  { id: 5, name: "Dolo 650", manufacturer: "Micro Labs", rating: 4.9, reviews: 1200, category: "OTC", tag: "Fast Acting" },
  { id: 6, name: "Himalaya Liv 52", manufacturer: "Himalaya Wellness", rating: 4.7, reviews: 450, category: "Personal Care", tag: "Herbal" },
]

const CATEGORIES = ["All", "Prescription", "OTC", "Vitamins", "Diabetes", "Personal Care", "Baby Care"]

export default function CatalogPage() {
  const [medicines, setMedicines] = useState(INITIAL_MEDICINES)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()

  // Form state for management
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMed, setEditingMed] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    category: "OTC",
    tag: "New Arrival"
  })

  useEffect(() => {
    const storedUser = localStorage.getItem("gangarx_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const filteredMedicines = medicines.filter(med => 
    (activeCategory === "All" || med.category === activeCategory) &&
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingMed) {
      setMedicines(prev => prev.map(m => m.id === editingMed.id ? { ...m, ...formData } : m))
      toast({ title: "Medicine Updated", description: `${formData.name} has been updated.` })
    } else {
      const newMed = {
        id: Date.now(),
        ...formData,
        rating: 0,
        reviews: 0
      }
      setMedicines(prev => [newMed, ...prev])
      toast({ title: "Medicine Added", description: `${formData.name} added to catalog.` })
    }
    setIsDialogOpen(false)
    setEditingMed(null)
    setFormData({ name: "", manufacturer: "", category: "OTC", tag: "New Arrival" })
  }

  const handleDelete = (id: number) => {
    setMedicines(prev => prev.filter(m => m.id !== id))
    toast({ variant: "destructive", title: "Medicine Removed" })
  }

  const openEdit = (med: any) => {
    setEditingMed(med)
    setFormData({
      name: med.name,
      manufacturer: med.manufacturer,
      category: med.category,
      tag: med.tag
    })
    setIsDialogOpen(true)
  }

  const isStaff = user?.role === 'admin' || user?.role === 'pharmacy'

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground font-headline">Pharmacy Catalog</h1>
              {isStaff && <p className="text-sm text-primary font-bold">Management Mode Active</p>}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search medicines..." 
                  className="pl-9 h-11 bg-white border-none shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {isStaff && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-11 gap-2 rounded-xl shadow-lg shadow-primary/20" onClick={() => {setEditingMed(null); setFormData({name: "", manufacturer: "", category: "OTC", tag: "New Arrival"})}}>
                      <Plus className="w-4 h-4" /> Add Medicine
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] rounded-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">{editingMed ? 'Edit Medicine' : 'Add New Medicine'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddEdit} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label className="font-bold">Medicine Name</Label>
                        <Input 
                          value={formData.name} 
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          placeholder="e.g. Paracetamol 500mg" 
                          className="h-11"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold">Manufacturer</Label>
                        <Input 
                          value={formData.manufacturer} 
                          onChange={e => setFormData({...formData, manufacturer: e.target.value})}
                          placeholder="e.g. Cipla Health" 
                          className="h-11"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold">Category</Label>
                        <Select 
                          value={formData.category} 
                          onValueChange={v => setFormData({...formData, category: v})}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.filter(c => c !== "All").map(c => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold">Status Tag</Label>
                        <Input 
                          value={formData.tag} 
                          onChange={e => setFormData({...formData, tag: e.target.value})}
                          placeholder="e.g. Best Seller" 
                          className="h-11"
                        />
                      </div>
                      <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full h-11 text-md font-bold rounded-xl">
                          {editingMed ? 'Update Medicine' : 'Save Medicine'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}

              <Button variant="outline" className="h-11 gap-2 bg-white border-none shadow-sm rounded-xl">
                <Filter className="w-4 h-4" /> Filters
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <Button 
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                className={`rounded-full px-6 whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-white border-none shadow-sm hover:bg-primary/5 hover:text-primary'}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedicines.map((med) => (
              <Card key={med.id} className="group border-none shadow-md hover:shadow-xl transition-all bg-white rounded-2xl flex flex-col min-h-[160px]">
                <CardContent className="p-6 flex flex-col h-full space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1.5">
                      <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20 border-none px-2 py-0.5 text-[10px] font-bold">
                        {med.tag}
                      </Badge>
                      {med.category === 'Prescription' && (
                        <Badge variant="destructive" className="w-fit border-none flex items-center gap-1 text-[9px] px-2 py-0.5">
                          Rx Required
                        </Badge>
                      )}
                    </div>
                    
                    {isStaff ? (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary" onClick={() => openEdit(med)}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive" onClick={() => handleDelete(med.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <button className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <h3 className="font-bold text-lg text-foreground leading-tight line-clamp-2">{med.name}</h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{med.manufacturer}</p>
                    
                    <div className="flex items-center gap-1 pt-1">
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-bold ml-1">{med.rating || "N/A"}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">({med.reviews || 0} reviews)</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t flex items-center justify-between">
                    <div className="flex items-center gap-2 text-secondary text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      In Stock
                    </div>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90 shadow-sm gap-2 rounded-xl h-10 px-4 font-bold">
                      <ShoppingCart className="w-4 h-4" /> Buy
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
