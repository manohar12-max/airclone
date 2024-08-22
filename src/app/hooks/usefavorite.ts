import { useCallback, useState } from "react"
import { useMemo } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import axios from "axios"
import { SafeUser } from "../types"
import userLoginModal from "./userLoginModal"
interface IUseFavorite{
    currentUser?:SafeUser |null;
    listingId:string;

}
const useFavorite=({currentUser,listingId}:IUseFavorite) => {
   
    const router=useRouter()
    const loginModal=userLoginModal()
    const [loading,setLoading]=useState(false)
    //check if is liked or not
    const hasFavorited=useMemo(()=>{
      const list=currentUser?.favoriteIds || [];
      return list.includes(listingId);
    },[currentUser,listingId])
    
    const toggleFavorite=useCallback(async(
        e:React.MouseEvent<HTMLDivElement>
    )=>{
       e.stopPropagation(); 
       if(!currentUser){
         return loginModal.onOpen();
       }
      setLoading(true)
       try{
       
        let request
        if(hasFavorited){
            request=()=>  axios.delete(`/api/favorites/${listingId}`,{
               headers:{
                   "Content-Type": "application/json"
               }
            });
        }else{
            request= ()=> axios.post(`/api/favorites/${listingId}`,{
               headers:{
                   "Content-Type": "application/json"
               }
            });
        }
        await request()
        setLoading(false)
        router.refresh();
        toast.success(hasFavorited? "Removed from favorites" : "Added to favorites")
       }catch(error){
         toast.error("Something went wrong")
         setLoading(false)
       }
    },[currentUser,hasFavorited,listingId,loginModal.onOpen,loginModal])
   return   {
        hasFavorited,
        toggleFavorite,
        loading
    }
}
export default useFavorite