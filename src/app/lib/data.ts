import {
  Headphones,
  Mic2,
  BookOpen,
  Utensils,
  Smile,
  HeartHandshake,
  Microscope,
  ShieldCheck,
  Users,
} from "lucide-react";
import logoUnimed from "../../imports/UNIMED.png";
import logoBradesco from "../../imports/BRADESCO.png";
import logoAmil from "../../imports/AMIL.png";
import logoCaixa from "../../imports/SA_DE_CAIXA.png";
import logoAsfal from "../../imports/ASFAL.png";
import logoPetrobras from "../../imports/PETROBRAS.png";
import logoPostal from "../../imports/POSTAL_SA_DE.png";
import logoGeap from "../../imports/GEAP.png";
import logoCassi from "../../imports/CASSI.png";
import logoCapesesp from "../../imports/CAPESESP.png";

// ─── Contato / links ─────────────────────────────────────────────────────────

export const WHATSAPP = "https://wa.me/5582981135309";
export const PHONE_DISPLAY = "(82) 98113-5309";
export const PHONE_HREF = "tel:+5582981135309";
export const EMAIL = "synapsern.al@gmail.com";
export const ADDRESS =
  "Empresarial Business Tower, Av. Gov. Osman Loureiro, 49, Sl 6, Mangabeiras, Maceió, AL, 57037-630";
export const MAPS_EMBED =
  "https://maps.google.com/maps?q=Av.+Gov.+Osman+Loureiro,+49,+Mangabeiras,+Maceio,+AL,+Brasil&output=embed&iwloc=near";
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Synapse+-+Fonoaudiólogo+•+Reabilitação+Neurofuncional/data=!4m2!3m1!1s0x0:0xdf6a4c30dbc466c?sa=X&ved=1t:2428&ictx=111";
export const COURSE_URL = "https://zumbido360.com.br";

export const NAV_LINKS = [
  { to: "/sobre", label: "Sobre" },
  { to: "/servicos", label: "Serviços" },
  { to: "/exames", label: "Exames" },
  { to: "/tratamento-do-zumbido", label: "Tratamento do Zumbido" },
  { to: "/equipe", label: "Equipe" },
  { to: "/contato", label: "Contato" },
];

// ─── Data ───────────────────────────────────────────────────────────────────

export const CONVENIOS = [
  { name: "Unimed", logo: logoUnimed, h: 44 },
  { name: "Bradesco Saúde", logo: logoBradesco, h: 44 },
  { name: "Amil", logo: logoAmil, h: 30 },
  { name: "Caixa", logo: logoCaixa, h: 44 },
  { name: "Asfal/AL", logo: logoAsfal, h: 58 },
  { name: "Petrobras", logo: logoPetrobras, h: 44 },
  { name: "Postal Saúde", logo: logoPostal, h: 44 },
  { name: "GEAP", logo: logoGeap, h: 44 },
  { name: "Cassi", logo: logoCassi, h: 44 },
  { name: "CAPESESP", logo: logoCapesesp, h: 58 },
];

/**
 * `anim`: direção do reveal interno do ícone no hover — coerente com a função:
 * som sobe (btt), sorriso se forma (ltr), deglutição desce (ttb), leitura (ltr).
 */
export const SERVICES = [
  {
    Icon: Headphones,
    tag: "Audiologia",
    title: "Audiologia",
    anim: "btt",
    description:
      "Avaliação e tratamento de perda auditiva, zumbido, tontura e sensibilidade a sons",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=1000&fit=crop&auto=format&q=80",
  },
  {
    Icon: Smile,
    tag: "Motricidade",
    title: "Motricidade Orofacial",
    anim: "ltr",
    description:
      "Alterações relacionadas à respiração, mastigação, deglutição, fala e movimentos da face",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=1000&fit=crop&auto=format&q=80",
  },
  {
    Icon: Utensils,
    tag: "Disfagia",
    title: "Disfagia",
    anim: "ttb",
    description:
      "Reabilitação das dificuldades para engolir alimentos, líquidos, saliva ou medicamentos",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=1000&fit=crop&auto=format&q=80",
  },
  {
    Icon: Mic2,
    tag: "Voz",
    title: "Voz",
    anim: "btt",
    description:
      "Rouquidão, cansaço ao falar, falhas na voz e acompanhamento de profissionais da voz",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=1000&fit=crop&auto=format&q=80",
  },
  {
    Icon: BookOpen,
    tag: "Linguagem",
    title: "Linguagem",
    anim: "ltr",
    description:
      "Atrasos na fala e na linguagem, trocas de sons e dificuldades de comunicação, leitura e escrita",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&h=1000&fit=crop&auto=format&q=80",
  },
];

export const BENEFITS = [
  {
    Icon: HeartHandshake,
    title: "Cuidado humano",
    text: "Cada atendimento nasce da escuta atenta, respeitando a individualidade de quem confia seu cuidado à nossa equipe.",
  },
  {
    Icon: Microscope,
    title: "Prática baseada em evidências",
    text: "Unimos profissionais qualificados, tecnologia e práticas científicas em cada avaliação e plano de tratamento.",
  },
  {
    Icon: ShieldCheck,
    title: "Foco especial em audição",
    text: "Avaliações e tratamentos voltados à perda auditiva, zumbido, tontura, equilíbrio e sensibilidade aos sons.",
  },
  {
    Icon: Users,
    title: "Todas as idades",
    text: "Atendimento individualizado para crianças, adultos e idosos, em cada fase da vida.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Nilza Malta",
    text: "Foi excelente, cheguei para as primeiras sessões em uma situação bem complicada, totalmente sem equilíbrio. Após a segunda sessão de recuperação Vestibular com o Fonoaudiólogo Talhes Vanderley já senti uma melhora considerável, e senti a necessidade de continuar, com a certeza que teria a minha recuperação, graças a Deus hj estou recuperada e louvo a Deus por isso.",
  },
  {
    name: "Laurenir Gonçalves",
    text: "Todos muito atenciosos, minha filha precisava dormir pra fazer um exame e eles aguardaram com toda paciência do mundo, inclusive me ajudaram a ninar ela. A clínica também é linda e tem um ambiente seguro para bebês",
  },
  {
    name: "Thainá Cunha",
    text: "Me senti muito confortável na clínica. A atendente Márcia, conversou e brincou com meu filho, o agradou para deixá-lo confortável para realizar o exame. A Fono, Carol também foi maravilhosa, muito simpática e cuidadosa.",
  },
  {
    name: "Patricia Rodrigues",
    text: "Excelente clínica com profissionais especializados e muito preparados para atender seus pacientes. Em especial o Dr Tales Vanderlei, meus dois filhos nunca conseguiram realizar seus exames, pois os outros profissionais nunca deram a atenção necessária e tiveram a paciência e persistência que o Dr Tales, conseguiu o diagnóstico correto e hoje meus dois filhos que são crianças estão ótimos. Parabéns Dr. Tales pelo seu profissionalismo e competência.",
  },
  {
    name: "Christiane Patrícia",
    text: "Synapse não é só uma clínica, é com uma segunda casa e uma casa muita acolhedora. Dr Thales é um excelente profissional, atencioso, cuidadoso, paciente e muito qualificado. Sou grata pelo tempo que minha filha passou com ele fazendo terapia em cabine, ela se sentiu tão bem que chorou quando soube que receberia alta.",
  },
  {
    name: "evelyn correia",
    text: "A clínica é excelente, proporciona um ambiente convidativo, acolhedor e profissional, com uma equipe capacitada. Recomendo a clínica e a Fonoaudióloga Anália Correia, que oferece um atendimento de qualidade superior desde o primeiro contato até o acompanhamento contínuo.",
  },
  {
    name: "Harla Carvalho",
    text: "Excelente, do atendimento recepção a consulta Com Dr. Thales Venderlei. Deixou meu filho de 5 anos a vontade e realizou os exames com toda paciência. Muito bom.",
  },
];
