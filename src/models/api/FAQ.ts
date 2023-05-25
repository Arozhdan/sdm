import { type Meta } from "./Meta";

export interface FAQResponse {
  data: FAQ[];
  meta: Meta;
}

export interface FAQ {
  id: number;
  attributes: {
    question: string;
    answer: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
}
