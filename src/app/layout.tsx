import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/provider/theme-provider";
import ReactQueryClientProvider from "@/provider/react-query-client-provider";
import { Toaster } from "@/components/ui/toaster";
import { ReduxProvider } from "@/redux/provider";

const manrope = Manrope({
  subsets: ["latin"],
});
// WIP: Add metadata
export const metadata: Metadata = {
  title: "Eternity",
  description:
    "Eternity is a platform for creating and sharing your own AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body className={`${manrope.className}   bg-[#171717]`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ReduxProvider>
              <ReactQueryClientProvider>
                {children}
                <Toaster />
              </ReactQueryClientProvider>
            </ReduxProvider>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
