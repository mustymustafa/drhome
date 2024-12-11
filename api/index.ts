import { BaseURL, EndPoints } from "./endpoints";


export const stripeIntent = async (
    amount: string,
    currency: string,
  ): Promise<string | any> => {
    try {
      // prepare url
      const url = `${BaseURL}${EndPoints.stripeIntent}`;
    
      //using a simple fetch method from  react native. we can build a hook using axios to handle POST and GET requests for when we have multiple endpoints
      const resp = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });

      const value = await resp.json();
      if (resp.ok) {
          return value;
        } else {
          console.log("[ERROR]:", value.error);
          return alert("Ops something went wrong");
        }
    } catch (error) {
        console.log("[ERROR]:", error);
    }
  };