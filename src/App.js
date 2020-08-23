import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  //Chamada a apai
  useEffect(() => {
    //Adicionando a rota
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // Adicionando novo repositorio
    const response = await api.post('repositories', {
      title: `GooStack`,
      url: 'https://github.com/manuncorrea/',
      teches: ["ReactJs", "NodeJS"]
    });

    //const repository = response.data;

    setRepositories([...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id // para cada um dos repoositorios verificar de o id e diferente do que foi removido
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
