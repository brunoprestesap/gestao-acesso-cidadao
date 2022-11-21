import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

function FormCadastroPessoa() {
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    dataNasc: "",
    tipoDoc: "",
    numDoc: "",
    profissao: "",
    acessibilidade: "",
    genero: "",
    img: "",
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
        dataNasc: "",
        tipoDoc: "",
        numDoc: "",
        profissao: "",
        acessibilidade: "",
        genero: "",
        img: "",
        acessos: [],
        noLocal: false,
      });
      toast.success("Cadastro realizado com sucesso.");
      setReload(!reload);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "50px" }}>
        {" "}
        FORMULÁRIO DE CADASTRO{" "}
      </h1>
      <Row>
        <Col>
          <Container>
            <Row className="justify-content-md-center">
              <Card
                border="primary"
                key="primary"
                text="dark"
                style={{ width: "70rem", marginTop: "50px" }}
                className="mb-2"
              >
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
                          <Col>
                            <Form.Group className="mb-3" controlId="dataNasc">
                              <Form.Label>Data de Nascimento</Form.Label>
                              <Form.Control
                                type="date"
                                placeholder="data"
                                name="dataNasc"
                                value={form.dataNasc}
                                onChange={handleChange}
                              />
                              <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                          </Col>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="tipoDoc">
                              Tipo de Documento
                            </Form.Label>
                            <Form.Select
                              id="tipoDoc"
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
                              Necessidade especial{" "}
                            </Form.Label>
                            <Form.Select
                              id="acessibilidade"
                              name="acessibilidade"
                              onChange={handleChange}
                              value={form.acessibilidade}
                            >
                              <option>SELECIONE</option>
                              <option value="nenhuma">Nenhuma</option>
                              <option value="fisica">Deficiência física</option>
                              <option value="visual">Deficiência visual</option>
                              <option value="intelectual">
                                Deficiência intelectual
                              </option>
                              <option value="pscossocial">
                                Deficiência psicossocial
                              </option>
                              <option value="multiplas">
                                Deficiências multiplas
                              </option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="tipo_acesso">
                              Tipo de Acesso{" "}
                            </Form.Label>
                            <Form.Select
                              id="profissao"
                              name="profissao"
                              onChange={handleChange}
                              value={form.profissao}
                            >
                              <option>SELECIONE</option>
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
                              id="genero"
                              name="genero"
                              value={form.genero}
                              onChange={handleChange}
                            >
                              <option>SELECIONE</option>
                              <option value="feminino">Feminino</option>
                              <option value="masculino">Masculino</option>
                              <option value="outro">Outro</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col>
                          <Form.Group className="mb-3" controlId="img">
                            <Form.Label>Foto </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Insira o link para a foto"
                              name="img"
                              value={form.img}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                     
                    </Form>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    className="text=center"
                    variant="success"
                    type="submit"
                    onClick={handleSubimit}
                  >
                    Cadastrar
                  </Button>

                  <Link to={"/"}>
                    <Button variant="secondary" type="submit">
                      Cancelar
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Row>
          </Container>
        </Col>
        <Col
          className="col-lg-4"
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Card border="primary">
            <Card.Body>
              <Container>
                <img
                  src={form.img}
                  alt="Foto do Usuário Cadastrado"
                  style={{ borderRadius: "20%" }}
                ></img>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default FormCadastroPessoa;
