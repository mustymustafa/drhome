import axios from "axios";
import { BaseURL, EndPoints } from "./endpoints";
import { StripeIntentResponse } from "@/types";



export const stripeIntent = async (
  amount: string,
  currency: string
): Promise<StripeIntentResponse | null> => {
  try {
    const url = `${BaseURL}${EndPoints.stripeIntent}`;
    const { data, status } = await axios.post<StripeIntentResponse>(
      url,
      { amount, currency },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (status === 200) {
      return data;
    } else {
      console.error(`[ERROR]: Unexpected status code: ${status}`);
      alert("Oops! Something went wrong");
      return null;
    }
  } catch (error) {
    console.error("[ERROR]:", error);
    alert("Oops! Something went wrong");
    return null;
  }
};
