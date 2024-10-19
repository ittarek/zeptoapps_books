import { useState } from "react"

const useFetch = (url, error, loading) => {
     const [data, setData] = useState(null)
     const [error, setError] = useState(null);
     const [loading , setLoading] = useState(false);

     const fetchData = async fetch(url) =>{
          
     }
}