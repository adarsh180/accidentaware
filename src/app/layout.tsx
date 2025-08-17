import { Inter } from "next/font/google";
import AuthSessionProvider from "@/components/providers/session-provider";
import { CartProvider } from "@/lib/cart-context";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/footer";
import { ChatBot } from "@/components/ui/chat-bot";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: "AccidentAware",
  description: "Next-gen accident detection system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <AuthSessionProvider>
          <CartProvider>
            <Navigation />
            <main className="flex-1 container mx-auto px-4 py-8 lg:px-8">
              {children}
            </main>
            <Footer />
            <ChatBot />
            <Toaster />
          </CartProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}