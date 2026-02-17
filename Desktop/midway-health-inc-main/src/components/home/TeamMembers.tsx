import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";

const team = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Medical Director",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "James Carter, RN",
    role: "Head of Nursing",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Emily Rodriguez, PT",
    role: "Lead Physical Therapist",
    image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Michael Thompson",
    role: "Patient Care Coordinator",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Lisa Chen, OT",
    role: "Occupational Therapist",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "David Okonkwo",
    role: "Home Health Aide",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Angela Davis, SLP",
    role: "Speech Therapist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Robert Kim, RN",
    role: "Registered Nurse",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Maria Santos",
    role: "Care Coordinator",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Chris Walker, PT",
    role: "Physical Therapist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
  },
];

const row1 = team.slice(0, 6);
const row2 = team.slice(6, 10);

// Varying heights for the staggered collage look (tall/short alternating)
const row1Sizes = [
  "h-36 sm:h-44 md:h-52",   // short
  "h-44 sm:h-56 md:h-64",   // tall
  "h-36 sm:h-48 md:h-56",   // medium
  "h-44 sm:h-52 md:h-60",   // medium-tall
  "h-36 sm:h-44 md:h-52",   // short
  "h-44 sm:h-56 md:h-64",   // tall
];
const row2Sizes = [
  "h-44 sm:h-52 md:h-60",
  "h-36 sm:h-44 md:h-52",
  "h-44 sm:h-56 md:h-64",
  "h-36 sm:h-48 md:h-56",
];

const PhotoCard = ({
  member,
  heightClass,
  index,
  isVisible,
}: {
  member: (typeof team)[0];
  heightClass: string;
  index: number;
  isVisible: boolean;
}) => (
  <motion.div
    className={`relative rounded-2xl overflow-hidden ${heightClass} flex-1 min-w-0 group cursor-pointer`}
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
    transition={{ delay: index * 0.07, duration: 0.55, ease: "easeOut" }}
  >
    <img
      src={member.image}
      alt={member.name}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      loading="lazy"
    />
    {/* Permanent subtle bottom gradient for depth */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    {/* Hover overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-3 md:p-4">
      <div>
        <p className="text-white text-xs md:text-sm font-bold leading-tight drop-shadow-md">
          {member.name}
        </p>
        <p className="text-white/80 text-[10px] md:text-xs mt-0.5">
          {member.role}
        </p>
      </div>
    </div>
  </motion.div>
);

const TeamMembers = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 lg:py-28 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Our Team</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mt-3 leading-[1.1]">
            Meet the Professionals<br className="hidden sm:block" /> Behind Your Care.
          </h2>
        </motion.div>

        {/* Row 1 — 6 photos, aligned bottom so varying heights create top stagger */}
        <div className="flex items-end gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
          {row1.map((member, i) => (
            <PhotoCard
              key={member.name}
              member={member}
              heightClass={row1Sizes[i]}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Row 2 — 4 photos, offset left with padding for stagger effect */}
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 ml-[10%] sm:ml-[8%] md:ml-[6%]">
          {row2.map((member, i) => (
            <PhotoCard
              key={member.name}
              member={member}
              heightClass={row2Sizes[i]}
              index={i + 6}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Heading */}
        <motion.div
          className="text-center max-w-2xl mx-auto mt-14 md:mt-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Care delivered by people who care
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Our dedicated team of licensed healthcare professionals is committed
            to delivering exceptional care with compassion, expertise, and heart
            — right in the comfort of your home.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamMembers;
