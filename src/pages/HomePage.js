import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Table,
  Spinner,
  Form,
  InputGroup,
  Col,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
//
import toast from 'react-hot-toast';

//
//
function HomePage() {
  //
  const [listaGeral, setListaGeral] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState('');
  const [filtraNoLocal, setFiltraNoLocal] = useState(false);
  // endereço da nossa coleção
  const collectionAdress = 'https://ironrest.cyclic.app/AcessCidadao/';
  // buscando a lista de cidadaos - GET
  useEffect(() => {
    async function getListaCidadaos() {
      const response = await axios.get(collectionAdress);
      //console.log(response.data);
      setListaGeral(response.data);
      setIsLoading(false);
    }

    getListaCidadaos();
  }, [reload]);
  //
  // Botão registrar saida - handle
  async function handleSaida(cidadao) {
    //
    console.log(cidadao, 'cidadao a ser apagado');
    //e.preventDefault();
    try {
      //clonando o form para que possamos fazer as alterações necessárias
      let agora = new Date();
      const horaSaida = agora.toISOString().slice(0, 16).replace('T', ' h ');
      console.log(horaSaida);
      //cidadao.acessos[0];
      let clone = { ...cidadao }; //array da saida
      delete clone._id;
      clone.noLocal = false;
      clone.acessos[0].saida = horaSaida;
      console.log(clone);

      await axios.put(`collectionAdress${cidadao._id}`, clone);

      toast.success('Saída anotada, atualizando página...');
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error('Algo deu errado. Tente novamente.');
    }
    //
  }
  // search bar
  function handleChange(e) {
    setSearch(e.target.value);
  }
  // filtrando o map com o search
  function filtrar(cidadao, search) {
    console.log(cidadao, search, 'variaveis do search');
    return (
      cidadao.nome.toLowerCase().includes(search.toLowerCase()) ||
      (cidadao.noLocal &&
        cidadao.acessos[0].local
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      cidadao.numDoc
        .toLowerCase()
        .replaceAll('-', '')
        .replaceAll('.', '')
        .replaceAll('/', '')
        .includes(
          search
            .toLowerCase()
            .replaceAll('-', '')
            .replaceAll('.', '')
            .replaceAll('/', '')
        )
    );
  }
  //

  //
  return (
    <div>
      <Container className="my-3">
        <Row>
          <Col className="sm ">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setReload(!reload);
                toast.success('Página atualizada');
              }}
            >
              Reload
            </Button>
          </Col>
          <Col>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Filtra saídas pendentes"
                name="active"
                checked={filtraNoLocal}
                onChange={() => {
                  setFiltraNoLocal(!filtraNoLocal);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Procura por Nome, Local, Documento"
                onChange={handleChange}
                value={search}
              />
            </InputGroup>
          </Col>
        </Row>
      </Container>
      <Container className="table-striped">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Documento</th>
              <th>Acessibilidade</th>
              <th>Último acesso</th>
              <th>Saida</th>
              <th>Local</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              listaGeral
                .filter((cidadao) => filtrar(cidadao, search))
                .filter((cidadao) =>
                  filtraNoLocal ? cidadao.noLocal === filtraNoLocal : true
                )
                .map((cidadao) => {
                  return (
                    <tr style={{ fontSize: '0.9rem' }} key={cidadao._id}>
                      <td>
                        <img
                          src={cidadao.img}
                          alt="foto cidadao"
                          style={{ width: '60px' }}
                        />
                      </td>
                      <td>
                        <Link to={`/usuario/${cidadao._id}`}>
                          {cidadao.nome}
                        </Link>
                      </td>
                      <td>
                        {cidadao.numDoc} {cidadao.numtipoDoc}
                      </td>
                      <td>{cidadao.acessibilidade}</td>
                      <td>
                        {!cidadao.noLocal ? (
                          <Link to={`/NovoAcesso/${cidadao._id}`}>
                            <Button variant="success" size="sm">
                              Regist. acesso
                            </Button>
                          </Link>
                        ) : (
                          cidadao.acessos[0].entrada
                        )}
                      </td>

                      <td>
                        {cidadao.noLocal ? (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              handleSaida(cidadao);
                            }}
                          >
                            Regist. saída
                          </Button>
                        ) : (
                          ''
                        )}
                      </td>

                      <td>{cidadao.noLocal ? cidadao.acessos[0].local : ''}</td>
                    </tr>
                  );
                })}
          </tbody>
          {isLoading && <Spinner animation="border" variant="warning" />}
        </Table>
      </Container>
    </div>
  );
}

export default HomePage;
