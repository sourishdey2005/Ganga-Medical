"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, CheckCircle2, Loader2, MapPin, Phone, Mail, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PrescriptionUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: ""
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleNext = () => {
    if (!preview) {
      toast({
        variant: "destructive",
        title: "Missing Prescription",
        description: "Please upload a photo of your prescription first.",
      })
      return
    }
    setStep(2)
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate order submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Order Submitted Successfully!",
        description: "Our pharmacist will review your prescription and call you shortly.",
      })
      router.push("/")
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12 text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Order with Prescription</h1>
            <p className="text-muted-foreground">Upload your prescription and we'll take care of the rest.</p>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              {step === 1 ? (
                <Card className="border-none shadow-xl overflow-hidden">
                  <CardHeader className="bg-primary text-white">
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Step 1: Upload Prescription
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Clear photos lead to faster verification by our pharmacists.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div 
                      className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer ${
                        file ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50 hover:bg-muted/50'
                      }`}
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <input 
                        type="file" 
                        id="file-upload" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {preview ? (
                        <div className="relative aspect-[3/4] max-w-[250px] mx-auto rounded-lg overflow-hidden border shadow-lg">
                          <Image src={preview} alt="Prescription Preview" fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                            <Upload className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="font-bold text-lg">Click or Drag to Upload Photo</p>
                            <p className="text-sm text-muted-foreground">Supported: JPEG, PNG, WEBP</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <Button 
                      className="w-full h-12 text-lg font-bold bg-primary shadow-lg shadow-primary/20 rounded-xl"
                      disabled={!file}
                      onClick={handleNext}
                    >
                      Continue to Details
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-none shadow-xl">
                  <CardHeader className="bg-secondary text-white">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Step 2: Delivery Details
                    </CardTitle>
                    <CardDescription className="text-secondary-foreground/80">
                      Provide your information for pharmacist review and delivery.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmitOrder} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="flex items-center gap-2"><User className="w-4 h-4" /> Full Name</Label>
                          <Input 
                            id="name" 
                            placeholder="Patient's full name" 
                            required 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="w-4 h-4" /> Contact Number</Label>
                          <Input 
                            id="phone" 
                            placeholder="+91 00000 00000" 
                            required 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email ID</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your@email.com" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Delivery Address</Label>
                        <Textarea 
                          id="address" 
                          placeholder="Complete address with landmark..." 
                          required 
                          className="min-h-[100px]"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <Textarea 
                          id="notes" 
                          placeholder="Specific medicine brands or instructions..." 
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        />
                      </div>

                      <div className="pt-4 flex gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="flex-1 rounded-xl" 
                          onClick={() => setStep(1)}
                          disabled={isSubmitting}
                        >
                          Change Photo
                        </Button>
                        <Button 
                          type="submit" 
                          className="flex-1 bg-secondary text-lg font-bold rounded-xl shadow-lg shadow-secondary/20"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin mr-2" />
                              Submitting...
                            </>
                          ) : (
                            "Place Order"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="md:col-span-4 space-y-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">What happens next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 font-bold">1</div>
                    <p><span className="font-bold text-foreground">Pharmacist Review:</span> A licensed pharmacist will read your uploaded photo.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 font-bold">2</div>
                    <p><span className="font-bold text-foreground">Verification Call:</span> We will call you to confirm medicines and total amount.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 font-bold">3</div>
                    <p><span className="font-bold text-foreground">Doorstep Delivery:</span> Once confirmed, medicines are delivered within 30 minutes.</p>
                  </div>
                </CardContent>
              </Card>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white space-y-4 shadow-xl">
                <h3 className="font-bold">Need Immediate Help?</h3>
                <p className="text-sm text-primary-foreground/80 leading-relaxed">
                  Our pharmacists are available 24/7 to assist with your order.
                </p>
                <Button asChild className="w-full bg-white text-primary hover:bg-white/90 font-bold rounded-xl h-11">
                  <Link href="tel:+919531501959">+91 9531501959</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
