const loaderBars = [
  {
    color: "bg-secondary",
    animation: "animate-spin2",
    delay: "animation-delay-2",
  },
  {
    color: "bg-primary-dark",
    animation: "animate-spin3",
    delay: "animation-delay-3",
  },
  {
    color: "bg-primary",
    animation: "animate-spin4",
    delay: "animation-delay-4",
  },
];

export default function MainLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-background z-50">
      <div className="flex items-center">
        <div className="dash mx-3.75 rounded-lg h-3.75 w-8.75 ltr:-mr-4.5 rtl:-ml-4.5 ltr:origin-left rtl:origin-right animate-spin1 bg-primary dash-one"></div>
        {loaderBars.map((bar, i) => (
          <div
            key={i}
            className={`dash mx-3.75 ltr:origin-right rtl:origin-left rounded-lg h-3.75 w-8.75 ${bar.color} ${bar.animation} ${bar.delay}`}
          />
        ))}
      </div>
    </div>
  );
}
