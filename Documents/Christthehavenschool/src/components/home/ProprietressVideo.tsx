import { motion } from "framer-motion";
import { Play, Video } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import proprietressImg from "@/assets/proprietress.jpg";

const ProprietressVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Placeholder video URL - replace with actual video when available
  const videoUrl = ""; // Add the actual video URL here when ready

  return (
    <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow/5 rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-1/2 translate-y-1/2" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-yellow font-medium text-sm uppercase tracking-wider">
              Message from Our Proprietress
            </span>
            <h2 className="heading-section mt-3 mb-6">
              A Word from <span className="text-yellow">Mrs Bisola Toriola</span>
            </h2>
            <p className="text-lg opacity-90 mb-6">
              Hear directly from our Proprietress about our vision, values, and 
              commitment to providing the best education for your children at 
              Christ The Haven School.
            </p>
            <p className="opacity-80 mb-8">
              "At Christ The Haven School, we believe every child is unique and 
              capable of achieving greatness. Our mission is to nurture these 
              young minds with quality education, strong moral values, and a 
              foundation rooted in godliness."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-yellow/20 flex items-center justify-center">
                <Video className="text-yellow" size={24} />
              </div>
              <div>
                <p className="font-medium">Watch Our Introduction Video</p>
                <p className="text-sm opacity-70">1-2 minutes</p>
              </div>
            </div>
          </motion.div>

          {/* Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden bg-navy-light shadow-card-lg">
              {!isPlaying || !videoUrl ? (
                <div className="relative w-full h-full">
                  {/* Thumbnail */}
                  <img
                    src={proprietressImg}
                    alt="Mrs Bisola Toriola - Proprietress"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                    {videoUrl ? (
                      <Button
                        onClick={() => setIsPlaying(true)}
                        variant="yellow"
                        size="lg"
                        className="rounded-full w-20 h-20 p-0"
                      >
                        <Play size={32} fill="currentColor" />
                      </Button>
                    ) : (
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-yellow/20 flex items-center justify-center mx-auto mb-4 border-2 border-yellow border-dashed">
                          <Play size={32} className="text-yellow" />
                        </div>
                        <p className="text-sm font-medium text-yellow">
                          Video Coming Soon
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-yellow rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProprietressVideo;
