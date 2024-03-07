
const img = new Image();
img.crossOrigin = "Anonymous";
const apiKey = 'live_D0aAVyHStAR6lUwaNwJc543aOQmICaVOSALFwgkvgaOVytidugJXgkOVUcsoCe8O'; // Replace with your CatAPI key
const catApiEndpoint = 'https://api.thecatapi.com/v1/images/search';
const catCanvas = document.getElementById('canvas');
const ctx = catCanvas.getContext('2d');

// Function to fetch and draw a random cat image
function fetchAndDrawCat() {
    fetch(catApiEndpoint, { headers: { 'x-api-key': apiKey } })
        .then(response => response.json())
        .then(data => {
            const imageUrl = data[0].url;

           
            img.src = imageUrl;
            catCanvas.height=img.naturalHeight;
            catCanvas.width=img.naturalWidth;
            img.onload = function () {
                ctx.clearRect(0, 0, catCanvas.width, catCanvas.height); // Clear canvas
                ctx.drawImage(img, 0, 0, catCanvas.width, catCanvas.height);
            };
        })
        .catch(error => console.error('Error fetching cat image:', error));
}

// Add click event listener to the "Fetch Random Cat" button
document.getElementById('btnClick').addEventListener('click', fetchAndDrawCat);




      let btn_flip = document.getElementById("btnmirror");

      btn_flip.addEventListener("click", function () {//va oglindi imaginea salvata cu img 
        const start = performance.now();
        mirror_with_px("canvas");
        const end = performance.now();
        console.log(`Timp de executie: mirroring -> ${end - start} ms.`);
      });

      let btn_g_s = document.getElementById("btngs");

      btn_g_s.addEventListener("click", function () {//convert to gray scale
        const start = performance.now();
        gray_scale_img("canvas");
        const end = performance.now();
        console.log(`Timp de executie: gray scale -> ${end - start} ms.`);
      });

      let btn_b = document.getElementById("btnb");

/*
      function gray_scale_img(canvasID) {

        const img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const scanned_data = img_data.data;
        console.log(img_data);
        for(let i=0;i<canvas.height;i+=1)
        {
          let index=i*canvas.width*4;
        for(let j=0;j<canvas.width/2;j+=1) {
          let poz=index+4*j;
            //pt a face conversie la gray scale trb sa fasim media valorilor rgb si sa dam tuturor aceasta valore medie
            //pt ca un pixel sa fie gri trb ca val R G B sa fie egale 
          const avgc =
            (scanned_data[poz] + scanned_data[poz + 1] + scanned_data[poz + 2]) / 3;

          scanned_data[poz] = avgc;
          scanned_data[poz + 1] = avgc;
          scanned_data[poz + 2] = avgc;
        }
      }

        img_data.data = scanned_data;
        ctx.putImageData(img_data, 0, 0);
      }
      



      function mirror_with_px(canvasID)
      {

        const img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const scanned_data = img_data.data;

        for(let i=0;i<canvas.height;i+=1)
        {
          let index=i*canvas.width*4;
        for(let j=canvas.width/2;j<(3*canvas.width)/4;j+=1)
        {
          let poz_c=index+4*j;
          let poz_m=index+(canvas.width/2-j)*4;
          
          
          let c=scanned_data[poz_c];
          scanned_data[poz_c]=scanned_data[poz_m];
          scanned_data[poz_m]=c;

          c=scanned_data[poz_c+1];
          scanned_data[poz_c+1]=scanned_data[poz_m+1];
          scanned_data[poz_m+1]=c;

          c=scanned_data[poz_c+2];
          scanned_data[poz_c+2]=scanned_data[poz_m+2];
          scanned_data[poz_m+2]=c;

          c=scanned_data[poz_c+3];
          scanned_data[poz_c+3]=scanned_data[poz_m+3];
          scanned_data[poz_m+3]=c;
        }
        }
        
        img_data.data = scanned_data;
        ctx.putImageData(img_data, 0, 0);
      }