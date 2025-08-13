
export default async function Server({ListOfCards}){

    const [routes ,setRoute] = useState([])
    async function fetchRoutes(){
        try{
            const apiResponse = await fetch('http://127.0.0.1:8000/rout/');
            const result = await apiResponse.json();

            if(result.route){
                setRoute(result?.routes)
            }else{
                setRoute([])
            }
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchRoutes();
    },[])

         
    return(
        <>
        </>
         
    )
}