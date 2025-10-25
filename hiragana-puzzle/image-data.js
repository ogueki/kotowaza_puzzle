// 画像と対応するひらがなのマッピング
// ※新しい画像を追加する場合は、このリストに追加してください※
const imageSets = [
    {
        imagePath: 'images/butanisinnzyu.png',
        text: 'ぶたにしんじゅ',
        explanation: {
            meaning: '豚に真珠を与えても価値がわからない。価値のわからない人に貴重なものを与えても無駄だという意味のことわざです。',
            origin: '聖書のマタイによる福音書「豚に真珠を投げ与えるな」が由来とされています。',
            example: '「彼に高級ワインをプレゼントしても豚に真珠だよ」のように使います。'
        }
    },
    {
        imagePath: 'images/siranugahotoke.png',
        text: 'しらぬがほとけ',
        explanation: {
            meaning: '知らないでいる方が心安らかでいられる。真実を知ると苦しむことがあるという意味です。',
            origin: '仏教の教えから生まれたことわざで、無知の方が幸せな場合があることを表しています。',
            example: '「あの噂の真相は知らぬが仏だね」のように使います。'
        }
    },
    {
        imagePath: 'images/tanukineiri.png',
        text: 'たぬきねいり',
        explanation: {
            meaning: '狸が寝たふりをすること。ずる賢く人を騙すことや、知らないふりをすることを表します。',
            origin: '狸が危険を感じた時に死んだふりをする習性から生まれたことわざです。',
            example: '「彼は狸寝入りして会議をサボった」のように使います。'
        }
    },
    {
        imagePath: 'images/hanayoridanngo.png',
        text: 'はなよりだんご',
        explanation: {
            meaning: '美しいものを愛でるより、実用的なものの方が良い。風流より実利を重んじることを表します。',
            origin: '桜の花見で、花を見るより団子を食べる方が良いという考えから生まれました。',
            example: '「彼女は花より団子で、デートより美味しい食事が大事」のように使います。'
        }
    },
    {
        imagePath: 'images/nekonotemokaritai.png',
        text: 'ねこのてもかりたい',
        explanation: {
            meaning: '非常に忙しくて、猫の手でも借りたいほど人手が欲しい状況を表します。',
            origin: '猫は人の仕事を手伝えないのに、それでも借りたいほど忙しいという意味から生まれました。',
            example: '「年末の大掃除で猫の手も借りたい」のように使います。'
        }
    },
    {
        imagePath: 'images/nitowooumonohailtutomoezu.png',
        text: 'にとをおうものはいっとをえず',
        explanation: {
            meaning: '二つのことを同時に狙うと、結局どちらも手に入らない。欲張ると失敗するという教えです。',
            origin: '狩りで二匹の兎を同時に追いかけると、どちらも捕まえられないことから生まれました。',
            example: '「転職と副業を同時に始めるのは二兎を追う者は一兎をも得ずだよ」のように使います。'
        }
    },
    {
        imagePath: 'images/hetanateltupoukazuutyaataru.png',
        text: 'へたなてっぽうかずうちゃあたる',
        explanation: {
            meaning: '下手でも数多く試せば、いつかは成功する。継続は力なりという意味のことわざです。',
            origin: '射撃が下手でも数多く撃てば、いつかは的に当たることから生まれました。',
            example: '「営業は下手な鉄砲数撃ちゃ当たるで頑張ろう」のように使います。'
        }
    },
    {
        imagePath: 'images/yakeisinimizu.png',
        text: 'やけいしにみず',
        explanation: {
            meaning: '焼けた石に水をかけるように、効果がすぐに消えてしまうこと。一時的な効果しかないことを表します。',
            origin: '熱い石に水をかけても一瞬で蒸発してしまうことから生まれたことわざです。',
            example: '「その対策は焼け石に水で根本的な解決にならない」のように使います。'
        }
    },
    {
        imagePath: 'images/kaltupanokawanagare.png',
        text: 'かっぱのかわながれ',
        explanation: {
            meaning: '得意なはずのことで失敗すること。専門家でも時には間違いを犯すという意味です。',
            origin: '水泳が得意な河童でも、時には川で溺れることがあるという考えから生まれました。',
            example: '「料理上手の母が焦がしてしまうなんて河童の川流れだね」のように使います。'
        }
    },
    {
        imagePath: 'images/waraukadonihahukukitaru.png',
        text: 'わらうかどにはふくきたる',
        explanation: {
            meaning: 'いつも笑顔でいる人のところには幸福がやってくる。明るい人には良いことが起こるという意味です。',
            origin: '笑顔の絶えない家庭には自然と幸せが訪れるという古くからの教えです。',
            example: '「彼女はいつも笑顔だから笑う門には福来るで人気者だね」のように使います。'
        }
    },
    {
        imagePath: 'images/ryouyakuhakutininigasi.png',
        text: 'りょうやくはくちににがし',
        explanation: {
            meaning: '体に良い薬は苦いもの。役に立つ忠告や教えは聞くのが辛いという意味のことわざです。',
            origin: '昔から良薬は苦味があることが多く、そこから人生の教訓として使われるようになりました。',
            example: '「先生の厳しい指導は良薬は口に苦しで君のためだよ」のように使います。'
        }
    },
    {
        imagePath: 'images/dongurinoseikurabe.png',
        text: 'どんぐりのせいくらべ',
        explanation: {
            meaning: 'どれも代わり映えのしない、ぱっとしない者同士が競い合っている様子という意味のことわざです。',
            origin: '',
            example: ''
        }
    },
    {
        imagePath: 'images/isinouenimosannen.png',
        text: 'いしのうえにもさんねん',
        explanation: {
            meaning: '苦しみにたえれば、いずれ報われるという意味のことわざです。',
            origin: '',
            example: ''
        }
    }
    // ↑↑↑ 新しい画像を追加する場合は、上記のように追加してください ↑↑↑
    // 例: { imagePath: 'images/新しい画像ファイル名.png', text: '対応するひらがな', explanation: { meaning: '意味', origin: '由来', example: '例文' } }
];

// グローバルスコープで利用できるようにする
window.imageSets = imageSets;
