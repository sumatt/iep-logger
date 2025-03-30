"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, PlusCircle, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navigation() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      active: pathname === "/",
    },
    {
      href: "/new-session",
      label: "New Session",
      icon: <PlusCircle className="h-5 w-5" />,
      active: pathname === "/new-session",
    },
    {
      href: "/students",
      label: "Students",
      icon: <Users className="h-5 w-5" />,
      active: pathname === "/students" || pathname.startsWith("/students/"),
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">IEP Voice Logger</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-5">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                route.active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary p-2 rounded-md ${
                    route.active ? "text-primary bg-muted" : "text-muted-foreground"
                  }`}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

