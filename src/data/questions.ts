export type Axis = 'PL' | 'AW' | 'BD' | 'RS' | 'CI'

export type AnswerOption = {
  text: string
  score: number
}

export type Question = {
  id: number
  axis: Axis
  text: string
  options: AnswerOption[]
}

export const questions: Question[] = [
  { id: 1, axis: 'PL', text: '発言内容は筋が通っている。でも声や間の取り方に妙な違和感がある。どちらを重く見る？', options: [
    { text: '論理が通っているなら、まずは白寄りに見る', score: -2 },
    { text: '論理を重視しつつ、違和感は保留する', score: -1 },
    { text: '違和感の方をやや重く見る', score: 1 },
    { text: 'その違和感こそ重要な狼要素だと思う', score: 2 },
  ]},
  { id: 2, axis: 'AW', text: '議論が停滞している。あなたはどうする？', options: [
    { text: '怪しい人に強く質問して流れを作る', score: 2 },
    { text: '話題を一つ提示して議論を動かす', score: 1 },
    { text: '少し待って、誰が動き出すかを見る', score: -1 },
    { text: 'あえて黙って自然な反応を観察する', score: -2 },
  ]},
  { id: 3, axis: 'BD', text: '序盤、最初に探したいのはどっち？', options: [
    { text: '明確に怪しい人', score: -2 },
    { text: 'やや怪しい人を複数', score: -1 },
    { text: '信頼できそうな人', score: 1 },
    { text: '絶対に村だと思える人', score: 2 },
  ]},
  { id: 4, axis: 'RS', text: '成功率60%だが成功すれば大きく有利になる策と、成功率80%で小さく有利になる策。選ぶなら？', options: [
    { text: '迷わず60%の大勝負', score: 2 },
    { text: '状況次第で60%を選ぶ', score: 1 },
    { text: '基本は80%を選ぶ', score: -1 },
    { text: '迷わず80%の安定策', score: -2 },
  ]},
  { id: 5, axis: 'CI', text: '信頼している人が、自分と違う推理を出してきた。どうする？', options: [
    { text: '積極的に取り込み、推理を組み直す', score: 2 },
    { text: '参考にして、自分の推理と合わせる', score: 1 },
    { text: 'いったん保留して自分で検証する', score: -1 },
    { text: '自分の推理が崩れない限り維持する', score: -2 },
  ]},
  { id: 6, axis: 'PL', text: '最終日。盤面上はAが狼っぽいが、会話の感触ではBがかなり怪しい。どうする？', options: [
    { text: '盤面を優先してAに投票する', score: -2 },
    { text: '盤面を軸にしつつBも再確認する', score: -1 },
    { text: '感触を重視してBをかなり疑う', score: 1 },
    { text: '最後は自分の違和感を信じてBに行く', score: 2 },
  ]},
  { id: 7, axis: 'AW', text: '怪しい人を見つけた。最初の動きは？', options: [
    { text: 'すぐ理由を出して問い詰める', score: 2 },
    { text: '軽く質問して反応を見る', score: 1 },
    { text: '別の話題も振りながら様子を見る', score: -1 },
    { text: 'しばらく泳がせて自然な発言を待つ', score: -2 },
  ]},
  { id: 8, axis: 'BD', text: '推理が煮詰まった時、どちらから整理する？', options: [
    { text: '一番怪しい人の黒要素を詰める', score: -2 },
    { text: '怪しい順に並べ直す', score: -1 },
    { text: '白い人から外していく', score: 1 },
    { text: '確実に白い人を固定し、残りを絞る', score: 2 },
  ]},
  { id: 9, axis: 'RS', text: '騎士で、護衛成功すれば盤面が大きく動く読みがある。ただし外すと痛い。どうする？', options: [
    { text: '読みを信じてGJを狙う', score: 2 },
    { text: 'やや攻めた護衛を選ぶ', score: 1 },
    { text: '基本は重要役職を守る', score: -1 },
    { text: '絶対に崩したくない位置を守る', score: -2 },
  ]},
  { id: 10, axis: 'CI', text: '議論中に、自分が気づかなかった視点が出た。どう扱う？', options: [
    { text: 'すぐ全体推理に組み込む', score: 2 },
    { text: '有用なら積極的に使う', score: 1 },
    { text: 'まず自分で一から検証する', score: -1 },
    { text: '自分の筋道に合わなければ使わない', score: -2 },
  ]},
  { id: 11, axis: 'PL', text: 'いつも村の時にする癖を、その人が今回もしている。どう見る？', options: [
    { text: '今回の発言内容が最優先', score: -2 },
    { text: '参考にはするが、盤面の方を重く見る', score: -1 },
    { text: 'その人らしさはかなり参考にする', score: 1 },
    { text: '普段との一致・ズレを強く信頼する', score: 2 },
  ]},
  { id: 12, axis: 'AW', text: '自分に疑いが向いてきた。どう返す？', options: [
    { text: 'すぐ反論し、相手にも質問を返す', score: 2 },
    { text: '必要な説明をして議論を続ける', score: 1 },
    { text: '説明しつつ、誰が便乗するか見る', score: -1 },
    { text: '最小限だけ返して周囲の反応を見る', score: -2 },
  ]},
  { id: 13, axis: 'BD', text: '昨日かなり白く見ていた人に、今日少し怪しい発言が出た。どうする？', options: [
    { text: 'すぐ白置きを解除して疑う', score: -2 },
    { text: '一段階評価を下げる', score: -1 },
    { text: '昨日の白要素を残しつつ再評価する', score: 1 },
    { text: '強い白要素が崩れない限り白寄りを維持する', score: 2 },
  ]},
  { id: 14, axis: 'RS', text: '情報が十分でない序盤でも、今動けば主導権を取れそう。どうする？', options: [
    { text: '不確定でも動く', score: 2 },
    { text: '少し材料があれば動く', score: 1 },
    { text: 'もう少し情報を待つ', score: -1 },
    { text: '確度が上がるまで動かない', score: -2 },
  ]},
  { id: 15, axis: 'CI', text: '複数人がそれぞれ少しずつ有力な情報を出している。どうまとめる？', options: [
    { text: '全部をつないで一つの推理にする', score: 2 },
    { text: '有力なものを組み合わせる', score: 1 },
    { text: '自分で必要な情報だけ拾い直す', score: -1 },
    { text: '他人の結論より自分で全体像を作る', score: -2 },
  ]},
  { id: 16, axis: 'PL', text: 'Aの投票先は理屈では自然。でも投票直前だけ妙に焦って見えた。あなたの印象は？', options: [
    { text: '投票の整合性を重く見る', score: -2 },
    { text: '整合性優先だが焦りもメモする', score: -1 },
    { text: '焦りの方がやや気になる', score: 1 },
    { text: 'その瞬間の反応をかなり重要視する', score: 2 },
  ]},
  { id: 17, axis: 'AW', text: '発言が少ない人がいる。どう情報を取る？', options: [
    { text: '具体的な質問を連続で投げる', score: 2 },
    { text: '一つ質問して話しやすくする', score: 1 },
    { text: '他人との会話を見て判断する', score: -1 },
    { text: '無理に触らず自然に出る発言を待つ', score: -2 },
  ]},
  { id: 18, axis: 'BD', text: '最終的に狼を当てる時、自分にとって納得感が強いのは？', options: [
    { text: 'その人が狼だと証明できた時', score: -2 },
    { text: '黒要素が一番多い人を選べた時', score: -1 },
    { text: '他の人が村だと整理できた時', score: 1 },
    { text: '白を積み上げ、最後に狼だけ残った時', score: 2 },
  ]},
  { id: 19, axis: 'RS', text: '人狼側で、成功すれば強いが失敗すると一気に疑われる奇策を思いついた。', options: [
    { text: '面白い。積極的にやる', score: 2 },
    { text: '勝算があればやる', score: 1 },
    { text: '基本は普通の動きを選ぶ', score: -1 },
    { text: 'よほど必要でない限りやらない', score: -2 },
  ]},
  { id: 20, axis: 'CI', text: '一番気持ちいい勝ち方は？', options: [
    { text: 'みんなの推理がつながって狼を追い詰める', score: 2 },
    { text: '仲間と意見を合わせて正解に届く', score: 1 },
    { text: '自分の推理が最後に決め手になる', score: -1 },
    { text: '自分だけが早い段階から真相を見抜いていた', score: -2 },
  ]},
  { id: 21, axis: 'PL', text: '二人の主張が同じくらい筋が通っている。最後の決め手にするなら？', options: [
    { text: '過去発言・投票との整合性', score: -2 },
    { text: '盤面上の利得や行動理由', score: -1 },
    { text: '話し方や反応の自然さ', score: 1 },
    { text: '自分が会話して感じた違和感', score: 2 },
  ]},
  { id: 22, axis: 'AW', text: '「この人、何か隠してそう」と感じた時は？', options: [
    { text: '核心を突く質問をする', score: 2 },
    { text: '関連する質問を何個か出す', score: 1 },
    { text: '他人とのやり取りを観察する', score: -1 },
    { text: '気づいていないふりをして泳がせる', score: -2 },
  ]},
  { id: 23, axis: 'BD', text: 'グレーが4人いる。あなたの整理方法に近いのは？', options: [
    { text: '一番黒い人から順に並べる', score: -2 },
    { text: '黒要素の数で比較する', score: -1 },
    { text: '白い人から順に外していく', score: 1 },
    { text: 'まず最も信頼できる人を決める', score: 2 },
  ]},
  { id: 24, axis: 'RS', text: '投票直前、まだ決め手はない。でも時間がない。', options: [
    { text: '自分の読みで決断する', score: 2 },
    { text: '一番可能性が高い所へ行く', score: 1 },
    { text: '大事故が少ない選択をする', score: -1 },
    { text: '最も安全な進行を優先する', score: -2 },
  ]},
  { id: 25, axis: 'CI', text: '強いプレイヤーが自信満々に結論を出した。あなたは？', options: [
    { text: '根拠が良ければかなり乗る', score: 2 },
    { text: '参考にしつつ自分の意見と合わせる', score: 1 },
    { text: '結論は置いて自分で検証する', score: -1 },
    { text: '誰が言ったかに関係なく自分で答えを出す', score: -2 },
  ]},
]
