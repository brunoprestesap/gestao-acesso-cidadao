# Bem Vindo ao Projeto do App ⧉ **Gate Control**  → *Controle de Acesso aos Prédios e Serviços Públicos*

Trata esta página, do 2º projeto entregue pela equipe ENAP WDFT92:

- *Annielli A. R. Cunha*
- *Bruno Prestes*
- *Sergio A. Francalino*
- *Anderson T. Toma*

Alunos do bootcamp, turma 92 da Ironhack: https://www.ironhack.com/br

Dada a necessidade de controle aos prédios públicos e seus serviços, assim como a inexistência em vários locais públicos desse controle informatizado, nos propusemos o desenvolvimento deste aplicativo.

O objetivo deste módulo foi demonstrar o uso do CRUD aprendido em aula no módulo 2, assim como o uso do REACT.

# Funcionalidades

O aplicativo **Gate Control** foi idealizado para gestão do *acesso de pessoas* em repartições, locais e serviços públicos. Sobre a presença e saída destas. Ainda, tem relatório individual dos registros dos respectivos acessos e serviços.

## Registrar novo cidadão na base

A janela no rota /novousuario permite a inclusão de link da foto assim com os dados de nome, gênero, Nascimento, documento e seu tipo, acessibilidade.

## Alteração do Registro do cidadão

A rota /usuario/:ID, que abre clicando no nome do cidadão na Home Page, permite a edição de todos o campos, assim como deletá-lo.
Na mesma rota, no fim do formulário, é mostrado o registro de todos os acessos, do mais recente ao mais antigo.

## Home Page

Permite a visualização geral, com listagem de todos os cidadãos registrados suas fotos e dados principais de acesso (acessibilidade, local em que se encontra), os botões de registro de novo acesso e Registro de saída são de renderização condicional de acordo com a ação possível somente.
Filtro específico para as Saídas Pendentes em check box.

## Funcionalidade Novo Acesso

Rota /NovoAcesso/: ID, permite a inclusão de observação, local e serviço público.
A hora é registrada automaticamente.

# React, React-Routes, Bootstrap, react-Hot-Toast

As bibliotecas utilizadas foram as citadas acima.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# gestao-acesso-cidadao
