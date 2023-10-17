import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList, Dates} from './styles';
import api from '../../services/api';
import { FaArrowLeft } from 'react-icons/fa';



export default function Repositorio(){
    const { repositorio } = useParams();

    const [repositorios, setRepositorios] = useState({});
    //por ter mais de uma issues, usa-se array vazio
    const [issues, setIssues] = useState([]);

    const [loading, setLoading] = useState(true);

    //controlar paginaçao, começa com 1 pq começa na primeira pagina
    const [page, setPage] = useState(1);

    //controlar para o map
    const [filters, setFilters] = useState([
        {state: 'all', label: 'Todas', active: true},
        {state: 'open', label: 'Abertas', active: false},
        {state: 'closed', label: 'Fechadas', active: false},
    ]);

    //saber qual posiçao está
    const [filterIndex, setFilterIndex] = useState(0);

    useEffect( () => {
        //funcao assincrona para carregar
        async function load(){

            const nomeRepo = repositorio;

            //executara as duas ao msm tempo, primeira posiçao do array é do repositorioData, a segunda posiçao é do issuesData
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params:{
                        state: filters.find(f => f.active).state, //all, já que ta true
                        per_page: 5,

                    }
                })
            ]);

            setRepositorios(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }
        load()
    },[repositorio]);

    //atualizar a paginaçao nova
    useEffect(() =>{
        async function loadIssue(){
            const nomeRepo = repositorio;

            const response = await api.get(`/repos/${nomeRepo}/issues`,{
                params:{
                    state: filters[filterIndex].state,
                    page,
                    per_page: 5,
                },
            });

            setIssues(response.data);

        }
        loadIssue();
    },[filterIndex,filters,repositorio,page]);

    function handlePage(action){
        setPage(action === 'back' ? page - 1 : page + 1) 
    }

    function handleFilter(index){
        setFilterIndex(index)
    }

    if(loading){
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }
    

    return(
        <Container>
            <BackButton to="/">
                <FaArrowLeft color="#000" size={30}/>
            </BackButton>
            <Owner>
                <img src={repositorios.owner.avatar_url} alt={repositorios.owner.login}/>
                <h1>{repositorios.name}</h1>
                <p>{repositorios.description}</p>

                <Dates> 
                    <h2>Criado em: {new Date(repositorios.created_at).toLocaleString('pt-BR')}</h2>
                    <h2>Atualizado em: {new Date(repositorios.updated_at).toLocaleString('pt-BR')}</h2>
                </Dates>
                
            </Owner>

            <FilterList active={filterIndex}>
                {filters.map((filter, index) => (
                    <button
                        type="button"
                        key={filter.label} 
                        onClick={() => handleFilter(index)}                   
                    >
                        {filter.label}
                    </button>
                ) )}
            </FilterList>

            <IssuesList>
                {issues.map(issue => (
                    //converter o id em string
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login}/>

                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>

                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}

                            </strong>
                            <p>{issue.user.login}</p>
                        </div>

                    </li>
                ))}
            </IssuesList>

            <PageActions>
                <button 
                type="button" 
                onClick={ () => handlePage('back')}
                disabled={page < 2}
                >
                    Voltar
                </button>

                <button type="button" onClick={ () => handlePage('next')}>
                    Próximo
                </button>

            </PageActions>
        </Container>
    )
}