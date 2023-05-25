import { type Testimonial } from "~/models/api";

export interface TestimonialsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testimonials?: Testimonial[];
}
