import { redirect } from 'next/navigation';
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/homepage",
  },
};

export default function Home() {
  // Redirect to homepage
  redirect('/homepage');
}
