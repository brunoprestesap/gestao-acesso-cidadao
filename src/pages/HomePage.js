import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//
//
function HomePage() {
  //
  const [listaGeral, setListaGeral] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  //
  useEffect(() => {
    async function getListaCidadaos() {
      const response = await axios.get(
        'https://ironrest.cyclic.app/AcessCidadao'
      );
      console.log(response.data);
      setListaGeral(response.data);
      setIsLoading(false);
    }

    getListaCidadaos();
  }, []);
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
          <Col>Entrada</Col>
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
                    <button>Registrar saída</button>
                  ) : (
                    cidadao.acessos[0].saida
                  )}
                </Col>

                <Col>{cidadao.acessos[0].local}</Col>
              </Row>
            );
          })}
      </Container>
    </div>
  );
}

export default HomePage;
