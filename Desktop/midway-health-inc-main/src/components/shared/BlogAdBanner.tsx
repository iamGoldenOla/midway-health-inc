/**
 * BlogAdBanner — Placeholder ad banner for the blog sidebar.
 * Replace the SVG with a real <img> tag pointing to your ad image when ready.
 * Usage: <BlogAdBanner size="tall" /> or <BlogAdBanner size="medium" />
 */

interface BlogAdBannerProps {
    size?: "tall" | "medium";
}

const BlogAdBanner = ({ size = "tall" }: BlogAdBannerProps) => {
    const height = size === "tall" ? "h-72" : "h-52";

    return (
        <div className="rounded-2xl border border-border overflow-hidden shadow-card">
            <div
                className={`relative w-full ${height} flex flex-col items-center justify-center text-center`}
                style={{
                    background: "linear-gradient(145deg, #0d6e6e 0%, #0a5a5a 40%, #c2410c 100%)",
                }}
            >
                {/* Background pattern */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-10"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern id="adgrid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <circle cx="15" cy="15" r="1.5" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#adgrid)" />
                </svg>

                {/* Medical cross icon */}
                <div className="relative mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                            <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                    </div>
                </div>

                {/* Text content */}
                <p className="relative text-white/80 text-[10px] uppercase tracking-[0.2em] font-semibold mb-1">
                    Midway Health Inc.
                </p>
                <h3 className="relative text-white font-bold text-base leading-tight px-4 mb-2">
                    Compassionate<br />Home Healthcare
                </h3>
                <div className="relative bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-2 shadow-lg">
                    CALL US TODAY
                </div>
                <p className="relative text-white font-bold text-sm tracking-wide">
                    (312) 298-9124
                </p>
                <p className="relative text-white/60 text-[10px] mt-2">
                    midwayhealthinc.com
                </p>

                {/* Ad label */}
                <span className="absolute top-2 right-2 text-[9px] text-white/40 uppercase tracking-wider">
                    Advertisement
                </span>
            </div>
        </div>
    );
};

export default BlogAdBanner;
