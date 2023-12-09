import "../globals.css";
import Provider from "./_trpc/Provider";

export const metadata = {
  title: "Pong",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
