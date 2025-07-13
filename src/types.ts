export interface Avatar {
  name: string;
  persona: string;
  rating: number;
  categories: string[];
  role: string;
  image: string;
  behavior?: {
    greetingStyle: string;
  };
}
