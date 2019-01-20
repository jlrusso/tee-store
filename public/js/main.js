(function(){
  const searchBtn = document.getElementById('search-btn');
  const searchWrap = document.getElementById('search-wrap');
  const searchBar = document.getElementById('search-bar');
  const closeSearchBtn = document.getElementById('close-search-btn');

  searchBtn.addEventListener('click', toggleSearchWrap);
  closeSearchBtn.addEventListener('click', toggleSearchWrap);

  function toggleSearchWrap(){
    searchWrap.classList.toggle("toggle-search-wrap");
    if(searchWrap.classList.contains("toggle-search-wrap")){
      searchBar.focus();
    }
  }
}());