"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, CheckCircle2, Loader2, Info } from "lucide-react"
import { intelligentPrescriptionScan, type IntelligentPrescriptionScanOutput } from "@/ai/flows/intelligent-prescription-scan"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function PrescriptionUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<IntelligentPrescriptionScanOutput | null>(null)
  const [step, setStep] = useState(1)
  const { toast } = useToast()

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

  const handleScan = async () => {
    if (!preview) return

    setIsScanning(true)
    try {
      const result = await intelligentPrescriptionScan({ prescriptionImageDataUri: preview })
      setScanResult(result)
      setStep(2)
      toast({
        title: "Scan Successful",
        description: "AI has extracted medicine details for your review.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Scan Failed",
        description: "Could not read the prescription. Please try again with a clearer image.",
      })
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12 text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Prescription Upload</h1>
            <p className="text-muted-foreground">Our AI and Pharmacists will verify your prescription for safe ordering.</p>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              {step === 1 ? (
                <Card className="border-none shadow-xl overflow-hidden">
                  <CardHeader className="bg-primary text-white">
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Step 1: Upload Image
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Clear photos of your prescription lead to faster verification.
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
                        <div className="relative aspect-[3/4] max-w-[200px] mx-auto rounded-lg overflow-hidden border shadow-lg">
                          <Image src={preview} alt="Preview" fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                            <Upload className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="font-bold text-lg">Click or Drag to Upload</p>
                            <p className="text-sm text-muted-foreground">Supported: JPEG, PNG, WEBP (Max 5MB)</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Patient Name</Label>
                        <Input id="name" placeholder="Full name as per prescription" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+91 00000 00000" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Special Instructions (Optional)</Label>
                      <Textarea id="notes" placeholder="Any specific requirements or generic medicine preferences..." />
                    </div>

                    <Button 
                      className="w-full h-12 text-lg font-bold bg-primary shadow-lg shadow-primary/20"
                      disabled={!file || isScanning}
                      onClick={handleScan}
                    >
                      {isScanning ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          AI Scanning Prescription...
                        </>
                      ) : (
                        "Analyze & Submit"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-none shadow-xl">
                  <CardHeader className="bg-secondary text-white">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Step 2: Review AI Scan
                    </CardTitle>
                    <CardDescription className="text-secondary-foreground/80">
                      Our AI has identified the following medicines. Please confirm.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      {scanResult?.medicines.map((med, idx) => (
                        <div key={idx} className="flex items-start justify-between p-4 rounded-xl bg-muted/50 border border-muted-foreground/10">
                          <div className="space-y-1">
                            <h4 className="font-bold text-primary">{med.name}</h4>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {med.dosage}</span>
                              <span className="font-medium text-foreground">{med.quantity}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">Edit</Button>
                        </div>
                      ))}
                    </div>

                    {scanResult?.notes && (
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-700">
                        <p className="font-bold mb-1 flex items-center gap-2"><Info className="w-4 h-4" /> AI Observations:</p>
                        {scanResult.notes}
                      </div>
                    )}

                    <div className="pt-4 flex gap-4">
                      <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Go Back</Button>
                      <Button className="flex-1 bg-secondary text-lg font-bold">Confirm Order</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="md:col-span-4 space-y-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Why verify?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <p><span className="font-bold text-foreground">Compliance:</span> Legal requirement for schedule H drugs.</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <p><span className="font-bold text-foreground">Safety:</span> Professional pharmacists double-check dosages.</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <p><span className="font-bold text-foreground">Savings:</span> We suggest generic alternatives where possible.</p>
                  </div>
                </CardContent>
              </Card>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white space-y-4">
                <h3 className="font-bold">Need help?</h3>
                <p className="text-sm text-primary-foreground/80 leading-relaxed">
                  Call our 24/7 pharmacist helpline for any assistance regarding your prescription.
                </p>
                <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold">+91 12345 67890</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
