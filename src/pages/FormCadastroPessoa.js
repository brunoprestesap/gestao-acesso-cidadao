import { Form, Row, Col, Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

function FormCadastroPessoa() {
  const [reload, setReload] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    tipoDoc: "",
    numDoc: "",
    profissao: "",
    acessibilidade: "",
    genero: "",
    foto: "",
    acessos: [],
    noLocal: false,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubimit(e) {
    e.preventDefault();
    try {
      await axios.post("https://ironrest.cyclic.app/AcessCidadao", form);
      setForm({
        nome: "",
        tipoDoc: "",
        numDoc: "",
        profissao: "",
        acessibilidade: "",
        genero: "",
        foto: "",
        acessos: [],
        noLocal: false,
      });
      toast.success("Cadastro realizado com sucesso.");
      setReload(!reload)
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  return (
    <Container>
      <h1> CADASTRAR USUÁRIO</h1>

      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome Completo"
                name="nome"
                value={form.name}
                onChange={handleChange}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="tipoDoc">Tipo de Documento</Form.Label>
              <Form.Select id="tipoDoc" name="tipoDoc" onChange={handleChange}>
                <option>SELECIONE</option>
                <option value="CPF">CPF</option>
                <option value="RG">RG</option>
                <option value="CNH">CNH</option>
                <option value="OAB">OAB</option>
                <option value="Passaporte">Passaporte</option>
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
                Necessidade especial{" "}
              </Form.Label>
              <Form.Select
                id="acessibilidade"
                name="acessibilidade"
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
              <Form.Label htmlFor="tipo_acesso">Tipo de Acesso </Form.Label>
              <Form.Select
                id="profissao"
                name="profissao"
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
              <Form.Select id="genero" name="genero" onChange={handleChange}>
                <option>Selecione</option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="foto">
              <Form.Label>Foto </Form.Label>
              <Form.Control
                type="text"
                placeholder="link para foto"
                name="foto"
                value={form.foto}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to={"/"}>
              <Button variant="success" type="submit" onClick={handleSubimit}>
                Cadastrar
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to={"/"}>
              <Button variant="secondary" type="submit">
                Cancelar
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default FormCadastroPessoa;
