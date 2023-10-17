**Projeto de repositório com API do GitHub utilizando Reactjs**

**Bibliotecas utilizadas no projeto:**
- react-icons
- axios
- styled-components

O projeto foi construído com base na API do GitHub, onde podemos adicionar algum repositório do GitHub e ver detalhes, como data de criação, última atualização, logo, descrição e issues (com nome do usuário, foto do usuário e acesso ao link da issue específica), sendo também usando um useState para controlar três botões: Todas, abertas e fechadas, referente ao state de cada issue.

**Tela inicial**

![telainicial](https://github.com/Tech2as/APIGitHub/assets/95533385/2cb3d35d-e650-4d65-80f6-967402e76475)

**Na tela inicial temos o layout: ao escrever o link do repositório, exemplo: facebook/react, o
será chamada a API, fazer uma verificação se já possui e afins, se válido, o repositório será
adicionado e armazenado no LocalStorage, para quando o usuário atualizar a página, os repositórios
ficarem salvos.  Toda vez que o usuário dar F5 ou entrar no projeto, será carregado o useEffect
para buscar no LocalStorage os repositórios que foram salvos e mostrar ao usuário.**


**Detalhes**

![detalhes](https://github.com/Tech2as/APIGitHub/assets/95533385/aca0e3d2-c4fe-409d-a895-41ee04e472e2)

**Ao clicar para ver os detalhes do repositório, o usuário terá acesso ao logo, descrição, data de
criação, última atualização, os três buttons (Todas, abertas e fechadas) e os issues, limitado por 5 
por paginação. Ao entrar na página será carregado um useEffect com uma função assíncrona com os dados 
da API do repositório escolhido, vindo por padrão nos issues o state "All" (Todas), outro useEffect 
com função assíncrona será carregado para a paginação, usando o useState mencionado acima com os 3 buttons, 
pegaremos o índice para carregar o state do issue escolhido e assim atualizar a página. Tendo sido
utilizado no styled-components uma propriedade para mudar a cor conforme o button estiver selecionado,
também na paginação, foi utilizado o styled-components para bloquear o "Voltar" quando estivermos
na primeira página."**

![telainicial2](https://github.com/Tech2as/APIGitHub/assets/95533385/2272f9ae-2181-40a3-923d-0dfa57d25e57)

![fechada](https://github.com/Tech2as/APIGitHub/assets/95533385/b55dc090-ca1f-4506-91b4-0aa6e65aeb77)






