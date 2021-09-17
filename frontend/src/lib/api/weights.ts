import client from "lib/api/client"
import Coockies from "js-cookie"
import { WeightData, WeightDate } from "interfaces/index"

export const getWeights = (date: WeightDate) => {
  return client.get("weights", {headers: {
    "access-token": Coockies.get("_access_token"),
    "client": Coockies.get("_client"),
    "uid": Coockies.get("_uid")
  }})
}

export const createWeight = (data: WeightData) => {
  return client.post("weights", data, { headers: {
    "access-token": Coockies.get("_access_token"),
    "client": Coockies.get("_client"),
    "uid": Coockies.get("_uid")
  }});
}