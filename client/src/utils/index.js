import axios from "axios"
import { SwalError } from "../components/Alert"

export const fetchPexelAPI = async (page = 1, limit = 50) => {
  try {
    console.log("Current Page: " + page);
    const { data } = await axios({
      method: "get",
      url: `https://api.pexels.com/v1/curated?page=${page}&per_page=${limit}`,
      headers: {
        Authorization: import.meta.env.VITE_PEXEL_KEY
      }
    })

    return data
  } catch (error) {
    SwalError(error)
  }
}