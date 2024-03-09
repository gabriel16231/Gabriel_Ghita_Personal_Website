let btn = document.getElementById("btnClick");
      const img = new Image();
      img.crossOrigin = "anonymous";

      btn.addEventListener("click", async function () {
        try {
          const response = await fetch(
            "https://dog.ceo/api/breeds/image/random"
          );
          const result = await response.json();

          const canvas = document.getElementById("canvas");
          const ctx = canvas.getContext("2d");
          console.log(result);

          img.onload = () => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0, img.width, img.height);
          };

          img.src = result.message;
        } catch (err) {
          console.log(err);
        }
      });

      let btn_flip = document.getElementById("btnmirror");

      btn_flip.addEventListener("click", function () {//va oglindi imaginea salvata cu img 
        const start = performance.now();
        mirror_with_px("canvas_mirror");
        const end = performance.now();
        console.log(`Timp de executie: mirroring -> ${end - start} ms.`);
      });

      let btn_g_s = document.getElementById("btngs");

      btn_g_s.addEventListener("click", function () {//convert to gray scale
        const start = performance.now();
        gray_scale_img("canvas_mirror");
        const end = performance.now();
        console.log(`Timp de executie: gray scale -> ${end - start} ms.`);
      });

      let btn_b = document.getElementById("btnb");

      btn_b.addEventListener("click", function () {//convert to binary image
        const start = performance.now();
        binary_img("canvas_mirror");
        const end = performance.now();
        console.log(
          `Timp de executie: gray scale to binary -> ${end - start} ms.`
        );
      });

      function mirror_img(canvasID) {
        const canvas = document.getElementById(canvasID);
        const ctx = canvas.getContext("2d");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.save();     //salvam canvas-ul inainte de ii da restore dupa modificari
        ctx.scale(-1, 1);  //oglindeste continutul canvasului
        ctx.drawImage(img, 0, 0, -img.width, img.height);
        ctx.restore();
      }

      function gray_scale_img(canvasID) {
        const canvas = document.getElementById(canvasID);
        const ctx = canvas.getContext("2d");

        const img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const scanned_data = img_data.data;
        console.log(img_data);
        for (let i = 0; i < scanned_data.length; i += 4) {
            //pt a face conversie la gray scale trb sa fasim media valorilor rgb si sa dam tuturor aceasta valore medie
            //pt ca un pixel sa fie gri trb ca val R G B sa fie egale 
          const avgc =
            (scanned_data[i] + scanned_data[i + 1] + scanned_data[i + 2]) / 3;

          scanned_data[i] = avgc;
          scanned_data[i + 1] = avgc;
          scanned_data[i + 2] = avgc;
        }

        img_data.data = scanned_data;
        ctx.putImageData(img_data, 0, 0);
      }

      function binary_img(canvasID) {
        const canvas = document.getElementById(canvasID);
        const ctx = canvas.getContext("2d");

        const img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const scanned_data = img_data.data;
        console.log(img_data);
        for (let i = 0; i < scanned_data.length; i += 4) {
          let avgc =
            (scanned_data[i] + scanned_data[i + 1] + scanned_data[i + 2]) / 3;
          if (avgc > 105) {//am ales un treshold static a i daca valoarea medie este mai mare ca treshold ul pixelul devine alb[255,255,255] altfel devine negru [0,0,0]
            avgc = 255;
          } else {
            avgc = 0;
          }
          scanned_data[i] = avgc;
          scanned_data[i + 1] = avgc;
          scanned_data[i + 2] = avgc;
        }
        //obs: aceasta functie transforma orice img (indiferent daca este gray scale sau nu ) intr una binara
        img_data.data = scanned_data;
        ctx.putImageData(img_data, 0, 0);
      }


      function mirror_with_px(canvasID)
      {
        const canvas = document.getElementById(canvasID);
        const ctx = canvas.getContext("2d");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.drawImage(img,0,0)
        const img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const scanned_data = img_data.data;

        for(let i=0;i<canvas.height;i+=1)
        {
          let index=i*canvas.width*4;
        for(let j=0;j<canvas.width/2;j+=1)
        {
          let poz_c=index+4*j;
          let poz_m=index+(canvas.width-j)*4;
          
          
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