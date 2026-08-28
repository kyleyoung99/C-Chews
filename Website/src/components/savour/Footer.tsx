export function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-border/70 pt-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-medium tracking-tight text-foreground">
              Savour<span className="text-ritual transition-colors duration-500">.</span>
            </p>
            <p className="mt-1 font-mono text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase">
              Reset your palate.
            </p>
          </div>
          <nav className="flex items-center gap-6 font-mono text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#ingredients" className="transition-colors hover:text-foreground">
              Ingredients
            </a>
            <a href="mailto:hello@savour.example" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>
          <p className="font-mono text-[0.62rem] tracking-[0.14em] text-muted-foreground uppercase">
            © {new Date().getFullYear()} Savour
          </p>
        </div>
      </div>
    </footer>
  );
}
