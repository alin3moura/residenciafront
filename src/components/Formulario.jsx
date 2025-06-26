import { useState } from 'react';
import axios from 'axios';

function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [idUsuarioEditando, setIdUsuarioEditando] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modoEdicao) {
        await axios.put(`http://localhost:3000/usuarios/${idUsuarioEditando}`, {
          nome,
          email,
        });
        alert('Usuário atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:3000/usuarios', {
          nome,
          email,
        });
        alert('Usuário cadastrado com sucesso!');
      }
      setNome('');
      setEmail('');
      setModoEdicao(false);
      setIdUsuarioEditando(null);
    } catch (erro) {
      console.error('Erro ao enviar dados:', erro);
      alert('Erro ao enviar dados. Tente novamente.');
    }
  };
  const Edicao = () => {
    const usuarioExemplo = {
      id: 1,
      nome: 'Aline Moura',
      email: 'alinemoura@outlook.com.br',
    };

    setNome(usuarioExemplo.nome);
    setEmail(usuarioExemplo.email);
    setIdUsuarioEditando(usuarioExemplo.id);
    setModoEdicao(true);
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

      {/* Botão temporário para simular edição */}
      <button onClick={Edicao}>Edição</button>
    </div>
  );
}

export default Formulario;