export default function SectionHeading({ children, subtitle, centered = true }) {
  return (
    <div className={`flex flex-col ${centered ? "items-center text-center" : "items-start text-left"}`}>
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
