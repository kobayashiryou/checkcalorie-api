import client from "lib/api/client"
import { WeightData } from "interfaces/index"

export const createWeight = (data: WeightData) => {
  return client.post("weights", data);
}