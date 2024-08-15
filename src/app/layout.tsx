import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import "./layout.css";
import { cn } from "@/lib/utils";
import AssignPathRoles from "@/components/assignPathRoles";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio | THAG",
    template: "%s | THAG",
  },
  description: "Welcome to website THAG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <main >
            <AssignPathRoles>{children}</AssignPathRoles>
          </main>

        </ThemeProvider>
      </body>
    </html>
  );
}
