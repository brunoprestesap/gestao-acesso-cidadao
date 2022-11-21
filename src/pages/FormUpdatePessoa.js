import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, Card } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function FormUpdatePessoa() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    dataNasc: "",
    numDoc: "",
    tipoDoc: "",
    profissao: "",
    acessibilidade: "",
    genero: "",
    img: "",
    acessos: [],
    noLocal: false,
  });

  useEffect(() => {
    async function getPessoa() {
      const response = await axios.get(
        `https://ironrest.cyclic.app/AcessCidadao/${userId}`
      );
      setForm(response.data);
    }
    getPessoa();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubimit(e) {
    e.preventDefault();
    try {
      const clone = { ...form };

      delete clone._id;

      await axios.put(
        `https://ironrest.cyclic.app/AcessCidadao/${userId}`,
        clone
      );

      navigate("/");

      toast.success("Cadastro atualizado com sucesso.");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  return (
    <Container>
      <Card
        border='primary'
        key='primary'
        text="dark"
        style={{ width: "70rem", marginTop: '50px'}}
        className="mb-2"
      >
        <Card.Header>Formulário de atualização</Card.Header>
        <Card.Body>
          <Card.Text>
              <Form>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="nome">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nome Completo"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="dataNasc">
                      <Form.Label>Data Nasc.</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Data Nascimento"
                        name="dataNasc"
                        value={form.dataNasc}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Tipo de Documento</Form.Label>
                      <Form.Select
                        name="tipoDoc"
                        value={form.tipoDoc}
                        onChange={handleChange}
                      >
                        <option>SELECIONE</option>
                        <option value="cpf">CPF</option>
                        <option value="rg">RG</option>
                        <option value="cnh">CNH</option>
                        <option value="oab">OAB</option>
                        <option value="passaporte">Passaporte</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-3" controlId="numDoc">
                      <Form.Label>Número de documento </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="somente números"
                        name="numDoc"
                        value={form.numDoc}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="acessibilidade">
                        Necessidade especial
                      </Form.Label>
                      <Form.Select
                        id="acessibilidade"
                        name="acessibilidade"
                        value={form.acessibilidade}
                        onChange={handleChange}
                      >
                        <option>Selecione uma opção</option>
                        <option value="nenhuma">Nenhuma</option>
                        <option value="fisica">Deficiência física</option>
                        <option value="visual">Deficiência visual</option>
                        <option value="intelectual">Deficiência intelectual</option>
                        <option value="pscossocial">Deficiência psicossocial</option>
                        <option value="multiplas">Deficiências multiplas</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="profissao">Profissão</Form.Label>
                      <Form.Select
                        id="profissao"
                        name="profissao"
                        value={form.profissao}
                        onChange={handleChange}
                      >
                        <option>Nenhuma</option>
                        <option value="parte">Parte</option>
                        <option value="advogado">Advogado/a</option>
                        <option value="servico">Serviços</option>
                        <option value="requerente">Requerente</option>
                        <option value="testemunha">Testemunha</option>
                        <option value="mediador">Mediador</option>
                        <option value="visita">Visita</option>
                        <option value="outro">Outro</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="genero">Genero</Form.Label>
                      <Form.Select
                        name="genero"
                        value={form.genero}
                        onChange={handleChange}
                      >
                        <option>Selecione</option>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                        <option value="outro">Outro</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="foto">
                      <Form.Label>Foto</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="link para foto"
                        name="foto"
                        value={form.img}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button style={{ marginRight: '25px'}} variant="success" type="submit" onClick={handleSubimit}>
                      Cadastrar
                    </Button>
                    <Link to={"/"}>
                      <Button variant="secondary" type="submit">
                        Cancelar
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Form>
          </Card.Text>
        </Card.Body>
      </Card>


    </Container>
  );
}
