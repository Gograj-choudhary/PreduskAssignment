import axios from "axios";

const projectApi = axios.create({
    baseURL: "https://preduskbackend.vercel.app/api/v1/project"
});



export const GetProject= async()=>{
    const res = await projectApi.get("/");
    return res.data;
};


projectApi.interceptors.request.use((config)=>{
    const token = localStorage.getItem("accessToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
  (error)=>{
    return Promise.reject(error); 
});



export const AddProject = async(data)=> {
    const res = await projectApi.post("/add", data);
    return res.data;
}

export const UpdateProject = async({id,data})=> {
    const res = await projectApi.put(`/update/${id}`, data);
    return res.data;
}

export const DeleteProject = async(id)=> {
    const res = await projectApi.delete(`/delete/${id}`);
    return res.data;
}
