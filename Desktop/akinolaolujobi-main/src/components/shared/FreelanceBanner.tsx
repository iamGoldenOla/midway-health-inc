export default function FreelanceBanner() {
  return (
    <div className="bg-primary py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="mx-8 text-coral font-bold text-sm md:text-base uppercase tracking-wider">
            PREMIUM MULTI-SERVICE BRAND • EXCELLENCE IN EVERY DETAIL • AKINOLA OLUJOBI
          </span>
        ))}
      </div>
    </div>
  );
}
