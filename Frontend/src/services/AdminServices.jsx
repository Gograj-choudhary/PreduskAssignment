import axios from "axios";

const adminApi = axios.create({
    baseURL: "https://preduskbackend.vercel.app/api/v1/admin"
});



export const AdminRegistration= async(data)=>{
    const res = await adminApi.post("/register", data);
    return res.data;
};

export const LoginAdmin = async(data)=> {
    const res = await adminApi.post("/login", data);
    return res.data;
}
