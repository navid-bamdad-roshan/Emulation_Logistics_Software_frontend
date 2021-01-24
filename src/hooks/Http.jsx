// import {useState, useEffect} from 'react';

// const useHttpGet = (url, dependencies) => {

//     const [isLoading, setIsLoading] = useState(false);
//     const [fetchedData, setFetchedData] = useState(null);

//     useEffect(()=>{
//         setIsLoading(true);
//         fetch(url)
//             .then(response=>{
//                 if (!response.ok){
//                     throw new Error("Failed to fetch data!");
//                 }
//                 return response.json()
//             })
//             .then(data => {
//                 setFetchedData(data);
//                 isLoading(false);
//             }).catch(err=>{
//                 console.log(err)
//                 setIsLoading(false)
//             })
//     }, dependencies)

//     return [isLoading, fetchedData]
// }




// export{useHttpGet} ;