'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userInitial = session?.user?.email?.[0].toUpperCase() || '';

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <NavigationMenu className="container mx-auto h-16">
        <div className="relative flex h-16 w-full items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-primary">AccidentAware</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <NavigationMenuLink href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </NavigationMenuLink>
            <NavigationMenuLink href="/features" className="text-muted-foreground hover:text-foreground">
              Features
            </NavigationMenuLink>
            <NavigationMenuLink href="/product" className="text-muted-foreground hover:text-foreground">
              Product
            </NavigationMenuLink>
            <NavigationMenuLink href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </NavigationMenuLink>
            <NavigationMenuLink href="/contact" className="text-muted-foreground hover:text-foreground">
              Contact
            </NavigationMenuLink>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/upgrade" className="text-muted-foreground hover:text-foreground">
                Upgrade
              </Link>
            </Button>
            {session?.user ? (
              <div className="flex items-center space-x-4 relative">
                <NavigationMenuLink 
                  href="/dashboard"
                  className="text-primary font-medium hover:text-primary/90"
                >
                  Dashboard
                </NavigationMenuLink>
                <div className="relative group">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      {userInitial}
                    </div>
                  </Button>
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border py-1 ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <NavigationMenuLink 
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      Profile
                    </NavigationMenuLink>
                    <NavigationMenuLink 
                      href="/contact"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      Help & Support
                    </NavigationMenuLink>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-background border-b lg:hidden">
              <div className="flex flex-col space-y-4 px-4 py-6">
                <NavigationMenuLink href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </NavigationMenuLink>
                <NavigationMenuLink href="/features" className="text-muted-foreground hover:text-foreground">
                  Features
                </NavigationMenuLink>
                <NavigationMenuLink href="/product" className="text-muted-foreground hover:text-foreground">
                  Product
                </NavigationMenuLink>
                <NavigationMenuLink href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </NavigationMenuLink>
                <NavigationMenuLink href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </NavigationMenuLink>
                <NavigationMenuLink 
                  href="/upgrade"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Upgrade
                </NavigationMenuLink>
                {session?.user ? (
                  <>
                    <NavigationMenuLink 
                      href="/dashboard"
                      className="text-primary font-medium hover:text-primary/90"
                    >
                      Dashboard
                    </NavigationMenuLink>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => signOut()}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild className="justify-start">
                      <Link href="/signin">Sign In</Link>
                    </Button>
                    <Button size="sm" asChild className="justify-start">
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </NavigationMenu>
    </nav>
  );
}