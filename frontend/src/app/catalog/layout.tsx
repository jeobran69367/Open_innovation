import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Catalog | Open Innovation',
  description: 'Discover mature and high-quality open source projects. Browse our curated catalog of projects sorted by maturity score.',
  keywords: [
    'open source',
    'projects',
    'catalog',
    'mature projects',
    'github',
    'software discovery',
  ],
  openGraph: {
    title: 'Project Catalog | Open Innovation',
    description: 'Discover mature and high-quality open source projects.',
    type: 'website',
    url: 'https://open-innovation.example.com/catalog',
    siteName: 'Open Innovation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Catalog | Open Innovation',
    description: 'Discover mature and high-quality open source projects.',
  },
  canonical: 'https://open-innovation.example.com/catalog',
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
