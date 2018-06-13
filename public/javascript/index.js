$(document).ready(function () {

    const articleContainer = $(".article-container");

    $(document).on('click', '.btn.save', handleArticleSave);
    $(document).on('click', '.scrape-new', handleArticleScrape);

    function initPage() {
        articleContainer.empty();
        $.get('/api/headlines?saved=false')
            .then(function (data) {
                if (data && data.length) {
                    renderArticles(data);

                } else {
                    renderEmpty();
                }
            });
    }

    function renderEmpty() {
        let emptyAlert =
            $(['<div class="alert alert-warning text-center">',
                '<h4>We have no new Articles.</h4>',
                '</div>'].join(""));
        articleContainer.append(emptyAlert);
    }

    function renderArticles(articles) {
        let articlePanel = []

        for (var i = 0; i < articles.length; i++) {
            articlePanel.push(createPanel(articles[i]))
        }
        articleContainer.append(articlePanel);

    }

    function createPanel(article) {
        let panel =
            $(['<div class="panel panel-default" >',
                "<div class='panel-heading'>",
                "<h3>",
                article.headline,
                "<a> class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                article.summary,
                "</div>",
                "</div>"].join(''));

        panel.data("_id", article._id);

    }

    function handleArticleSave() {
        

        let savedArticle = $(this).parents('.panel').data();
        savedArticle.saved = true;

        $.ajax({
            method: 'PATCH',
            url: '/api/headlines',
            data: savedArticle
        }).then(function(data) {
            if (data.ok) {
                initPage();
            }
        })
    }

    function handleArticleScrape() {
        console.log('scraping')
        $.get('/api/fetch')
        .then(function(data) {
            initPage();

        })
    }
})