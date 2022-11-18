import axios from "axios";
import { useEffect, useState } from "react";

function GetAllAccess(){

    const [access, setAccess] = useState({});

    useEffect(() => {
        async function getAccess(){
            const response = await axios.get("https://ironrest.cyclic.app/AcessCidadao");
            console.log(response);
            setAccess(response.data);
        }

        getAccess();
    }, [])

    return (
        <div>

            <ul>

                {access.map((acesso) => {
                    return (
                        <li>{acesso.nome} - {acesso.numDoc}</li>
                    )
                })}

            </ul>

        </div>
    )
}

export default GetAllAccess;