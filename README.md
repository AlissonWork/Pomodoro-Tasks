# 🕑 Pomodoro-Tasks – Pomodoro com Gerenciamento de Tarefas

**Projeto:** Timer Pomodoro com foco em produtividade, integração de tarefas e notificações visuais. Desenvolvido como projeto front-end com persistência local.  

**💻 Deploy online:** [Clique aqui para acessar o projeto](https://pomodoro-tasks-9dm3dlyue-alisson-dos-santos-s-projects.vercel.app)

---

## **Descrição**

O Pomodoro-Tasks é uma aplicação web que combina a técnica **Pomodoro** com um gerenciador de tarefas. O objetivo é **otimizar a produtividade**, permitindo que o usuário se concentre em períodos de foco intercalados com pausas curtas e longas, enquanto acompanha suas tarefas ativas.  

Principais características:

- Timer Pomodoro totalmente funcional;
- Pausas curtas e longas configuráveis;
- Lista de tarefas com status de conclusão;
- Persistência de tarefas usando `localStorage`;
- Notificações visuais via **Toastr.js** para eventos importantes (tarefa adicionada, concluída, atualizada);
- Interface responsiva para desktop, tablets e celulares;
- Controle de música de fundo durante o foco.

---

## **Funcionalidades**

1. **Timer Pomodoro**  
   - Foco: 25 minutos  
   - Descanso curto: 5 minutos  
   - Descanso longo: 15 minutos  

2. **Gerenciamento de tarefas**  
   - Adicionar nova tarefa com descrição;  
   - Selecionar tarefa ativa;  
   - Marcar tarefas como concluídas automaticamente ao final do Pomodoro;  
   - Editar tarefas existentes;  
   - Limpar tarefas concluídas ou todas as tarefas;  

3. **Notificações (Toastr.js)**  
   - Feedback visual para ações de adicionar, atualizar e concluir tarefas;  

4. **Música de foco**  
   - Alternar música de fundo durante o período de foco;  
   - Controle de volume pré-definido.

---

## **Tecnologias Utilizadas**

- **HTML5 / CSS3 / JavaScript (ES6+)**
- **Toastr.js** – Biblioteca de notificações
- **LocalStorage** – Persistência de dados
- **Vercel** – Deploy da aplicação
- **jQuery** – Para manipulação básica de eventos e DOM  

---

## **Como usar o projeto localmente**

1. **Clone o repositório:**

```bash
git clone https://github.com/SEU_USUARIO/Pomodoro-Tasks.git
````

2. **Entre na pasta do projeto:**

```bash
cd Pomodoro-Tasks
````

3. **Abra o arquivo:**

Abra o `index.html` em qualquer navegador moderno (como Chrome, Edge ou Firefox) para usar a aplicação.

> **Importante:** Este projeto é 100% front-end. Você não precisa de um servidor local, pois os dados são salvos diretamente no seu navegador usando o `localStorage`.

## 🤝 Contribuição

Contribuições são bem-vindas! Se você quiser melhorar o **Pomodoro-Tasks**, seja ajustando o código, corrigindo bugs ou sugerindo novas funcionalidades, sinta-se à vontade para enviar sugestões ou abrir um Pull Request.  

Agradecemos toda ajuda para tornar este projeto ainda mais útil e eficiente! 🚀
