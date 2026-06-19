"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ShieldCheck, Lock, Mail, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

const HARDCODED_CREDENTIALS = [
  { email: "admin@gangamedical.com", password: "admin123", role: "admin", name: "System Admin" },
  { email: "pharmacy@gangamedical.com", password: "pharmacy123", role: "pharmacy", name: "Ganga Central Pharmacy" }
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API delay
    setTimeout(() => {
      const user = HARDCODED_CREDENTIALS.find(u => u.email === email && u.password === password)

      if (user) {
        localStorage.setItem("gangarx_user", JSON.stringify(user))
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
        })
        router.push("/admin/dashboard")
      } else {
        setError("Invalid email or password. Please use hardcoded credentials.")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-muted/20 flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold">Staff Portal</h1>
            <p className="text-muted-foreground">Access your pharmacy management dashboard</p>
          </div>

          <Card className="border-none shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">Login</CardTitle>
              <CardDescription>Enter your official credentials to continue</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="bg-destructive/10 text-destructive border-none">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@gangamedical.com" 
                      className="pl-9 h-11"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      className="pl-9 h-11"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full h-11 text-md font-bold" type="submit" disabled={isLoading}>
                  {isLoading ? "Authenticating..." : "Sign In"}
                </Button>
                <div className="text-xs text-center text-muted-foreground p-4 bg-muted/50 rounded-xl space-y-2">
                  <p className="font-bold text-primary underline">Demo Credentials:</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <p className="font-bold">Admin:</p>
                      <p>admin@gangamedical.com</p>
                      <p>admin123</p>
                    </div>
                    <div>
                      <p className="font-bold">Pharmacy:</p>
                      <p>pharmacy@gangamedical.com</p>
                      <p>pharmacy123</p>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
