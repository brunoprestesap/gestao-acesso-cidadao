import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Table,
  Spinner,
  Form,
  InputGroup,
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
  //

  //
  useEffect(() => {
    async function getListaCidadaos() {
      const response = await axios.get(
        'https://ironrest.cyclic.app/AcessCidadao'
      );
      //console.log(response.data);
      setListaGeral(response.data);
      setIsLoading(false);
    }

    getListaCidadaos();
  }, [reload]);
  //
  // Botão registrar saida - handle
  async function handleSaida(cidadao) {
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
    console.log(cidadao, search, 'variaveis do search');
    return (
      cidadao.nome.toLowerCase().includes(search.toLowerCase()) ||
      cidadao.acessos[0].local.toLowerCase().includes(search.toLowerCase()) ||
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
  return (
    <div>
      <Container className="my-3">
        <Button
          variant="outline-secondary"
          size="md"
          onClick={() => {
            setReload(!reload);
            toast.success('Página atualizada');
          }}
        >
          Reload
        </Button>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Procura por Nome, Local"
            onChange={handleChange}
            value={search}
          />
        </InputGroup>
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
                .map((cidadao) => {
                  return (
                    <tr key={cidadao._id}>
                      <td>
                        <img
                          src={cidadao.img}
                          alt="foto cidadao"
                          style={{ width: '70px' }}
                        />
                      </td>
                      <td>
                        <Link to={`/usuario/${cidadao._id}`}>
                          {cidadao.nome}
                        </Link>
                      </td>
                      <td>
                        {cidadao.numDoc} - {cidadao.numtipoDoc}
                      </td>
                      <td>{cidadao.acessibilidade}</td>
                      <td>
                        {!cidadao.noLocal ? (
                          <Link to={`/NovoAcesso/${cidadao._id}`}>
                            <Button variant="outline-secondary" size="sm">
                              Novo acesso
                            </Button>
                          </Link>
                        ) : (
                          cidadao.acessos[0].entrada
                        )}
                      </td>

                      <td>
                        {cidadao.noLocal ? (
                          <button
                            onClick={() => {
                              handleSaida(cidadao);
                            }}
                          >
                            Registrar saída
                          </button>
                        ) : (
                          cidadao.acessos[0].saida
                        )}
                      </td>

                      <td>{cidadao.acessos[0].local}</td>
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
