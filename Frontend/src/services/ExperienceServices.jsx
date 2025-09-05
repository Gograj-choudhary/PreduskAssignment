import axios from "axios";

const experienceApi = axios.create({
    baseURL: "https://preduskbackend.vercel.app/api/v1/experience"
});



export const GetExperience= async()=>{
    const res = await experienceApi.get("/");
    return res.data;
};

experienceApi.interceptors.request.use((config)=>{
    const token = localStorage.getItem("accessToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
  (error)=>{
    return Promise.reject(error); 
});


export const AddExperience = async(data)=> {
    const res = await experienceApi.post("/add", data);
    return res.data;
}

export const UpdateExperience = async({id,data})=> {
    const res = await experienceApi.put(`/update/${id}`, data);
    return res.data;
}

export const DeleteExperience = async(id)=> {
    const res = await experienceApi.delete(`/delete/${id}`);
    return res.data;
}
