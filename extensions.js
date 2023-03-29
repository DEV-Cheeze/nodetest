module.exports = {
    getLists: (files) => {
        var list = `<ul>`;
        if(files !== undefined){
            files.forEach(elements => {
                list += `<li><a href="/contents/${elements}">${elements}</a></li>`;
            })
            list += `</ul>`;
        }else{
            list = `<p>게시글이 없습니다. 작성하기를 눌러 게시글을 작성해보세요.</p>`;
        }
        return list;
    },
    createDocs: (data) => {
        var content = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
            ${data}
        </body>
        </html>`;
        return content; 
    }
}