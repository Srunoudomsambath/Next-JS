// Menu items.
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
export const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "User",
    url: "/dashboard",
    icon: Inbox,
  },
  {
    title: "Blog Posts",
    url: "/blog-dashboard",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title:"Products",
    url:"/product-dashboard",
    icon: Search
  }
]