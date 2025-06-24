export type Portfolio = {
  id: number;
  name: string;
  total_invested: number;
  total_return: number;
  current_value: number;
  change_24h_percentage: number;
  total_trades?: number;
  tokens?: {
    symbol: string;
    name: string;
    image: string;
    quantity: number;
    current_price: number;
    current_value: number;
    total_invested: number;
    price_change_24h: number;
  }[];
};
