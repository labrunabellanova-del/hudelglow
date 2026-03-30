// دالة لجلب المقالات وعرضها في الرئيسية
async function loadArticles() {
    const grid = document.querySelector('.articles-grid');
    if (!grid) return;

    try {
        const response = await fetch('articles.json');
        const articles = await response.json();

        grid.innerHTML = articles.map(art => `
            <article>
                <img src="${art.image}" alt="${art.title}">
                <div class="article-info">
                    <small style="color: #d4a373;">${art.category}</small>
                    <h3>${art.title}</h3>
                    <p>${art.summary}</p>
                    <a href="article.html?id=${art.id}" class="read-more">اقرئي المزيد ←</a>
                </div>
            </article>
        `).join('');
    } catch (e) { console.log("خطأ في تحميل البيانات"); }
}

// دالة لعرض محتوى المقال المنفرد
async function displaySingleArticle() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById('post-content-area');
    if (!id || !container) return;

    const response = await fetch('articles.json');
    const articles = await response.json();
    const art = articles.find(a => a.id == id);

    if (art) {
        document.title = `Hudel Glow | ${art.title}`;
        container.innerHTML = `
            <h1 style="font-family: 'Dancing Script'; color: #d4a373; font-size: 4rem; text-align:center;">${art.title}</h1>
            <img src="${art.image}" style="width:100%; border-radius:20px; margin:30px 0;">
            <div style="font-size:1.3rem; line-height:2.2; color:#333;">${art.content}</div>
        `;
    }
}

// تشغيل الوظائف بناءً على الصفحة الحالية
window.onload = () => {
    loadArticles();
    displaySingleArticle();
};