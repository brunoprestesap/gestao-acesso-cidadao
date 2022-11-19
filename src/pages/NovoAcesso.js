import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

//
export default function NovoAcesso() {
  //
  const { userID } = useParams();

  const [cidadao, setCidadao] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    servicoPublico:"",
    local:"",
    obs:""    
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //const [reload, setReload] = useState(false);

  //
  useEffect(() => {
    async function getCidadao() {
      const response = await axios.get(
        `https://ironrest.cyclic.app/AcessCidadao/${userID}`
      );

      console.log(response.data);

      setCidadao(response.data);
      setIsLoading(false);
    }

    getCidadao();
  }, [userID]);

  async function handleEntrada(cidadao) {
    console.log(cidadao, 'Registro da Entrada');
    //e.preventDefault();
    try {
      //clonando o form para que possamos fazer as alterações necessárias
      let agora = new Date();
      const horaEntrada = agora.toISOString().slice(0, 16).replace('T', ' h ');
      console.log(horaEntrada);

      //cidadao.acessos[0];
      let clone = { ...cidadao }; //array da saida
      delete clone._id;

      clone.noLocal = true;
      clone.acessos[0].entrada = horaEntrada;
      console.log(clone);

      await axios.put(
        `https://ironrest.cyclic.app/AcessCidadao/${cidadao._id}`,
        clone
      );

      toast.success('Entrada anotada! atualizando página...');
  
    } catch (error) {
      console.log(error);
      //toast.error('Algo deu errado. Tente novamente.');
    }
  }

  return (
    <div>
      <div> Página de Registro do Novo Acesso</div>
      {!isLoading && <div> Nome {cidadao.nome}</div>}
      {!isLoading && <div> Nr Doc{cidadao.numDoc}</div>}
      {!isLoading && (
        <img src={cidadao.img} alt="foto cidadao" style={{ width: "100px" }} />
      )}

      <Form>

      <Button variant="outline-secondary" onClick={() => handleEntrada(cidadao)}> Editar Entrada </Button>

      <Form.Group className="mb-3" >
                        <Form.Label>Local</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="nome do local"
                          name="local"
                          value={form.local}
                          onChange={handleChange}
                        />
                        <Form.Label>Serviço Publico</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nome do serviço"
                          name="servicoPublico"
                          value={form.servicoPublico}
                          onChange={handleChange}
                        />
                        <Form.Label>Observação</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Insira uma observação"
                          name="obs"
                          value={form.obs}
                          onChange={handleChange}
                        />
                      </Form.Group>
      </Form>
    </div>
  );
}
