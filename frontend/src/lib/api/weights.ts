import client from "lib/api/client"
import Coockies from "js-cookie"
import { WeightData } from "interfaces/index"

export const getWeights = () => {
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

export const updateWeight = (id: number, data: WeightData) => {
  return client.put(`weights/${id}`, data, { headers: {
    "access-token": Coockies.get("_access_token"),
    "client": Coockies.get("_client"),
    "uid": Coockies.get("_uid")
  }});
}

export const deleteWeight = (id: number) => {
  return client.delete(`weights/${id}`,{ headers: {
    "access-token": Coockies.get("_access_token"),
    "client": Coockies.get("_client"),
    "uid": Coockies.get("_uid")
  }});
}