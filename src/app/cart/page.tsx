
"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Loader2,
  CheckCircle2,
  Package
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import Link from "next/link"

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return

    setIsSubmitting(true)
    
    // Simulate order submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      clearCart()
      toast({
        title: "Order Placed!",
        description: "Ganga Medical pharmacists are processing your request.",
      })
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center p-12 space-y-6 border-none shadow-2xl rounded-[2.5rem]">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Order Received!</h2>
              <p className="text-muted-foreground">Your request has been sent to Ganga Medical (Balichak). A pharmacist will call you shortly to confirm and arrange delivery.</p>
            </div>
            <Button asChild className="w-full h-12 rounded-xl text-lg font-bold">
              <Link href="/catalog">Back to Catalog</Link>
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Order List</h1>
              <p className="text-muted-foreground">{cart.length} item(s) selected for order</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-7 space-y-4">
              {cart.length === 0 ? (
                <Card className="p-12 text-center space-y-6 border-none shadow-sm rounded-3xl bg-white">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                    <Package className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Your list is empty</h3>
                    <p className="text-muted-foreground">Browse our catalog to add medicines you need.</p>
                  </div>
                  <Button asChild className="rounded-xl h-12 px-8 font-bold">
                    <Link href="/catalog">Browse Medicines</Link>
                  </Button>
                </Card>
              ) : (
                cart.map((item) => (
                  <Card key={item.id} className="border-none shadow-sm bg-white rounded-2xl overflow-hidden group">
                    <CardContent className="p-6 flex items-center justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                          {item.tag && (
                            <Badge variant="outline" className="text-[10px] font-bold border-primary/20 text-primary">
                              {item.tag}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{item.manufacturer}</p>
                        <p className="text-xs text-secondary font-medium">{item.category}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl h-10 w-10"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-5">
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden sticky top-24">
                <CardHeader className="bg-primary text-white p-6">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Delivery Details
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    We'll contact you at these details for verification.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2"><User className="w-4 h-4" /> Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Patient's name" 
                        required 
                        disabled={cart.length === 0}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="rounded-xl h-11"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="w-4 h-4" /> Contact Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="+91 00000 00000" 
                        required 
                        disabled={cart.length === 0}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="rounded-xl h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email ID</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        required 
                        disabled={cart.length === 0}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="rounded-xl h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Delivery Address</Label>
                      <Textarea 
                        id="address" 
                        placeholder="Complete address in Balichowk..." 
                        required 
                        disabled={cart.length === 0}
                        className="min-h-[100px] rounded-xl"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 gap-2 mt-4"
                      disabled={isSubmitting || cart.length === 0}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Place Order <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
