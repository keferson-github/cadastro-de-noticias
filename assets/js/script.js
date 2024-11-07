document.addEventListener("DOMContentLoaded", () => {
    // Elementos do modal e dos formulários na versão desktop
    const btnAddCategory = document.getElementById("btnAddCategory");
    const btnAddNews = document.getElementById("btnAddNews");
    const searchBar = document.getElementById("searchBar");

    // Elementos do modal e dos formulários na versão mobile
    const btnAddCategoryMobile = document.getElementById("btnAddCategoryMobile");
    const btnAddNewsMobile = document.getElementById("btnAddNewsMobile");
    const searchBarMobile = document.getElementById("searchBarMobile");

    const categoryModal = document.getElementById("categoryModal");
    const newsModal = document.getElementById("newsModal");
    const newsDetailsModal = document.getElementById("newsDetailsModal");
    const closeCategoryModal = document.getElementById("closeCategoryModal");
    const closeNewsModal = document.getElementById("closeNewsModal");
    const closeNewsDetailsModal = document.getElementById("closeNewsDetailsModal");

    const categoryForm = document.getElementById("categoryForm");
    const newsForm = document.getElementById("newsForm");
    const newsContainer = document.getElementById("newsContainer");
    const newsCategoryTitle = document.getElementById("newsCategoryTitle");
    const newsCategorySubtitle = document.getElementById("newsCategorySubtitle");

    // Array para armazenar categorias e notícias
    let categories = [];
    let newsList = [];

    // Carregar dados do localStorage
    function loadFromStorage() {
        const savedCategories = JSON.parse(localStorage.getItem("categories"));
        const savedNews = JSON.parse(localStorage.getItem("newsList"));

        if (savedCategories) {
            categories = savedCategories;
            renderCategories();
        }

        if (savedNews) {
            newsList = savedNews;
            renderNews();
        }
    }


    // Salvar dados no localStorage
    function saveToStorage() {
        localStorage.setItem("categories", JSON.stringify(categories));
        localStorage.setItem("newsList", JSON.stringify(newsList));
    }

    // Função para renderizar categorias nos selects
    function renderCategories() {
        newsCategoryTitle.innerHTML = "<option value='' disabled selected>Selecione um título</option>";
        newsCategorySubtitle.innerHTML = "<option value='' disabled selected>Selecione um subtítulo</option>";

        categories.forEach((category) => {
            const titleOption = document.createElement("option");
            titleOption.value = category.title;
            titleOption.textContent = category.title;

            const subtitleOption = document.createElement("option");
            subtitleOption.value = category.subtitle;
            subtitleOption.textContent = category.subtitle;

            newsCategoryTitle.appendChild(titleOption);
            newsCategorySubtitle.appendChild(subtitleOption);
        });
    }

    // Função para salvar categoria
    function saveCategory(title, subtitle) {

        if (confirm("Deseja salvar esta categoria?")) {
        categories.push({ title, subtitle });
        saveToStorage();
        renderCategories();

        alert("Categoria salva com sucesso!");
        }
    }

    // Função para renderizar as notícias
    function renderNews(filteredNews = newsList) {
        newsContainer.innerHTML = "";
        filteredNews.forEach((news, index) => {
            const card = document.createElement("div");
            card.classList.add("news-card");

            const titleEl = document.createElement("h3");
            titleEl.textContent = news.title;

            const descriptionEl = document.createElement("p");
            descriptionEl.textContent = news.description;

            // Botão "Saiba mais" para ver detalhes da notícia
            const moreButton = document.createElement("button");
            moreButton.classList.add("saiba-mais");
            moreButton.textContent = "Saiba mais";
            moreButton.addEventListener("click", () => openNewsDetails(news));

            // Botão "Excluir" para remover a notícia
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-news");
            deleteButton.textContent = "Excluir";
            deleteButton.addEventListener("click", () => deleteNews(index));

            card.appendChild(titleEl);
            card.appendChild(descriptionEl);
            card.appendChild(moreButton);
            card.appendChild(deleteButton);

            newsContainer.appendChild(card);
        });
    }

    // Função para excluir uma notícia
    function deleteNews(index) {
        // Exbir um pup-up de confirmação antes de remover a notícia do array 
        if (confirm("Tem certeza que deseja excluir esta notícia?")) {
        newsList.splice(index, 1);
        // Atualizar o localStorage
        saveToStorage();
        // Renderizar novamente as notícias
        renderNews();
        // Notificar que a notícia foi removida
        alert("Notícia excluída com sucesso!");
        }
    }

    // Função de pesquisa
    function searchNews(query) {
        const lowerCaseQuery = query.toLowerCase();

        const filteredNews = newsList.filter((news) => 
            news.title.toLowerCase().includes(lowerCaseQuery) || 
            news.subtitle.toLowerCase().includes(lowerCaseQuery) || 
            news.description.toLowerCase().includes(lowerCaseQuery)
        );

        // Renderizar resultados da pesquisa
        renderNews(filteredNews);

        // Exibir mensagem de "Nenhum resultado encontrado" se não houver resultados
        if (filteredNews.length === 0) {
            newsContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        }
    }

    // Evento para atualizar a pesquisa na versão desktop
    searchBar.addEventListener("input", (e) => {
        searchNews(e.target.value);
    });

    // Evento para atualizar a pesquisa na versão mobile
    searchBarMobile.addEventListener("input", (e) => {
        searchNews(e.target.value);
    });

    // Evento para abrir o modal no desktop "Cadastrar Categoria"
    btnAddCategory.addEventListener("click", () => {
        categoryModal.style.display = "flex";
    });

    // Evento para abrir o modal no mobile "Cadastrar Categoria"
    btnAddCategoryMobile.addEventListener("click", () => {
        categoryModal.style.display = "flex";
    });

    // Evento para fechar o modal "Cadastrar Categoria"
    closeCategoryModal.addEventListener("click", () => {
        categoryModal.style.display = "none";
    });

    // Evento para salvar a categoria
    categoryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("categoryTitle").value.trim();
        const subtitle = document.getElementById("categorySubtitle").value.trim();

        if (title && subtitle) {
            saveCategory(title, subtitle);

            // Limpar campos do formulário e fechar modal
            categoryForm.reset();
            categoryModal.style.display = "none";
        } else {
            alert("Preencha todos os campos da categoria.");
        }
    });

    // Evento para abrir o modal no desktop "Cadastrar Notícia"
    btnAddNews.addEventListener("click", () => {
        newsModal.style.display = "flex";
    });

    // Evento para abrir o modal no mobile "Cadastrar Notícia"
    btnAddNewsMobile.addEventListener("click", () => {
        newsModal.style.display = "flex";
    });

    // Evento para fechar o modal "Cadastrar Notícia"
    closeNewsModal.addEventListener("click", () => {
        newsModal.style.display = "none";
    });

    // Evento para fechar o modal de detalhes da notícia
    closeNewsDetailsModal.addEventListener("click", () => {
        newsDetailsModal.style.display = "none";
    });

    // Evento para salvar a notícia
    newsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = newsCategoryTitle.value;
        const subtitle = newsCategorySubtitle.value;
        const author = document.getElementById("newsAuthor").value.trim();
        const date = document.getElementById("newsDate").value;
        const description = document.getElementById("newsDescription").value.trim();

        // Exibir uma notificação de confirmação antes de salvar a notícia
        if (title && subtitle && author && date && description && confirm("Deseja salvar esta notícia?")) {
            newsList.push({ title, subtitle, author, date, description });
            saveToStorage();
            renderNews();

            // Notificar que a notícia foi salva
            alert("Notícia salva com sucesso!");

            // Limpar campos do formulário e fechar modal
            newsForm.reset();
            newsModal.style.display = "none";
        } else {
            alert("Preencha todos os campos da notícia.");
        }
    });

    // Função para abrir detalhes da notícia em modal
    function openNewsDetails(news) {
        const newsDetails = document.getElementById("newsDetails");
        newsDetails.innerHTML = `
            <h3>${news.title}</h3>
            <p><strong>Subtítulo:</strong> ${news.subtitle}</p>
            <p><strong>Autor:</strong> ${news.author}</p>
            <p><strong>Data:</strong> ${news.date}</p>
            <p><strong>Descrição:</strong> ${news.description}</p>
        `;
        newsDetailsModal.style.display = "flex";
    }

    // Carregar dados do localStorage ao iniciar
    loadFromStorage();

});

// Abre e Fecha o botão do menu mobile
function menuShow() {
    let menuMobile = document.querySelector(".mobile-menu");
    if (menuMobile.classList.contains("open")) {
        menuMobile.classList.remove("open");
        document.querySelector(".icon").src = "assets/img/open_menu_icon.svg";
    } else {
        menuMobile.classList.add("open");
        document.querySelector(".icon").src = "assets/img/close_menu_icon.svg";
    }
}
