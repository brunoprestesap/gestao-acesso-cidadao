import { Form, Row, Col, Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function FormCadastroPessoa() {
  const [form, setForm] = useState({
    nome: "",
    data_nasc: "",
    tipo_documento: "",
    nro_documento: "",
    acessibilidade: "",
    foto: "",
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
        data_nasc: "",
        tipo_documento: "",
        nro_documento: "",
        acessibilidade: "",
        foto: "",
      });
      toast.success("Cadastro realizado com sucesso.");
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
          <Col>
            <Form.Group className="mb-3" controlId="data_nasc">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                placeholder="data"
                name="data_nasc"
                value={form.data_nasc}
                onChange={handleChange}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="tipo_documento">
                Tipo de Documento
              </Form.Label>
              <Form.Select
                id="tipo_documento"
                name="tipo_documento"
                onChange={handleChange}
              >
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
            <Form.Group className="mb-3" controlId="nro_documento">
              <Form.Label>Número de documento </Form.Label>
              <Form.Control
                type="number"
                placeholder="somente números"
                name="nro_documento"
                value={form.nro_documento}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
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
        </Row>

        <Row>
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
        </Row>

        <Button variant="primary" type="submit" onClick={handleSubimit}>
          Cadastrar
        </Button>
        <Button variant="primary" type="submit">
          Cancelar
        </Button>
      </Form>
    </Container>
  );
}

export default FormCadastroPessoa;
