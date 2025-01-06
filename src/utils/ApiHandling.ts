import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "./StatusCode";

type FactoryConfig<Params = any, Body = any, Args = any> = {
  methodName: string; // Name of the method for logging and errors
  extractParams?: (params: Params) => Partial<Args>; // Optional function to extract params
  extractBody?: (body: Body) => Partial<Args>; // Optional function to extract body data
  fetchData: (args: Args) => Promise<any>; // Function to fetch data
  notFoundMessage: string; // Message to show if data is not found
};

export const createApiHandler = <Params, Body, Args>({
  methodName,
  extractParams,
  extractBody,
  fetchData,
  notFoundMessage,
}: FactoryConfig<Params, Body, Args>) => {
  return async (request: NextRequest, context: { params: Params }) => {
    try {
      const resolvedParams = await context.params;
      const params = extractParams ? extractParams(resolvedParams) : {};
      if (!params || Object.values(params).some((value) => value == null)) {
        const missingKeys = Object.entries(params)
          .filter(([_, value]) => value == null)
          .map(([key]) => key);
        return NextResponse.json(
          {
            error: `Missing or invalid parameter(s): ${missingKeys.join(", ")}`,
          },
          { status: StatusCode.BAD_REQUEST }
        );
      }
      const body =
        ["POST", "PUT", "PATCH"].includes(request.method || "") && extractBody
          ? extractBody(await request.json().catch(() => null))
          : {};
      const args = { ...params, ...body } as Args;

      const data = await fetchData(args);
      if (!data) {
        console.error(`Error in ${methodName}: ${notFoundMessage}`);
        return NextResponse.json(
          { error: notFoundMessage },
          { status: StatusCode.NOT_FOUND }
        );
      }
      return NextResponse.json(data, { status: StatusCode.OK });
    } catch (error: any) {
      console.error(`Error in ${methodName}:`, error);
      return NextResponse.json(
        { error: `An error occurred while processing ${methodName}.` },
        { status: StatusCode.INTERNAL_SERVER_ERROR }
      );
    }
  };
};

export const extractUserId = (params: { userId: string }) => {
  const userId = params?.userId ? parseInt(params.userId, 10) : undefined;
  if (userId === undefined || isNaN(userId)) {
    throw new Error("Invalid or missing userId.");
  }
  return { userId };
};