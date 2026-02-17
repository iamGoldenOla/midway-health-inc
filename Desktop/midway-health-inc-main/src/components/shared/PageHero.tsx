interface PageHeroProps {
  image: string;
  title: string;
  subtitle: string;
}

const PageHero = ({ image, title, subtitle }: PageHeroProps) => {
  return (
    <section className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] min-h-[320px] sm:min-h-[380px] md:min-h-[440px] overflow-hidden">
      {/* Full image - proper positioning to show faces */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{ backgroundImage: `url(${image})`, backgroundPosition: "center top" }}
      />
      {/* Subtle bottom gradient only for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-white/90 text-lg drop-shadow-md">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
