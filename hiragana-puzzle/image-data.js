// 画像と対応するひらがなのマッピング
// ※新しい画像を追加する場合は、このリストに追加してください※
const imageSets = [
    {
        imagePath: 'images/butanisinnzyu.png',
        text: 'ぶたにしんじゅ',
        explanation: {
            meaning: '豚に真珠を与えても価値がわからない。価値のわからない人に貴重なものを与えても無駄だという意味のことわざです。'
        }
    },
    {
        imagePath: 'images/siranugahotoke.png',
        text: 'しらぬがほとけ',
        explanation: {
            meaning: '知らないでいる方が心安らかでいられる。真実を知ると苦しむことがあるという意味です。'
        }
    },
    {
        imagePath: 'images/tanukineiri.png',
        text: 'たぬきねいり',
        explanation: {
            meaning: '狸が寝たふりをすること。ずる賢く人を騙すことや、知らないふりをすることを表します。'
        }
    },
    {
        imagePath: 'images/hanayoridanngo.png',
        text: 'はなよりだんご',
        explanation: {
            meaning: '美しいものを愛でるより、実用的なものの方が良い。風流より実利を重んじることを表します。'
        }
    },
    {
        imagePath: 'images/nekonotemokaritai.png',
        text: 'ねこのてもかりたい',
        explanation: {
            meaning: '非常に忙しくて、猫の手でも借りたいほど人手が欲しい状況を表します。'
        }
    },
    {
        imagePath: 'images/nitowooumonohailtutomoezu.png',
        text: 'にとをおうものはいっとをえず',
        explanation: {
            meaning: '二つのことを同時に狙うと、結局どちらも手に入らない。欲張ると失敗するという教えです。'
        }
    },
    {
        imagePath: 'images/hetanateltupoukazuutyaataru.png',
        text: 'へたなてっぽうかずうちゃあたる',
        explanation: {
            meaning: '下手でも数多く試せば、いつかは成功する。継続は力なりという意味のことわざです。'
        }
    },
    {
        imagePath: 'images/yakeisinimizu.png',
        text: 'やけいしにみず',
        explanation: {
            meaning: '焼けた石に水をかけるように、効果がすぐに消えてしまうこと。一時的な効果しかないことを表します。'
        }
    },
    {
        imagePath: 'images/kaltupanokawanagare.png',
        text: 'かっぱのかわながれ',
        explanation: {
            meaning: '得意なはずのことで失敗すること。専門家でも時には間違いを犯すという意味です。'
        }
    },
    {
        imagePath: 'images/waraukadonihahukukitaru.png',
        text: 'わらうかどにはふくきたる',
        explanation: {
            meaning: 'いつも笑顔でいる人のところには幸福がやってくる。明るい人には良いことが起こるという意味です。'
        }
    },
    {
        imagePath: 'images/ryouyakuhakutininigasi.png',
        text: 'りょうやくはくちににがし',
        explanation: {
            meaning: '体に良い薬は苦いもの。役に立つ忠告や教えは聞くのが辛いという意味のことわざです。'
        }
    },
    {
        imagePath: 'images/dongurinoseikurabe.png',
        text: 'どんぐりのせいくらべ',
        explanation: {
            meaning: 'どれも代わり映えのしない、ぱっとしない者同士が競い合っている様子という意味のことわざです。'
        }
    },
    {
        imagePath: 'images/isinouenimosannen.png',
        text: 'いしのうえにもさんねん',
        explanation: {
            meaning: '苦しみにたえれば、いずれ報われるという意味のことわざです。'
        }
    },
    {
        imagePath: 'images/oninikanabou.png',
        text: 'おににかなぼう',
        explanation: {
            meaning: '強い者がさらによい条件でますます強くなること。'
        }
    },
    {
        imagePath: 'images/sonaearebaureinasi.png',
        text: 'そなえあればうれいなし',
        explanation: {
            meaning: 'ふだんから準備しておけば、いざというときに困らないということ。'
        }
    },
    {
        imagePath: 'images/kahouhanetemate.png',
        text: 'かほうはねてまて',
        explanation: {
            meaning: '幸福の訪れは人間の力ではどうすることもできないから、焦らずに時機を待てという意味のことわざです。'
        }
    },
    {
        imagePath: 'images/tanakarabotamoti.png',
        text: 'たなからぼたもち',
        explanation: {
            meaning: '思いがけない幸運が転がりこむこと。'
        }
    },
    {
        imagePath: 'images/sarumokikaraotiru.png',
        text: 'さるもきからおちる',
        explanation: {
            meaning: 'その道の名人と言われる人でも、時には失敗するということ。'
        }
    }
    // ↑↑↑ 新しい画像を追加する場合は、上記のように追加してください ↑↑↑
    // 例: { imagePath: 'images/新しい画像ファイル名.png', text: '対応するひらがな', explanation: { meaning: '意味', origin: '由来', example: '例文' } }
];

// グローバルスコープで利用できるようにする
window.imageSets = imageSets;
