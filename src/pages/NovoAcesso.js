import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import HomePage from "./HomePage";

//
export default function NovoAcesso() {
  //Pegasndo o userID definito como parametro em <Route> do (App.js)
  const { userID } = useParams();

  //Instanciando o useNavigate() na constante navigate
  const navigate = useNavigate();

  const [cidadao, setCidadao] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    saida:"",
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
        serviço: form.servicoPublico,
        local: form.local,
        obs: form.obs
      }
      clone.acessos.unshift(novoAcesso)
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
            <h3 bg="light">↘ Registro da Entrada </h3>
            <Card.Title>
              <img
                src={cidadao.img}
                alt="foto cidadao"
                style={{ width: "200px" }}
              />
              <h1>{cidadao.nome}</h1>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <b>→ Documento: </b>
              {cidadao.tipoDoc}
              <b> nº </b>
              {cidadao.numDoc} ←
            </Card.Subtitle>
          </Card.Header>

          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>{<b>Informe local de destino</b>}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Local de destino..."
                      name="local"
                      value={form.local}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>{<b>Qual o Serviço Público?</b>}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Serviço pretendido..."
                      name="servicoPublico"
                      value={form.servicoPublico}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>{<b>Observação</b>}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ex.: (Intimado, Testemunha, Juri, etc...)"
                      name="obs"
                      value={form.obs}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>

          <Card.Footer>
         
            <Button
              className="text=center"
              variant="outline-secondary"
              onClick={() => handleEntrance(cidadao)}
            >
              Salvar
            </Button>
            <Button variant="outline-secondary" onClick={<HomePage/>}>
            Cancelar
          </Button>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
}
