import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
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
      //toast.error('Algo deu errado. Tente novamente.');
    }
    //
  }
  //
  return (
    <div>
      <div>teste home</div>

      <Container className="table-striped">
        <Row>
          <Col>Foto</Col>
          <Col>Nome</Col>
          <Col>Documento</Col>
          <Col>Acessibilidade</Col>
          <Col>Último acesso</Col>
          <Col>Saida</Col>
          <Col>Local</Col>
        </Row>

        {!isLoading &&
          listaGeral.map((cidadao) => {
            return (
              <Row key={cidadao._id} className="table-warning">
                <Col>
                  <img
                    src={cidadao.img}
                    alt="foto cidadao"
                    style={{ width: '100px' }}
                  />
                </Col>
                <Col>
                  <Link to={`/usuario/${cidadao._id}`}>{cidadao.nome}</Link>
                </Col>
                <Col>
                  {cidadao.numDoc} - {cidadao.numtipoDoc}
                </Col>
                <Col>{cidadao.acessibilidade}</Col>
                <Col>
                  {!cidadao.noLocal ? (
                    <Link to={`/NovoAcesso/${cidadao._id}`}>
                      <Button variant="outline-secondary" size="sm">
                        Novo acesso
                      </Button>
                    </Link>
                  ) : (
                    cidadao.acessos[0].entrada
                  )}
                </Col>

                <Col>
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
                </Col>

                <Col>{cidadao.acessos[0].local}</Col>
              </Row>
            );
          })}
      </Container>
      <Button
        variant="outline-secondary"
        size="md"
        onClick={() => {
          setReload(!reload);
        }}
      >
        Reload
      </Button>
    </div>
  );
}

export default HomePage;
