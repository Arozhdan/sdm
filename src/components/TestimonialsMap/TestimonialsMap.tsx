import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import styles from "./TestimonialsMap.module.css";
import { useState, type FC } from "react";
import { type TestimonialsMapProps } from "./TestimonialsMap.props";
import { TestimonialCard } from "../Cards/TestimonialCard/TestimonialCard";
import { useDebounce } from "~/hooks";
import { type Testimonial } from "~/models/api";

export const TestimonialsMap: FC<TestimonialsMapProps> = ({
  testimonials = [],
  className,
  ...props
}) => {
  const classes = cn(styles.testimonialsMap, className);
  const [activeTestimonial, setActiveTestimonial] =
    useState<Testimonial | null>(null);

  const debouncedActiveTestimonial = useDebounce(activeTestimonial, 300);
  // return <>{JSON.stringify(testimonials)}</>;
  return (
    <div className={classes}>
      <Image src={"/world-map.svg"} fill alt={""} />
      {testimonials.map((testimonial) => (
        <>
          {testimonial.attributes.mapPosition && (
            <MapPinIcon
              key={testimonial.id}
              onMouseEnter={() => setActiveTestimonial(testimonial)}
              onMouseLeave={() => setActiveTestimonial(null)}
              className={styles.pin}
              style={{
                top: `${testimonial.attributes.mapPosition.top}%`,
                left: `${testimonial.attributes.mapPosition.left}%`,
              }}
            />
          )}
        </>
      ))}
      {debouncedActiveTestimonial &&
        debouncedActiveTestimonial.attributes.mapPosition && (
          <div
            className={styles.testimonialCard}
            key={debouncedActiveTestimonial.attributes.name}
            style={{
              left: `${debouncedActiveTestimonial.attributes.mapPosition.left}%`,
              top: `${debouncedActiveTestimonial.attributes.mapPosition.top}%`,
            }}
          >
            <TestimonialCard
              onMouseOver={() =>
                setActiveTestimonial(debouncedActiveTestimonial)
              }
              onMouseLeave={() => setActiveTestimonial(null)}
              name={debouncedActiveTestimonial.attributes.name}
              role={debouncedActiveTestimonial.attributes.role}
              avatar={
                debouncedActiveTestimonial.attributes.avatar.data.attributes.url
              }
              quote={debouncedActiveTestimonial.attributes.quote}
              quoteMaxLines={4}
            />
          </div>
        )}
    </div>
  );
};
