import {Send} from "../helper";


const apiServices={};

apiServices.getAllClients = async ()=>{
    try{
        let data = await Send("get","/clients");
        let responseObj={}
        if(data.type === "success"){
            responseObj["clients"] = data.clients;
            return responseObj;
        }else if(data.type === "error"){
            responseObj["error"] =data.msg;
            return responseObj;
        }
    }catch(e){
        console.log(e);
    }
}
apiServices.addClient = async (client)=>{
    try{
        let data = await Send("post","/client",client);
        let responseObj={}
        if(data.type === "success"){
            responseObj["client"] = data.client;
            return responseObj;
        }else if(data.type === "error"){
            responseObj["error"] =data.msg;
            return responseObj;
        }
    }catch(e){
        console.log(e);
    }
}




apiServices.deleteClient = async (id)=>{
    try{
        let data = await Send("delete",`/client/${id}`);
        let responseObj={}
        if(data.type === "success"){
            responseObj["isDeleted"] = true;
            return responseObj;
        }else if(data.type === "error"){
            responseObj["error"] =data.msg;
            return responseObj;
        }
    }catch(e){
        console.log(e);
    }
}


apiServices.getOneClient = async (id)=>{
    try{
        let data = await Send("get",`/client/${id}`);
        let responseObj={}
        if(data.type === "success"){
            responseObj["client"] = data.client;
            return responseObj;
        }else if(data.type === "error"){
            responseObj["error"] =data.msg;
            return responseObj;
        }
    }catch(e){
        console.log(e);
    }
}

apiServices.updateClient = async (id,client)=>{
    try{
        let data = await Send("patch",`/client/${id}`,client);
        console.log(data);
        let responseObj={}
        if(data.type === "success"){
            responseObj["isUpdated"] = true;
            return responseObj;
        }else if(data.type === "error"){
            responseObj["error"] =data.msg;
            return responseObj;
        }
    }catch(e){
        console.log(e);
    }
}

export default apiServices
