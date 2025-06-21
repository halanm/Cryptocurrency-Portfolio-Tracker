import { useQuery } from "@tanstack/react-query";
import type { Coin } from "../../domain/Coin";
import { useUser } from "../user/useUserContext";
import axios from "axios";

export const useGetTrendingCoins = () => {
  const { user } = useUser();

  const preferred_currency = user?.preferred_currency || "usd";

  return useQuery<Coin[] | null>({
    queryKey: ["trending-coins"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?order=volume_desc&vs_currency=${preferred_currency}&per_page=10&price_change_percentage=24h`
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
