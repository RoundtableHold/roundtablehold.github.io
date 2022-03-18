import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SheetSchema } from "src/util/gapi";
import Link from "next/link";

export interface LayoutProps {
  sections: SheetSchema[];
}

interface Props extends AppProps<LayoutProps> {
  pageProps: LayoutProps;
}

function MyApp({ Component, pageProps }: Props) {
  return (
    <>
      <Head>
        <title>Roundtable Tracker</title>
        <meta
          name="description"
          content="The ultimate tool for Elden Ring completionists"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex gap-8 mb-8 border-b border-stone-500 pb-4 text-stone-100 tracking-wide underline underline-offset-1 uppercase">
        <Link href="/">Home</Link>
        {pageProps.sections.map((section) => (
          <Link key={section.id} href={`/${section.id}`}>
            {section.title}
          </Link>
        ))}
      </header>
      <main className="flex-1 mb-4">
        <Component {...pageProps} />
      </main>
      <footer className="text-sm text-stone-300 text-center">
        <a
          href="https://docs.google.com/spreadsheets/d/1QgHx9WmOLcB8cuaYSILTuDu3n5VERNFdDMR0LQU_w3A"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <strong>@Quivorian</strong>&apos;s Elden Ring Completionist
          Checklist
        </a>
      </footer>
    </>
  );
}

export default MyApp;
