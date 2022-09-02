const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLoadData(data.data.news_category))
}

const displayLoadData = categorys => {
    const categoryContainer = document.getElementById('Category-container');
    categorys.forEach(category => {
        console.log(category);
        const licategory = document.createElement('li');
        licategory.classList.add('nav-item');
        licategory.innerHTML = `
        
        <a onclick="loadAllCategory" class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
        `;
        categoryContainer.appendChild(licategory);
    })
}

loadData();