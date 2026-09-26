export default function SectionHeading({ children, subtitle, centered = true, mobileCentered = false }) {
  const alignment = centered
    ? "items-center text-center"
    : mobileCentered
      ? "items-center text-center lg:items-start lg:text-left"
      : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment}`}>
      <h2
        className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl lg:text-5xl dark:text-white"
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
