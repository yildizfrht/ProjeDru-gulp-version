var id=0;
for (var i = 3; i >= 1; i--) {
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
    fetch(`https://rickandmortyapi.com/api/character/${randomInt(1,100)}`)
    .then(response => response.json())
    .then(data=>sorgu(data))

    function sorgu(karakterDizi){
    const yorumBolumu= document.querySelector('#yorumBolumu')
    console.log(karakterDizi)
       yorumBolumu.innerHTML=yorumBolumu.innerHTML +
            `
                <div class="col-lg-4 col-md-12 margin-btm-20">
                    <div class="yorum dark">
                        <blockquote>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                        </blockquote>
                    </div>
                    <div class="yorum-footer text-right">
                        <div class="yorum-author-img">
                            <img src="${karakterDizi.image}"></img>
                        </div>
                        <h4>${karakterDizi.name}</h4>
                        <p> <strong>${karakterDizi.location.name}</strong></p>
                        
                    </div>
                </div>
            `
    }
}