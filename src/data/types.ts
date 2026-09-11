export type GroupCode = 'PA' | 'PW' | 'LA' | 'LW'
export type Trait = 'C' | 'I'

export type TypeProfile = {
  code: string
  title: string
  tagline: string
  summary: string
  strengths: string[]
  cautions: string[]
}

const profiles: Record<string, Omit<TypeProfile, 'code'>> = {
  'PABR-C': { title: '情熱の先導者', tagline: '熱が、議論を前へ進める。', summary: '直感と行動力で場を動かし、仲間の意見も巻き込みながら勝ち筋を作るタイプ。', strengths: ['議論を動かす力', '周囲を巻き込む力', '勝負所の判断'], cautions: ['勢いで結論を急ぎやすい', '強い言い切りが圧に見えることも'] },
  'PABR-I': { title: '天性の勝負師', tagline: '勝負は、俺が決める。', summary: '感覚で機会を見つけ、迷いなく仕掛ける独立型。大胆な一手で流れを変える。', strengths: ['決断力', '奇策への強さ', '瞬間的な勝負勘'], cautions: ['独断になりやすい', '外した時の反動が大きい'] },
  'PABS-C': { title: '信頼の守護者', tagline: '守るべきものがある。', summary: '人を信じ、安定した進行を選びながら仲間を支えるタイプ。', strengths: ['安定感', '仲間の保護', '信頼形成'], cautions: ['疑うタイミングが遅れやすい', '安全策に寄りすぎることも'] },
  'PABS-I': { title: '不屈の信念者', tagline: '信じた道を、貫く。', summary: '自分の感覚と信念を軸に、ブレずに進むタイプ。', strengths: ['芯の強さ', 'プレッシャー耐性', '一貫した判断'], cautions: ['読みを修正しづらい', '他人の情報を取りこぼすことも'] },
  'PADR-C': { title: '灼熱の追跡者', tagline: '違和感を、逃がさない。', summary: '反応の違和感を見逃さず、仲間と情報をつないで狼を追い詰める。', strengths: ['違和感察知', '追及力', '情報連携'], cautions: ['疑いが強く出やすい', '感覚情報を過信しやすい'] },
  'PADR-I': { title: '本能の狩人', tagline: '違和感は、狼が残した足跡だ。', summary: '空気のズレを鋭く捉え、自分の感覚で獲物を追うタイプ。', strengths: ['直感的な狼発見', '勝負勘', '単独でも崩れない'], cautions: ['説明が後付けになりやすい', 'ロックしすぎに注意'] },
  'PADS-C': { title: '村の警戒者', tagline: '守りながら、見逃さない。', summary: '慎重に周囲を見ながら、危険な兆候を共有して村を守る。', strengths: ['危機察知', '慎重な進行', '周囲への配慮'], cautions: ['攻めるタイミングを逃しやすい', '疑いを抱え込みやすい'] },
  'PADS-I': { title: '執念の追跡者', tagline: '一度見つけた違和感を、最後まで追う。', summary: '慎重さと執念深い観察で、一つの違和感を掘り切るタイプ。', strengths: ['粘り強い精査', 'ブレにくさ', '終盤の集中力'], cautions: ['視野が狭くなりやすい', '他の可能性を切り捨てすぎることも'] },

  'PWBR-C': { title: '心眼の導き手', tagline: '人の心をつなぎ、答えへ導く。', summary: '空気や感情を読みながら、皆の意見をまとめて答えを探す。', strengths: ['共感力', '場の理解', '意見調整'], cautions: ['人を信じすぎることがある', '強い主張が遅れやすい'] },
  'PWBR-I': { title: '静かなる勝負師', tagline: '見えている。だから、動く。', summary: '観察を重ね、勝負所だけで大胆に動く静かな実力派。', strengths: ['観察力', 'タイミング感覚', '意外性'], cautions: ['情報共有が少なくなりやすい', '急な決断に見えやすい'] },
  'PWBS-C': { title: '村の調律者', tagline: '人を信じることも、立派な推理だ。', summary: '人の関係性と空気を読み、村全体のバランスを整えるタイプ。', strengths: ['共感力', '白要素発見', '場の安定化'], cautions: ['強い黒要素への反応が遅れることも', '対立を避けすぎないこと'] },
  'PWBS-I': { title: '静寂の守護者', tagline: '騒がず、守るべきものを見極める。', summary: '静かに人を見て、信頼できる相手を自分の中で守るタイプ。', strengths: ['観察力', '慎重さ', '信頼の見極め'], cautions: ['発言量が少なく見えやすい', '評価変更が遅れやすい'] },
  'PWDR-C': { title: '影の監視者', tagline: '見えている。すべてを。', summary: '表情や反応を拾い、周囲と共有しながら疑いを絞る。', strengths: ['反応観察', '情報共有', '不自然さの発見'], cautions: ['細かい違和感に引っ張られやすい', '盤面情報との両立が必要'] },
  'PWDR-I': { title: '心眼の狩人', tagline: '言葉より、目を見る。', summary: '相手の反応を静かに読み、自分の感覚で核心を突く。', strengths: ['人物精査', '潜伏看破', '静かな集中力'], cautions: ['根拠を言語化しにくい', '対話不足になりやすい'] },
  'PWDS-C': { title: '慎重なる番人', tagline: '急がず、確かに。', summary: '人の動きを丁寧に見て、危険を早めに共有するタイプ。', strengths: ['慎重さ', '危機管理', '安定した観察'], cautions: ['決断が遅れやすい', '勝負所で一歩引きすぎることも'] },
  'PWDS-I': { title: '静寂の観測者', tagline: '夜は、多くを語る。', summary: '余計に触らず、自然な反応から静かに真相へ近づく。', strengths: ['長期観察', '冷静さ', 'メタ変化の察知'], cautions: ['存在感が薄く見えやすい', '必要な時は言葉にすること'] },

  'LABR-C': { title: '勝利の司令塔', tagline: '勝つために、動かす。', summary: '論理で勝ち筋を描き、周囲を動かして実現する司令塔タイプ。', strengths: ['構造化', '主導力', '戦略共有'], cautions: ['支配的に見えやすい', '柔軟性を失わないこと'] },
  'LABR-I': { title: '戦略の勝負師', tagline: '最適解は、待っていても来ない。', summary: '論理で勝算を計算し、自分で一手を打つ独立型。', strengths: ['戦略性', '決断力', '勝負所の強さ'], cautions: ['単独判断に寄りやすい', '他人の感情情報を軽視しがち'] },
  'LABS-C': { title: '白銀の参謀', tagline: '勝つための道筋を、みんなで作る。', summary: '論理と安定感を武器に、仲間と安全な勝ち筋を積み上げる。', strengths: ['整理力', '安定進行', '説明力'], cautions: ['慎重すぎて攻めが遅れる', '奇策への対応で固くなりがち'] },
  'LABS-I': { title: '信念の理論家', tagline: '理論は、裏切らない。', summary: '自分の理論を丁寧に組み立て、崩れない判断を目指す。', strengths: ['論理構築', '一貫性', '精度の高い判断'], cautions: ['想定外への適応が遅れる', '理屈を優先しすぎることも'] },
  'LADR-C': { title: '戦場の司令塔', tagline: '証拠を束ね、答えを示す。', summary: '矛盾を拾い、皆の情報を統合して議論を前へ進める。', strengths: ['矛盾発見', '議論整理', '共有力'], cautions: ['詰めが強くなりやすい', '議論の速度を上げすぎないこと'] },
  'LADR-I': { title: '孤高の論破者', tagline: '多数決より、一本の矛盾を信じる。', summary: '一本の矛盾から真相まで掘り切る、独立型の論理派。', strengths: ['矛盾発見', '論破力', 'ブレない推理'], cautions: ['他人の感覚情報を切り捨てすぎない', '正しさと伝わりやすさは別物'] },
  'LADS-C': { title: '冷静なる指揮官', tagline: '感情ではなく、事実で。', summary: '事実と安全性を重視し、全体を落ち着かせながら進める。', strengths: ['冷静さ', '進行管理', '情報整理'], cautions: ['慎重さが消極的に見えることも', '大胆な変化を嫌いすぎない'] },
  'LADS-I': { title: '氷刃の追及者', tagline: '逃げ場はない。矛盾は残る。', summary: '余計な賭けをせず、論理の隙を一つずつ詰める。', strengths: ['精査力', '冷静さ', '詰めの強さ'], cautions: ['硬い印象を与えやすい', '感情の変化も情報になる'] },

  'LWBR-C': { title: '戦略の調律者', tagline: '最善の一手を、共に。', summary: '盤面を俯瞰しながら周囲の考えを組み合わせ、最善手を探す。', strengths: ['俯瞰力', '戦略設計', '協調推理'], cautions: ['情報を集めすぎて遅れることも', '自分の結論も明確にすること'] },
  'LWBR-I': { title: '沈黙の策士', tagline: '静かな者ほど、盤面を見ている。', summary: '必要な情報が揃うまで待ち、誰より深く盤面を読む。', strengths: ['盤面把握', '戦略性', '冷静な判断'], cautions: ['発言不足に見えやすい', '勝負所では早めに共有を'] },
  'LWBS-C': { title: '村の設計者', tagline: 'この村の未来を描く。', summary: '安全な進行を設計し、仲間と少しずつ勝率を積み上げる。', strengths: ['進行設計', '安定感', '全体最適'], cautions: ['柔軟性を失わない', '想定外にも余白を持つ'] },
  'LWBS-I': { title: '静謐の理論家', tagline: 'すべては、計算の中にある。', summary: '静かに情報を整理し、自分の中で最も確かな答えを作る。', strengths: ['分析力', '慎重さ', '理論構築'], cautions: ['共有不足になりやすい', '直感情報も完全には捨てない'] },
  'LWDR-C': { title: '影の参謀', tagline: '散らばる情報が、真実を導く。', summary: '複数の証拠と意見を整理し、影から議論を支える。', strengths: ['情報統合', '精査', '補佐力'], cautions: ['前に出るタイミングを逃しやすい', '細部に入り込みすぎないこと'] },
  'LWDR-I': { title: '深層の分析官', tagline: '見えない真実を、掘り出す。', summary: '大量の情報を一人で整理し、隠れた矛盾を深く掘る。', strengths: ['深い分析', '矛盾検出', '集中力'], cautions: ['考え込みすぎる', '共有が遅れると価値が落ちる'] },
  'LWDS-C': { title: '盤面の管理者', tagline: 'すべては、この盤面の上に。', summary: '情報を整然と管理し、仲間と安全な進行を維持する。', strengths: ['進行管理', '情報整理', '安定感'], cautions: ['型に寄りすぎない', '非常時は大胆さも必要'] },
  'LWDS-I': { title: '精密なる推理者', tagline: '細部が、真実を語る。', summary: '細部まで丁寧に検証し、最も確実な答えを選ぶ。', strengths: ['精密さ', '再検証力', 'ミスの少なさ'], cautions: ['判断が遅れやすい', '完璧を求めすぎないこと'] },
}

export const getTypeProfile = (code: string): TypeProfile => ({ code, ...profiles[code] })

export const groupMeta: Record<GroupCode, { name: string; label: string; color: string; description: string }> = {
  PA: { name: 'CRIMSON', label: 'Vanguard / 先導者', color: '#e64747', description: '本能で感じ、自ら議論を動かす。' },
  PW: { name: 'VIOLET', label: 'Observer / 観察者', color: '#9a67e8', description: '人を見抜き、空気の変化を読む。' },
  LA: { name: 'AZURE', label: 'Commander / 指揮者', color: '#4ea1ff', description: '論理を武器に、議論を組み立てる。' },
  LW: { name: 'EMERALD', label: 'Strategist / 策略家', color: '#3bc789', description: '盤面を読み、最適な一手を探す。' },
}
