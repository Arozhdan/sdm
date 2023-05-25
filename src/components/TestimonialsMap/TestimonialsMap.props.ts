import { type Testimonial } from "~/models/api";

export interface TestimonialsMapProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testimonials?: Testimonial[];
}
