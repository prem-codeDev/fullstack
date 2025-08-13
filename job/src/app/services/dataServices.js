import { useMutation, useQueryClient } from "@tanstack/react-query";

 const CreateJobCard = async (newJobCard) =>{
        const {data} = await axios.post("http://127.0.0.1:8000/jcard/", newJobCard);
        return data;
    }

    export const useCreateJobCard = () => {
        const queryClient = useQueryClient();
        
        return useMutation(CreateJobCard,{
            onSuccess: ()=>{
             queryClient.invalidateQueries(["jobcards"])
            },
        })
    }