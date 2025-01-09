import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import SocialLinks from "@/components/social-links"
import { Logo } from "@/components/logo"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <nav className="bg-background border-b fixed w-full z-10">
            <div className="container mx-auto flex justify-between items-center h-16 px-4">
              <div className="flex items-center space-x-4">
                <Logo />
                <SocialLinks />
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="/" className="hover:text-primary">Home</a>
                <a href="#introduction" className="hover:text-primary">Introduction</a>
                <a href="#tech-stack" className="hover:text-primary">Tech Stack</a>
                <a href="#projects" className="hover:text-primary">Projects</a>
                <a href="#experience" className="hover:text-primary">Experience</a>
                <a href="/blog" className="hover:text-primary">Blog</a>
                <a href="#contact" className="hover:text-primary">Contact</a>
                <ThemeToggle />
              </div>
            </div>
          </nav>
          <main className="pt-16 bg-background text-foreground">
            {children}
          </main>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}

