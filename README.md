# 🍃 Calculadora de Emissão de CO₂

> Calcule a pegada de carbono das suas viagens e descubra como suas escolhas de transporte impactam o meio ambiente.

---

## 📋 Descrição

A **Calculadora de Emissão de CO₂** é uma aplicação web interativa que estima a quantidade de dióxido de carbono emitida em viagens entre cidades brasileiras, considerando diferentes meios de transporte.

O objetivo é **conscientizar** sobre o impacto ambiental das escolhas de mobilidade e incentivar alternativas mais sustentáveis.

---

## ✨ Funcionalidades

- 🗺️ Cálculo automático de emissões entre mais de 50 cidades brasileiras  
- 🚗 Comparação entre bicicleta, carro, ônibus e caminhão  
- 📊 Visualização gráfica das diferenças de emissão  
- 💰 Estimativa de créditos de carbono para compensação  
- 📱 Design responsivo  
- 🌍 Base de dados pré-configurada com rotas reais  

---

## 🚀 Instalação

### Pré-requisitos

Nenhum!  
A aplicação é totalmente estática e funciona direto no navegador ou via GitHub Pages.

---

### Instalação Local

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/carbon-calculator.git
```

2. **Acesse o diretório**
```bash
cd carbon-calculator
```

3. **Execute localmente**

#### Opção 1 — Abrir diretamente
Clique duas vezes no arquivo `index.html`.

#### Opção 2 — Usar servidor local (recomendado)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

4. **Acesse no navegador**
```
http://localhost:8000
```

---

## 💻 Uso

### Como calcular

1. Digite a **cidade de origem**  
2. Digite a **cidade de destino**  
3. A **distância será preenchida automaticamente**  
4. Escolha o **modo de transporte**  
5. Clique em **Calcular Emissão**

---

### Exemplo

```
Origem: São Paulo, SP
Destino: Rio de Janeiro, RJ
Distância: 430 km
Transporte: Carro 🚗

Resultado:
- Emissão Total: 51.60 kg CO₂
- Comparação com outros meios
- Custo estimado de compensação
```

---

## 📊 Interpretação dos Resultados

### Emissão Total
Quantidade de CO₂ emitida na viagem.

### Comparação entre Transportes
- Percentual relativo ao carro  
- Barras de emissão  
- Destaque do transporte selecionado  

### Créditos de Carbono
- Quantidade necessária para compensação  
- Faixa de preço estimada  
- Informações educativas sobre o mercado de carbono  

---

## 🛠️ Tecnologias

### Frontend
- HTML5  
- CSS3 (BEM, mobile-first, animações, variáveis CSS)  
- JavaScript ES6+ (DOM, cálculos, módulos)

### Arquitetura
- `app.js` — inicialização e eventos  
- `calculator.js` — cálculos de emissão  
- `config.js` — fatores de emissão  
- `routes-data.js` — base de rotas  
- `ui.js` — interface e renderização  

### Deploy
- GitHub Pages  
- GitHub Actions (CI/CD)

---

## 📁 Estrutura

```
carbon-calculator/
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── calculator.js
│   ├── config.js
│   ├── routes-data.js
│   └── ui.js
├── index.html
└── README.md
```

---

## 📊 Fatores de Emissão

| Transporte | Emissão (kg CO₂/km) |
|-----------|----------------------|
| 🚲 Bicicleta | 0.000 |
| 🚗 Carro | 0.120 |
| 🚌 Ônibus | 0.089 |
| 🚚 Caminhão | 0.960 |

> Valores médios baseados em estudos ambientais.

---

## 🤝 Contribuição

Contribuições são bem-vindas!

### Passos

1. Faça um **fork**  
2. Clone seu fork  
3. Crie uma branch  
4. Implemente sua melhoria  
5. Envie um Pull Request

### Diretrizes

- Código limpo  
- Commits semânticos  
- Testes em múltiplos navegadores  
- Responsividade garantida  

### Sugestões de melhorias

- Adicionar mais cidades  
- Novos meios de transporte  
- Gráficos interativos  
- Internacionalização  
- Acessibilidade avançada  

---

## 📄 Licença

Licenciado sob **Apache License 2.0**.

---

## 📞 Contato

**Autor:** Marcos  
**Base:** Projeto original de Marcelo Garbin  

---

<div align="center">

**Feito com 💚 para um planeta mais sustentável**  
  
[Voltar ao topo](#-calculadora-de-emissão-de-co₂)

</div>
