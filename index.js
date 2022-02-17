
// var tinify = require("tinify");
// tinify.key = "yZzw9H4RZ9XzNfPkWyF7r2fhXrk0D4S9"; // 自行注册
// //您可以将任何JPEG或PNG图像上传到Tinify API进行压缩。
// //我们将自动检测图像类型并相应地使用TinyPNG或TinyJPG引擎进行优化。只要您上传文件或提供图片的URL，就会开始压缩。
// //您可以选择本地文件作为源，并将其写入另一个文件。
// var source = tinify.fromFile("unoptimized.jpg");
//  // 这里输入文件也支持网址形式：tinify.fromUrl("https://tinypng.com/images/panda-happy.png");
// source.toFile("optimized.jpg");  
// // 上述两行代码也支持连写哦！tinify.fromFile("unoptimized.jpg").toFile("optimized.jpg")
var fs = require('fs');
var path = require('path');

//解析需要遍历的文件夹，我这以E盘根目录为例
// var filePath = path.resolve('E:/nft/1046');
var filePath = path.resolve('C:/Users/Admin/Downloads/mint1046');

const tinify = require('tinify')
// tinify.key = "qsrGnbEFHdYNsAdWQqTo92AX5cnonluf"; // key 上限为500，请自行到官网注册 https://tinypng.com/dashboard/api
tinify.key = "qrjwG3DR0JBhS9tKgsgq7r8BRWTwPjKW"; // key 上限为500，请自行到官网注册 https://tinypng.com/dashboard/api



//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                const output = 'C:/Users/Admin/Downloads/newMint'
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            console.log(filedir);
                            // 压缩图片
                            setTimeout(()=>{tinify.fromFile(filedir).toFile(output)});
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}
