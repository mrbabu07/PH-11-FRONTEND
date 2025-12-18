import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://ph-11-backend-mocha.vercel.app",
})

const useAxios = () => {
    return axiosInstance;

}

export default useAxios;