import { useState, useEffect } from "react";
import axios from "axios"

const useFetch = ({ url, params, defaultData, trigger }) => {
    const [data, setData] = useState(() => defaultData)
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(true);

    useEffect(() => {
        //setIsPending(true)
        axios.get(url)
            .then(
                (res) => {
                    setData(res.data)
                    setIsPending(false)
                    setError(null)
                })
            .catch(
                (err) => {
                    setIsPending(false)
                    setError(err.message)
                })
    }, [url, trigger])

    console.log("Fetched data")
    console.log(data)

    return { data, isPending, error }
}

export default useFetch