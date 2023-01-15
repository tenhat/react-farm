import axios from "axios"
import { useQuery } from "react-query"
import { Task } from "../types/types"

export const useQueryTasks = () => {
  const getTasks = async() => {
    const {data} = await axios.get<Task[]>(
      `${process.env.REACT_APP_API_URL}/todo`,
      {
        withCredentials: true
      }
    )
    return data
  }
  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: getTasks,
    //何度useQueryが呼ばれても再fetchが発生しない
    staleTime: Infinity,
  })
}
