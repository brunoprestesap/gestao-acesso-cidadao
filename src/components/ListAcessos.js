import { Table } from "react-bootstrap";

function ListAcessos({ acessos }){
    return (
        <Table responsive>

            <thead>
                <tr>
                    <th>Entrada</th>
                    <th>Saída</th>
                    <th>Serviço</th>
                    <th>Local</th>
                </tr>
            </thead>
            <tbody>
                {acessos.map((acesso) => {
                    return (
                        <tr key={acesso.entrada}>
                            <td><span>{acesso.entrada}</span></td>
                            <td><span>{acesso.saida}</span></td>
                            <td><span>{acesso.servicoPublico}</span></td>
                            <td><span>{acesso.local}</span></td>
                        </tr>
                    )
                })}
            </tbody>

        </Table>
    )
}

export default ListAcessos;