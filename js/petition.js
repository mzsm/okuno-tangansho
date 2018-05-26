let signature = new fabric.Canvas('signature');
signature.isDrawingMode = true;

let output = new fabric.Canvas('output');
output.selection = false;

// リセット
document.querySelector('#undo').addEventListener('click', function() {
    let last = signature.getObjects().pop();
    if(last){
        signature.remove(last).renderAll();
    }
}, false);

document.querySelector('#reset').addEventListener('click', function() {
    signature.clear();
}, false);

// 画像生成
document.querySelector('#form').addEventListener('submit', function(e) {
    e.preventDefault();

    output.clear();
    output.setBackgroundImage('img/template.jpg', output.renderAll.bind(output));

    let address = document.querySelector('#address').value;
    let addressText = new fabric.Text(
        address,
        {
            left: 160,
            top: 510,
            fontSize: 16,
            fontFamily: '"游明朝",YuMincho,"ヒラギノ明朝 ProN W3","Hiragino Mincho ProN","ＭＳ明朝",serif'
        }
    );
    output.add(addressText);

    let signaturePNG = signature.toDataURL('image/png');
    fabric.Image.fromURL(signaturePNG, function (img) {
        img.top = 630;
        img.left = 100;
        img.scale(0.5);
        output.add(img);
    });

    document.querySelector('#outputContainer').style.display = 'block';
    return false;
}, false);

