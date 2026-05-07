import "@birgo/styles/index.css";
import { Header } from "@birgo/components/Header";
import { Footer } from "@birgo/components/Footer";

export const metadata = {
  title: "Birgó - Smart Household Delivery",
  description: "Never run out of essentials again.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div
          className="min-h-screen flex flex-col"
          style={{ backgroundColor: "#E8EBEF" }}
        >
          <Header />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}

// import "../styles/globals.css";
// import { Header } from "../components/Header";
// import { Footer } from "../components/Footer";

// export const metadata = {
//   title: "Birgó - Smart Household Delivery",
//   description: "Never run out of essentials again.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="is">
//       <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
//         <Header />

//         <main className="flex-1 flex flex-col w-full">{children}</main>

//         <Footer />
//       </body>
//     </html>
//   );
// }
