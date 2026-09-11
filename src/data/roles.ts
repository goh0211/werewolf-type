export type RoleId = 'villager' | 'seer' | 'medium' | 'knight' | 'werewolf' | 'madman'

export type RoleDefinition = {
  id: RoleId
  name: string
  description: string
  bestRoleCopy: string
}

export const roles: RoleDefinition[] = [
  {
    id: 'villager',
    name: '村人',
    description: '発言・投票・盤面から情報を拾い、村全体の推理を前へ進める基本役職。',
    bestRoleCopy: '能力に頼らず、会話と推理だけで答えへ近づく力が最も活きる役職です。あなたの読み方そのものが村の武器になります。',
  },
  {
    id: 'seer',
    name: '占い師',
    description: '占い結果という強い情報を、誰に使い、どう伝えるかが勝負を左右する役職。',
    bestRoleCopy: '強い情報を持った状態で、盤面を動かす判断力が活きます。占い先の選定と結果の伝え方で試合を組み立てられるタイプです。',
  },
  {
    id: 'medium',
    name: '霊媒師',
    description: '処刑結果を軸に情報を整理し、村の進行を安定させる司令塔タイプの役職。',
    bestRoleCopy: '情報を整理しながら村全体を落ち着かせる力が活きます。派手な一手より、精度の高い進行で勝率を積み上げられます。',
  },
  {
    id: 'knight',
    name: '騎士',
    description: '襲撃を読み、守る相手を選ぶ。観察力と勝負勘の両方が問われる役職。',
    bestRoleCopy: '相手の狙いを読む観察力と、ここぞで勝負する判断が噛み合う役職です。護衛成功が試合の流れを一変させます。',
  },
  {
    id: 'werewolf',
    name: '人狼',
    description: '村に溶け込みながら議論と襲撃を操り、最後まで正体を隠す敵陣営の中心役。',
    bestRoleCopy: '議論の流れと勝負所を読む力が、人狼側で最大限に活きます。自分の得意な思考スタイルを偽装や誘導へ転換できるタイプです。',
  },
  {
    id: 'madman',
    name: '狂人',
    description: '村を混乱させ、人狼を支援する。大胆さと自由な発想が強みになる特殊役職。',
    bestRoleCopy: '正解を当てるより、盤面そのものを揺らす才能が活きます。大胆な仕掛けや信用操作で相手の想定を崩せるタイプです。',
  },
]

export const roleStyles: Record<RoleId, Record<string, { name: string; description: string }>> = {
  villager: {
    PB: { name: '共感洞察型', description: '人の反応と信頼関係から白を拾い、村の輪郭を作る。' },
    PD: { name: '違和感追跡型', description: '発言の温度差や反応のズレを追い、狼候補を絞る。' },
    LB: { name: '白圧殺型', description: '論理的に白を積み上げ、残った位置を追い詰める。' },
    LD: { name: '矛盾追及型', description: '発言・投票・盤面の矛盾を整理し、黒要素を積み上げる。' },
  },
  seer: {
    AB: { name: '白圧殺型', description: '積極的に情報を取りにいき、白結果から盤面を狭める。' },
    AD: { name: '黒狙撃型', description: '疑わしい位置へ攻めた占いを当て、早期決着を狙う。' },
    WB: { name: '盤面構築型', description: '周囲を観察しながら、安全に白情報を増やして盤面を作る。' },
    WD: { name: '精査型', description: '発言をじっくり比較し、最も怪しい位置を精密に占う。' },
  },
  medium: {
    PC: { name: '対話統率型', description: '空気を読みながら意見を束ね、村の合意を作る。' },
    PI: { name: '決断統率型', description: '直感と自分の判断を軸に、迷いなく進行を決める。' },
    LC: { name: '戦略統率型', description: '複数の意見と結果を整理し、合理的な進行へ導く。' },
    LI: { name: '盤面指揮型', description: '自分の盤面整理を基準に、最適な処刑順を提示する。' },
  },
  knight: {
    PR: { name: '直感GJ型', description: '襲撃の気配を直感で読み、大胆な護衛成功を狙う。' },
    PS: { name: '危機察知型', description: '危険な流れを感じ取り、重要人物を堅実に守る。' },
    LR: { name: '襲撃予測型', description: '盤面と狼の勝ち筋を計算して、一歩先の護衛を置く。' },
    LS: { name: '鉄壁護衛型', description: '確率と盤面価値を重視し、崩れにくい護衛を選ぶ。' },
  },
  werewolf: {
    PA: { name: '扇動型', description: '感情と勢いを使って議論を動かし、村の視線を誘導する。' },
    PW: { name: '擬態型', description: '周囲の空気に溶け込み、自然な村人として最後まで残る。' },
    LA: { name: '論理支配型', description: '整った論理で議論の基準を作り、村を自分の盤面へ引き込む。' },
    LW: { name: '沈黙策士型', description: '必要な場面だけ動き、盤面の隙を見て静かに勝ち筋を作る。' },
  },
  madman: {
    AR: { name: '破壊工作型', description: '大胆な騙りや仕掛けで盤面を一気に混乱させる。' },
    AS: { name: '信用操作型', description: '前に出ながら信用を調整し、人狼が動きやすい状況を作る。' },
    WR: { name: '奇策潜伏型', description: '静かに機会を待ち、意外なタイミングで盤面をひっくり返す。' },
    WS: { name: '潜伏撹乱型', description: '目立ちすぎずに情報を濁し、村の判断を少しずつ狂わせる。' },
  },
}
