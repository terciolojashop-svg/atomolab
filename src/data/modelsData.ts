import { AtomicModel, AnomalyChallenge, QuizQuestion } from '../types';

export const ATOMIC_MODELS: AtomicModel[] = [
  {
    id: 'dalton',
    name: 'Modelo de Dalton',
    year: 1803,
    scientist: 'John Dalton',
    popularName: 'Bola de Bilhar',
    concept: 'Átomos são esferas maciças, indivisíveis, indestrutíveis e neutras. Elementos diferentes têm massas diferentes.',
    keyDiscovery: 'Explicação quantitativa da Conservação das Massas (Lavoisier) e das Proporções Definidas (Proust).',
    limitations: [
      'Não explica a natureza elétrica da matéria (cargas elétricas).',
      'Não explica a emissão de luz por substâncias aquecidas.',
      'Considera o átomo indivisível (ignorando subpartículas).'
    ],
    macroscopicAnalogy: 'Uma esfera de bilhar de aço extremamente maciça e rígida.',
    epistemologicalObstacle: 'A crença de que a matéria é contínua e indivisível, sem estrutura interna elétrica.',
    color: '#3b82f6', // blue
    iconName: 'Circle'
  },
  {
    id: 'thomson',
    name: 'Modelo de Thomson',
    year: 1897,
    scientist: 'J.J. Thomson',
    popularName: 'Pudim de Passas',
    concept: 'Uma esfera maciça de carga positiva na qual estão incrustados elétrons de carga negativa em equilíbrio térmico e elétrico.',
    keyDiscovery: 'Descoberta da primeira partícula subatômica (o Elétron) através do experimento com tubos de raios catódicos (Crookes).',
    limitations: [
      'Não explica o rebatimento de partículas alfa em grande ângulo.',
      'Não explica a existência de um núcleo denso e concentrado.',
      'Não explica os espectros de emissão de luz com linhas bem definidas.'
    ],
    macroscopicAnalogy: 'Um pudim de pão com passas ou uma melancia com sementes encravadas na polpa.',
    epistemologicalObstacle: 'Tratar o átomo como uma massa homogênea preenchida, sem grandes espaços vazios.',
    color: '#8b5cf6', // purple
    iconName: 'Sparkles'
  },
  {
    id: 'rutherford',
    name: 'Modelo de Rutherford',
    year: 1911,
    scientist: 'Ernest Rutherford',
    popularName: 'Modelo Planetário',
    concept: 'O átomo possui um núcleo central diminuto, extremamente denso e positivo, cercado por uma imensa eletrosfera quase vazia onde orbitam os elétrons.',
    keyDiscovery: 'Experimento do bombardeamento de partículas alfa ($\alpha$) em uma lâmina finíssima de ouro ($Au$).',
    limitations: [
      'Pela física clássica, um elétron girando em órbita emitiria energia e colapsaria no núcleo em frações de segundo.',
      'Não explica os espectros atômicos descontínuos (de linhas).'
    ],
    macroscopicAnalogy: 'Uma mosca no centro do Maracanã (o núcleo) e os elétrons voando nas arquibancadas mais altas.',
    epistemologicalObstacle: 'Achar que o átomo é maciço/preenchido; Rutherford provou que ele é quase inteiramente espaço vazio.',
    color: '#f59e0b', // amber
    iconName: 'Orbit'
  },
  {
    id: 'bohr',
    name: 'Modelo de Bohr',
    year: 1913,
    scientist: 'Niels Bohr',
    popularName: 'Modelo dos Níveis Quantizados',
    concept: 'Os elétrons orbitam o núcleo em camadas/níveis de energia específicos e permitidos. Quando absorvem fótons de energia, saltam para uma camada externa (estado excitado); ao retornar, emitem fótons de luz colorida.',
    keyDiscovery: 'Explicação dos espectros discretos de emissão (ex: Teste de Chama e Fogos de Artifício).',
    limitations: [
      'Funciona perfeitamente apenas para o átomo de Hidrogênio (1 elétron).',
      'Não prevê a sub-estratificação de níveis e o comportamento de átomos polieletrônicos.',
      'Assume trajetórias circulares rígidas e definidas para os elétrons.'
    ],
    macroscopicAnalogy: 'Degraus de uma escada: o elétron só pode pisar exatamente nos degraus, nunca no ar entre eles.',
    epistemologicalObstacle: 'Superar a noção de que a energia varia de forma contínua, introduzindo a Quantização da Energia.',
    color: '#10b981', // emerald
    iconName: 'Zap'
  },
  {
    id: 'quantum',
    name: 'Modelo Quântico / Schrödinger',
    year: 1926,
    scientist: 'Erwin Schrödinger / Heisenberg / De Broglie',
    popularName: 'Nuvem Eletrônica e Orbitais',
    concept: 'Os elétrons possuem dualidade onda-partícula. Não há órbitas circulares exatas, mas sim "orbitais" – regiões tridimensionais do espaço com alta probabilidade ($\ge 90\%$) de encontrar o elétron.',
    keyDiscovery: 'Mecânica Ondulatória e Princípio da Incerteza de Heisenberg.',
    limitations: [
      'Matematicamente complexo (equações diferenciais parciais). Exige alto nível de abstração visual.'
    ],
    macroscopicAnalogy: 'Um enxame de abelhas zumbindo em volta da colméia; você vê uma nuvem turva e densa de abelhas.',
    epistemologicalObstacle: 'Superar o determinismo (trajetória exata) e aceitar a incerteza e a probabilidade como fundamento do microcosmo.',
    color: '#ec4899', // pink
    iconName: 'Atom'
  }
];

export const ANOMALY_CHALLENGES: AnomalyChallenge[] = [
  {
    id: 'anom_dalton',
    modelId: 'dalton',
    title: 'A Ruptura do Átomo Maciço e Indivisível',
    historicalContext: 'Em 1897, ao aplicar altíssima voltagem em gases em tubos de vácuo (Tubo de Crookes), J.J. Thomson observou raios brilhantes emergindo do cátodo.',
    experimentalFact: 'Quando aproximou um ímã e placas com carga elétrica (+ e -), os raios sofreram deflexão na direção da placa POSITIVA, independente do gás utilizado.',
    question: 'Se o modelo de Dalton dizia que o átomo era uma esfera indivisível e sem cargas internas, como o mesmo raio negativo pode sair de qualquer elemento?',
    hint: 'Pense: de onde vieram essas partículas negativas defletidas se o átomo fosse indivisível?',
    solutionExplanation: 'Isso provou que o átomo NÃO é indivisível! Ele possui partículas subatômicas com carga negativa (os elétrons) presentes em toda a matéria. Assim nasceu o Modelo de Thomson.',
    nextModelUnlocked: 'thomson'
  },
  {
    id: 'anom_thomson',
    modelId: 'thomson',
    title: 'O Mistério da Folha de Ouro',
    historicalContext: 'Em 1911, Rutherford e seus alunos bombardearam uma lâmina de ouro extremamente fina ($0{,}00004\text{ cm}$) com partículas alfa ($\alpha$), pesadas e positivas.',
    experimentalFact: 'Esperava-se que todas as partículas atravessassem com deflexão mínima (já que no pudim de Thomson a carga positiva estava espalhada de forma fraca e diluída). Porém, 1 em cada 8.000 partículas alfa REBATEU violentamente para trás!',
    question: 'Se o átomo de Thomson fosse homogêneo e fofo como um pudim, o que poderia ter exercido uma força repulsiva tão colossal para rebater uma partícula alfa rápida e pesada?',
    hint: 'Imagine atirar um projétil de canhão contra um papel higiênico e ele rebater de volta em você!',
    solutionExplanation: 'Para rebater a partícula alfa positiva, toda a massa e a carga positiva do átomo precisavam estar concentradas em um ponto incrivelmente minúsculo e denso no centro: o NÚCLEO. O resto era espaço vazio!',
    nextModelUnlocked: 'rutherford'
  },
  {
    id: 'anom_rutherford',
    modelId: 'rutherford',
    title: 'A Crise do Colapso Atômico e os Espectros',
    historicalContext: 'Pela Física Clássica de Maxwell, qualquer carga elétrica acelerada em movimento circular (como o elétron de Rutherford) deve irradiar ondas eletromagnéticas e perder energia constantemente.',
    experimentalFact: 'Se o elétron perdesse energia em órbita, ele espiralaria até despencar no núcleo em menos de $0{,}000000001$ segundos, destruindo toda a matéria do universo! Além disso, o átomo de hidrogênio aquecido não emite um arco-íris contínuo, mas sim linhas de cores puras e isoladas.',
    question: 'Como a matéria permanece estável e por que os elementos emitem apenas certas frequências exatas de luz colorida?',
    hint: 'Pense em degraus de energia fixos onde o elétron pode ficar sem perder energia continuamente.',
    solutionExplanation: 'Niels Bohr resolveu a crise postulando que a energia dos elétrons é QUANTIZADA. Eles só podem girar em órbitas estáveis pré-determinadas (camadas) e só emitem ou absorvem energia ao SALTAR de um degrau para outro!',
    nextModelUnlocked: 'bohr'
  },
  {
    id: 'anom_bohr',
    modelId: 'bohr',
    title: 'A Incerteza do Elétron Ondulatório',
    historicalContext: 'Ao tentar aplicar as equações de Bohr para átomos maiores com vários elétrons (como Lítio ou Carbono) ou sob campos magnéticos fortes, o modelo falhou em prever as linhas espectrais.',
    experimentalFact: 'Experimentos de difração mostraram que o elétron também se comporta como ONDA (De Broglie), e Heisenberg provou ser IMPOSSÍVEL medir simultaneamente a posição exata e a velocidade do elétron.',
    question: 'Se não podemos desenhar uma linha de órbita circular rígida sem violar o Princípio da Incerteza, como devemos descrever onde o elétron está?',
    hint: 'Em vez de uma linha perfeita no papel, pense em regiões de alta probabilidade espacial (uma nuvem).',
    solutionExplanation: 'Substituímos a palavra "Órbita" por "Orbital" – uma região tridimensional de probabilidade de $90\%$ descrita pela equação de ondas de Schrödinger.',
    nextModelUnlocked: 'quantum'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    modelId: 'dalton',
    question: 'Qual o principal postulado de Dalton que permaneceu válido para reações químicas ordinárias na lei de conservação da massa?',
    options: [
      'Os átomos são esferas maciças com elétrons encravados.',
      'Os átomos não são criados nem destruídos em reações químicas; apenas rearranjados.',
      'Os átomos de um mesmo elemento mudam de massa quando aquecidos.',
      'Os elétrons pulam de camada emitindo fótons de luz.'
    ],
    correctAnswer: 1,
    explanation: 'Nas reações químicas comuns, a quantidade total de átomos se conserva, reorganizando-se para formar novas substâncias.',
    epistemologicalFocus: 'Compreender a escala de conservação de massa.'
  },
  {
    id: 'q2',
    modelId: 'thomson',
    question: 'No experimento de Thomson com tubos de raios catódicos, a deflexão dos raios em direção à placa positiva provou que:',
    options: [
      'O raio era constituído por fótons de luz neutra.',
      'A matéria continha partículas negativas subatômicas chamadas elétrons.',
      'O núcleo atômico era carregado positivamente.',
      'Os átomos eram totalmente indivisíveis e impermeáveis.'
    ],
    correctAnswer: 1,
    explanation: 'Cargas opostas se atraem. Como o raio foi atraído pela placa positiva (+), ele continha cargas negativas (-).',
    epistemologicalFocus: 'Desconstruir o mito da indivisibilidade atômica.'
  },
  {
    id: 'q3',
    modelId: 'rutherford',
    question: 'Rutherford concluiu que o átomo é formado por um imenso espaço vazio porque:',
    options: [
      'Todas as partículas alfa rebateram na folha de ouro.',
      'A grande maioria das partículas alfa passou direto pela folha de ouro sem sofrer desvio.',
      'Os elétrons emitiram fótons de luz verde.',
      'O ouro evaporou instantaneamente.'
    ],
    correctAnswer: 1,
    explanation: 'A grande maioria das partículas passou direto, provando que a maior parte do átomo é espaço livre e desocupado.',
    epistemologicalFocus: 'Ruptura da imagem de matéria maciça homogênea.'
  },
  {
    id: 'q4',
    modelId: 'bohr',
    question: 'O teste de chama (usado em fogos de artifício para produzir cores verde, azul ou vermelha) é explicado pelo modelo de Bohr através de:',
    options: [
      'Fusão do núcleo do átomo com liberação de radiação alfa.',
      'Eletrons saltando para camadas mais externas e, ao retornarem para a camada original, emitindo luz em forma de fóton.',
      'Quebra da esfera indivisível de Dalton em partículas neutras.',
      'Destruição completa dos elétrons em atrito com o ar.'
    ],
    correctAnswer: 1,
    explanation: 'A energia térmica excita o elétron para um nível mais alto; ao relaxar de volta, a energia sobressalente é emitida como luz visível caracterizada pela frequência do elemento.',
    epistemologicalFocus: 'Entendimento da quantização da energia e conexão micro-macro.'
  }
];
