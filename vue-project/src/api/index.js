import axios from '@/axios/axios'

export function getStatistics1 () {
  return axios.get("/admin/statistics1", {
  })
}