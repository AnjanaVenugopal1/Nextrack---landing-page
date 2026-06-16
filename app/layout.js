import "./globals.css";

export const metadata = {
  title: "Nextrack - The Ultimate Task Management App",
  description: "Nextrack helps you organize your tasks, boost productivity, and stay on top of your game with an intuitive and beautiful interface.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
