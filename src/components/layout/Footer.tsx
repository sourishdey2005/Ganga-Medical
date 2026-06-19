import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-md">
                <span className="text-white font-bold text-xl tracking-tight">G</span>
              </div>
              <span className="font-bold text-xl text-primary">Ganga Medical</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ganga Medical Store is committed to providing genuine medicines and reliable healthcare services. Your health is our priority.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/catalog" className="hover:text-primary transition-colors">Browse Medicines</Link></li>
              <li><Link href="/consultation" className="hover:text-primary transition-colors">Talk to Doctors</Link></li>
              <li><Link href="/lab-tests" className="hover:text-primary transition-colors">Lab Test Booking</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">My Health Vault</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>123 Medical Plaza, Health Street, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@gangamedical.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-medium uppercase tracking-widest">
          <p>© 2024 GANGA MEDICAL STORE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <span>License: #DRU-123456789</span>
            <span>GST: 07AAGCM1234Z1Z1</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
