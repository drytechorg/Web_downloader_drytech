import { useState, useLayoutEffect, useEffect } from 'react'
import { initMotion, scrollToElement } from './motion.js'
import { images } from './images.js'
import logo from './assets/logo.png'
/* Imagens: coloque os arquivos em src/assets e troque os <Img/> abaixo (ver README) */
const Img = ({ label, className = '', style }) => {
  const [bad, setBad] = useState(false)
  return images[label] && !bad
  ? <img src={images[label]} alt={label} className={`pic ${className}`} style={style} onError={() => setBad(true)} />
  : <div className={`img ${className}`} style={style} role="img" aria-label={label}><span>{label}</span></div>
}

const Logo = ({ big }) => (
  <img src={logo} alt="Drytech Group" className={`logo-img ${big ? 'big' : ''}`} />
)
const Store = () => (
  <a className="store" href="#download"><span className="ico"><svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><g fill="#3ddc84"><path d="M8.1 10.3a8.1 8.1 0 0 1 15.8 0H8.1Z"/><rect x="6.5" y="11.4" width="19" height="10.2" rx="2.2"/><rect x="3.5" y="12" width="2.7" height="9" rx="1.35"/><rect x="25.8" y="12" width="2.7" height="9" rx="1.35"/><rect x="10" y="20" width="4" height="8" rx="2"/><rect x="18" y="20" width="4" height="8" rx="2"/></g><g stroke="#3ddc84" stroke-linecap="round" stroke-width="1.8"><path d="m10 3.8 2.3 3.5M22 3.8l-2.3 3.5"/></g><g fill="#fff"><circle cx="12" cy="9" r=".8"/><circle cx="20" cy="9" r=".8"/></g></svg></span><span><small>Download para</small><b>Android</b></span><i>&#8599;</i></a>
)
const Eyebrow = ({ children, dot }) => <p className="eyebrow">{dot && <span className="dot" />}{children}</p>

const Phone = ({ children, className = '' }) => (
  <div className={`phone ${className}`}><div className="notch" /><div className="screen">{children}</div></div>
)
const Row = ({ n, t, d, r, c }) => (
  <div className="hrow"><Img label={n} className="thumb" /><div><b>{n}</b><small>{t}</small></div><span className={c}>{r}</span></div>
)
const History = ({ big }) => (
  <div className={`hist ${big ? 'big' : ''}`}>
    <div className="hhead"><b>Histórico De Secagens</b><span>Mais</span></div>
    <Row n="Maçãs" t="Hoje" r="75° 150 Minutos" />
    <Row n="Alecrim" t="Ontem" r="Cancelado" c="cancel" />
    <Row n="Cenouras" t="Jun 30, 2026" r="75° 150 Minutos" />
    <Row n="Chá" t="Jun 16, 2026" r="75° 150 Minutos" />
  </div>
)
const StatusCard = () => (
  <div className="status"><div className="stop"><span>Tempo Real ⌃</span><i>•••</i></div><h4>Desligada</h4>
    <div className="mm"><span>↓ Mínima<b>0°</b></span><span>↑ Máxima<b>0°</b></span></div></div>
)
const HomePhone = () => (
  <Phone className="home-phone">
    <div className="phone-statusbar"><span>9:41</span><span>● ◔ ▰</span></div>
    <div className="hello">Boa tarde,<br /><b>Tha&#237;s!</b></div><StatusCard /><History />
    <div className="saved-head"><b>Alimentos Salvos</b><span>Mais</span></div>
    <div className="phone-tabs" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10h-6v-6H9v6H3z" /></svg>
      <svg viewBox="0 0 24 24"><path d="M4 20V11h4v9M10 20V5h4v15M16 20V8h4v12" /></svg>
      <span className="tab-add">+</span>
      <svg viewBox="0 0 24 24"><path d="M4 7h16v13H4zM8 4h8" /></svg>
      <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0" /></svg>
    </div>
  </Phone>
)
const Check = ({ t, d }) => (<li><span className="chk">✓</span><div><b>{t}</b><p>{d}</p></div></li>)

const ScrollCue = () => {
  const [atEnd, setAtEnd] = useState(false)
  const getSections = () => Array.from(document.querySelectorAll('.hero,.s2,.s3,.s4,.s5,.s6,.s7,.s8,.cta,footer'))

  useEffect(() => {
    const update = () => {
      const sections = getSections()
      const marker = window.innerHeight * 0.55
      const current = sections.findIndex(section => section.getBoundingClientRect().bottom > marker)
      setAtEnd(current === sections.length - 1)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const move = () => {
    const sections = getSections()
    const marker = window.innerHeight * 0.55
    const current = sections.findIndex(section => section.getBoundingClientRect().bottom > marker)
    const target = atEnd ? sections[0] : sections[Math.min(current + 1, sections.length - 1)]
    scrollToElement(target)
  }

  return <button className={`scroll-cue ${atEnd ? 'is-last' : ''}`} onClick={move} aria-label={atEnd ? 'Voltar ao início' : 'Ir para a próxima seção'} title={atEnd ? 'Voltar ao início' : 'Próxima seção'}>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
  </button>
}

const faqs = [
  ['O que posso acompanhar pelo aplicativo?', 'O painel Tempo Real apresenta o estado do equipamento e as temperaturas mínima e máxima. A página inicial também reúne o histórico e os alimentos salvos.'],
  ['Como configuro uma nova secagem?', 'Na tela Adicionar Secagem, selecione o alimento e preencha os campos de temperatura e tempo. Você também recebe a opção de adicionar colaboradores.'],
  ['Onde encontro meus preparos anteriores?', 'Na área Histórico de Secagens, na página inicial. Os registros mostram o alimento, a data e as informações de cada processo.'],
  ['Como faço o download do Drytech?', 'O aplicativo está disponível para Android. Consulte nesta página as informações de acesso à loja.'],
]

export default function App() {
  const [open, setOpen] = useState(0)
  useLayoutEffect(() => initMotion(), [])
  return (<>
    <div className="progress" /><div className="curtain" role="status" aria-label="Carregando Drytech"><img src={logo} alt="Drytech Group" /><span>TECNOLOGIA QUE PRESERVA O SABOR</span></div>
    <header className="nav"><Logo />
      <nav><a href="#app">O aplicativo</a><a href="#como">Como funciona</a><a href="#alimentos">Alimentos</a><a href="#duvidas">Dúvidas</a></nav>
      <a className="btn" href="#download">Baixar o app <i>↗</i></a></header>

    <section className="hero" id="top"><div className="hero-bg"><div className="grid" /><div className="orb o1" /><div className="orb o2" />{Array.from({ length: 16 }, (_, i) => <i key={i} className="nd" />)}</div>
      <div className="hero-l">
        <Eyebrow dot>TECNOLOGIA QUE PRESERVA O SABOR</Eyebrow>
        <h1><span className="ln"><span>Mais sabor.</span></span><span className="ln"><span>Mais cuidado.</span></span><span className="ln"><span><em>Na sua mão.</em></span></span></h1>
        <p className="lead">Acompanhe suas secagens, ajuste temperatura e tempo e tenha seus alimentos favoritos sempre por perto. Conheça o app Drytech.</p>
        <div className="stores"><Store /></div>
        <p className="scroll">↓ Um novo jeito de acompanhar cada preparo</p>
      </div>
      <div className="hero-r"><div className="circle" />
        <Img label="maçãs secas" className="apples" />
        <div className="chip"><span className="ic">🌡</span><div><b>Seu preparo,</b><small>mais próximo.</small></div></div>
        <HomePhone />
        <p className="cap">Tela do aplicativo Drytech</p></div>
    </section>

    <section className="s2" id="app"><div className="wrap">
      <div className="split"><div><Eyebrow>SEU DIA A DIA, MAIS SIMPLES</Eyebrow><h2>Do primeiro ajuste<br />ao próximo preparo.</h2></div>
        <p className="side">Menos informações espalhadas. Mais clareza para cuidar de cada etapa da desidratação.</p></div>
      <div className="three">
        {[['∿','Acompanhe','Visualize o estado da secagem e as temperaturas mínima e máxima.'],['⚟','Configure','Escolha o alimento e defina temperatura e tempo no mesmo lugar.'],['🔖','Organize','Consulte o histórico de secagens e encontre seus alimentos salvos.']].map(([i,t,d]) =>
          <div key={t}><span className="o-ic">{i}</span><h5>{t}</h5><p>{d}</p></div>)}
      </div></div></section>

    <section className="s3" id="como"><div className="wrap two">
      <div className="peach-card"><div className="pc-top"><span>UM OLHAR PARA O PROCESSO</span><span className="o-ic">∿</span></div>
        <div className="orange-box"><StatusCard /></div>
        <p className="note"><span className="dot" />Na tela: equipamento desligado, com mínima e máxima em 0°.</p></div>
      <div><Eyebrow>01 / ACOMPANHE SUAS SECAGENS</Eyebrow><h2>O que acontece<br />na secagem,<br />à vista.</h2>
        <p className="lead">Um painel direto ao ponto para consultar o estado do equipamento e acompanhar as informações do preparo.</p>
        <ul className="checks"><Check t="Estado em destaque" d="Identifique o status do equipamento no painel Tempo Real." /><Check t="Temperaturas no mesmo painel" d="Consulte os valores de mínima e máxima sem perder o contexto." /></ul></div>
    </div></section>

    <section className="s4"><div className="wrap two rev">
      <div><Eyebrow>02 / CONFIGURE CADA PREPARO</Eyebrow><h2>Cada alimento<br />tem seu tempo.</h2>
        <p className="lead">Dê forma à próxima secagem em uma única tela. Do alimento aos ajustes, tudo segue uma sequência simples.</p>
        <ol className="steps">{[['Escolha o alimento','Comece pelo que você vai preparar. Na tela, o alimento selecionado é Maçã.'],['Defina temperatura e tempo','Organize os parâmetros do preparo nos campos dedicados à secagem.'],['Convide colaboradores','O campo de colaboradores reúne quem participa desse processo com você.']].map(([t,d],i)=>
          <li key={t}><span>0{i+1}</span><div><b>{t}</b><p>{d}</p></div></li>)}</ol></div>
      <div className="hero-r s4r"><div className="circle" />
        <Phone className="p2"><div className="ptitle">Adicionar Secagem</div><div className="form"><small>Comida</small><div className="inp">Maçã</div><small>Temperatura</small><div className="inp or">80° <i>Celsius</i></div><small>Tempo</small><div className="inp">150</div><small>Convidar Colaboradores</small><div className="inp">+ Adicionar</div></div>
          <div className="keys">{[1,2,3,4,5,6,7,8,9,'+ * #',0,'⌫'].map((k,i)=><span key={i}>{k}</span>)}</div></Phone>
        <div className="chip c2"><span className="ic o">●</span><b>Prepare junto.</b></div>
        <p className="cap">Valores exibidos na tela original. Não são recomendações de preparo.</p></div>
    </div></section>

    <section className="s5" id="alimentos"><div className="wrap">
      <div className="split"><div><Eyebrow>03 / GUARDE O QUE FAZ PARTE DA ROTINA</Eyebrow><h2>Seu próximo preparo<br />começa com uma boa<br />memória.</h2></div>
        <p className="side">Revisite secagens anteriores e mantenha os alimentos salvos em um espaço fácil de consultar.</p></div>
      <div className="duo">
        <div className="card grey"><h3><span className="o-ic">◷</span> Cada secagem, um registro.</h3><p>Alimento, data e resultado do processo: retome o contexto sem começar do zero.</p><History big /></div>
        <div className="card peach"><h3><span className="o-ic">🔖</span> Os favoritos ficam por perto.</h3><p>Encontre os alimentos que você salvou, reunidos na página inicial do aplicativo.</p>
          <div className="saved"><div className="hhead"><b>Alimentos Salvos</b><span>Mais</span></div><div className="food">{[1,2,3,4,5,6,7,8].map(i=><Img key={i} label={`alimento-${i}`} className="fd" />)}</div></div>
          <h3 className="big o">Frutas, ervas<br />e novas possibilidades.</h3><p className="sm">Maçã, alecrim, cenouras e chá aparecem na biblioteca de referência do Drytech.</p></div>
      </div></div></section>

    <section className="s6"><div className="wrap two">
      <div className="eq"><div className="ring" /><Img label="equipamento Drytech" className="equip" /></div>
      <div><Eyebrow>DO EQUIPAMENTO À SUA ROTINA</Eyebrow><h2>Mais sabor,<br />saúde e<br />praticidade!</h2>
        <p className="lead">É a ideia que apresenta o Drytech desde a primeira tela. O aplicativo reúne o acompanhamento e a organização dos preparos para aproximar você de cada secagem.</p>
        <p className="tech"><span className="o-ic">☀</span><span>Tecnologia no processo.<br />Alimento no centro de tudo.</span></p></div>
    </div></section>

        <section className="s7"><div className="wrap two">
      <div><Eyebrow>UM ESPA&Ccedil;O QUE &Eacute; SEU</Eyebrow><h2>Seu perfil.<br />Sua forma de preparar.</h2>
        <p className="lead">Al&eacute;m das secagens, o Drytech re&uacute;ne sua conta e os acessos a notifica&ccedil;&otilde;es, seguran&ccedil;a e privacidade.</p>
        <div className="tags">{[['01','Sua conta'],['02','Notifica\u00e7\u00f5es'],['03','Colaboradores']].map(([n,t])=><span key={n}><i>{n}</i>{t}</span>)}</div></div>
      <div className="profile-card"><span className="profile-index">DRYTECH / PERFIL</span><div className="profile-monogram">T<span>.</span></div><div className="profile-name">Tha&iacute;s Soares</div><div className="profile-handle">@thaissoa</div><div className="profile-rule" />{[['01','Convide amigos'],['02','Sua conta'],['03','Notifica\u00e7\u00f5es']].map(([n,t])=><div className="profile-link" key={n}><span>{n}</span><b>{t}</b><i>&#8599;</i></div>)}</div>
    </div></section>

    <section className="s8" id="duvidas"><div className="wrap two faq">
      <div><h2>Vamos tirar<br />as dúvidas?</h2><p className="lead">O essencial para conhecer o aplicativo e entender o próximo passo.</p></div>
      <div>{faqs.map(([q,a],i)=>(<div className="q" key={q}><button onClick={()=>setOpen(open===i?-1:i)}>{q}<i className={open===i?'up':''}>⌃</i></button><div className={`ans ${open===i?'on':''}`}><div><p>{a}</p></div></div></div>))}</div>
    </div></section>

    <section className="cta" id="download"><div className="wrap two">
      <div><p className="eyebrow w">LEVE O DRYTECH COM VOCÊ</p><h2>Seu próximo preparo<br />começa aqui.</h2>
        <p className="lead w">Mais clareza para acompanhar. Mais praticidade para configurar. Seus alimentos e secagens, no mesmo app.</p>
        <div className="stores"><Store /></div>
        <p className="tiny w">Disponibilidade e link oficial da loja para Android a confirmar.</p></div>
            <div className="cta-art"><p>TECNOLOGIA<br />QUE PRESERVA<br />O SABOR</p></div>
    </div></section>

    <footer className="site-footer"><div className="wrap">
      <div className="footer-main">
        <div className="footer-brand"><a className="footer-logo" href="#top" aria-label="Drytech Group, voltar ao in&iacute;cio"><img src={logo} alt="Drytech Group" /></a><p>Mais sabor, sa&uacute;de e praticidade.<br />Tecnologia que preserva o sabor.</p></div>
        <div className="footer-col"><span className="footer-label">NAVEGUE</span><nav><a href="#app">O aplicativo</a><a href="#como">Como funciona</a><a href="#alimentos">Alimentos</a><a href="#duvidas">D&uacute;vidas</a></nav></div>
        <div className="footer-col footer-availability"><span className="footer-label">APLICATIVO</span><p>Dispon&iacute;vel para Android</p><a href="#download">Ver informa&ccedil;&otilde;es de acesso <i>&#8599;</i></a></div>
      </div>
      <div className="footer-bottom"><span>&copy; 2026 Drytech Group. Todos os direitos reservados.</span><a href="#top">Voltar ao in&iacute;cio <i>&uarr;</i></a></div>
    </div></footer>
    <ScrollCue />
  </>)
}
