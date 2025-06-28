import { useState, useEffect } from 'react';
import axios from 'axios';

function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [idUsuarioEditando, setIdUsuarioEditando] = useState(null);
  const [usuarios, setUsuarios] = useState([]);


    const carregarUsuarios = async () => {
      try {
        const resposta = await axios.get('http://localhost:5000/usuarios');
        setUsuarios(resposta.data);
      } catch (erro) {
        console.error('Erro ao carregar usuários:', erro.response?.data || erro.message);
      }
    };

    useEffect(() => {
      carregarUsuarios();
    }, []);

    const excluirUsuario = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/usuarios/${id}`);
        alert('Usuário excluído com sucesso!');
        carregarUsuarios();
      } catch (erro) {
        console.error('Erro ao excluir usuário:', erro.response?.data || erro.message);
        alert('Erro ao excluir. Tente novamente.');
      }
    };

    const editarUsuario = (usuario) => {
      setNome(usuario.nome);
      setEmail(usuario.email);
      setIdUsuarioEditando(usuario.id);
      setModoEdicao(true);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

    try {
      if (modoEdicao) {
        await axios.put(`http://localhost:5000/usuarios/${idUsuarioEditando}`, {
          nome,
          email,
        });
        alert('Usuário atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:5000/usuarios', {
          nome,
          email,
        });
        alert('Usuário cadastrado com sucesso!');
      }
      carregarUsuarios();
      setNome('');
      setEmail('');
      setModoEdicao(false);
      setIdUsuarioEditando(null);
    } catch (erro) {
      console.error('Erro ao enviar dados:', erro.response?.data || erro.message);
      alert('Erro ao enviar dados. Tente novamente.');
    }
  };

  return (
    <div>
      <h2>{modoEdicao ? 'Editar Usuário' : 'Cadastrar Usuário'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <br />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />

        <button type="submit">
          {modoEdicao ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <h3>Usuários cadastrados:</h3>
<ul>
  {usuarios.map((usuario) => (
    <li key={usuario.id}>
      {usuario.nome} - {usuario.email}
      <button onClick={() => editarUsuario(usuario)}>Editar</button>
      <button onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
    </li>
  ))}
</ul>
</div>
  );
}


export default Formulario;