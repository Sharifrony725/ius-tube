const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');
    data.data.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadCategory('${category.category_id}')" class="btn mr-5 hover:bg-[#FF1F3D] hover:text-white text-xl font-semibold bg-slate-200 px-6 pb-1 rounded-lg">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    });
}

//id wise category dynamic
const handleLoadCategory = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
   
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    const emptyData = document.getElementById('empty-data');
    if (data.data.length === 0) {
      emptyData.classList.remove('hidden');
    } else {
      emptyData.classList.add('hidden');
    }
    data.data.forEach((single_category) => {
       const hours = Math.floor(single_category.others.posted_date / 3600);
       const minutes = (((single_category ?.others ?.posted_date / 3600) - hours) * 60).toFixed(0);
        const div = document.createElement('div');
        div.innerHTML = `<div class="card w-auto h-80 bg-base-100 shadow-xl p-2 relative">
          <figure class ="h-40 mb-8 "> <img src ="${single_category.thumbnail}"
          alt ="Item Photo"> </figure> 
          <p class="bg-[#171717] text-white absolute right-4 top-32 px-1 rounded">${single_category?.others?.posted_date ? `${hours} hrs ${minutes} min ago`: ''} </p>
    
         <div class="flex gap-4">
          <div>
            <img class="w-10 h-10 rounded-full" src="${single_category.authors[0].profile_picture}" alt="Author Photo">
          </div>
          <div class="">
            <h4 h4 class ="text-lg font-bold"> ${single_category.title}</h4>
            <div class="flex items-center">
              <p class="me-2">${single_category.authors[0].profile_name}</p>
              <p class ="me-2"> ${
                  single_category.authors[0].verified ? '<i class="fa-solid fa-circle-check text-[#2568EF] text-lg"></i>' : ''
                  } </p >
             </div>
              <p>${single_category.others.views}</p>
           </div>
        </div>
      </div>`;
     
        cardContainer.appendChild(div);
    });
}

handleCategory();
handleLoadCategory("1000");