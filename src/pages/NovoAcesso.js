import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import setores from "../Setores.json";
import servicos from "../Servicos.json";

//
export default function NovoAcesso() {
  const listSetores = setores;
  //console.log(setores);
  const listServices = servicos;
  //console.log(servicos);

  //Pegasndo o userID definito como parametro em <Route> do (App.js)
  const { userID } = useParams();

  //Instanciando o useNavigate() na constante navigate
  const navigate = useNavigate();

  const [cidadao, setCidadao] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    saida: "",
    servicoPublico: "",
    local: "",
    obs: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const [reload, setReload] = useState(false);

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
  }, [reload, userID]);

  async function handleEntrance(cidadao) {
    console.log(cidadao, "Cidadão ingressando no recinto");
    /* cidadao.preventDefault(); */

    try {
      let agora = new Date();
      const horaEntrada = agora.toISOString().slice(0, 16).replace("T", " h ");
      console.log(horaEntrada);

      //cidadao.acessos[0] -> propriedade  ARRAY na collection "AcessCidadao"
      const clone = { ...cidadao };
      delete clone._id;

      clone.noLocal = true;

      const novoAcesso = {
        entrada: horaEntrada,
        saida: form.saida,
        servicoPublico: form.servicoPublico,
        local: form.local,
        obs: form.obs,
      };
      clone.acessos.unshift(novoAcesso);
      console.log(clone);

      await axios.put(
        `https://ironrest.cyclic.app/AcessCidadao/${userID}`,
        clone
      );

      toast.success("Acesso registrado com sucesso!!");
      setReload(!reload);
      navigate("/");
    } catch (error) {
      toast.error("Algo deu errado! Tente novamente...");
    }
  }

  return (
    <Container className="my-4">
      {!isLoading && (
        <Card className="text-center" bg="light">
          <Card.Header>
            <Card.Title>
              <h1>⧉{cidadao.nome} </h1>
              <img
                src={cidadao.img}
                alt="foto cidadao"
                style={{ width: "160px" }}
              />
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Documento: {cidadao.tipoDoc.toUpperCase()}</b>
              <b> ↔ nº {cidadao.numDoc}</b>
            </Card.Subtitle>
          </Card.Header>

          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>{<b>Local de Destino</b>}</Form.Label>
                    <Form.Select
                      name="local"
                      defaultValue={form.local}
                      onChange={handleChange}
                      autoFocus
                    >
                      <option>Selecione Destino</option>
                      {listSetores.map((setor) => {
                        return (
                          <option value={setor.label}>{setor.label}</option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>{<b>Serviço Público</b>}</Form.Label>
                    <Form.Select
                      name="servicoPublico"
                      defaultValue={form.servicoPublico}
                      onChange={handleChange}
                    >
                      <option>Selecione Serviço</option>
                      {listServices.map((service) => {
                        return (
                          <option value={service.label}>{service.label}</option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="obs">
                      {<b>Observação → motivo?</b>}
                    </Form.Label>
                    <Form.Select
                      id="obs"
                      name="obs"
                      onChange={handleChange}
                      defaultValue={form.obs}
                    >
                      <option>Selecione Motivo</option>
                      <option value="audiencia">Audiência</option>                     
                      <option value="Reunião">Reunião</option>                  
                      <option value="correios">Correio</option>
                      <option value="entrega">Entrega</option>
                      <option value="licitacao">Licitação</option>
                      <option value="conciliacao">Conciliação</option>
                      <option value="almoco">Almoço</option>
                      <option value="trabalho">Trabalho</option>
                      <option value="visita">Visita</option>
                      <option value="outros">Outros</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>

          <Card.Footer>
            <Button
              className="justify-content-between"
              variant="success"
              type="submit"
              onClick={() => handleEntrance(cidadao)}
            >
              Salvar
            </Button>
            <Link to={"/"}>
              <Button variant="secondary" type="submit">
                Cancelar
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
}
