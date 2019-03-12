(function(){
  const acceptableImgExts = ['.png', '.jpeg', '.jpg', '.PNG', '.JPG', '.JPEG'];
  const searchBtn = document.querySelector('nav > a:last-of-type');
  const searchWrap = document.getElementById('search-wrap');
  const searchBar = document.querySelector('#search-wrap input');
  const closeSearchBtn = document.querySelector('#search-wrap > a');
  const imageInput = document.getElementById("image-input");

  const toggleSearchWrap = () => {
    searchWrap.classList.toggle("active");
    if(searchWrap.classList.contains("active")){
      searchBar.focus();
    }
  }

  const handleImgChange = () => {
    try {
      const imgFile = imageInput.files[0];
      const validExt = acceptableImgExts.some(ext => imgFile.type.indexOf(ext) > -1);
      if(validExt){
        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onloadend = function() {
          headerSection.uploadProfileImage(reader.result);
        }
      } else {
        this.changeImgForm.reset();
        alert("try, Cannot upload that file type");
      }
    } catch(e){
      this.changeImgForm.reset();
      alert(e.message);
    }
  };

  const uploadProfileImage = imgString => {
    const formData = new FormData();
    formData.append('img', imgString);
    formData.append('userId', this.fileInput.getAttribute('data-id'));
    fetch('../api/images/update-profile-img.php', {
      method: 'POST',
      body: formData
    }).then(res => res.text()).then(res => {
      if(res === "success"){
        alert("Image upload successful");
        this.getProfileImage();
      } else {
        alert("Image upload not successful");
      }
    });
  }; 

  const getProfileImage = () => {
    const formData = new FormData();
    const userId = this.userBoxImg.getAttribute("data-id");
    formData.append('user_id', userId);
    fetch("../api/images/get-profile-img.php", {
      method: "POST",
      body: formData
    }).then(res => res.text()).then(res => {
      if(res.indexOf('url(') > -1){
        this.userBoxImg.style.backgroundImage = `${res}`;
      } else {
        const image = new Image();
        image.src = res;
        this.userBoxImg.style.backgroundImage = `url(${image.src})`;
      }
    });
  };

  searchBtn.addEventListener('click', toggleSearchWrap);
  closeSearchBtn.addEventListener('click', toggleSearchWrap);
  
}());