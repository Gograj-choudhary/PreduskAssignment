import axios from "axios";

const skillApi = axios.create({
    baseURL: "http://preduskbackend.vercel.app/api/v1/skill"
});



export const GetSkill= async()=>{
    const res = await skillApi.get("/");
    return res.data;
};

skillApi.interceptors.request.use((config)=>{
    const token = localStorage.getItem("accessToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
  (error)=>{
    return Promise.reject(error); 
});



export const AddSkill = async(data)=> {
    const res = await skillApi.post("/add", data);
    return res.data;
}

export const UpdateSkill = async({id,data})=> {
    const res = await skillApi.put(`/update/${id}`, data);
    return res.data;
}

export const DeleteSkill = async(id)=> {
    const res = await skillApi.delete(`/delete/${id}`);
    return res.data;
}
