import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CounterProps {
    value: number;
    direction?: "up" | "down";
    duration?: number;
    delay?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
}

const Counter = ({
    value,
    direction = "up",
    duration = 2,
    delay = 0,
    className = "",
    prefix = "",
    suffix = "",
}: CounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(direction === "down" ? value : 0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
        duration: duration * 1000,
    });
    const isInView = useInView(ref, { once: true, margin: "0px" });

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                motionValue.set(direction === "down" ? 0 : value);
            }, delay * 1000);
        }
    }, [isInView, motionValue, direction, value, delay]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US").format(
                    Math.floor(latest)
                );
            }
        });
    }, [springValue]);

    return (
        <span className={className}>
            {prefix}
            <span ref={ref} />
            {suffix}
        </span>
    );
};

export default Counter;
