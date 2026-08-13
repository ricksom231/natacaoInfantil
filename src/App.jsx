import { useEffect, useRef, useState } from 'react';

// SUBSTITUA PELOS LINKS REAIS DO CHECKOUT
const OFFER = { name: '+200 Aulas de Natação Infantil por Nível', basicPrice: '10,00', completePrice: '24,90', upgradePrice: '17,90', basicCheckout: 'https://go.perfectpay.com.br/PPU38CQF9FC', completeCheckout: 'https://go.perfectpay.com.br/PPU38CQFAG8', upgradeCheckout: 'https://go.perfectpay.com.br/PPU38CQFAGD' };
const BASIC_CHECKOUT_URL = OFFER.basicCheckout;
const COMPLETE_CHECKOUT_URL = OFFER.completeCheckout;
const UPGRADE_CHECKOUT_URL = OFFER.upgradeCheckout;

const audienceCards = [
  ['Professor que não quer planejar tudo do zero', 'Para quem tem várias turmas durante a semana e precisa encontrar rapidamente uma atividade adequada.'],
  ['Professor com aluno travado', 'Para quem percebe uma dificuldade específica e quer ter outras opções de exercício para experimentar.'],
  ['Quem está começando na natação infantil', 'Para estagiários e recém-formados que ainda não construíram um repertório grande de atividades.'],
  ['Professor que quer variar mais as aulas', 'Para quem sente que está repetindo sempre as mesmas atividades e quer aumentar seu repertório.'],
];
const bonuses = [
  ['Guia de Progressão por Nível', 'Saiba quais habilidades observar antes de avançar o aluno e tenha uma referência rápida para acompanhar cada fase.', '/assets/bonus-01.webp'],
  ['Mapa SOS — Meu Aluno Está Travado', 'Encontre rapidamente quais atividades consultar quando perceber dificuldades específicas.', '/assets/bonus-02.webp'],
  ['Ficha de Evolução do Aluno', 'Organize as habilidades já desenvolvidas, as que estão em progresso e qual será o próximo foco.', '/assets/bonus-03.webp'],
  ['+30 Aulas Lúdicas', 'Atividades divertidas com objetivo pedagógico para variar as aulas sem transformar a piscina em bagunça.', '/assets/bonus-04.webp'],
  ['20 Aulas Completas', 'Roteiros completos de 30, 45 e 60 minutos para os dias em que você quer abrir e aplicar uma aula inteira.', '/assets/bonus-05.webp'],
];
const productMockup = '/assets/product-mockup.webp';
const bonusPricing = {
  bonus1: 'R$ 19,90',
  bonus2: 'R$ 27,90',
  bonus3: 'R$ 14,90',
  bonus4: 'R$ 24,90',
  bonus5: 'R$ 29,90',
  total: 'R$ 117,50',
};
const bonusValueItems = [
  { name: 'Guia de Progressão por Nível', value: bonusPricing.bonus1 },
  { name: 'Mapa SOS — Meu Aluno Está Travado', value: bonusPricing.bonus2 },
  { name: 'Ficha de Evolução do Aluno', value: bonusPricing.bonus3 },
  { name: '+30 Aulas Lúdicas', value: bonusPricing.bonus4 },
  { name: '20 Aulas Completas', value: bonusPricing.bonus5 },
];
const pages = [
  '/assets/carousel/page-01.webp',
  '/assets/carousel/page-02.webp',
  '/assets/carousel/page-03.webp',
  '/assets/carousel/page-04.webp',
  '/assets/carousel/page-05.webp',
  '/assets/carousel/page-06.webp',
  '/assets/carousel/page-07.webp',
  '/assets/carousel/page-08.webp',
  '/assets/carousel/page-09.webp',
  '/assets/carousel/page-10.webp',
];
const basicItems = [['yes', OFFER.name], ['yes', 'Material ilustrado'], ['yes', 'Organização por nível'], ['yes', 'Consulta rápida'], ['yes', 'Acesso digital imediato'], ['no', 'Guia de Progressão'], ['no', 'Mapa SOS'], ['no', 'Ficha de Evolução'], ['no', '+30 Aulas Lúdicas'], ['no', '20 Aulas Completas']];
const completeItems = [OFFER.name, 'Guia de Progressão', 'Mapa SOS — Meu Aluno Está Travado', 'Ficha de Evolução do Aluno', '+30 Aulas Lúdicas', '20 Aulas Completas de 30, 45 e 60 minutos', 'Material ilustrado', 'Consulta rápida', 'Acesso digital imediato'];
const faqs = [
  ['O material é físico ou digital?', 'É digital. Após a confirmação do pagamento, o acesso é disponibilizado para consulta em celular, computador ou tablet.'],
  ['É um curso?', 'Não. É um material visual de consulta com aulas e atividades prontas.'],
  ['Preciso seguir as aulas em ordem?', 'Não. Você pode procurar pelo nível ou pela habilidade que deseja trabalhar.'],
  ['Serve para quem já trabalha com natação infantil?', 'Sim. O material foi pensado principalmente para profissionais que desejam aumentar o repertório e reduzir tempo de planejamento.'],
  ['Serve para quem está começando?', 'Sim. A organização por nível facilita a consulta para quem ainda está construindo repertório.'],
  ['Posso usar pelo celular?', 'Sim. O layout do material é pensado para consulta digital rápida.'],
  ['O Plano Básico possui os bônus?', 'Não. O Básico entrega as +200 aulas. As ferramentas extras estão no Plano Completo.'],
  ['Recebo imediatamente?', 'O acesso digital deve ser liberado após a confirmação do pagamento, conforme funcionamento da plataforma utilizada.'],
  ['Posso aplicar exatamente igual para todas as crianças?', 'Não. O profissional deve adaptar qualquer atividade considerando idade, nível aquático, ambiente, profundidade, segurança e necessidades individuais.'],
];
const clock = (seconds) => [Math.floor(seconds / 3600), Math.floor(seconds % 3600 / 60), seconds % 60].map((n) => String(n).padStart(2, '0')).join(':');
function CountdownBar() { const [remaining, setRemaining] = useState(25 * 60); useEffect(() => { const id = setInterval(() => setRemaining((time) => Math.max(0, time - 1)), 1000); return () => clearInterval(id); }, []); return <div className="topCountdown" role="timer" aria-label={'Condição especial disponível hoje, faltam ' + clock(remaining)}><strong>CONDIÇÃO ESPECIAL DISPONÍVEL HOJE</strong><span>•</span><b>FALTAM {clock(remaining)}</b></div>; }
function Placeholder({ file, description, ratio = '4/3', className = '' }) { return <figure className={'imagePlaceholder ' + className} style={{ '--ratio': ratio }} aria-label={'Placeholder: ' + description}><span className="imageIcon" aria-hidden="true">⌁</span><strong>IMAGEM DO PRODUTO</strong><small>{description}</small><code>{file} · proporção {ratio}</code></figure>; }
function ProductImage({ className = '', alt, ratio = '1/1', priority = false }) { return <figure className={'productArtwork ' + className} style={{ '--ratio': ratio }}><img src={productMockup} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'} /></figure>; }
function DeliverableCarousel() {
  const renderRow = (items, directionClass) => <div className="carouselRow"><div className={'deliverableTrack ' + directionClass}>
    {[0, 1, 2].map((loop) => <div className="deliverableLoopGroup" key={directionClass + '-' + loop}>
      {items.map((src, index) => <figure className="deliverablePreview" key={String(loop) + '-' + index}><img src={src} alt="" loading="lazy" decoding="async" /></figure>)}
    </div>)}
  </div></div>;
  return <div className="deliverableCarousel" role="group" aria-label="Prévia de páginas internas do material">
    <div className="deliverableViewport">{renderRow(pages.slice(0, 5), 'trackForward')}{renderRow(pages.slice(5), 'trackReverse')}</div>
  </div>;
}
function CTA({ children }) { return <a href="#planos" className="cta" onClick={(e) => { e.preventDefault(); document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{children}</a>; }
function PlanList({ items, basic = false }) { return <ul className="planList">{items.map((item) => { const [type, text] = basic ? item : ['yes', item]; return <li className={type === 'no' ? 'notIncluded' : ''} key={text}><span>{type === 'no' ? '×' : '✓'}</span>{text}</li>; })}</ul>; }
function BonusValueSection() {
  const scrollToPlans = (event) => { event.preventDefault(); document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return <section className="bonusValueSection reveal" aria-label="Valor total dos bônus"><article className="bonusValueCard">
    <span className="bonusValueTag">PRESENTES INCLUÍDOS</span>
    <h2>Somando tudo o que você vai levar:</h2>
    <div className="bonusValueList">{bonusValueItems.map((item) => <div className="bonusValueRow" key={item.name}><span>{item.name}</span><strong>{item.value}</strong></div>)}</div>
    <div className="bonusValueTotal"><span>VALOR TOTAL DOS BÔNUS</span><strong><s>{bonusPricing.total}</s></strong></div>
    <p>Mas hoje, tudo sairá por:</p>
    <b>R$ 0 <small>(GRÁTIS)</small></b>
    <a href="#planos" className="bonusValueButton" onClick={scrollToPlans}>VER O PLANO COMPLETO</a>
  </article></section>;
}
function UpgradeModal({ close }) {
  const modalRef = useRef(null);
  useEffect(() => { const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; const handler = (event) => { if (event.key === 'Escape') close(); if (event.key === 'Tab') { const f = modalRef.current?.querySelectorAll('button,a'); if (!f?.length) return; const first = f[0], last = f[f.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } }; document.addEventListener('keydown', handler); modalRef.current?.querySelector('button')?.focus(); return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', handler); }; }, [close]);
  return <div className="upgradeOverlay" onMouseDown={close}><section className="upgradeModal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="upgrade-title" onMouseDown={(e) => e.stopPropagation()}><button className="upgradeClose" type="button" onClick={close} aria-label="Fechar oferta">×</button><p className="upgradeEyebrow">ANTES DE CONTINUAR...</p><h2 id="upgrade-title">Leve o Plano Completo por apenas R$ {OFFER.upgradePrice}</h2><p>Uma condição especial disponível somente neste passo.</p><div className="upgradePricing"><s>R$ {OFFER.completePrice}</s><strong>R$ {OFFER.upgradePrice}</strong><span>Você economiza R$ 7,00</span></div><h3>Por apenas R$ 7,90 a mais que o Plano Básico</h3><ProductImage ratio="16/9" alt="Mockup do produto principal e dos materiais do Plano Completo" /><p className="upgradeValueCopy">Antes de seguir apenas com as +200 aulas, você pode liberar o Plano Completo por uma condição especial.</p><p className="upgradeValueCopy">Por apenas R$ 7,90 a mais, você também recebe as ferramentas que ajudam a encontrar atividades quando um aluno trava, acompanhar evolução e até abrir aulas completas prontas.</p><ul>{completeItems.slice(0, 6).map((item) => <li key={item}>✓ {item}</li>)}</ul><div className="comparison"><div><span>VOCÊ JÁ IA PAGAR</span><b>R$ {OFFER.basicPrice}</b></div><div><span>POR APENAS</span><b>+ R$ 7,90</b></div><div><span>VOCÊ LEVA O PLANO COMPLETO</span><b>R$ {OFFER.upgradePrice}</b></div></div><a className="upgradeButton" href={UPGRADE_CHECKOUT_URL}>SIM, QUERO O PLANO COMPLETO POR R$ {OFFER.upgradePrice}</a><a className="upgradeDecline" href={BASIC_CHECKOUT_URL}>Não, quero continuar apenas com o Plano Básico por R$ {OFFER.basicPrice}</a></section></div>;
}
export default function App() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  useEffect(() => { const elements = document.querySelectorAll('.reveal'); const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('isVisible'); observer.unobserve(entry.target); } }), { threshold: .1 }); elements.forEach((el) => observer.observe(el)); return () => observer.disconnect(); }, []);
  return <><CountdownBar /><main>
    <section className="hero reveal"><div className="heroCopy"><h1><span><em>+200 Aulas</em> de Natação Infantil</span><span>Prontas Para Você Abrir e Aplicar</span></h1><p className="lead">Pare de perder tempo planejando aulas do zero e tenha atividades organizadas por nível para consultar sempre que precisar.</p><p className="support">Da adaptação aos primeiros nados — tudo ilustrado, organizado e fácil de consultar.</p></div><div className="heroMedia"><ProductImage alt="Mockup do +200 Aulas de Natação Infantil" priority /><CTA>QUERO ACESSAR AS +200 AULAS</CTA><p className="microcopy">Acesso digital imediato • Pagamento único</p></div></section>
    <section className="section reveal"><h2>Feito para quem vive a piscina todos os dias</h2><div className="audienceGrid">{audienceCards.map(([title, text]) => <article className="audienceCard" key={title}><span>✓</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <section className="section demoSection reveal"><p className="eyebrow">VEJA COMO O MATERIAL FUNCIONA</p><h2>Visual, organizado e pronto para consultar</h2><p className="sectionLead">Cada atividade mostra de forma rápida o que trabalhar, como aplicar, materiais necessários, nível e progressões.</p><DeliverableCarousel /><div className="pillRow"><span>Fácil de entender</span><span>Rápido de consultar</span><span>Pronto para aplicar</span><span>Organizado por nível</span></div></section>
    <section className="section bonusSection reveal"><p className="eyebrow">NO PLANO COMPLETO VOCÊ RECEBE MAIS</p><h2>Não são bônus aleatórios. São ferramentas para o seu dia a dia.</h2><div className="bonusGrid">{bonuses.map(([title, text, src], index) => <article className={'bonusCard ' + (index === 1 ? 'bonusFeatured' : '')} key={title}><figure className="bonusArtwork"><img src={src} alt={'Capa do bônus: ' + title} loading="lazy" decoding="async" /></figure><h3>{title}</h3><p>{text}</p><div className="bonusPrice"><span>INCLUÍDO NO PLANO COMPLETO</span><strong>GRÁTIS</strong></div></article>)}</div></section>
    <BonusValueSection />
    <section className="priceSection" id="planos"><div className="priceIntro reveal"><p className="eyebrow">ACESSO DIGITAL IMEDIATO</p><h2>Escolha como você quer começar</h2><p>Tenha apenas as +200 aulas ou desbloqueie o kit completo de consulta para o professor.</p></div><article className="basicCard reveal"><p className="planEyebrow">PAGAMENTO ÚNICO</p><h3>Plano Básico</h3><p>Para quem quer apenas as +200 aulas prontas.</p><div className="basicPrice">R$ {OFFER.basicPrice}</div><PlanList items={basicItems} basic /><button className="planButton basicButton" type="button" onClick={() => setShowUpgrade(true)}>QUERO O PLANO BÁSICO</button></article><article className="completeCard reveal"><span className="featuredBadge">MAIS ESCOLHIDO</span><p className="planEyebrow">PAGAMENTO ÚNICO</p><h3>Plano Completo</h3><p>Para quem quer as aulas + todas as ferramentas de consulta e acompanhamento.</p><ProductImage className="productImage" ratio="16/9" alt="Mockup do Plano Completo com todos os materiais" /><div className="completePrice">R$ {OFFER.completePrice}</div><PlanList items={completeItems} /><a className="planButton completeButton" href={COMPLETE_CHECKOUT_URL}>QUERO O PLANO COMPLETO</a><p className="microcopy">Pagamento único • Acesso digital imediato</p></article></section>
    <section className="section guarantee reveal"><div className="guaranteeSeal"><strong>7</strong><span>DIAS</span></div><div><h2>Você tem 7 dias para conhecer o material</h2><p>Acesse, confira a organização e veja se o conteúdo faz sentido para o seu dia a dia. Caso não seja o que esperava, você poderá solicitar o reembolso dentro do prazo da garantia.</p></div></section>
    <section className="section faqSection reveal"><p className="eyebrow">DÚVIDAS FREQUENTES</p><h2>Perguntas frequentes</h2><div className="faqGrid">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="finalCta reveal"><p className="eyebrow">SUA PRÓXIMA AULA NÃO PRECISA COMEÇAR DO ZERO</p><h2>Tenha mais de 200 opções prontas sempre que abrir o celular</h2><p>Escolha o nível, encontre a atividade e adapte para sua turma.</p><CTA>QUERO ACESSAR AS AULAS</CTA></section><footer>As atividades devem ser adaptadas e aplicadas por profissional responsável, considerando nível aquático, idade, profundidade, supervisão e protocolos de segurança do local.<nav><a href="#">Termos de Uso</a><a href="#">Política de Privacidade</a><a href="#">Contato</a></nav></footer>
  </main>{showUpgrade && <UpgradeModal close={() => setShowUpgrade(false)} />}</>;
}
