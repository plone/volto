export default function Topbar({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-background topbar sticky top-0 z-1 mb-4 flex w-100 flex-wrap items-center gap-4 py-2 lg:flex-nowrap">
      {children}
    </section>
  );
}
