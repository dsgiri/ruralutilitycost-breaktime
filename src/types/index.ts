export type Category = 
  | "Matching" 
  | "Sorting" 
  | "Timing" 
  | "Memory" 
  | "Trivia" 
  | "Pattern Recognition" 
  | "Mini Challenge" 
  | "Farm Ops" 
  | "Educational";

export interface Game {
  id: string;
  title: string;
  description: string;
  playTimeEstimate: string;
  category: Category;
  iconName?: string;
  route: string;
  featured?: boolean;
}
