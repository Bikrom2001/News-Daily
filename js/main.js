const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLoadData(data.data.news_category))
}

const displayLoadData = categorys => {
    const categoryContainer = document.getElementById('Category-container');
    categorys.forEach(category => {
        // console.log(category);
        const licategory = document.createElement('li');
        licategory.classList.add('nav-item');
        licategory.innerHTML = `
        
        <a onclick="loadAllCategory('${category.category_id}')" class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
        `;
        categoryContainer.appendChild(licategory);
    })
}


const loadAllCategory = categoryId => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLoadCategory(data.data))
}

const displayLoadCategory = CategoryData => {
    const allCategoryContainer = document.getElementById('all-Category');
    allCategoryContainer.innerHTML = ``;
    CategoryData.forEach(allCategory => {
        // console.log(allCategory);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'mb-3', 'shadow-sm');
        cardDiv.innerHTML = `
        
        <div class="row g-0">
          <div class="col-md-3">
            <img src="${allCategory.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title fw-bold">${allCategory.title}</h5>
              <p class="card-text text-secondary">${allCategory.details.slice(0, 400)}....</p>
             <div class="row align-items-center">
                <div class="col-6 col-lg-4 mt-3">
                    <div class="d-flex gap-3 align-items-center">
                        <img style="width: 50px; height: 50px;" class="rounded-circle" src="${allCategory.author.img}" alt="">
                        <div>
                            <p class="mb-0 fw-semibold">${allCategory.author.name ? allCategory.author.name : "Not Found Author"}</p>
                            <p class="mb-0 text-secondary">${allCategory.author.published_date ? allCategory.author.published_date : 'Not Found Date'}</p>
                        </div>
                    </div>
                  </div>
                  <div class="col-6 col-lg-3 mt-3">
                    <div class="d-flex align-items-center gap-3">
                        <i class="fa-regular fa-eye"></i>
                        <p class="mb-0 fw-bold">${allCategory.total_view ? allCategory.total_view : "Not Found View"}M</p>
                    </div>
                  </div>
                  <div class="col-6 col-lg-3 mt-3">
                    <div>
                    <i class="fa-solid fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    </div>
                  </div>
                  <div class="col-6 col-lg-2 mt-3">
                    <div>
                        <i onclick="loadModalData('${allCategory._id}')" style="cursor: pointer;" class="fa-solid fa-arrow-right text-primary" data-bs-toggle="modal" data-bs-target="#NewsDetailModal"></i>
                    </div>
                  </div>
             </div>
            </div>
          </div>
        </div>
        
        `;
        allCategoryContainer.appendChild(cardDiv);
    })
}


const loadModalData = NewsDetailId => {
    const url = `https://openapi.programming-hero.com/api/news/${NewsDetailId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => modalNewsDetail(data.data[0]))
}

const modalNewsDetail = (NewsDetails) => {
    console.log(NewsDetails);

    const NewsDetailContainer = document.getElementById('modal-container');
    NewsDetailContainer.innerHTML = ``;
    const newsDetailDiv = document.createElement('div');
    newsDetailDiv.classList.add('col');
    newsDetailDiv.innerHTML = `

    <div class="card">
      <img src="${NewsDetails.image_url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${NewsDetails.title}</h5>
        <p class="card-text text-secondary">${NewsDetails.details ? NewsDetails.details.slice(0, 135) : '...'}</p>
      </div>
      <div class="card-footer">
          <small class=" fw-semibold text-black">${NewsDetails.author.name ? NewsDetails.author.name : "Not Found Author"}</small>
          <small class="text-muted text-end"> / ${NewsDetails.author.published_date ? NewsDetails.author.published_date : 'Not Found Date'}</small>
        </div>
    </div>
    
    `;
    NewsDetailContainer.appendChild(newsDetailDiv);

}

loadData();