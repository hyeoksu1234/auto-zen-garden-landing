import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auto Zen Garden — Emotion-led Interactive App",
  description:
    "Auto Zen Garden introduces a sensorial ritual where conversations with an AI companion become emotion visualisations across a living sand canvas.",
  openGraph: {
    title: "Auto Zen Garden — Emotion-led Interactive App",
    description:
      "Step into a calm ritual where your conversations bloom into sand patterns. Explore the Auto Zen Garden companion app.",
    images: [
      {
        url: "https://dummyimage.com/1200x630/111315/ffffff&text=Auto+Zen+Garden",
        width: 1200,
        height: 630,
        alt: "Auto Zen Garden emotion to pattern showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Zen Garden — Emotion-led Interactive App",
    description:
      "Discover how conversations with an AI companion turn into personalised sand patterns.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
        />
      </head>
      <body className="antialiased selection:bg-accent-dawn/30">
        {children}
      </body>
    </html>
  );
}
