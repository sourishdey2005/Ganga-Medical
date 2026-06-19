
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  LogOut,
  FileText
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const MOCK_ORDERS = [
  { id: "ORD-8821", patient: "Rajesh Kumar", medicines: "Paracetamol, Vitamin C", amount: 450, status: "Delivered", date: "2024-05-20", priority: "Normal" },
  { id: "ORD-8822", patient: "Sneha Sharma", medicines: "Amoxicillin 250mg", amount: 1200, status: "Processing", date: "2024-05-21", priority: "Urgent" },
  { id: "ORD-8823", patient: "Amit Singh", medicines: "Dolo 650, Cough Syrup", amount: 320, status: "Out for Delivery", date: "2024-05-21", priority: "Normal" },
  { id: "ORD-8824", patient: "Priya Verma", medicines: "Insulin Cartridges", amount: 2500, status: "Pending Verification", date: "2024-05-21", priority: "High" },
  { id: "ORD-8825", patient: "Vikram Malhotra", medicines: "Multivitamin Gold", amount: 180, status: "Cancelled", date: "2024-05-19", priority: "Low" },
]

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem("gangarx_user")
    if (!storedUser) {
      router.push("/login")
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("gangarx_user")
    toast({
      title: "Logged Out",
      description: "You have been securely signed out.",
    })
    router.push("/")
  }

  if (!user) return null

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3">Delivered</Badge>
      case 'Processing': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3">Processing</Badge>
      case 'Out for Delivery': return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none px-3">In Transit</Badge>
      case 'Pending Verification': return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none px-3">Pending Rx</Badge>
      case 'Cancelled': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none px-3">Cancelled</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'text-red-600 font-bold'
      case 'High': return 'text-orange-600 font-bold'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                <LayoutDashboard className="w-8 h-8 text-primary" />
                {user.role === 'admin' ? 'Global Admin Dashboard' : 'Pharmacy Management'}
              </h1>
              <p className="text-muted-foreground">Welcome back, <span className="text-primary font-bold">{user.name}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 rounded-xl" onClick={handleLogout}>
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
              <Button className="gap-2 bg-primary rounded-xl">
                <Package className="w-4 h-4" /> Inventory
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-sm rounded-2xl">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Today's Orders</p>
                  <p className="text-2xl font-black">42</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-2xl">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Completed</p>
                  <p className="text-2xl font-black">28</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-2xl">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-xl text-yellow-700">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Pending</p>
                  <p className="text-2xl font-black">14</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-2xl">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-xl text-red-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Urgent Rx</p>
                  <p className="text-2xl font-black">5</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-white">
            <CardHeader className="border-b bg-muted/10 p-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Medical Orders</CardTitle>
                <CardDescription>Real-time stream of incoming pharmacy requests</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary font-bold">Export CSV</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-[100px] py-4 px-6">ID</TableHead>
                    <TableHead className="py-4 px-6">Patient</TableHead>
                    <TableHead className="py-4 px-6">Medicines</TableHead>
                    <TableHead className="py-4 px-6">Date</TableHead>
                    <TableHead className="py-4 px-6">Amount</TableHead>
                    <TableHead className="py-4 px-6">Status</TableHead>
                    <TableHead className="py-4 px-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_ORDERS.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/10 transition-colors">
                      <TableCell className="font-bold py-4 px-6 text-primary">{order.id}</TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-bold">{order.patient}</span>
                          <span className={`text-[10px] uppercase tracking-wider ${getPriorityColor(order.priority)}`}>
                            {order.priority}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6 text-sm max-w-[200px] truncate">{order.medicines}</TableCell>
                      <TableCell className="py-4 px-6 text-sm text-muted-foreground">{order.date}</TableCell>
                      <TableCell className="py-4 px-6 font-bold">₹{order.amount}</TableCell>
                      <TableCell className="py-4 px-6">{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
