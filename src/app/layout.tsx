import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google"
import { LenisProvider } from "@/components/animations/lenis-provider"
import { ScrollProgressBar } from "@/components/animations/scroll-progress-bar"
import { Footer } from "@/components/layouts/footer"
import { Navbar } from "@/components/layouts/navbar"
import { SonnerToaster } from "@/components/ui/sonner-toaster"
import "./globals.css"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "Innovation Club | KITS Guntur",
  description:
    "Innovation Club at KITS Guntur builds future-ready engineers through talks, workshops, hackathons, and high-impact collaborations.",
  openGraph: {
    title: "Innovation Club | KITS Guntur",
    description:
      "A world-class technical community at KITS Guntur focused on innovation, engineering, and leadership.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg-base text-text-primary font-ui">
        <LenisProvider>
          <ScrollProgressBar />
          <div className="relative flex min-h-full flex-col">
            <Navbar />
            <main className="flex-1 pt-24">{children}</main>
            <Footer />
          </div>
          <SonnerToaster />
        </LenisProvider>
      </body>
    </html>
  )
}
