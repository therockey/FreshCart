import { getDepots } from "@/service/Depot";
import { createApiHandler } from "@/utils/ApiHandling";

export const GET = createApiHandler({
  methodName: "GET: /depots",
  fetchData: async () => await getDepots(),
  notFoundMessage: "Failed to find depots",
});
