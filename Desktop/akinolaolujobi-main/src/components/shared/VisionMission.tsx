import { Eye, Target, Compass } from 'lucide-react';

const VisionMission = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-coral/3 blur-[80px]" />
      </div>

      <div className="container-custom px-4 md:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">
            <Compass className="w-3.5 h-3.5" />
            Guiding Principles
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Vision & Mission
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 h-full">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                <Eye className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                My Vision
              </h3>
              
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-6" />
              
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                To be a leading voice in content creation and digital storytelling, inspiring individuals 
                and brands to discover their unique narrative and share it with the world in ways that 
                create lasting impact and meaningful connections.
              </p>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/10 rounded-tr-lg group-hover:border-primary/30 transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/10 rounded-bl-lg group-hover:border-primary/30 transition-colors duration-500" />
            </div>
          </div>

          {/* Mission Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-coral/10 to-coral/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-border/50 hover:border-coral/30 transition-all duration-500 h-full">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center mb-6 shadow-lg shadow-coral/20 group-hover:scale-110 transition-transform duration-500">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                My Mission
              </h3>
              
              <div className="w-12 h-1 bg-gradient-to-r from-coral to-coral/50 rounded-full mb-6" />
              
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                To empower businesses and individuals with compelling content strategies, authentic 
                storytelling, and innovative digital solutions that amplify their message, engage their 
                audience, and drive transformative results.
              </p>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-coral/10 rounded-tr-lg group-hover:border-coral/30 transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-coral/10 rounded-bl-lg group-hover:border-coral/30 transition-colors duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;