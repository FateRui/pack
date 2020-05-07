document.write(process.env.PUBLIC_PATH,process.env.PUBLIC_API);
const img = document.createElement('img');
img.setAttribute('id','img');
img.setAttribute('src',require('@/src/static/imgs/custom-add.png'));
document.body.appendChild(img);
const img1 = document.createElement('img');
img1.setAttribute('id','img1');
img1.setAttribute('src',require('@/src/static/imgs/icon_error_red.svg'));
document.body.appendChild(img1);
import ('@/src/style/index.less');

img.addEventListener('click',function(){
    const alink = document.createElement('a');
    alink.href = window.location.origin + process.env.PUBLIC_PATH + 'download.xls';
    alink.download = 'a.xls';
    alink.click();
});

[1,2,5,7,10,2,3].sort((a,b)=>{
    return a - b
});