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
  var collectionAdress = 'https://ironrest.cyclic.app/AcessCidadao/';
  // buscando a lista de cidadaos - GET
  useEffect(() => {
    async function getListaCidadaos() {
      const response = await axios.get(collectionAdress);
      //console.log(response.data);
      setListaGeral(response.data);
      setIsLoading(false);
    }

    getListaCidadaos();
  }, [reload, collectionAdress]);
  //
  //horas
  function dataHora(params) {
    let agora = new Date();
    let hora =
      agora.getFullYear() +
      '-' +
      (1 + Number.parseInt(agora.getMonth())).toString() +
      '-' +
      agora.getDate() +
      ' ' +
      agora.getHours() +
      'h:' +
      agora.getMinutes() +
      'm';

    return hora;
  }
  // Botão registrar saida - handle
  async function handleSaida(cidadao) {
    //
    console.log(cidadao, 'cidadao a ser apagado');
    //e.preventDefault();
    try {
      //clonando o form para que possamos fazer as alterações necessárias

      //cidadao.acessos[0];
      let clone = { ...cidadao }; //array da saida sempre no acessos[0] , na criação é sempre usado o unshift()
      delete clone._id;
      // se pessoa esta saindo anotar que não está mais no local
      clone.noLocal = false;
      clone.acessos[0].saida = dataHora();
      console.log(clone, 'clone da saida');

      await axios.put(
        `https://ironrest.cyclic.app/AcessCidadao/${cidadao._id}`,
        clone
      );

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
    //console.log(cidadao, search, 'variaveis do search');
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
  //-------------------------------//
  //
  return (
    <div>
      <Container className="my-3">
        <Row>
          <Col className="sm" xs={2}>
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
          <Col xs={4}>
            <Form.Group>
              <Form.Check
                className="mt-2"
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
          <Col xs={6}>
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

                      <td>
                        {cidadao.noLocal ? cidadao.acessos[0].local : ''} <br />{' '}
                        {cidadao.noLocal
                          ? `obs: ${cidadao.acessos[0].obs}`
                          : ''}
                      </td>
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
