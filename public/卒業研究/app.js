const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public/static')));

// テンプレートエンジンの設定
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ルーティング
app.get('/web1', (req, res) => {
    res.render('web1');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

