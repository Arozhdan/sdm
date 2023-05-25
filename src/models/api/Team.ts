import { type Media } from "./Media";
import { type Meta } from "./Meta";
export interface TeamResponse {
  data: Team[];
  meta: Meta;
}
export interface Team {
  id: number;
  attributes: {
    name: string;
    role: string;
    image: {
      data: {
        attributes: Media;
      };
    };
  };
}
