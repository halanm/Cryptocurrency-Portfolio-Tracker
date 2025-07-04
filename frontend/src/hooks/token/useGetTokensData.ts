import { useQuery } from "@tanstack/react-query";
import type { Token } from "../../domain/Token";
import axios from "axios";
import { useUser } from "../user/useUserContext";

type UseGetTokensDataParams = {
  tokens?: string;
};

export const useGetTokensData = ({ tokens }: UseGetTokensDataParams) => {
  const { user } = useUser();

  const preferred_currency = user?.preferred_currency;

  return useQuery<Token[] | null>({
    queryKey: ["tokens-data"],
    queryFn: async () => {
      if (preferred_currency === undefined) {
        throw new Error("Preferred currency is not set");
      }
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${preferred_currency}&per_page=10&price_change_percentage=24h&symbols=${tokens}`
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
