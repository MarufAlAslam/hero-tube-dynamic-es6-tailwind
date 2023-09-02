const categories = document.getElementById('categories');

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/videos/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
        const flex = document.createElement('div');
        flex.classList.add('flex', 'justify-center', 'items-center', 'gap-[24px]');
        data.data.forEach(category => {
            console.log(category.category);
            const button = document.createElement('button');
            button.classList.add('category-btn', 'px-[20px]', 'py-[8px]', 'bg-[#d3dce3]', 'rounded-[4px]', 'text-[#5d5d5d]', 'hover:bg-[#FF1F3D]', 'hover:text-white', 'transition', 'duration-300');
            button.innerText = category.category;
            button.setAttribute('category_id', category.category_id);
            button.addEventListener('click', () => {
                if (button.attributes['category_id'].value == category.category_id) {
                    // remove all active class
                    const active = document.querySelectorAll('.active');
                    active.forEach(btn => {
                        btn.classList.remove('active');
                    })
                    button.classList.add('active')
                }
            })
            flex.appendChild(button);
        })
        categories.appendChild(flex);
    })
}

loadCategories();