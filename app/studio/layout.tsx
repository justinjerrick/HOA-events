export const metadata = {
  title: 'House of Arts Events - Studio',
  description: 'Content management for House of Arts Events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}