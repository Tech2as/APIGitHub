import React, {useState, useCallback, useEffect} from "react";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import { Link } from "react-router-dom";
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from 'react-icons/fa';
import api from "../../services/api";

//SubmitButton criado para ser manipulado, animaçoes e etc
export default function Main(){

    const [newRepo, setNewRepo] = useState('');

  

    //controle do loading para animaçao e afins
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState(null);

    //Buscar
    const getLocalStorageData = () => {
      const repoStorage = localStorage.getItem('repos');
      return repoStorage ? JSON.parse(repoStorage) : [];
    };

      //array para api
      const [repositorios, setRepositorios] = useState(getLocalStorageData);
  

    //Salvar alteraçoes
    useEffect( () => {
      localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios]);

    function handleinputChange(e){
        setNewRepo(e.target.value);
        setAlert(null);
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit(){
        //começa carregar
        setLoading(true);
        
        setAlert(null);

        //melhorar requisiçao e loading
        try{
          //verificar se ta em branco e como se usa try, catch vai aparecer la
          if(newRepo === ''){
            throw new Error('Digite um repositório');
          }

          const response = await api.get(`repos/${newRepo}`);
          //se tem repositorio, fazendo varredura no array pra ver se já tem o repo que o usuário digitou
          const hasRepo = repositorios.find(repo => repo.name === newRepo)

          if(hasRepo){
            throw new Error('Repositório já adicionado');
          }

          const data = {
            name: response.data.full_name,          
          }
    
          setRepositorios([...repositorios,data]);
          setNewRepo('');
        }catch(error){
          console.log(error)
          setAlert(true);
        }finally{
          setLoading(false);
        }

        }
        submit();
    }, [newRepo, repositorios]);

    //deletar
    const handleDelete = useCallback((repo)=>{
      //se existe
      const find = repositorios.filter(r => r.name !== repo);
      setRepositorios(find);
    },[repositorios]);
    

    return(
       <Container>
        <h1>
        <FaGithub size={25}/>
        Meus repositórios
        </h1>
        
        <Form onSubmit={handleSubmit} error={alert}>
            <input 
            type="text" 
            placeholder="Adicionar repositórios"
            value={newRepo}
            onChange={handleinputChange}
            />

            <SubmitButton loading={loading ? 1 : 0}> 
                {loading ? (
                  <FaSpinner color="#FFF" size={14}/>
                ) : (
                  <FaPlus color="#FFF" size={14}/>
                )}
            </SubmitButton>

        </Form>

        <List>
          {repositorios.map( repo =>(
            <li key={repo.name}>
              <span>
                <DeleteButton onClick={() => handleDelete(repo.name)}>
                  <FaTrash size={14}/>
                </DeleteButton>
                {repo.name}
                </span>
              <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                <FaBars size={20}/>
              </Link>
            </li>
          ))}

        </List>

       </Container>
    )
}