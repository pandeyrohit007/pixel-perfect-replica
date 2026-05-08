import { Outlet, Link, createRootRoute, HeadContent, Scripts, useMatches } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "G.S. Express Pvt. Ltd. — Building the Future | EPC Infrastructure India" },
      { name: "description", content: "G.S. Express Pvt. Ltd. is a leading EPC company delivering roads, bridges, railway stations, and institutional buildings across India since 2006." },
      { name: "author", content: "G.S. Express Pvt. Ltd." },
      { property: "og:title", content: "G.S. Express Pvt. Ltd. — Building the Future | EPC Infrastructure India" },
      { property: "og:description", content: "G.S. Express Pvt. Ltd. is a leading EPC company delivering roads, bridges, railway stations, and institutional buildings across India since 2006." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "G.S. Express Pvt. Ltd. — Building the Future | EPC Infrastructure India" },
      { name: "twitter:description", content: "G.S. Express Pvt. Ltd. is a leading EPC company delivering roads, bridges, railway stations, and institutional buildings across India since 2006." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/70164133-4372-4729-b1d4-dea0898f6f72/id-preview-b14f7020--2e7ee1b2-9c9d-4542-b50e-ff65d0dafa11.lovable.app-1778246644538.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/70164133-4372-4729-b1d4-dea0898f6f72/id-preview-b14f7020--2e7ee1b2-9c9d-4542-b50e-ff65d0dafa11.lovable.app-1778246644538.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const matches = useMatches();
  const key = matches[matches.length - 1]?.pathname ?? "/";
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main key={key} className="flex-1 animate-page-in">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

