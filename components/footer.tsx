export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t border-border py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-foreground/70 mb-2">
          🎂 A special birthday tribute created with love 🎂
        </p>
        <p className="text-foreground/50 text-sm">
          Happy Birthday My Dude!!! • February 13th
        </p>
        <p className="text-foreground/40 text-xs mt-4">
          © {currentYear} Birthday Tribute • Made with ❤️
        </p>
      </div>
    </footer>
  );
}
