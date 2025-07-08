require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer'); // 追加
const app = express();
const port = 3000;

// **ミドルウェア設定**
app.use(express.json());  // JSONデータの解析
app.use(express.urlencoded({ extended: true }));  // フォームデータの解析

// **静的ファイルの提供**
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public/static')));

// **Pug のテンプレートエンジンを設定**
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// **詳細ページのルート**
app.get('/details/:id', (req, res) => {
    const sites = {
        aceacademy: {
            title: "AceAcademy",
            description: "Valorantプレイヤー向けの学習支援サイト。",
            image: "/static/aceacademy.png",
            features: ["戦略情報の共有", "プロのガイド", "最新メタ情報"],
            price: "¥50,000",
        },
        web1: {
            title: "WEBサイト1",
            description: "居酒屋や小規模店舗向けのシンプルなサイト。",
            image: "/static/WEB1.png",
            features: ["メニュー管理", "予約フォーム", "Googleマップ埋め込み"],
            price: "¥30,000",
        }
    };

    const site = sites[req.params.id];
    if (site) {
        res.render('details', { site });
    } else {
        res.status(404).send("ページが見つかりません");
    }
});

// **トップページ**
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/web1', (req, res) => {
    res.render('web1');
});

app.get('/aceacademy', (req, res) => {
    res.render('aceacademy');
});

// **お問い合わせフォーム送信処理**
app.post('/send', async (req, res) => {
    try {
        const { name, email, site, message } = req.body;

        // **バリデーション**
        if (!name || !email || !site || !message) {
            return res.status(400).json({ success: false, message: '全ての項目を入力してください。' });
        }

        // **サイト選択のバリデーション**
        const validSites = ["AceAcademy", "WEBサイト1", "その他"];
        if (!validSites.includes(site)) {
            return res.status(400).json({ success: false, message: '正しいサイトを選択してください。' });
        }

        // **メール送信設定**
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.RECEIVER_EMAIL, // ← ここ修正！
            subject: `お問い合わせ - ${site}`,
            text: `お名前: ${name}\nメールアドレス: ${email}\nサイト: ${site}\nメッセージ:\n${message}`,
        };        

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'お問い合わせを送信しました！' });

    } catch (error) {
        console.error('メール送信エラー:', error);
        res.status(500).json({ success: false, message: '送信エラーが発生しました。' });
    }
});

// **サーバー起動**
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
