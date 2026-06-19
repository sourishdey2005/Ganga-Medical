"use client"

import { Card } from "@/components/ui/card"
import { 
  Heart, 
  Baby, 
  User, 
  Activity, 
  Eye, 
  Stethoscope, 
  ShieldCheck, 
  Thermometer 
} from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: '1', name: 'Prescription', icon: Stethoscope, color: 'bg-blue-50 text-blue-600' },
  { id: '2', name: 'OTC Medicines', icon: Thermometer, color: 'bg-green-50 text-green-600' },
  { id: '3', name: 'Diabetes', icon: Activity, color: 'bg-red-50 text-red-600' },
  { id: '4', name: 'Baby Care', icon: Baby, color: 'bg-purple-50 text-purple-600' },
  { id: '5', name: 'Personal Care', icon: User, color: 'bg-orange-50 text-orange-600' },
  { id: '6', name: 'Vitamins', icon: ShieldCheck, color: 'bg-yellow-50 text-yellow-600' },
  { id: '7', name: 'Heart Care', icon: Heart, color: 'bg-pink-50 text-pink-600' },
  { id: '8', name: 'Eye Care', icon: Eye, color: 'bg-indigo-50 text-indigo-600' },
]

export function CategoryList() {
  return (
    <div className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
        <button className="text-primary font-semibold text-sm hover:underline">View All</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((cat) => (
          <Card key={cat.id} className="group cursor-pointer hover:shadow-md transition-all border-none bg-white p-4 flex flex-col items-center gap-3">
            <div className={cn("p-4 rounded-2xl transition-transform group-hover:scale-110", cat.color)}>
              <cat.icon className="w-8 h-8" />
            </div>
            <span className="text-sm font-semibold text-foreground text-center line-clamp-1">{cat.name}</span>
          </Card>
        ))}
      </div>
    </div>
  )
}
