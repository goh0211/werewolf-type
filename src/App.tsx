import { useMemo, useState, type CSSProperties } from 'react'
import { questions, type Axis } from './data/questions'
import { getTypeProfile, groupMeta } from './data/types'
import { calculateResult, type RawScores } from './utils/scoring'
import { calculateRoleResults } from './utils/roleScoring'
import { RoleEmblem } from './components/RoleEmblem'

type Screen = 'home' | 'quiz' | 'analyzing' | 'result'

const emptyScores: RawScores = { PL: 0, AW: 0, BD: 0, RS: 0, CI: 0 }

const axisLabels = {
  PL: { left: 'Logic', right: 'Passion' },
  AW: { left: 'Watch', right: 'Attack' },
  BD: { left: 'Doubt', right: 'Believe' },
  RS: { left: 'Safe', right: 'Risk' },
  CI: { left: 'Independent', right: 'Cooperative' },
}

const shareText = (code: string, title: string, tagline: string, bestRoleName: string, bestRoleScore: number) =>
  `【WEREWOLF TYPE】\n${code} ${title}\n「${tagline}」\nBEST ROLE：${bestRoleName} ${bestRoleScore}%\n\n#WEREWOLFTYPE #人狼診断`

const roundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, radius)
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [index, setIndex] = useState(0)
  const [scores, setScores] = useState<RawScores>(emptyScores)
  const [answers, setAnswers] = useState<number[]>([])

  const result = useMemo(() => calculateResult(scores), [scores])
  const profile = useMemo(() => getTypeProfile(result.code), [result.code])
  const group = groupMeta[result.group]
  const roleResults = useMemo(() => calculateRoleResults(result), [result])
  const bestRole = roleResults[0]
  const [shareStatus, setShareStatus] = useState('')

  const createShareCard = async () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1350
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas is not supported')

    const bg = ctx.createLinearGradient(0, 0, 1080, 1350)
    bg.addColorStop(0, '#07080b')
    bg.addColorStop(1, '#111318')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, 1080, 1350)

    ctx.globalAlpha = .22
    ctx.fillStyle = group.color
    ctx.beginPath()
    ctx.arc(820, 230, 420, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1

    const image = new Image()
    image.src = `/characters/${profile.code}.png`
    await image.decode()
    const box = { x: 70, y: 230, w: 940, h: 650 }
    roundedRect(ctx, box.x, box.y, box.w, box.h, 30)
    ctx.save()
    ctx.clip()
    const scale = Math.max(box.w / image.naturalWidth, box.h / image.naturalHeight)
    const iw = image.naturalWidth * scale
    const ih = image.naturalHeight * scale
    ctx.drawImage(image, box.x + (box.w - iw) / 2, box.y + (box.h - ih) * .24, iw, ih)
    const fade = ctx.createLinearGradient(0, 650, 0, 880)
    fade.addColorStop(0, 'rgba(7,8,11,0)')
    fade.addColorStop(1, 'rgba(7,8,11,.95)')
    ctx.fillStyle = fade
    ctx.fillRect(box.x, box.y, box.w, box.h)
    ctx.restore()

    ctx.fillStyle = group.color
    ctx.font = '600 28px system-ui, sans-serif'
    ctx.letterSpacing = '7px'
    ctx.fillText('WEREWOLF TYPE', 70, 95)
    ctx.letterSpacing = '0px'
    ctx.fillStyle = '#b9b9bf'
    ctx.font = '500 22px system-ui, sans-serif'
    ctx.fillText('DISCOVER YOUR PLAYSTYLE.', 70, 135)

    ctx.fillStyle = '#ffffff'
    ctx.font = '800 86px system-ui, sans-serif'
    ctx.fillText(profile.code, 70, 955)
    ctx.font = '700 44px system-ui, sans-serif'
    ctx.fillText(profile.title, 70, 1015)
    ctx.fillStyle = '#d5d0ce'
    ctx.font = '500 28px system-ui, sans-serif'
    ctx.fillText(`「${profile.tagline}」`, 70, 1070)

    ctx.fillStyle = '#8e9097'
    ctx.font = '600 20px system-ui, sans-serif'
    ctx.fillText('BEST ROLE', 70, 1155)
    ctx.fillStyle = '#fff'
    ctx.font = '700 34px system-ui, sans-serif'
    ctx.fillText(`${bestRole.name}  ${bestRole.score}%  ${bestRole.grade}`, 70, 1200)

    ctx.strokeStyle = group.color
    ctx.globalAlpha = .65
    ctx.lineWidth = 3
    ctx.beginPath(); ctx.moveTo(70, 1260); ctx.lineTo(1010, 1260); ctx.stroke()
    ctx.globalAlpha = 1
    ctx.fillStyle = '#9b9da4'
    ctx.font = '500 19px system-ui, sans-serif'
    ctx.fillText('#WEREWOLFTYPE  #人狼診断', 70, 1305)

    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('画像を作成できませんでした')), 'image/png')
    )
  }

  const downloadShareCard = async () => {
    try {
      setShareStatus('画像を作成中…')
      const blob = await createShareCard()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `WEREWOLF-TYPE_${profile.code}.png`
      a.click()
      URL.revokeObjectURL(url)
      setShareStatus('結果画像を保存しました')
    } catch {
      setShareStatus('画像の作成に失敗しました')
    }
  }

  const shareResult = async () => {
    const text = shareText(profile.code, profile.title, profile.tagline, bestRole.name, bestRole.score)
    try {
      const blob = await createShareCard()
      const file = new File([blob], `WEREWOLF-TYPE_${profile.code}.png`, { type: 'image/png' })
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ title: `WEREWOLF TYPE — ${profile.code}`, text, files: [file] })
        setShareStatus('シェア画面を開きました')
        return
      }
      await navigator.clipboard.writeText(text)
      setShareStatus('結果テキストをコピーしました')
    } catch (error) {
      if ((error as DOMException)?.name !== 'AbortError') setShareStatus('シェアできませんでした')
    }
  }

  const shareToX = () => {
    const text = shareText(profile.code, profile.title, profile.tagline, bestRole.name, bestRole.score)
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener,noreferrer')
  }

  const start = () => {
    setIndex(0)
    setScores(emptyScores)
    setAnswers([])
    setScreen('quiz')
  }

  const answer = (axis: Axis, score: number) => {
    const nextScores = { ...scores, [axis]: scores[axis] + score }
    const nextAnswers = [...answers, score]
    setScores(nextScores)
    setAnswers(nextAnswers)

    if (index === questions.length - 1) {
      setScreen('analyzing')
      window.setTimeout(() => setScreen('result'), 1650)
    } else {
      setIndex((v) => v + 1)
    }
  }

  const back = () => {
    if (index === 0) {
      setScreen('home')
      return
    }
    const prevQuestion = questions[index - 1]
    const prevScore = answers[answers.length - 1]
    setScores({ ...scores, [prevQuestion.axis]: scores[prevQuestion.axis] - prevScore })
    setAnswers((v) => v.slice(0, -1))
    setIndex((v) => v - 1)
  }

  if (screen === 'home') {
    return (
      <main className="app home-screen">
        <div className="moon moon-home" />
        <header className="brand-block">
          <p className="eyebrow">DISCOVER YOUR PLAYSTYLE.</p>
          <h1>WEREWOLF <span>TYPE</span></h1>
          <p className="jp-title">あなたは、人狼でどう戦う？</p>
        </header>

        <section className="hero-card glass">
          <div className="wolf-mark">◈</div>
          <p className="hero-lead">25の質問から、あなたの人狼プレイスタイルを分析。</p>
          <p className="hero-copy">16の基本タイプ × 2つの隠れ特性。<br />あなたの思考・攻め方・疑い方・勝負勘を32タイプで表現します。</p>
          <button className="primary-button" onClick={start}>診断をはじめる</button>
        </section>

        <section className="groups-grid">
          {Object.entries(groupMeta).map(([code, meta]) => (
            <article className="group-mini" style={{ '--group': meta.color } as CSSProperties} key={code}>
              <strong>{meta.name}</strong>
              <span>{meta.label}</span>
              <small>{meta.description}</small>
            </article>
          ))}
        </section>

        <p className="footer-copy">WEREWOLF TYPE — 人狼プレイスタイル診断</p>
      </main>
    )
  }

  if (screen === 'quiz') {
    const q = questions[index]
    const progress = ((index + 1) / questions.length) * 100
    return (
      <main className="app quiz-screen">
        <header className="quiz-header">
          <button className="ghost-button" onClick={back}>←</button>
          <div className="mini-brand">WEREWOLF TYPE</div>
          <div className="question-count">{index + 1} / {questions.length}</div>
        </header>

        <div className="progress"><span style={{ width: `${progress}%` }} /></div>

        <section className="question-panel">
          <p className="question-kicker">QUESTION {String(index + 1).padStart(2, '0')}</p>
          <h2>{q.text}</h2>
          <div className="answers">
            {q.options.map((option, i) => (
              <button key={i} onClick={() => answer(q.axis, option.score)}>
                <span>{String.fromCharCode(65 + i)}</span>
                {option.text}
              </button>
            ))}
          </div>
        </section>
      </main>
    )
  }

  if (screen === 'analyzing') {
    return (
      <main className="app analyzing-screen">
        <div className="scanner-ring"><div /></div>
        <p className="eyebrow">ANALYZING PLAYSTYLE</p>
        <h2>あなたのプレイスタイルを分析中…</h2>
        <p>直感、論理、行動、観察。<br />25の選択からタイプを特定しています。</p>
      </main>
    )
  }

  return (
    <main className="app result-screen" style={{ '--group': group.color } as CSSProperties}>
      <div className="result-glow" />
      <header className="result-header">
        <p className="eyebrow">YOUR WEREWOLF TYPE</p>
        <p className="group-name">{group.name} <span>{group.label}</span></p>
        <h1>{profile.code}</h1>
        <h2>{profile.title}</h2>
        <blockquote>「{profile.tagline}」</blockquote>
      </header>

      <section className="result-character-card" aria-label={`${profile.code} character`}>
        <div className="result-character-image-wrap">
          <img
            className="result-character-image"
            src={`/characters/${profile.code}.png`}
            alt={`${profile.code} ${profile.title} character`}
          />
          <div className="result-character-overlay" />
          <div className="result-character-caption">
            <span>{group.name}</span>
            <strong>{profile.code}</strong>
            <small>{profile.title}</small>
          </div>
        </div>
      </section>

      <section className="result-card summary-card">
        <h3>PLAYSTYLE</h3>
        <p>{profile.summary}</p>
      </section>

      <section className="result-card axis-card">
        <h3>TYPE BALANCE</h3>
        {(Object.keys(result.axes) as Axis[]).map((axis) => {
          const item = result.axes[axis]
          const labels = axisLabels[axis]
          return (
            <div className="axis-row" key={axis}>
              <div className="axis-labels"><span>{labels.left}</span><strong>{item.letter}</strong><span>{labels.right}</span></div>
              <div className="axis-track"><i style={{ left: `${item.right}%` }} /></div>
              <div className="axis-values"><span>{item.left}%</span><span>{item.right}%</span></div>
            </div>
          )
        })}
      </section>

      <section className="two-column">
        <article className="result-card">
          <h3>STRENGTHS</h3>
          <ul>{profile.strengths.map((x) => <li key={x}>{x}</li>)}</ul>
        </article>
        <article className="result-card">
          <h3>WATCH OUT</h3>
          <ul>{profile.cautions.map((x) => <li key={x}>{x}</li>)}</ul>
        </article>
      </section>

      <section className="result-card hidden-card">
        <p className="eyebrow">HIDDEN TRAIT</p>
        <h3>{result.trait === 'C' ? 'Cooperative — 協調型' : 'Independent — 独立型'}</h3>
        <p>{result.trait === 'C' ? '他者の視点を取り込み、複数の推理をつないで答えを作る傾向があります。' : '自分の中で推理を完成させ、周囲に流されず答えを出す傾向があります。'}</p>
      </section>

      <section className="role-section">
        <div className="section-heading">
          <p className="eyebrow">ROLE COMPATIBILITY</p>
          <h3>役職適性</h3>
          <p>あなたの5軸の強さから、6役職とのプレイスタイル相性を算出します。</p>
        </div>

        <article className="best-role-card">
          <div className="best-role-top">
            <RoleEmblem role={bestRole.id} className="role-icon" title={bestRole.name} />
            <div>
              <p className="best-role-label">YOUR BEST ROLE — 天職</p>
              <h3>{bestRole.name}</h3>
              <p className="role-style-name">{bestRole.styleName}</p>
            </div>
            <div className="role-score-large">
              <strong>{bestRole.score}%</strong>
              <span>{bestRole.grade}</span>
            </div>
          </div>
          <p className="best-role-copy">{bestRole.bestRoleCopy}</p>
          <p className="style-copy">STYLE — {bestRole.styleDescription}</p>
        </article>

        <div className="role-list role-grid">
          {roleResults.map((role, i) => (
            <article className={`role-card ${i === 0 ? 'is-best' : ''}`} key={role.id}>
              <div className="role-rank">{String(i + 1).padStart(2, '0')}</div>
              <div className="role-main">
                <div className="role-title-line">
                  <RoleEmblem role={role.id} className="role-icon-small" title={role.name} />
                  <strong>{role.name}</strong>
                  <span className="role-style">{role.styleName}</span>
                </div>
                <div className="role-meter"><i style={{ width: `${role.score}%` }} /></div>
                <p>{role.styleDescription}</p>
              </div>
              <div className={`role-grade grade-${role.grade.toLowerCase()}`}>
                <strong>{role.score}%</strong>
                <span>{role.grade}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="role-note">※ 役職適性は勝率や実力を断定するものではなく、回答から見た「プレイスタイルとの相性」です。</p>
      </section>

      <section className="share-section result-card">
        <p className="eyebrow">SHARE YOUR TYPE</p>
        <h3>診断結果をシェア</h3>
        <p>キャラクター入りの縦長結果カードを、そのままSNSへ。</p>
        <div className="share-actions">
          <button className="primary-button" onClick={shareResult}>結果をシェア</button>
          <button className="secondary-button" onClick={downloadShareCard}>結果画像を保存</button>
          <button className="secondary-button x-share-button" onClick={shareToX}>Xに投稿</button>
        </div>
        {shareStatus && <p className="share-status" aria-live="polite">{shareStatus}</p>}
      </section>

      <div className="result-actions">
        <button className="primary-button" onClick={start}>もう一度診断する</button>
        <button className="secondary-button" onClick={() => setScreen('home')}>TOPへ戻る</button>
      </div>
    </main>
  )
}
