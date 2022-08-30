import { useInfiniteQuery } from "react-query";
import axios from "axios";

export const useFetchProducts = ({ size }) =>
  useInfiniteQuery(
    "products",
    ({ pageParam = 1 }) =>
      axios.get("http://localhost:8001/product", {
        params: { page: pageParam, size },
      }),
    {
      getNextPageParam: ({ data: { isLastPage, pageNumber } }) => {
        return isLastPage ? undefined : Number(pageNumber) + 1;
      },
    }
  );
