import { type Media } from "./Media";

export interface Testimonial {
  id: number;
  attributes: {
    name: string;
    role: string;
    quote: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    avatar?: Avatar;
    mapPosition: {
      id: number;
      top: number;
      left: number;
    };
  };
}

export interface Avatar {
  data: {
    id: number;
    attributes: Media;
  };
}
