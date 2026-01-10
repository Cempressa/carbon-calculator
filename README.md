# 🍃 Calculadora de Emissão de CO₂

[![Deploy to GitHub Pages](https://github.com/garbinmarcelo/carbon-calculator/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/garbinmarcelo/carbon-calculator/actions)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

> Calcule a pegada de carbono das suas viagens e descubra como suas escolhas de transporte impactam o meio ambiente.

## 📋 Descrição

A **Calculadora de Emissão de CO₂** é uma aplicação web interativa que permite aos usuários calcular a quantidade de dióxido de carbono (CO₂) emitida durante viagens entre cidades brasileiras, utilizando diferentes meios de transporte. O projeto tem como objetivo conscientizar sobre o impacto ambiental das escolhas de mobilidade e incentivar práticas mais sustentáveis.

### ✨ Funcionalidades Principais

- 🗺️ **Cálculo de Emissões**: Calcule a emissão de CO₂ para viagens entre mais de 50 cidades brasileiras
- 🚗 **Múltiplos Meios de Transporte**: Compare emissões de bicicleta, carro, ônibus e caminhão
- 📊 **Comparação Visual**: Visualize comparações percentuais entre diferentes meios de transporte
- 💰 **Créditos de Carbono**: Descubra quanto custaria compensar suas emissões através de créditos de carbono
- 📱 **Design Responsivo**: Interface otimizada para desktop, tablet e dispositivos móveis
- 🌍 **Base de Dados Pré-configurada**: Rotas e distâncias entre principais capitais e cidades do Brasil

---

## 🚀 Instalação

### Pré-requisitos

Não há pré-requisitos para executar este projeto! É uma aplicação web estática que funciona diretamente no navegador ou [clicando aqui](https://garbinmarcelo.github.io/carbon-calculator/).

### Passos para Instalação Local

1. **Clone o repositório:**

```bash
git clone https://github.com/garbinmarcelo/carbon-calculator.git
```

2. **Navegue até o diretório do projeto:**

```bash
cd carbon-calculator
```

3. **Abra o arquivo `index.html` no seu navegador:**

   - **Opção 1**: Clique duas vezes no arquivo `index.html`
   - **Opção 2**: Use um servidor local (recomendado para desenvolvimento):

```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js com npx
npx serve

# Usando PHP
php -S localhost:8000
```

4. **Acesse no navegador:**

```
http://localhost:8000
```

---

## 💻 Uso

### Como Calcular Emissões

1. **Selecione a Origem**: Digite a cidade de partida (ex: "São Paulo, SP")
2. **Selecione o Destino**: Digite a cidade de chegada (ex: "Rio de Janeiro, RJ")
3. **Distância Automática**: A distância será preenchida automaticamente se a rota estiver cadastrada
4. **Escolha o Meio de Transporte**: Selecione entre bicicleta 🚲, carro 🚗, ônibus 🚌 ou caminhão 🚚
5. **Clique em "Calcular Emissão"**: Os resultados serão exibidos instantaneamente

### Exemplo de Uso

```
Origem: São Paulo, SP
Destino: Rio de Janeiro, RJ
Distância: 430 km (preenchida automaticamente)
Meio de Transporte: Carro 🚗

Resultado:
- Emissão Total: 51.60 kg CO₂
- Comparação com outros meios de transporte
- Custo estimado de compensação em créditos de carbono
```

### Interpretando os Resultados

#### 📊 Seção de Resultados
- **Emissão Total**: Quantidade de CO₂ emitida na viagem escolhida
- **Distância Percorrida**: Confirmação da distância calculada
- **Meio de Transporte**: Modo de transporte selecionado

#### 🔄 Comparação de Meios de Transporte
- Visualização de todas as opções de transporte
- Percentual comparativo em relação ao carro
- Barras de progresso visuais indicando o nível de emissão
- Destaque do meio de transporte selecionado

#### 💳 Créditos de Carbono
- **Quantidade de Créditos**: Quantos créditos seriam necessários para compensar
- **Faixa de Preço**: Valor estimado em Reais (BRL) para compensação
- Informações educativas sobre o mercado de carbono

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com:
  - CSS Variables para temas
  - Flexbox e Grid Layout
  - Animações e transições suaves
  - Design responsivo mobile-first
- **JavaScript (ES6+)**: Lógica da aplicação com:
  - Manipulação do DOM
  - Cálculos matemáticos
  - Validação de formulários
  - Renderização dinâmica

### Arquitetura
- **Padrão Modular**: Código organizado em módulos especializados
  - `app.js`: Inicialização e controle de eventos
  - `calculator.js`: Lógica de cálculos de emissões
  - `config.js`: Configurações e fatores de emissão
  - `routes-data.js`: Base de dados de rotas
  - `ui.js`: Manipulação de interface e renderização

### Deployment
- **GitHub Actions**: CI/CD automatizado
- **GitHub Pages**: Hospedagem estática gratuita

### Metodologia CSS
- **BEM (Block Element Modifier)**: Nomenclatura consistente de classes
- **Mobile-First**: Desenvolvimento priorizando dispositivos móveis

---

## 📁 Estrutura do Projeto

```
carbon-calculator/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow de deploy automático
├── css/
│   └── styles.css              # Estilos da aplicação
├── js/
│   ├── app.js                  # Inicialização e eventos
│   ├── calculator.js           # Lógica de cálculos
│   ├── config.js               # Configurações e constantes
│   ├── routes-data.js          # Base de dados de rotas
│   └── ui.js                   # Manipulação de UI
├── index.html                  # Página principal
├── LICENSE                     # Licença Apache 2.0
└── README.md                   # Este arquivo
```

---

## 📊 Fatores de Emissão

O projeto utiliza fatores de emissão baseados em estudos ambientais:

| Meio de Transporte | Emissão (kg CO₂/km) |
|-------------------|---------------------|
| 🚲 Bicicleta      | 0.000               |
| 🚗 Carro          | 0.120               |
| 🚌 Ônibus         | 0.089               |
| 🚚 Caminhão       | 0.960               |

> **Nota**: Os fatores de emissão são valores médios e podem variar dependendo do modelo do veículo, combustível utilizado e condições de operação.

---

## 🤝 Contribuição

Contribuições são muito bem-vindas! Siga os passos abaixo para contribuir com o projeto:

### Como Contribuir

1. **Fork o projeto**
   - Clique no botão "Fork" no canto superior direito da página do repositório

2. **Clone seu fork**
```bash
git clone https://github.com/seu-usuario/carbon-calculator.git
cd carbon-calculator
```

3. **Crie uma branch para sua feature**
```bash
git checkout -b feature/minha-nova-funcionalidade
```

4. **Faça suas alterações**
   - Escreva código limpo e bem documentado
   - Siga os padrões de código existentes
   - Teste suas alterações em diferentes navegadores

5. **Commit suas mudanças**
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
```

6. **Push para o GitHub**
```bash
git push origin feature/minha-nova-funcionalidade
```

7. **Abra um Pull Request**
   - Vá até o repositório original no GitHub
   - Clique em "New Pull Request"
   - Descreva suas alterações detalhadamente

### Diretrizes de Contribuição

- ✅ **Código Limpo**: Mantenha o código legível e bem documentado
- ✅ **Comentários**: Adicione comentários explicativos em funções complexas
- ✅ **Commits Semânticos**: Use mensagens de commit descritivas (feat, fix, docs, style, refactor)
- ✅ **Testes**: Teste suas alterações em múltiplos navegadores
- ✅ **Responsividade**: Garanta que suas mudanças funcionem em dispositivos móveis

### Ideias para Contribuição

- 🌍 Adicionar mais cidades e rotas ao banco de dados
- 🚆 Incluir novos meios de transporte (trem, avião, metrô)
- 🌐 Implementar internacionalização (i18n)
- 📈 Adicionar gráficos interativos
- 🎨 Melhorar o design e animações
- ♿ Aprimorar acessibilidade (WCAG)
- 🧪 Implementar testes automatizados

---

## 📄 Licença

Este projeto está licenciado sob a **Apache License 2.0** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

### Resumo da Licença

- ✅ **Uso Comercial**: Permitido
- ✅ **Modificação**: Permitido
- ✅ **Distribuição**: Permitido
- ✅ **Uso em Patentes**: Permitido
- ⚠️ **Responsabilidade**: Sem garantias
- ⚠️ **Trademark**: Não concede direitos de marca registrada

---

## 📞 Contato

### Autor
**Marcelo Garbin**

### Suporte
Para dúvidas, sugestões ou reportar problemas:

- 🐛 **Issues**: [Abrir uma issue no GitHub](https://github.com/garbinmarcelo/carbon-calculator/issues)
- 💬 **Discussões**: [Participar das discussões](https://github.com/garbinmarcelo/carbon-calculator/discussions)
- 📧 **Email**: [Enviar email](mailto:marcelo@garbin.dev)


---

## 🔗 Links Úteis

- [Documentação sobre Emissões de CO₂](https://seeg.eco.br/)
- [Mercado de Créditos de Carbono](https://ipam.org.br/cartilhas-ipam/o-que-e-e-como-funciona-o-mercado-de-carbono/)
- [Sustentabilidade no Transporte](https://www.cobli.co/blog/sustentabilidade-transporte/)

---

<div align="center">
  
**Feito com 💚 para um planeta mais sustentável**

[⬆ Voltar ao topo](#-calculadora-de-emissão-de-co₂)

</div>

